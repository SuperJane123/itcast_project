<template>
  <div class="rightList">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表格 -->
    <el-table :data="rightList" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>

      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>

      <el-table-column prop="level" label="层级">
        <template slot-scope="scope">
          <span>{{scope.row.level|levelFormat}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAllrights } from '@/api/rightList_index'

export default {
  data () {
    return {
      rightList: []
    }
  },

  filters: {
    levelFormat (level) {
      // console.log(level)
      if (level === '0') {
        return '一级菜单'
      } else if (level === '1') {
        return '二级菜单'
      } else if (level === '2') {
        return '三级菜单'
      }
    }
  },

  mounted () {
    //   获取所有权限列表数据
    getAllrights('list')
      .then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.rightList = res.data.data
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
