<template>
  <div class="login">
    <div class="container">
        <img src="../assets/webwxgetmsgimg.jpeg" class="avatar" alt="">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input prefix-icon= "myicon-user" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" @keydown.enter.native="login" prefix-icon="myicon-key" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="login">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/login_index.js'

export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          // require是必填项
          // trigger是什么时候触发规则
          // message 触发后提示的信息
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    login () {
      // 判断表单是否为空，element有提供验证方法validate
      this.$refs.loginForm.validate(valid => {
        if (valid) { // 如果为true则为二次通过，否则不通过
          console.log(this.loginForm)
          login(this.loginForm)
            .then(res => {
              console.log(res)
              if (res.data.meta.status === 200) {
                // 如果登陆成功。储存token，跳转页面
                localStorage.setItem('itcast_manager_token', res.data.data.token)
                // 储存名字到vuex中
                // this.$store.state.username = res.data.data.username
                // this.$store.commit('setUsername', res.data.data.username)
                // 使用mutation中的函数---这种方式的调用需要使用commit
                // 使用action中的函数实现数据的储存
                // this.$store.dispatch(action中的函数名称，参数....)
                this.$store.dispatch('setAction', res.data.data.username)

                this.$router.push({ name: 'home' })
              } else {
                this.$message.warning(res.data.meta.msg)
              }
            })
            .catch(err => {
              console.log(err)
              this.$message({
                showClose: true,
                message: '服务器异常，请稍后再试',
                type: 'error'
              })
            })
        } else {
          this.$message({
            showClose: true,
            message: '请输入所有必填数据',
            type: 'warning'
          })
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  background-image: url('../assets/timg.jpeg');
  background-size: 100%;
  // background-repeat: no-repeat;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    // background: white;
    // background-color: rgba(0, 0, 0, 1);

    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
