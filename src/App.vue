<template>
  <div id="app">
    <VFormDesigner />
  </div>
</template>

<script>
import VFormDesigner from './components/form-designer/index.vue'

import config from './plugins/deptSelect/config.js'

export default {
  name: 'App',
  components: {
    VFormDesigner,
  }
}
</script>

<style lang="scss">
  #app {
    height: 100%;
  }
</style>
