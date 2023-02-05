# Vue3-ts-cms菜单头部动态路由开发

## 1.menu菜单页面实现

### 1.1 main页面整体布局

```vue
<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside width="250px">Aside</el-aside>
      <el-container>
        <el-header height="50px">Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
```

![image-20230127195149296](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301271951364.png)



### 1.2 手动搭建menu菜单

* el-menu

  整个菜单

* el-sub-menu

  可以有子菜单，并且可以展开

* el-menu-item

  展开的内容 可以点击的每一个item



![](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301280853732.png)

```vue
<el-menu
  text-color="#b7bdc3"
  active-text-color="#fff"
  background-color="#001529"
>
  <el-sub-menu index="1">
    <template #title>
			<el-icon><Monitor /></el-icon>
			<span>系统总览</span>
    </template>
    <el-menu-item>核心技术</el-menu-item>
    <el-menu-item>商品统计</el-menu-item>
  </el-sub-menu>
</el-menu>
```



* 去除菜单展开后的滚动条

  ![image-20230128091217151](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301280912211.png)

  ```css
  //main.vue
  // 去除滚动条
  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
  
    &::-webkit-scrollbar {
      display: none;
    }
  }
  ```



### 1.3 动态搭建menu菜单

> 在main页面中，如果刷新网页会导致loginStore中的没有数据，因为main页面没有使用Store,所以要保存到本地
>
> 这时loginStore会从本地拿数据

![image-20230128095953563](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301280959609.png)

![image-20230128095929159](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301280959257.png)



* 在aside子组件中获取loginStore里的菜单数据

* 遍历该菜单

  ![image-20230128100243129](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301281002177.png)

![image-20230128100447895](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301281004955.png)



* 菜单图标的动态组件

  服务器返回字符串：el-icon-monitor

  字符串转组件使用动态组件：component

  split('-icon-')：['el', 'monitor']

  ![image-20230128103734344](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301281037395.png)





## 2.header头部页面实现

### 2.1 header整体布局

![image-20230128145237850](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301281452889.png)

![image-20230128145156472](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301281451544.png)



### 2.2 折叠按钮的实现

* 记录不同状态更换按钮样式

* 自定义事件，把事件和状态(isFold)传递给父组件(main.vue)

* 父组件进行接收并记录

* 菜单宽度随着状态变化(宽度折叠)

* 父组件把状态传递给子组件(main-aside.vue)

* main-aside.vue 接收状态

* 组件 el-menu 的折叠属性 collapse 随着状态变化(内容折叠)

  > main-header -> main -> main-aside

  ![image-20230128150400211](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301281504281.png)

![image-20230128151120974](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301281511043.png)

![image-20230128151135975](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301281511029.png)



### 2.3 个人信息相关实现

![image-20230128154900070](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301281549140.png)

* 退出登录

![image-20230128154921959](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301281549010.png)



### 2.4 面包屑的实现

* 基本实现

![image-20230130104712466](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301301047584.png)



* 当点击面包屑的顶层时，重定向到顶层菜单所属的第一个子菜单项

  ![image-20230130105117273](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301301051325.png)

  ![image-20230130105224262](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301301052326.png)



## 3.路由router的实现

### 3.1 直接注册所有页面的路由

为了满足所有的进入系统的用户，路由映射时，需要注册所有的路由

但对于开发者来说，有个弊端：手动输入路径，也是可以进入到相应页面

![image-20230128163143219](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301281631279.png)

![image-20230128163424507](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301281634558.png)

### 3.2 动态路由 ☆

根据不同用户(菜单)，所持有权限不同，动态注册应该有的路由

* 方案一：基于角色(Role)的动态路由管理

  const roles = {

  ​	"superadmin":[所有的路由] => router.main.children
  ​	"admin":[一部分路由] => router.main.children
  ​	"service":[少部分路由] => router.main.children

  }

  弊端：每增加一个角色，都要增加key/value




* 方案二：基于菜单(menu)的动态路由管理 ☆

  userMenus:=>动态展示菜单
  系统总览/核心技术/用户管理/角色管理/…
  映射成路由对象



* 登录的接口中请求三个内容
  1.token
  2.用户信息：角色信息(role对象)
  3.菜单信息



#### 1.创建所有的页面和路由对象

手动创建或使用自动化工具

> 自动化工具前提是 页面的路径/格式 需要和 路由的路径/格式保持一致
>
> ![image-20230128174824648](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301281748740.png)

```shell
npm install coderwhy -g

添加vue3的页面(使用setup的语法糖) 页面名  目录路径
coderwhy add3page_setup department -d src/views/main/system/department
```



#### 2.动态加载所有的路由对象文件(.ts)

> 在 loginStore 中加载

* 根据菜单动态添加路由对象 动态获取所有路由对象(router的独立文件)，放到数组中，作为本地路由
* files是一个对象
  key: ../../router/main/analysis/dashboard/dashboard.ts
  value: : Module: default -> component path

```tsx
const localRoutes: RouteRecordRaw[] = []
// 读取router/main所有的ts文件
// eager: 不使用懒加载
const files: Record<string, any> = import.meta.glob('../../router/main/**/*.ts', { eager: true })
for (const key in files) {
  const module = files[key]
  localRoutes.push(module.default)
}
```

* 根据菜单匹配映射正确的路由

  ![image-20230129112141320](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301291121492.png)

  ```tsx
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) routes.push(route)
    }
  }
  ```



* 完整代码

  **封装成一个工具函数 最后返回一个数组**

  ```js
  function loadLocalRoutes() {
    // 1.动态获取所有的路由对象, 放到数组中
    // 路由对象都在独立的文件中
    // 从文件中将所有路由对象先读取数组中
    const localRoutes: RouteRecordRaw[] = []
  
    // 1.1.读取router/main所有的ts文件
    // files是一个对象
    // key: ../../router/main/analysis/dashboard/dashboard.ts
    // value: Module: default -> component path
    // 读取router/main所有的ts文件 eager: 不使用懒加载
    const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts',{ eager: true })
    // 1.2.将加载的对象放到localRoutes
    for (const key in files) {
      const module = files[key]
      localRoutes.push(module.default)
    }
  
    return localRoutes
  }
  
  export function mapMenusToRoutes(userMenus: any[]) {
    // 1.加载本地路由
    const localRoutes = loadLocalRoutes()
  
    // 2.根据菜单去匹配正确的路由
    const routes: RouteRecordRaw[] = []
    for (const menu of userMenus) {
      for (const submenu of menu.children) {
        const route = localRoutes.find((item) => item.path === submenu.url)
        if (route) routes.push(route)
      }
    }
    return routes
  }
  ```

  **在loginStore中动态加载路由**

  ```js
  // 根据菜单动态添加路由对象
  const routes = mapMenusToRoutes(userMenus)
  routes.forEach((route) => router.addRoute('main', route))
  ```

  

#### 3.main页面刷新保持路由注册

> 如果只在登录的时候动态注册路由，那么在 main 页面进行刷新，所有路由都会消失

* 在 `loginStore` 中封装一个 Action

* 在 `main.ts` 中引入

  ```tsx
  // 1.用户刷新默认加载数据
  loadLocalCacheAction() {
    const token = localCache.getCache(LOGIN_TOKEN)
    const userInfo = localCache.getCache('userInfo')
    const userMenus = localCache.getCache('userMenus')
  	// 用户已经登录
    if (token && userInfo && userMenus) {
      this.token = token
      this.userInfo = userInfo
      this.userMenus = userMenus
      // 根据菜单动态添加路由对象
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))
    }
  }
  ```

  ![image-20230129195223123](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301291952217.png)

* 也可以将其抽取到 store -> index.ts

  ![image-20230129195530712](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301291955776.png)





#### 4.首次进入main页面匹配所有路由中的第一个

> 这时会导致 main 刷新 路径与菜单不匹配

![image-20230130092208199](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301300922385.png)



#### 5.main页面刷新 path匹配menu

![image-20230130092938077](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301300929144.png)
