<template>
  <div>
    <nav-menu></nav-menu>
    <router-view/>
<!--    子组件显示-->
  </div>
</template>

<script>
import NavMenu from './common/NavMenu'
export default {
  name: 'Home',
  components: {NavMenu}
}
</script>

<style scoped>

</style>

<style scoped>

</style>
