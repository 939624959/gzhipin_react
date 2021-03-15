# gzhipin_react

#### 介绍

尚硅谷react随堂实战项目

#### 软件架构

前端：使用react全家桶 + ES6 + WebPack等技术
后端：使用Node + mongodb + socketIO

#### 使用说明

1.  开启本地mongodb数据库
2.  选中server文件夹，右键-->open in terminal-->npm install-->npm start
3.  选中client文件夹，右键-->open in terminal-->npm install-->npm start

#### 技术选型

1.  前台数据展现/交互/组件化
    react、react-router-dom、redux、antd-mobile
2.  后台项目
    node、express、mongodb、mongoose、socket.io
3.  前后台交互
    ajax请求：axios、async/await
    测试借口：postman
4.  模块化
    es6、bable
5.  项目构建/工程化
    webpack、react-create-app、eslint
6.  其他库
    blueimp-md5、js-cookie、re-queue-anim

#### 客户端源码目录设计

src  客户端代码文件夹
|_api  ajax请求相关模块文件夹
|_assets  公用资源文件夹
|_components  UI组件模块文件夹
|_containers  容器组件模块文件夹
|_redux  redux相关模块文件夹
|_utils  工具模块文件夹
|_index.js  入口js

#### 前端路由

1.  注册 /register
2.  登陆 /login
3.  主界面 /
        老板主界面 /laoban
        大神主界面 /dashen
        消息列表界面 /message
        个人中心界面 /personal
        老板信息完善界面 /laobaninfo
        大神信息完善界面 /dasheninfo
        聊天界面 /chat/:userId

#### 应用中使用到的组件

  _ Layout(布局）_ WingBlank(两翼留白)
|              |_ WhiteSpace(上下留白)
|
|
| _ Navgation(导航）_ NavBar(导航栏)
|                 |_ TabBar(标签栏)
|
| _ Data Entry(数据输入) _ Button(按钮)
|                     |_ InputItem(文本输入)
|                     |_ Radio(单选框)
|                     |_ TextareaItem(多行输入)
|
| _ Data Display(数据展示) _ Badge(徽标数)
|                        |_ Icon(图标)
|                        |_ Grid(宫格)
|                        |_ List(列表)
| 
| _ FeedBack(导航）_ Modal(对话框)
|                |_ Toast(轻提示)
|
| _ Combination(整合) _ Result(结果页)

#### 后台应用结构

server
|_bin
|   |_www   修改端口
|_public
|_routes
|   |_index.js  注册路由
|   |_users.js
|_views
|_app.js
|_package.json
