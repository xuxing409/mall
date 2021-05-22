<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <MainTarBar/>
  </div>
</template>

<script>
import MainTarBar from 'components/content/mainTabbar/MainTarBar'

  export default {
    name: 'App',
    components: {
      MainTarBar
    }
  }
</script>

<style>
  @import "assets/css/base.css"
</style>
