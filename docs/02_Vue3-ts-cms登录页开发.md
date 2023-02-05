# Vue3-ts-cms登录页开发

![image-20230127191001124](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301271910190.png)

## 1.App宽高铺满

后台管理系统页面一般都是铺满整个屏幕的,可进行如下设置：

```css
/* App.vue */
.app {
  width: 100vw;
  height: 100vh;
}
```



## 2.登录面板界面搭建

```vue
<!-- login.vue -->
<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script lang="ts" setup>
import LoginPanel from './c-cpns/login-panel.vue'
</script>

<style lang="less" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background-image: url('@/assets/img/login-bg.svg');
}
</style>

```



### 2.1 面板底部界面搭建

```vue
<!-- login-panel.vue -->
<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <div class="tabs">tabs</div>
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" size="large">
      立即登录
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isRemPwd = ref(false)
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    // --el-button-size: 50px;
  }
}
</style>

```

![image-20230125101224363](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301251012800.png)



### 2.2 中间tabs切换界面搭建

> stretch: 标签的宽度是否自撑开

```vue
<!-- login-panel.vue -->
<!-- 中间tabs切换 -->
<div class="tabs">
  <el-tabs type="border-card" stretch>
    <el-tab-pane label="帐号登录">
      <div>哈哈哈</div>
      <div>哈哈哈</div>
    </el-tab-pane>
    <el-tab-pane label="手机登录">
      <div>手机号</div>
      <div>验证码</div>
    </el-tab-pane>
  </el-tabs>
</div>
```

![image-20230125103114435](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301251031492.png)



### 2.3 Element-Plus的图标引入

* 安装

  ```shell
  npm install @element-plus/icons-vue
  ```

* 方式一：全局注册

  需要从 `@element-plus/icons-vue` 中导入所有图标并进行全局注册。

  ```tsx
  // main.ts
  import * as ElementPlusIconsVue from '@element-plus/icons-vue'
  
  const app = createApp(App)
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  ```



* 方式二：抽取到单独文件夹中注册

  ![image-20230125145226361](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301251452430.png)

* 图标使用

  Tab-pane 插槽名：label > Tab-pane 的标题内容

  ![image-20230125151547496](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301251515588.png)



## 3.tabs的切换绑定

* 监听登录按钮的点击事件

* 对 tsbs 进行双向绑定

* 判断登录方式

  ![image-20230125153515643](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301251535723.png)



## 4.帐号登录pane基本搭建

* 创建一个 login-panel.vue 的子组件 pane-account.vue

* 引入 Element-Plus 的 Form表单组件

  ```vue
  <template>
    <div class="pane-account">
      <el-form label-width="50px">
        <el-form-item label="帐号">
          <el-input />
        </el-form-item>
        <el-form-item label="密码">
          <el-input show-password />
        </el-form-item>
      </el-form>
    </div>
  </template>
  ```

  ![image-20230125160438204](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301251604267.png)

## 5.帐号登录Form表单双向绑定

* Form表单绑定一个 reactive 对象

* 表单的 item 绑定对象上的值

  ![image-20230125163303004](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301251633090.png)



## 6.帐号密码校验规则

`Form` 组件提供了表单验证的功能，只需为 `rules` 属性传入约定的验证规则，并将 `form-Item` 的 `prop` 属性设置为需要验证的特殊键值即可。

![image-20230125172151085](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301251721183.png)



## 7.父组件点击执行子组件方法

* 子组件编写登录逻辑方法，并将方法暴露出去
* 父组件获取子组件实例: accountRef
* 根据实例执行对应子组件方法
* **`注：`**子组件实例类型 const accountRef = ref`<InstanceType<typeof PaneAccount>>`()

![image-20230126134128368](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301261343244.png)

## 8.表单验证是否符合输入规则并登录

### 8.1 验证成功 进行登录操作

* 携带账号密码向服务器发送网络请求进行验证(在store中请求)

![image-20230126154205936](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301261542026.png)



* 把用户输入的账号密码保存到store中

  ![image-20230126160454315](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301261604387.png)



* 登录的网络请求

  ![image-20230126160522781](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301261605839.png)



* **`注`**: 帐号密码类型问题

  * 因为多出地方都有使用接收账号密码，所以把类型抽取到 types 中

    ![image-20230126160846876](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301261608938.png)



### 8.2 本地缓存和缓存工具的封装

> localStorage: 关闭网页后数据还保存
>
> sessionStorage: 关闭网页后数据丢失

![image-20230126170248681](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301261702805.png)

![image-20230126170353487](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301261703560.png)

### 8.3 页面跳转&导航守卫&退出登录

只有登录成功(token), 才能真正进入到main页面

![image-20230127100615639](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301271006724.png)

![image-20230127100651897](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301271006952.png)

![image-20230127101924527](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301271019583.png)



### 8.4 记住密码逻辑

* 把 isRemPwd 的状态传给子组件

* 在子组件中判断是否要记住密码

  ![image-20230127111339138](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301271113222.png)

* 监听 isRemPwd 的状态

  ![image-20230127111611730](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301271116793.png)



### 8.4 验证失败 给提示信息

* 引入 `ElMessage`

* 调用方法 `ElMessage.error`

  ![image-20230126144033347](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301261440431.png)

* 配置对应样式

  针对 Elmessage 和 Elloading 等组件引入单独的样式

  方式一：在 `main.ts` 中全局引入样式(element所有样式将被引入)

  ​	import 'element-plus/dist/index.css'

  方式二：在 `main.ts` 中单独组件样式引入

  ​	import 'element-plus/theme-chalk/el-message.css'

  方式三：使用 vite-plugin-style-import 插件 并在 `vite.config.ts` 中配置

  ​	npm install vite-plugin-style-import consola -D

  ```tsx
  import { defineConfig } from 'vite'
  import {
    createStyleImportPlugin,
    ElementPlusResolve
  } from 'vite-plugin-style-import'
  
  export default (): defineConfig => {
    return {
      plugins: [
        createStyleImportPlugin({
          resolves:[ElementPlusResolve()]
          libs: [
            {
              libraryName: 'element-plus',
              esModule: true,
              resolveStyle: (name: string) => {
                return `element-plus/theme-chalk/${name}.css`
              },
            },
          ],
        }),
      ],
    }
  }
  ```



## 9.获取用户详细信息

* 登录信息

  id/name/token

* 详细信息

  * 是什么角色？

    根据id获取用户的详细信息

  * 是什么权限？

    根据角色获取权限



> 发送网络请求时，必须携带 id token 才能获取到详细信息



* 方式一：弊端 > 每个请求都得写一次 headers

   ![image-20230127160122664](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301271601789.png)

  ![image-20230127160228577](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301271602649.png)



* 方式二：在请求拦截器中给所有网络请求统一配置 token > index.ts

  ![image-20230127160352411](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301271603478.png)



## 10.获取角色权限菜单

![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301271929659.png)

> 根据用户详细信息里角色的 id 获取权限菜单

![image-20230127163750931](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301271637018.png)



![image-20230127163827697](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301271638757.png)

![image-20230127163834883](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301271638949.png)





















