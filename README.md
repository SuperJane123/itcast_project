# itcast_project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

- ### 使用vue-cli创建脚手架

- ### 准备好项目资源，下载element-ui

  ### 



### 添加路由配置

> 想让组件展示，只有一种方式，路由映射组件

- 添加一个路由配置文件	：@/router/router.js
- 创建路由对象，使用routes对登录组件进行路由配置，需要在main.js中注入路由





### 登录

- 添加一个存放用户组件的文件夹：views
- 添加登录单文件组件：@/views/login.vue
- 使用element-ui的组件实现登录界面，删除不必要的表单元素，添加输入密码框，添加图片
- 添加登录组件的样式
- 添加文本框的图标
  - 找到图标
  - 为文本框添加图标：input输入框>呆icon的输入框
  - 通过：prefix-icon="myicon myicon-user"来添加图标





### 登录功能

- vue组件中的操作
  - 添加时间，发起登录请求
  - 添加界面的表单数据操作，阻止用户提交（输入不合法）
  - 登录不成功时的提示：使用element-ui的massage消失提示组件
  - 调用接口方法实现登录操作
  - 接受数据返回结果，进行下一步处理
    - 如果登录失败，就给出提示
    - 如果登录成功，就进行路由跳转（this.$router.push({})）





## api接口的操作

- 添加一个用于处理用户操作的文件@/api/login_index.js
- 进行axios的封装：@/utils/myaxios.js
  - 下载
  - 引入
  - 暴露axios对象
- 添加api的接口---一定要仔细的阅读api的接口文档





### 状态保持

> 在这个项目中，使用token来进行状态保持

- token现在比较流行一种状态保持的方式
  - session，cookie也可以实现状态保持
  - token：它不基于浏览器，提供更严谨和严格的加密算法
  - token在服务器端生成，返回客户端





