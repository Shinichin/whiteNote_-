<template>
  <div>
    <!--  开启了 router 模式-->
    <el-row type="flex" class="row-bg">
      <el-col :span="18">
    <el-menu
      :default-active="'/index'"
      router
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item  v-for="(item,i) in navList" :key="i" :index="item.name">
        {{item.navItem}}
      </el-menu-item>
      <a href="#nowhere" class="funciton-type" style="color:white">更多功能</a>
      <i class="el-icon-menu" style="float:right;font-size: 45px;color: #222;padding-top: 8px"></i>
      <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold;color: white">White Jotter - Your Mind Palace</span>
    </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Navmenu',
  data () {
    return {
      navList: [
        {name: '/index', navItem: '首页'},
        {name: '/jotter', navItem: '笔记本'},
        {name: '/library', navItem: '图书馆'},
        {name: '/admin', navItem: '个人中心'}
      ]
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
  a{
    text-decoration: none;
  }

  span {
    pointer-events: none;
  }
  .funciton-type{
    color: white;
    float: right;
    padding: 20px;
  }
  /deep/.el-col-18{
    width: 100%;

  }
  /deep/.el-col-20{
    height: 650px;
  }
</style>
