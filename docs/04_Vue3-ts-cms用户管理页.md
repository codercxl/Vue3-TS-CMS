# Vue3-ts-cms用户管理页

## 1.search表单基本搭建

![image-20230130143834159](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301301438259.png)

> el-form: 表单组件
>
> ​	el-form-item
>
> ​	el-input 
>
> el-row: layout布局 一行有24栏
>
> ​	el-col: 每列占几栏 所有的el-col放到一个el-row中也可以 会自动根据所占份数分行

```vue
<!-- user-search.vue  -->
<template>
  <div class="search">
    <el-form label-width="80px" size="large">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名">
            <el-input placeholder="请输入用户名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名">
            <el-input placeholder="请输入真实姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码">
            <el-input placeholder="请输入手机号码" />
          </el-form-item>
        </el-col>
        
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select placeholder="请选择状态" style="width: 100%">
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间">
            <el-date-picker
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btns">
      <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button icon="Search" type="primary">查询</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;

  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }
}
</style>
```



## 2.search中重置查询按钮实现

### 2.1 重置按钮

* 表单进行 v-modle 双向绑定

* 监听重置按钮点击

* el-form-item 添加 `prop` 属性,要和 v-model 绑定的值一样

  ![image-20230130154912436](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301301549552.png)



### 2.2 查询按钮

![image-20230131145011751](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301311450874.png)



![image-20230131145827489](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301311458567.png)





## 3.请求用户列表数据和展示

### 3.1 请求数据

> 在 service 中发送网络请求
>
> 在 Store 里的 Action 调用网络请求 
>
> 在 user-content.vue 中调用 Store 中的 Action

![image-20230130170034857](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301301700963.png)



### 3.2 展示数据

> store 中请求到数据并保存在 state 
>
> 在 user-content.vue 中获取 state(usersList) 的数据并展示

```tsx
// store
const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0
  }),
  actions: {
    async postUsersListAction() {
      const usersListRes = await postUsersListData()
      const { list, totalCount } = usersListRes.data
      this.usersList = list
      this.usersTotalCount = totalCount
    }
  }
})

// user-content.vue
// storeToRefs: 响应式数据
const { usersList } = storeToRefs(systemStore)
```



> el-table 表格组件展示数据
>
> :data="usersList" prop="name"  => usersList.name

```html
<el-table :data="usersList" border style="width: 100%">
  <el-table-column align="center" type="selection" width="60px" />
  <el-table-column align="center" type="index" label="序号" width="60px" />
  <el-table-column align="center" prop="name" label="用户名"width="150px" />
  <el-table-column align="center" prop="realname" label="真实姓名"width="150px" />
  <el-table-column align="center" prop="cellphone" label="手机号码" width="150px" />
  <el-table-column align="center" prop="enable" label="状态" width="100px" />
  <el-table-column align="center" prop="createAt" label="创建时间" />
  <el-table-column align="center" prop="updateAt" label="更新时间" />
  <el-table-column align="center" label="操作" width="140px">
    <el-button size="small" icon="Edit" type="primary" text>编辑</el-button>
    <el-button size="small" icon="Delete" type="danger" text>删除</el-button>
  </el-table-column>
</el-table>
```



> 状态栏展示按钮 使用作用域插槽

![image-20230131090952654](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301310909053.png)



因为数据在 el-table 上绑定 所以这里要使用作用域插槽 scoped 会拿到整行的数据



![image-20230131091144296](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301310911360.png)



> 时间格式化 默认是零时区需要转换为东八区

```tsx
// 格式化工具
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function formatUTC(
  utcString: string,
  format: string = 'YYYY-MM-DD HH:mm:ss'
) {
  const resultTime = dayjs.utc(utcString).utcOffset(8).format(format)
  return resultTime
}
```

![image-20230131093442210](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301310934279.png)



> 分页器的实现

* 基本搭建

  ![image-20230131102625926](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301311026005.png)



* 相关逻辑实现

  当页码和页大小发生改变，都要重新发送网络请求，以设置 offset size

  > eg: totalCount: 11 一共有11条数据，
  >
  > ​	size: 10 每页展示10条，那么就会有两页
  >
  > ​	偏移量offset = (当前的页码 - 1) * 页大小(每页展示的条数)
  >
  > ​	第一页偏移 0 条数据，那么会展示10条
  >
  > ​	第二页偏移 10 条数据，这 10 条已经在第一页展示过了，那么就会展示第 11 条数据

  ![image-20230131103259521](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301311032589.png)







## 4.数据的增删改查

### 4.1 删除操作

> 1.发送网络请求, 在 systemStore中的Action调用, 在组件中通过id删除

![image-20230131164003640](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301311640751.png)



### 4.2 新建用户

#### 1. 弹出对话框

> 逻辑与 **4.查询重置数据** 一样, user-modal 和 user 是兄弟组件

![image-20230131172008068](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301311720168.png)





#### 2. 获取角色/部门数据并展示

因为这两个数据要用到不同的页面，所以在 `main.ts` 中请求

![image-20230131192019428](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301311924573.png)



展示数据

![image-20230131194640851](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301311946936.png)



#### 3. 确定按钮新建用户

> 发送网络请求，在Store中调用，在组件中实现

![image-20230131201046294](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301312010367.png)





### 4.3 编辑用户

* user-content 发出自定义事件
* user 接收并调用 user-modal 的方法
* 判断是新建用户还是编辑用户
* 点击确定发起修改用户的网络请求

![image-20230201095929926](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202302010959089.png)























































































































