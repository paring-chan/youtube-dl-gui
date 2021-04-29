<template>
  <div id="app">
    <div v-if="process.platform === 'darwin'" style="-webkit-app-region: drag; height: 20px"/>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'youtube-dl-gui',
    computed: {
      process () {
        return process
      }
    }
  }
</script>

<style>
  /* CSS */
</style>
