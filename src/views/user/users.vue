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
      <el-button type="success" plain @click="addDialogFormVisible = true">添加用户</el-button>
    </div>

    <!-- 表格元素 -->

    <el-table :data="usersList" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="150"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="150"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态" width="100">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#dfdfdf" @change = getStatus(scope.row.id,scope.row.mg_state)></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="light" content="编辑" placement="bottom" >
            <el-button type="primary" plain icon="el-icon-edit" @click="showEditDialog(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="分配角色" placement="bottom">
            <el-button type="success" plain icon="el-icon-d-caret" @click="showRoleDialog(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="删除" placement="bottom">
            <el-button type="warning" plain icon="el-icon-delete" @click="showDelDialog(scope.row)"></el-button>
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

    <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
      <el-form :model="addform" :label-width='"80px"' :rules="rules" ref="addform">
        <el-form-item label="用户名" prop="username">
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
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewUser">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加编辑用户对话框 -->

     <el-dialog title="编辑用户" :visible.sync="editDialogFormVisible">
      <el-form :model="editform" :label-width='"80px"' :rules="rules" ref="editform">
        <el-form-item label="用户名">
          <el-input v-model="editform.username" auto-complete="off" disabled style="width: 80px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editform.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editform.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>

  <!-- 分配角色对话框 -->
<el-dialog title="分配角色" :visible.sync=" roleDialogFormVisible">
  <el-form :model="roleform" label-width="80px">
    <el-form-item label="用户名" >
      <!-- <el-input v-model="form.name" auto-complete="off"></el-input> -->
      <span >{{roleform.username}}</span>
    </el-form-item>
    <el-form-item label="角色" >
       <el-select v-model="roleform.rid" clearable placeholder="请选择">
    <el-option
      v-for="item in roleList"
      :key="item.value"
      :label="item.roleName"
      :value="item.id">
    </el-option>
  </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="roleDialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click = assignRole>确 定</el-button>
  </div>
</el-dialog>

<!-- 删除弹框 -->

  </div>
</template>

<script>
import { getAllUsers, addNewUser, editUser, editRole, delUserById, updateUserStatus } from '../../api/users_index'
import { getAllRole } from '../../api/role_index'

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
      addDialogFormVisible: false,

      // 编辑用户的信息
      editform: {
        id: '',
        email: '',
        mobile: ''

      },
      editDialogFormVisible: false,

      // 分配角色的用户信息
      roleList: [],
      roleform: {
        username: '',
        id: '',
        rid: ''
      },
      roleDialogFormVisible: false,

      // 添加新增用户的验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
          // {
          //   pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
          //   message: '请输入合法的邮箱地址',
          //   trigger: 'blur'
          // }
        ],
        mobile: [
          { required: false, message: '请输手机号', trigger: 'blur' }
          // {
          //   pattern: /0?(13|14|15|18|17)[0-9]{9}/,
          //   message: '请输入正确的手机号码',
          //   trigger: 'blur'
          // }
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
      console.log(`当前页: ${val}`)
      this.userobj.pagenum = val

      // 修改参数
      this.init()
    },

    // 获取数据
    init () {
      getAllUsers(this.userobj)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.usersList = res.data.data.users
            // 获取总计记录数
            this.total = res.data.data.total
            // this.userobj.pagenum = res.data.data.pagenum
            // if (res.data.data.users.length === 1) {
            //   this.userobj.pagenum--
            // }
            this.userobj.pagenum = res.data.data.pagenum
          } else if (res.data.meta.status === 400) {
            this.$message.error(res.data.meta.msg)
            this.$router.push({ name: 'login' })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 添加新用户
    addNewUser () {
      // 进行二次验证
      this.$refs.addform.validate(valid => {
        if (valid) {
          addNewUser(this.addform)
            .then(res => {
              // console.log(res)
              if (res.data.meta.status === 201) {
                this.$message.success(res.data.meta.msg)
                this.addDialogFormVisible = false
                // 重制表格  resetFields
                this.$refs.addform.resetFields()
                this.init()
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
    },

    // 收集编辑用户信息
    showEditDialog (row) {
      // 利用scope.row获取当行数据对象
      this.editDialogFormVisible = true
      // console.log(row)
      this.editform.id = row.id
      this.editform.email = row.email
      this.editform.mobile = row.mobile
      this.editform.username = row.username
    },

    // 实现编辑功能
    editUser () {
      editUser(this.editform)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.$message.success(res.data.meta.msg)
            this.editDialogFormVisible = false
            // 刷新页面
            this.init()
          } else {
            this.$message.error(res.data.meta.msg)
          }
        })
        .catch(err => {
          console.log(err)
          this.$message.error('服务器出错，请稍后重试')
        })
    },

    // 给分配角色赋值
    showRoleDialog (row) {
      this.roleDialogFormVisible = true
      console.log(row)
      this.roleform.username = row.username
      this.roleform.id = row.id
      this.roleform.rid = row.rid
    },

    // 实现分配角色功能
    assignRole () {
      console.log(this.roleform)
      if (this.roleform.rid) {
        editRole(this.roleform)
          .then(res => {
            console.log(res)
            if (res.data.meta.status === 200) {
              this.$message.success(res.data.meta.msg)
              this.roleDialogFormVisible = false
            } else {
              this.$message.error(res.data.meta.msg)
            }
          })
          .catch(err => {
            console.log(err)
            this.$message.error('服务器出错，请稍后重试')
          })
      } else {
        this.$message.warning('请选择角色')
      }
    },

    // 实现删除功能
    showDelDialog (row) {
      console.log(this.userobj.pagenum)
      console.log(this.total)
      console.log(this.userobj.pagesize)
      if (Math.ceil((this.total - 1) / this.userobj.pagesize) < this.userobj.pagenum) {
        this.userobj.pagenum--
      }

      console.log(row)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUserById(row.id)
          .then(res => {
            console.log(res)
            if (res.data.meta.status === 200) {
              this.$message.success(res.data.meta.msg)

              this.init()
            } else {
              this.$message.error(res.data.meta.msg)
            }
          })
          .catch(err => {
            console.log(err)
            this.$message.error('服务器出错，请稍后重试')
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 实现状态修改
    getStatus (id, type) {
      console.log(id, type)
      updateUserStatus(id, type)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.$message.success(res.data.meta.msg)

            this.init()
          } else {
            this.$message.error(res.data.meta.msg)
          }
        })
        .catch(err => {
          console.log(err)
          this.$message.error('服务器出错，请稍后重试')
        })
    }

  },

  mounted () {
    this.init()

    // 加载角色列表数据
    getAllRole()
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
