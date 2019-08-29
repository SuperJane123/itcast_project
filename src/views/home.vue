<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <img src="../assets/logo.png" alt="" class="logo">
        <el-menu default-active="2" class="el-menu-vertical-demo"
        :router="true"
        :unique-opened='true'
        text-color="#545c64"
        active-text-color = '#3399CC'

        >
          <el-submenu :index="first.id +''" v-for="first in menusList" :key="first.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{first.authName}}</span>
            </template>
            <el-menu-item :index='"/home/"+second.path'  v-for="second in first.children" :key="second.id">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{second.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/home/rolttList">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>角色列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/home/rightList">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>权限列表</span>
              </template>
            </el-menu-item>
          </el-submenu> -->

        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class= "myicon-menu toggle-btn"></span>
          <h1 class="system-title">电商后台管理系统</h1>
          <a href="javascript" class="welcome">退出</a>
        </el-header>
        <el-main>

         <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import { getLeftMenus } from '../api/rightList_index'
export default {
  data () {
    return {
      menusList: []
    }
  },
  mounted () {
    getLeftMenus()
      .then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.menusList = res.data.data
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="less" scoped>
  .home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    // background-color: #545c64;
    // background-color: #3399CC
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #3399CC;

    // margin: 0 auto;

  }
  .system-title{
      font-size: 28px;
      text-align: center;
       color: #fff
  }
  .logo {
    height:60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
    // height: 200px;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292CF;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .myicon-menu{
      color: #fff;
      font-size: 36px
  }
  .welcome{
    color: white;
  }
}
</style>
