# Vue3-ts-cms组件抽取分配权限可视化

## 1.search组件的抽取

* 将抽取的组件放到 `component` 文件夹中
* 在用到 `search` 组件的页面引入并在目录下创建配置文件
* 把配置文件传给 `search` 组件
* 在组件中遍历配置，并相对应展示



例如：部门页面的search组件

![image-20230201172754232](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202302011727411.png)

![image-20230201172811489](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202302011728539.png)



![image-20230201173643059](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202302011736136.png)





## 2.content组件的抽取

* 配置文件

  ```tsx
  const contentConfig = {
    header: {
      title: '部门列表',
      btnTitle: '新建部门'
    },
    propsList: [
      { type: 'selection', width: '60px' },
      { type: 'index', label: '序号', width: '80px' },
  
      { type: 'normal', prop: 'name', label: '部门名称', width: '150px' },
      { type: 'normal', prop: 'leader', label: '部门领导', width: '150px' },
      { type: 'normal', prop: 'parentId', label: '上级部门', width: '150px' },
  
      { type: 'timer', prop: 'createAt', label: '创建时间' },
      { type: 'timer', prop: 'updateAt', label: '更新时间' },
  
      { type: 'handler', label: '操作', width: '140px' }
    ]
  }
  
  export default contentConfig
  ```



* table表格

  > 根据不同类型，展示不同内容，但没有通用性，所以使用自定义插槽定制

  ![image-20230202143642523](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202302021436600.png)

  

  ```
  <el-table-column align="center" v-bind="item" />
  
  // 等同于
  <el-table-column align="center" :prop="item.prop" :label="item.label" :width="item.width" />
  ```



* 自定义插槽定制(了解)

  * 在配置中 添加自定义类型

  * 在自定义类型的展示内容中的作用域插槽里留下`具名插槽(slot)`  并且是动态插槽名

  * 在 department.vue 中就可以自定义插入的内容

    ![image-20230202153941349](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202302021539436.png)



## 3.modal组件抽取

* 配置文件

  ```tsx
  const modalConfig = {
    pageName: 'department',
    header: {
      newTitle: '新建部门',
      editTitle: '编辑部门'
    },
    formItems: [
      {
        type: 'input',
        label: '部门名称',
        prop: 'name',
        placeholder: '请输入部门名称'
      },
      {
        type: 'input',
        label: '部门领导',
        prop: 'leader',
        placeholder: '请输入部门领导'
      },
      {
        type: 'select',
        label: '上级部门',
        prop: 'parentId',
        placeholder: '请选择上级部门',
        options: []
      }
    ]
  }
  
  export default modalConfig
  ```

  ![image-20230202175139707](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202302021751924.png)



> 对配置动态添加内容

![image-20230202175331532](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202302021753618.png)









## 4.角色分配权限

* 使用自定义插槽 给modal插入 `el-tree` 树形控件
* 网络请求获取所有菜单列表数据绑定给 el-tree
* 获取选择权限的id 并传给 modal, 最后把 form的输入 和 menu的Id 数据一起上传
* 编辑时让选择的权限根据menu的Id进行回显

![image-20230203161255263](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202302031612003.png)



```tsx
/**
 * 菜单映射到id的列表
 * @param menuList
 */
export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = []

  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recurseGetId(menuList)

  return ids
}
```



## 5.根据角色权限分配按钮权限

### 5.1 从菜单中获取登录用户的按钮权限

> 把菜单信息遍历，而权限字段在最底层
>
> 使用递归将其取出并保存到 Store 中

![image-20230204103337174](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202302041033397.png)



### 5.2 根据权限判断按钮是否展示

> 根据传入的字符串在 loginStore 中找是否包含传入的字符串 并返回布尔值
>
> 通过返回的布尔值判断按钮权限

![image-20230204104622459](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202302041046545.png)



### 5.3 测试

![image-20230204105308963](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202302041053037.png)



## 6.echart展示图表

> 整体架构采用 三级组件的封装

![image-20230205100306913](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202302051003019.png)

![image-20230205101056341](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202302051010412.png)

































































































