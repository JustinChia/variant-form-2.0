<template>
  <div id="app">
    <VFormDesigner :customFields="customFields"/>
  </div>
</template>

<script>
import VFormDesigner from './components-iview/form-designer/index.vue'
import i18n, { changeLocale } from "@/components-iview/utils/i18n";

export default {
  name: 'App',
  components: {
    VFormDesigner
  },
  mixins: [i18n],
  data(){
	  return {
		  customFields:[]
	  }
  },
  created(){
	  // this.customFields = [{
	  // 	type: "deptSelect",
	  // 	icon: "iconfont icon-insertcolumn",
	  // 	plugin: true,
	  // 	formItemFlag: true,
	  // 	options: {
	  // 		name: "",
	  // 		label: "",
	  // 		size: 'small',
	  // 		placehoder: "请选择",
	  // 		displayName: "部门选择",
	  // 		disabled: true
	  // 	},
	  // 	setting: {
	  // 		commonSetting: [{
	  // 				name: 'dataSource',
	  // 				displayName: "setting.dataSource",
	  // 				tooltip: "setting.dataSourceTip",
	  // 				placehoder: "setting.dataSourceTip",
	  // 				field: {
	  // 					type: "Input",
	  // 					props: {
	  // 						type: "text",
	  // 						maxlength: 10,
	  // 						clearable: true,
	  // 						suffix: "ios-search"
	  // 					},
	  // 					prependText: "URL"
	  // 				},
	  // 				default: "http://localhost://"
	  // 			},{
	  // 				name: 'dataGrid',
	  // 				displayName: "setting.dataSource",
	  // 				tooltip: "setting.dataSourceTip",
	  // 				placehoder: "setting.dataSourceTip",
	  // 				field: {
	  // 					type: "Grid",
	  // 					props: {
	  // 					},
	  // 					columns:[{
	  // 						label:"列1",
	  // 						value:"col1",
	  // 						},{
	  // 						label:"列2",
	  // 						value:"col2",
	  // 						},{
	  // 						label:"列3",
	  // 						value:"col3",
	  // 						}
	  // 					]								
	  // 				},
	  // 				default:[{
	  // 						col1:"hello",
	  // 						col2:"grid",
	  // 						col3:"world",
	  // 				},
	  // 				{
	  // 						col1:"hello2",
	  // 						col2:"grid2",
	  // 						col3:"world2",
	  // 				}]
	  // 			},
	  // 			{
	  // 				name: 'method',
	  // 				displayName: "setting.dataSource",
	  // 				tooltip: "setting.dataSourceTip",
	  // 				placehoder: "setting.dataSourceTip",
	  // 				field: {
	  // 					type: "Select",
	  // 					props: {
	  
	  // 					},
	  // 					child: [{
	  // 							value: "选择",
	  // 							label: "请选择Label",
	  // 						},
	  // 						{
	  // 							value: "GET",
	  // 							label: "GET请求Label",
	  // 						},
	  // 						{
	  // 							value: "POST",
	  // 							label: "POST请求Label",
	  // 						}
	  // 					]
	  // 				},
	  // 				default: 'GET'
	  // 			},
	  // 			{
	  // 				name: 'muilti',
	  // 				displayName: "setting.muiltiSelect",
	  // 				tooltip: "setting.muiltiSelect",
	  // 				placehoder: "setting.muiltiSelect",
	  // 				field: {
	  // 					type: "Checkbox",
	  // 					props: {
	  // 						label:"setting.muiltiSelect",
	  // 						value:"true",
	  // 						size:'large'
	  // 					}								
	  // 				},
	  // 				default:true
	  // 			},
	  // 			{
	  // 				name: 'checkgroup',
	  // 				displayName: "setting.muiltiSelect",
	  // 				tooltip: "setting.muiltiSelect",
	  // 				placehoder: "setting.muiltiSelect",
	  // 				field: {
	  // 					type: "CheckGroup",
	  // 					props: {
	  // 						size:'large'
	  // 					},
	  // 					child: [{
	  // 							value: "选择",
	  // 							label: "请选择Label",
	  // 							props:{
	  // 								border:true,
	  // 								size:"small"
	  // 							}
	  // 						},
	  // 						{
	  // 							value: "GET",
	  // 							label: "GET请求Label",
	  // 						},
	  // 						{
	  // 							value: "POST",
	  // 							label: "POST请求Label",
	  // 						}
	  // 					]
	  // 				},
	  // 				default:["GET","POST"]
	  // 			}
	  			
	  // 		],
	  // 		advancedSetting: [
			//   {
			// 	name: 'radiogroup',
			// 	displayName: "setting.muiltiSelect",
			// 	tooltip: "setting.muiltiSelect",
			// 	placehoder: "setting.muiltiSelect",
			// 	field: {
			// 		type: "RadioGroup",
			// 		props: {
			// 			size:'small',
			// 			// type :"button",
			// 		},
			// 		child: [{
			// 				value: "选择",
			// 				label: "左",
			// 			},
			// 			{
			// 				value: "GET",
			// 				label: "中",
			// 			},
			// 			{
			// 				value: "POST",
			// 				label: "右",
			// 			}
			// 		]
			// 	},
			// 	default:"POST"
			//   }
	  // 		],
	  // 		eventSetting: [
			// 	{
			// 		eventName: 'onselect',
			// 		eventParam: 'arg,arg1',
			// 		tooltip: "setting.muiltiSelect",
			// 		displayName: "setting.muiltiSelect",
			// 	}
	  // 		]
	  // 	},
	  // 	i18n: {
	  // 		"zh-CN": {
	  // 			"designer": {
	  // 				"customerFieldTitle": "自定义字段",
	  // 				"widgetLabel": {
	  // 					"deptSelect": "部门选择",
	  // 				}
	  // 			},
	  // 			"setting": {
	  // 				"dataSource": "数据源",
	  // 				"dataSourceTip": "请输入数据源地址",
	  // 				"muiltiSelect":"多选"
	  // 			}
	  // 		},
	  // 		"en-US": {
	  
	  // 		}
	  // 	}
	  // }];
	  
	  // i18n.methods.appendResource('zh-CN', this.customFields[0].i18n["zh-CN"]);
  }
}
</script>

<style lang="scss">
  #app {
    height: 100%;
  }
</style>
