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
          <!-- 一级菜单 -->
          <el-row v-for="first in props.row.children" :key="first.id" style="margin-bottom: 10px">
            <el-col :span="4">
              <el-tag closable type="success" @close="delRights(props.row,first.id)">{{first.authName}}</el-tag>
            </el-col>
            <!-- 二级菜单 -->
            <el-col :span="20">
              <el-row v-for="second in first.children" :key="second.id" style="margin-bottom: 5px">
                <el-col :span="4">
                  <el-tag closable type="error" @close="delRights(props.row,second.id)">{{second.authName}}</el-tag>
                </el-col>
                <!-- 三级菜单 -->
                <el-col :span="20">
                  <el-tag
                    closable
                    type="info"
                    v-for="third in second.children"
                    :key="third.id"
                    style="margin-right: 5px;margin-bottom: 5px"
                    @close="delRights(props.row,third.id)"
                  >{{third.authName}}</el-tag>
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
          <el-tooltip class="item" effect="dark" content="角色授权" placement="bottom-start">
            <el-button type="success" icon="el-icon-d-caret" @click="showGrandDialog(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="bottom-start">
            <el-button type="info" icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 角色分配对话框 -->
    <el-dialog title="权限分配" :visible.sync="grandDialogTableVisible">
      <el-tree
        ref="tree"
        :data="rightList"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="checkedArr"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="grandDialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="grandRights">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAllroles, delRightById, grandRights } from '@/api/roleList_index'
import { getAllrights } from '@/api/rightList_index'
export default {
  data () {
    return {
      roleid: '',
      grandDialogTableVisible: false,
      roleList: [],
      rightList: [],
      defaultProps: {
        label: 'authName',
        children: 'children'
      },
      checkedArr: []
    }
  },

  methods: {
    // 获取所有角色列表
    init () {
      getAllroles()
        .then(res => {
          // console.log(res)
          if (res.data.meta.status === 200) {
            this.roleList = res.data.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 删除权限功能
    delRights (row, rightId) {
      // console.log(id, rid)

      delRightById(row.id, rightId)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.$message.success(res.data.meta.msg)
            // console.log(row)
            // 局部刷新展开行
            row.children = res.data.data
          } else {
            this.$message.error(res.data.meta.msg)
          }
        })
        .catch(err => {
          console.log(err)
          this.$message.error('服务器出错，请稍后重试')
        })
    },

    // 显示角色授权对话框
    showGrandDialog (row) {
      console.log(row)

      // 这个是角色的id号
      this.roleid = row.id
      this.grandDialogTableVisible = true
      // console.log(this.$refs.tree.getCheckedNodes())
      // 遍历数据的第三层，拿到ID号
      // 因为树形组件只加载一次，加载完毕后，每次点击弹宽出来，不会重新刷新的数据，这样会导致，每次点击出来的弹框结果都是一样的
      // 所以每次点击弹框时，需要把数据源刷新一下，可以把数据深拷贝一次，或者直接调用获取数据的接口方法（不建议）
      this.rightList = [...this.rightList]
      // console.log(this.rightList)
      // 因为checkedArr是全局变量，所以需要每次点开角色授权对话框时，需要把数据清空
      this.checkedArr.length = 0

      // 因为之前有做过删除标签，如果三级菜单都删完了，二级菜单也删除，同理一级菜单也删除，获取id号时可以不用判断是否还有子级
      // row.children.forEach(e => {
      //   if (e.children.length > 0) {
      //     e.children.forEach(j => {
      //       if (j.children.length > 0) {
      //         this.checkedArr.push(j.id)
      //       }
      //     })
      //   }
      // })
      row.children.forEach(first => {
        first.children.forEach(second => {
          second.children.forEach(third => {
            this.checkedArr.push(third.id)
          })
        })
      })
    },

    // 实现角色授权
    async grandRights () {
      // getCheckedNodes（返回结果是选中节点的数组，根据服务器返回的数据看，返回有父节点的id，能取到所有的父节点元素）
      // getCheckedKeys(这个取不到父节点元素）
      // console.log(this.$refs.tree.getCheckedNodes())
      // console.log(this.$refs.tree.getCheckedKeys())
      let arr = this.$refs.tree.getCheckedNodes()
      let temp = []
      console.log(arr)
      arr.forEach(e => {
        temp.push(e.id + ',' + e.pid) // ["131,110,125", "132,110,125"]
      })
      // 需要把两个数组合并
      temp = temp.join(',').split(',')
      console.log(temp)

      // 发现数组里有重复的数据，需要去重
      temp = [...new Set(temp)].join(',')
      console.log(temp)
      let res = await grandRights(this.roleid, temp)
      console.log(res)
      if (res.data.meta.status === 200) {
        this.$message.success(res.data.meta.msg)
        this.grandDialogTableVisible = false
        this.init()
      } else {
        this.$message.error(res.data.meta.msg)
      }
    }

  },

  mounted () {
    this.init()

    // 获取所有权限列表
    getAllrights('tree')
      .then(res => {
        // console.log(res)
        this.rightList = res.data.data
      })
      .catch(err => {
        console.log(err)
        this.$message.error('服务器出错，请稍后重试')
      })
  }
}
</script>

<style lang="less" scoped>
</style>
