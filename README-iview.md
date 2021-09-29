# Variant Form iView版
#### 一款高效的Vue低代码表单，可视化设计，一键生成源码，享受更多摸鱼时间。

![image](https://ks3-cn-beijing.ksyuncs.com/vform-static/img/vform_demo.gif)

<br/>

### 安装依赖
```
npm install
```

### 开发调试
```
npm run serve
```

### 生产打包
```
npm run build
```

### 表单设计器 + 表单渲染器打包
```
npm run lib-iview
```

### 表单渲染器打包
```
npm run lib-render-iview
```

### 浏览器兼容性
```Chrome（及同内核的浏览器如QQ浏览器、360浏览器等等），Firefox，Safari，IE 11```

<br/>

### 跟Vue项目集成



###### 打包

```
//VFromDesigner:
npm run lib-iview
//VFromRender
npm run lib-render-iview
```

####### 使用vFormDesigner的lib包
1. main.js全局注册
```
...
import ViewUI from 'view-design';
import VFormDesigner from './{YOURPATH}/VFormDesigner.umd.min.js'
import './{YOURPATH}/VFormDesigner.css'
...
Vue.use(VFormDesigner);
Vue.use(ViewUI, {size:'small'});
...
new Vue({
  render: h => h(App)
}).$mount('#app')
```
2. 在Vue模板中使用组件
```
<template>
  <v-form-designer></v-form-designer>
</template>

<script>
  export default {
    data() {
      return {
      }
    }
  }
</script>

<style lang="scss">
body {
  margin: 0;  /* 如果页面出现垂直滚动条，则加入此行CSS以消除之 */
}


```


####### 使用vFormRender的lib包
1. main.js全局注册
```
...
import ViewUI from 'view-design';
import VFormRender from './{YOURPATH}/VFormRender.umd.min.js'
import './{YOURPATH}/VFormRender.css'
...
Vue.use(VFormRender);
Vue.use(ViewUI, {size:'small'});
...
new Vue({
  render: h => h(App)
}).$mount('#app')
```
2. 在Vue模板中使用组件
```
<template>
  <div>
    <v-form-render :form-json="formJson" :form-data="formData" :option-data="optionData" ref="vFormRef">
    </v-form-render>
    <el-button type="primary" @click="submitForm">Submit</el-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        formJson: {"widgetList":[],"formConfig":{"labelWidth":80,"labelPosition":"left","size":"","labelAlign":"label-left-align","cssCode":"","customClass":"","functions":"","layoutType":"PC","onFormCreated":"","onFormMounted":"","onFormDataChange":""}},
        formData: {},
        optionData: {}
      }
    },
    methods: {
      submitForm() {
        this.$refs.vFormRef.getFormData().then(formData => {
          // Form Validation OK
          alert( JSON.stringify(formData) )
        }).catch(error => {
          // Form Validation failed
          this.$message.error(error)
        })
      }
    }
  }
</script>
```



<br/>

#### 1. 安装包
  ```bash
  npm i vform-builds
  ```
或
  ```bash
  yarn add vform-builds
  ```

<br/>

#### 2. 引入并全局注册VForm组件
```javascript
import Vue from 'vue'
import App from './App.vue'

import ViewUI from 'view-design'  //引入iView库
import VForm from 'vform-builds/dist/VFormDesigner-iView.umd.min.js'  //引入iView版本VForm库文件

import 'view-design/dist/styles/iview.css'  //引入iView样式
import 'vform-builds/dist/VFormDesigner-iView.css'  //引入VForm样式

Vue.config.productionTip = false

Vue.use(ViewUI, {size:'small'})  //全局注册iView
Vue.use(VForm)  //全局注册VForm(同时注册了v-form-designer和v-form-render组件)

new Vue({
  render: h => h(App),
}).$mount('#app')
```

<br/>

#### 3. 在Vue模板中使用表单设计器组件
```html
<template>
  <v-form-designer></v-form-designer>
</template>

<script>
  export default {
    data() {
      return {
      }
    }
  }
</script>

<style lang="scss">
body {
  margin: 0;  /* 如果页面出现垂直滚动条，则加入此行CSS以消除之 */
}
</style>
```

<br/>

#### 4. 在Vue模板中使用表单渲染器组件
```html
<template>
  <div>
    <v-form-render :form-json="formJson" :form-data="formData" :option-data="optionData" ref="vFormRef">
    </v-form-render>
    <el-button type="primary" @click="submitForm">Submit</el-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        formJson: {"widgetList":[],"formConfig":{"labelWidth":80,"labelPosition":"left","size":"","labelAlign":"label-left-align","cssCode":"","customClass":"","functions":"","layoutType":"PC","onFormCreated":"","onFormMounted":"","onFormDataChange":""}},
        formData: {},
        optionData: {}
      }
    },
    methods: {
      submitForm() {
        this.$refs.vFormRef.getFormData().then(formData => {
          // Form Validation OK
          alert( JSON.stringify(formData) )
        }).catch(error => {
          // Form Validation failed
          this.$message.error(error)
        })
      }
    }
  }
</script>
```

<br/>

### 资源链接
<hr>

文档官网：<a href="http://www.vform666.com/" target="_blank">http://www.vform666.com/</a>

在线演示：<a href="http://demo.vform666.com/" target="_blank">http://demo.vform666.com/</a>

VS Code插件：<a href="http://www.vform666.com/pages/plugin/" target="_blank">http://www.vform666.com/pages/plugin/</a>

Github仓库：<a href="https://github.com/vform666/variant-form" target="_blank">https://github.com/vform666/variant-form</a>

Gitee备份仓库：<a href="https://gitee.com/vdpadmin/variant-form" target="_blank">https://gitee.com/vdpadmin/variant-form</a>

更新日志：<a href="http://www.vform666.com/pages/changelog/" target="_blank">http://www.vform666.com/pages/changelog/</a>

技术交流群：微信搜索“vformAdmin”，或者扫如下二维码加群

![image](https://ks3-cn-beijing.ksyuncs.com/vform-static/img/vx-qrcode-242.png)