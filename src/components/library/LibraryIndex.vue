<template>
  <el-container>
    <el-aside style="width: 200px">
      <switch></switch>
      <SideMenu></SideMenu>
      <!--<SideMenu></SideMenu>-->
    </el-aside>
    <el-main>
      <books class="books-area"></books>
    </el-main>
  </el-container>
</template>

<script>
import SideMenu from './SideMenu'
import Books from './Books'
export default {
  name: 'AppLibrary',
  components: {
    SideMenu,
    Books}
}
</script>

<style scoped>

</style>
