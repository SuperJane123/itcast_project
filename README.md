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





### api接口的操作

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
  - 客户端接收之后后续每一次请求都会将这个token数据传递给服务器
  - 服务器根据token数据进行下一步的处理
- 获取token进行保存
  - 登录成功之后返回token
  - 所以我们在登录成功之后将token数据进行保存---locationStorage保存






### 导航守卫

> 导航守卫就是用来守卫导航。所谓守卫导航的意识就是指：经过我们的判断来决定当前用户的路由跳转是否可以继续
>
> 正如其名，view-router提供的导航守卫主要用来通过跳转或取消的方式守卫导航

- 添加导航守卫  @main.js

- router.beforeEach((to,from,next)=>{

  1.获取token值

  2.判断是否有token值，判断当前页面是否是登录页面，如果是，就next()

  3.否则重定向到登录页面，next({path：'/login'})

- })









## 首页组件制作

- 制作页面结构(使用Container 布局容器)

- 添加左侧菜单项

  - 使用(NavMenu 导航菜单--侧栏)

  - 修改菜单结构

    - el-menu： 整个菜单项
    - el-submenu： 菜单的一级子项
    - el-menu-item： 二级菜单

  - 导航菜单的常见属性

    - el-menu-item： 

      1.unique-opened，只保持一个字菜单的展开，他的值时bool值	

       2.router: 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行			     		路由跳转

    - el-submenu:

      1.index:唯一标识当前菜单项

    - el-menu-item:

      1.default-active：当前激活菜单的 index，这个索引是el-menu-item的索引，必须指定为字符串  :default-active="'2-1'"

      2.index:唯一标识当前菜单子项

- 添加整个页面的样式

- 制作右侧顶部栏

### 组件的功能

### 添加嵌套路由

- 添加欢迎组件
- 设置嵌套路由，在home中嵌套路由





## 用户列表

- 添加用户列表单文件组件
- 添加嵌套路由配置
- 设置导航菜单项目的index



### 制作用户列表单文件组件

- 添加面包屑组件
- 添加搜索框+按钮组件
- 添加表格组件
- 添加自定义模板列
  - slot-scope="scope"：设置数据插槽，scope就是当前行对象
  - 插槽必须包裹在template模板结构中
  - scope.row就是当前行数据对象，我们能够轻松的获取当前行的数据对象，便于后期的操作
- 添加提示工具：Tooltip 文字提示
- 添加分页功能


















