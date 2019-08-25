<template>
  <div class="users">
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索框和添加按钮 -->
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入内容"
        v-model="userobj.query"
        class="input-with-select"
        style="width:300px;margin-right:10px"
        @keydown.enter.native="init"
        @input.native="init"
      >
        <el-button slot="append" icon="el-icon-search" @click="init"></el-button>
      </el-input>
      <el-button type="success" plain @click="dialogFormVisible = true">添加用户</el-button>
    </div>

    <!-- 表格元素 -->

    <el-table :data="usersList" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="150"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="150"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态" width="100">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#dfdfdf"></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="light" content="编辑" placement="bottom">
            <el-button type="primary" plain icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="添加" placement="bottom">
            <el-button type="success" plain  icon="el-icon-check"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="删除" placement="bottom">
            <el-button type="warning" plain icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页部分 -->

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="userobj.pagenum"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="userobj.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 添加用户对话框 -->

    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" >
  <el-form :model="addform" :label-width='"80px"' :rules="rules" ref="addform">
    <el-form-item label="用户名" prop="username" >
      <el-input v-model="addform.username" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="addform.password" auto-complete="off" type="password"></el-input>
    </el-form-item>
     <el-form-item label="邮箱" prop="email">
      <el-input v-model="addform.email" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="手机号" prop="mobile">
      <el-input v-model="addform.mobile" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addNewUser">确 定</el-button>
  </div>
</el-dialog>

  </div>
</template>

<script>
import { getAllUsers, addNewUser } from '../../api/users_index'

export default {
  data () {
    return {
      total: 0,
      status: true,
      userobj: {
        query: '',
        pagenum: 1,
        pagesize: 3
      },
      usersList: [],
      // 添加用户的数据信息
      addform: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      dialogTableVisible: false,
      dialogFormVisible: false,

      // 添加新增用户的验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/, message: '请输入合法的邮箱地址', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输手机号', trigger: 'blur' },
          { pattern: /0?(13|14|15|18|17)[0-9]{9}/, message: '请输入正确的手机号码', trigger: 'blur' }
        ]
      }

    }
  },

  methods: {
    // 当切换size下拉列表时触发
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.userobj.pagesize = val

      // 修改参数
      this.init()
    },

    // 当切换页码时触发
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.userobj.pagenum = val

      // 修改参数
      this.init()
    },

    // 获取数据
    init () {
      getAllUsers(this.userobj)
        .then(res => {
          if (res.data.meta.status === 200) {
            this.usersList = res.data.data.users
            // 获取总计记录数
            this.total = res.data.data.total
          } else if (res.data.meta.status === 400) {
            this.$message.error(res.data.meta.msg)
            this.$router.push({ name: 'login' })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    addNewUser () {
      // 进行二次验证
      this.$refs.addform.validate(valid => {
        if (valid) {
          addNewUser(this.addform)
            .then(res => {
              console.log(res)
              if (res.data.meta.status === 201) {
                this.$message.success(res.data.meta.msg)
                this.dialogFormVisible = false

                // 重制表格  resetFields
                this.$refs.addform.resetFields()
              } else {
                this.$message.error(res.data.meta.msg)
              }
            })
            .catch(err => {
              console.log(err)
              this.$message.error('服务器出错，请稍后重试')
            })
        }
      })
    }

    // 添加新用户

  },

  mounted () {
    this.init()
  }
}
</script>

<style lang="less" scoped>

</style>
