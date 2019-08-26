<template>
  <div class="roleList">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 添加按钮 -->
    <el-button type="success">成功按钮</el-button>

    <!-- 添加表格 -->
    <el-table :data="roleList" border style="width: 100%">
      <!-- 添加表格下拉组件 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <!-- 添加layout布局 -->
          <el-row v-for="first in props.row.children" :key="first.id" style="margin-bottom: 10px">
            <el-col :span="4">
              <el-tag closable type="success">{{first.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row  v-for="second in first.children" :key="second.id" style="margin-bottom: 5px">
                <el-col :span="4">
                  <el-tag closable type="error">{{second.authName}}</el-tag>
                </el-col>
                <el-col :span="20" >
                    <el-tag closable type="info" v-for="third in second.children" :key="third.id" style="margin-right: 5px;margin-bottom: 5px">{{second.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row v-show="props.row.children.length === 0">
            <el-col :span="24">没有开通任何权限</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="描述" width="180"></el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="bottom-start">
            <el-button type="primary" icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="角色分配" placement="bottom-start">
            <el-button type="success" icon="el-icon-d-caret"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="bottom-start">
            <el-button type="info" icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAllroles } from '@/api/rightList_index'
export default {
  data () {
    return {
      roleList: []
    }
  },

  mounted () {
    getAllroles()
      .then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.roleList = res.data.data
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="less" scoped>
</style>
