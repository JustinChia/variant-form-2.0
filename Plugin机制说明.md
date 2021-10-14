# 自定义组件



## 一、自定义组件说明


自定义组件包括`vue`文件和`配置文件`

配置文件格式:
```
[
	{
		type:"",					组件定义的名称 即组件vue文件 export default{ name:"" } 定义的名称
		icon:"",					显示在widget-panel的组件图标，可以是iconfont图标或其他图标
		plugin:true,				标记是自定义组件，这个为true就行了
		formItemFlag:true,			标记显示fromItem
		options:{					自定义组件的属性，如果是size,disabled等预定义的属性，可以自动显示属性配置，如果是其他属性，需要在setting中设置属性配置项
			
		},
		setting:{					显示在 setting-panel 的属性配置项
			commonSetting:[],		常见属性
			advancedSetting:[],		高级属性
			eventSetting:[]			事件属性
		},
		i18n:{						国际化资源
			zh-CN:{},
			en-US:{}
		}
	}
]
```
说明：widget-panel的组件名称，显示的是i18n.zh-CN.designer.widgetLabel.{组件名称}
如：
```
i18n:{
	zh-CN:{
		"designer": {
			"widgetLabel": {
				"deptSelect": "部门选择",
			}
		}
	}
}
```

commonSetting和advancedSetting:
```
{
	name: 'isMultiSelect',						自定义组件的属性名称，即组件的props
	displayName: "setting.multiSelect",			属性配置时显示名称，支持国际化
	tooltip: "setting.multiSelect",				属性配置时的tooltip,不配置则不显示，支持国际化
	field: {
		type: "RadioGroup",						`属性配置组件`的类型，包括：Input,Select,Radiobox,Check,Checkbox,Grid, 省略了前缀Setting，详见 修改文件 setting-pannel/controls部分
		props: {								`属性配置组件`的属性，使用iview对应的组件属性定义
			size:'small'						
		},
		child: [{								`属性配置组件`子项，每种组件不一样
				value: "选择",
				label: "左",
			},
			{
				value: "GET",
				label: "中",
			},
			{
				value: "POST",
				label: "右",
			}
		]
	}
}
```
	
	
eventSetting:
```
{
	eventName: 'onselect',						自定义事件的名称
	eventParam: 'arg,arg1',						自定义事件的参数，在事件编辑对话框中，可以直接使用这里定义的名称
	tooltip: "setting.muiltiSelect",			setting-panel 自定义属性配置的说明，支持国际化
	displayName: "setting.muiltiSelect",		setting-panel 自定义属性配置的名称，支持国际化
}
```




组件vue文件
```
import i18n_lang from './i18n.js';					导入组件的国际化配置文件，我是把组件的主配置，setting配置，i18n配置都拆分了
import plugin_mixin from '../plugin_mixin.js'		mixin 
export default{
	name: "projectSelect",							组件名称，即配置文件的type
	mixins: [plugin_mixin],
	data(){
		return {
			
		}
	},
	props:{
		value:{										由于使用组件的时候使用v-model进行表单字段值的绑定，因此需要拆分成props的value（获取值）和 methods里的 $emit("input"); 
			type:String,
			default:""
		}
	}
	watch:{
		value:function(val){
			if(val!=null){
				this.selectedProject=this.value;
			}else{
				this.selectedProject={};
			}
		}
	},
	created(){
	},
	methods:{
		selected(val){
			this.$emit("input",val);			   触发v-model，将值绑定到表单formDataModel对象里。
			this.$emit("customEvent","selected",[this.selectedProject,row._id]);
												   触发事件属性，selected 是自定义事件的名称，后面array是参数。对应json配置文件 eventSetting->eventName，eventSetting->eventParam
		}
	}
}
```

plugin_mixin.js
```
export default {
	inject:["i18n","formConfig","formDesigner"],									i18n国际化,formConfig，为了实现表单统一设置的size，formDesigner判断组件使用环境，设计模式还是渲染模式，渲染模式为null
	computed:{
		widgetSize(){																获取表单统一设置的size
			//如果是设计器的预览界面
			if(!!this.formDesigner){
				return this.size||this.formDesigner.formConfig.size||undefined;
			}else{
				return this.size||this.formConfig().size||undefined;				
			}
		}		
	},
	  methods: {
		  i18nt(key){
			return this.i18n.methods.i18nt(key);
		  },
		  setup_i18n(i18nlang){			  											这个好像没用了
			  for(let key in i18nlang){
			  	this.i18n.methods.appendResource(key,i18nlang[key]);
			  }
		  }
	  }
}
```
说明：
总觉得 inject 的实现方式不够优雅....,但组件里使用i18n和formConfig比较麻烦。









## 二、机制说明
## 显示自定义组件图标
##### 1. 加载json配置，写入到widget-panel/index.vue 的 props->customFields，根据json配置的显示组件名称、图标。
`components-iview/form-designer/index.vue`
行：88 增加Props  customFields
先把组件的json配置内容 写入到VFormDesigner的customFields里，再分别写入到widget-pannel 和setting-pannel的customFields里
```
customFields: {
	type: Array,
	default: () => {}
}
```
`widget-pannel/index.vue`
行51 显示自定义widget
```
<Panel name="4" :title="i18nt('designer.customFieldTitle')" v-if="customFields.length>0">
	{{i18nt('designer.customFieldTitle')}}
	<div slot="content">
		<draggable tag="ul" :list="customFields" :group="{name: 'dragGroup', pull: 'clone', put: false}"
			:clone="handleFieldWidgetClone" ghost-class="ghost" :sort="false">
			<li v-for="(fld, index) in customFields" :key="index" class="field-widget-item"
				:title="fld.displayName" @dblclick="addFieldByDbClick(fld)">
				<span class="iconfont" :class="[fld.icon]">
					{{i18nt(`designer.widgetLabel.${fld.type}`)}}
				</span>
			</li>
		</draggable>
	</div>
</Panel>
```
行106 props增加 customFields
```
customFields:{
	type:Array,
	default:()=> []
}
```




## 显示属性配置组件
##### 1. 定义了6种`属性配置组件`。

`setting-pannel/controls`
定义了6种属性配置组件
SettingInput：		用于编辑字符串、数字属性
SettingSelect：		用于编辑下拉属性
SettingCheckbox： 	用于编辑true/false属性
SettingRadioGroup：	用于编辑单选属性组 ，例如 常见属性的 字段标签对齐
SettingCheckGroup：	用于编辑checkgroup组，好像没大有用，根据RadioGroup顺手改出来的
SettingGrid：		用于编辑多可选项，例如checkbox多选项 的 “选项设置”


##### 2. 加载json配置，写入到setting-pannel/index.vue 的 props->customFields，根据json配置的显示组件名称、图标

`setting-pannel/index.vue`
行：1066 props增加 customFields
获取自定义组件的配置
```
customFields: Array
```



##### 3. 解析json中的常见属性/高级属性/事件属性配置，动态加载`属性配置组件`

`setting-pannel/index.vue`
行：367 增加常见属性的动态配置,根据配置文件，显示对应的配置项部件
```
<template v-if="designer.selectedWidget.plugin">
	<FormItem  v-for="setting in designer.selectedWidget.setting.commonSetting">
		<span slot="label">
			{{i18nt(setting.displayName)}}
			<Tooltip v-if="setting.tooltip" :content="i18nt(setting.tooltip)">
				<i class="ivu-icon ivu-icon-md-information-circle"></i>
			</Tooltip>
		</span>
		<component :is="'Setting'+setting.field.type" :default="setting.default" :field="setting.field" v-model="optionModel[setting.name]"></component>
	</FormItem>
</template>
```
行：582 增加高级组件的动态配置
```
<template v-if="designer.selectedWidget.plugin">
	<FormItem  v-for="setting in designer.selectedWidget.setting.advancedSetting">
		<span slot="label">
			{{i18nt(setting.displayName)}}
			<Tooltip v-if="setting.tooltip" :content="i18nt(setting.tooltip)">
				<i class="ivu-icon ivu-icon-md-information-circle"></i>
			</Tooltip>
		</span>
		<component :is="'Setting'+setting.field.type" :default="setting.default" :field="setting.field" v-model="optionModel[setting.name]"></component>
	</FormItem>
</template>
```
行：684 增加事件的动态配置
```
<template v-if="designer.selectedWidget.plugin">
	<FormItem  v-for="setting in designer.selectedWidget.setting.eventSetting">
		<span slot="label">
			{{i18nt(setting.displayName)}}
			<Tooltip v-if="setting.tooltip" :content="i18nt(setting.tooltip)">
				<i class="ivu-icon ivu-icon-md-information-circle"></i>
			</Tooltip>
		</span>
		<Button type="info" icon="md-create" plain round @click="editEventHandler(setting.eventName)">
			{{i18nt('designer.setting.addEventHandler')}}
		</Button>
	</FormItem>
</template>
```

##### 4. 处理自定义事件

`setting-pannel/index.vue`
行：1412 data增加 eventPluginParamsMap空对象
```
eventPluginParamsMap:{
					
},
```
行：980 编辑事件对话框的提示，如果eventParamsMap没有找到事件名称，则从eventPluginParamsMap加载显示的名称和参数
```
<div class="codeEditTip">{{(optionModel?optionModel.name:'') + '.' + (eventParamsMap[curEventName]||eventPluginParamsMap[curEventName])}}</div>
```


行：1500 watch部分修改selectedWidget
如果选中的是自定义组件，拼写：`方法名(参数)` 字符串写到 eventPluginParamsMap 对象里，提供给编辑事件对话框使用
```
'designer.selectedWidget': {
	handler(val) {
		if (!!val) {
			this.activeTab = "1"
			
			if(val.plugin){
				for(let i in val.setting.eventSetting){
					var event=val.setting.eventSetting[i];
					this.eventPluginParamsMap[event.eventName]=`${event.eventName}(${event.eventParam}) {`;
				}
			}
		}
	}
},
```




## 自定义组件显示机制
##### 1. 提前使用Vue.component 注册好`自定义组件`
`main-iview.js`
import SettingControls from '@/components-iview/form-designer/setting-panel/controls/';
Vue.use(SettingControls);

##### 2. 动态显示调用自定义组件，将自定义组件的options属性注入,双向数据绑定form的fieldModel,并实现自定义事件`customEvent`处理函数`handlePluginEvent`

`form-widget/field-index.vue`
form-widget/field-widget.vue
行：321 增加 动态组件
```
<template v-if="!!field.plugin">
	<components :is="field.type" v-bind="field.options" v-on="field.event" v-model="fieldModel" @customEvent="handlePluginEvent"></components>
</template>
```







## 自定义组件处理事件
##### 1. 组件所有的自定义事件通过触发customEvent
`组件.vue文件`
业务需要的地方触发
```
this.$emit("customEvent","事件属性名",[参数1，参数2...]);
```

##### 2. 使用handlePluginEvent动态设置的事件程序
`form-widget/field-index.vue`
行：799 增加个性化事件的处理
```
handlePluginEvent(eventName,eventArgs) {
	let param=[];
	for(let i in this.field.setting.eventSetting){
		let event=this.field.setting.eventSetting[i];
		if(event.eventName===eventName){
			param=event.eventParam.split(",");
		}
	}
	if (!!this.field.options[eventName]) {
		let customFunc = new Function(...param,this.field.options[eventName])
		customFunc.apply(this,eventArgs)
	}
},		
```

## 国际化解决方式
##### 1. 设计器 designer
` components-iview/form-designer/index.vue`
行：143 methods增加 解析自定义组件的国际化配置，并在mounted时调用执行
```
initPluginI18n(){
	for(let i in this.customFields){
		let plugins=this.customFields[i];
		if(plugins.i18n){
			for(let lang in plugins.i18n){
				i18n.methods.appendResource(lang,plugins.i18n[lang]);
			}
		}
	}
},
```

##### 2. 渲染器 render
`form-render/index.vue`
行61 props增加 customFields
获取自定义组件的配置，主要需要国际化的配置
```
customFields: {
	type: Array,
	default: () => {}
}
```
行：123 watch增加 解析自定义组件的国际化配置
```
customFields:{
	deep: true,
	handler(val, oldVal) {
		val.forEach(plugin=>{
			if(plugin.i18n){
				for(let key in plugin.i18n){
					i18n.methods.appendResource(key,plugin.i18n[key]);
				}
			}
		})
	}
}
```

##### 3. 自定义组件内部国际化，比如按钮、弹窗标题、提示文字
`components-iview/form-designer/index.vue`
行：108 增加Provide i18n, 把i18n的methods提供给插件使用
```
provide() {
	return {
		i18n:i18n
	}
},
```

`form-render/index.vue`
行76 provide增加 i18n,提供给组件使用
```
i18n:i18n
```



## 自定义组件响应表单全局配置
##### 1. 注入formDesigner，和formConfig 通过formDesigner判断是设计模式还是渲染模式

`form-widget/field-index.vue`
行：63 Provide增加formDesigner


`form-render/index.vue`
行71 provide增加 formDesigner,注入null
```
formDesigner:null,	//注入null，以便插件可以区分是在设计器模式调用还是在Render模式调用
```

##### 2. 自定义组件开发时使用 plugin_mixin.js



## 另外修改的问题
你看看这样是否合理？

##### 1. 动态获取的表单配置不生效
在使用 VFormRender时，如果在data里直接写好了formJson是可以显示表单的，但如果是从数据库读取，后修改formData的无法显示表单。
<v-form-render :customFields="customFields" :form-json="formJson" :form-data="formData"  :option-data="optionData" ref="vFormRef"> </v-form-render>


`form-render/index.vue`
原来 formConfig 是写在computed里 然后provide给子组件，我把它移到了methods里,但这样就把值改成了函数的引用
```
export default{
	...
	provide(){
		return {
			...
			formConfig:this.formConfig
			...
		}
	},
	computed:{
		//formConfig(){
		//	return this.formJson.formConfig
		//}
		...
	},
	methods:{
		formConfig(){
			return this.formJson.formConfig
		}
		...
	}
}
```

子组件使用到this.config的地方，改成了this.config()
涉及到field-widget.vue computed中的labelWidth、labelAlign、size


##### 2. 编辑功能中，先读取数据库，设置表单字段内容（setFormData），再获取（getFormData）时无法获取到修改内容。
`form-render/index.vue`
获取时重新给formDataModel赋值了 this._provided.globalModel.formModel
```
getFormData(needValidation = true) {
	//防止编辑模式获取不到最新数据
	this.formDataModel=this._provided.globalModel.formModel;
	...
}
```

##### 3. 表单清空功能
无法清空
`form-render/index.vue`
```
resetForm() { //重置表单
	...
	// this.$refs.renderForm.clearValidate()	原来的
	this.$refs.renderForm.resetFields();		修改为
}
```






