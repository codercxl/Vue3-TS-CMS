# Vue3-ts-cms项目开发配置

## 0.创建项目

* 方式一：vue CLI 基于webpack工具 => Node  命令：vue create

* 方式二：create-vue 基于vite工具  命令：npm init vue@latest  前提条件：Node.js 16及以上

我们选用方式二

![image-20230124201006383](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301242010480.png)



## 1.项目目录结构划分

![image-20230119154032923](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301191540027.png)

![image-20230124134940689](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301241349774.png)



### 1.1 vscode 推荐插件

![image-20230119150437770](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301191504852.png)



### 1.2 vite相关配置

![image-20230119154405540](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301191544620.png)



### 1.3 tsconfig相关配置

![image-20230119153956375](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301191539448.png)

![image-20230119155902662](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301191559740.png)



## 2.代码规范

### 2.1 集成editorconfig配置

EditorConfig 有助于为不同 IDE 编辑器上处理同一项目的多个开发人员维护一致的编码风格。

```yaml
# http://editorconfig.org

root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行尾的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```

VSCode需要安装一个插件：EditorConfig for VS Code

![image-20230119194857213](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301191948296.png)



### 2.2 使用prettier工具

Prettier 是一款强大的代码格式化工具，支持 JavaScript、TypeScript、CSS、SCSS、Less、JSX、Angular、Vue、GraphQL、JSON、Markdown 等语言，基本上前端能用到的文件格式它都可以搞定，是当下最流行的代码格式化工具。

1.安装prettier

```shell
npm install prettier -D
```



2.配置.prettierrc文件：

* useTabs：使用tab缩进还是空格缩进，选择false；
* tabWidth：tab是空格的情况下，是几个空格，选择2个；
* printWidth：当行字符的长度，推荐80，也有人喜欢100或者120；
* singleQuote：使用单引号还是双引号，选择true，使用单引号；
* trailingComma：在多行输入的尾逗号是否添加，设置为 `none`，比如对象类型的最后一个属性后面是否加一个，；
* semi：语句末尾是否要加分号，默认值true，选择false表示不加；

```json
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "none",
  "semi": false
}
```



3.创建.prettierignore忽略文件

```
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```



4.VSCode需要安装prettier的插件

![image-20230119195025109](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301191950161.png)



5.VSCod中的配置

- settings =>format on save => 勾选上
- settings => editor default format => 选择 prettier

![image-20230119195225820](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301191952872.png)

![image-20230119195145270](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301191951328.png)



6.测试prettier是否生效

* 测试一：在代码中保存代码；
* 测试二：配置一次性修改的命令；

在package.json中配置一个scripts：

```json
    "prettier": "prettier --write ."
```



### 2.3 使用ESLint检测

1.在前面创建项目的时候，我们就选择了ESLint，所以Vue会默认帮助我们配置需要的ESLint环境。

2.VSCode需要安装ESLint插件：

![image-20230119195328730](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301191953783.png)



3.解决eslint和prettier冲突的问题：

安装插件：（vue在创建项目时，如果选择prettier，那么这两个插件会自动安装）

```shell
npm install eslint-plugin-prettier eslint-config-prettier -D
```

在 .eslintrc.cjs 中添加prettier插件：

```json
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
    'plugin:prettier/recommended'
  ],
```



4.VSCode中eslint的配置

```json
  "eslint.lintTask.enable": true,
  "eslint.alwaysShowStatus": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
```



## 3.CSS样式重置

安装并引入 normalize.css

```she
npm install normalize.css
```

![image-20230124140538663](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301241405726.png)



自建 react.css 文件

```css
/* reset.css样式重置文件 */
/* margin/padding重置 */
body, h1, h2, h3, ul, ol, li, p, dl, dt, dd {
  padding: 0;
  margin: 0;
}

/* a元素重置 */
a {
  text-decoration: none;
  color: #333;
}

/* img的vertical-align重置 */
img {
  vertical-align: top;
}

/* ul, ol, li重置 */
ul, ol, li {
  list-style: none;
}

/* 对斜体元素重置 */
i, em {
  font-style: normal;
}
```

引入到统一出口 index.css 

![image-20230124140738839](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301241407896.png)

安装 less

```she
npm install less -D
```

![image-20230124140854155](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301241408205.png)



## 4.router路由配置

### 4.1 安装 router

```shell
npm install vue-router
```



### 4.2 配置 router

![image-20230124150414436](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301241504524.png)



**`注：`**如果在创建页面时遇到如下错误，可在 ==.eslintrc.cjs== 中配置

![image-20230124150647418](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301241506477.png)

![image-20230124150733300](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301241507356.png)

### 4.3 挂载 router

![image-20230124142445250](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301241424309.png)



### 4.4 使用 router

![image-20230124150928031](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301241509109.png)



## 5.pinia状态管理

### 5.1 安装 pinia

```shell
 npm install pinia
```



### 5.2 配置 pinia

![image-20230124153318229](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301241533287.png)

### 5.3 挂载 pinia

![image-20230124153417057](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301241534115.png)

### 5.4 pinia使用案例

![image-20230124153600013](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301241536075.png)

![image-20230124153643552](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301241536620.png)





## 6.axios网络请求封装

service=>config => index.ts

```tsx
export const BASE_URL = 'http://codercba.com:8000'
export const TIME_OUT = 10000
```



service=>request => index.ts

```tsx
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestConfig } from './type'

// 拦截器: 蒙版Loading/token/修改配置

/**
 * 两个难点:
 *  1.拦截器进行精细控制
 *    > 全局拦截器
 *    > 实例拦截器
 *    > 单次请求拦截器
 *
 *  2.响应结果的类型处理(泛型)
 */

class HYRequest {
  instance: AxiosInstance

  // request实例 => axios的实例
  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)

    // 每个instance实例都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // loading/token
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
      }
    )

    // 针对特定的hyRequest实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  // 封装网络请求的方法
  // T => IHomeData
  request<T = any>(config: HYRequestConfig<T>) {
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }

    // 返回Promise
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单词响应的成功拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default HYRequest

```



service=>config => type.ts

```tsx
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 针对AxiosRequestConfig配置进行扩展
export interface HYInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}

export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYInterceptors<T>
}

```



service=>index.ts

```tsx
import { BASE_URL, TIME_OUT } from './config'
import HYRequest from './request'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

export default hyRequest

```



### 案例

```html
<script lang="ts" setup>
import hyRequest from '@/service'

hyRequest
  .get({
    url: '/home/multidata'
  })
  .then((res) => {
    console.log(res)
  })
</script>
```



## 7.Element-Plus集成

### 7.1 安装 Element-Plus

```shell
npm install element-plus --save
```



### 7.2 全局引入

```tsx
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
```



### 7.3 按需引入(推荐)

首先你需要安装`unplugin-vue-components` 和 `unplugin-auto-import`这两款插件

```shell
npm install -D unplugin-vue-components unplugin-auto-import
```

然后把下列代码插入到你的 `Vite` 的配置文件中

```tsx
// vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```

最后把自动生成的 `auto-imports.d.ts` `components.d.ts` 两个文件在 tsconfig.json 中配置

![image-20230124175002961](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/210/202301241750073.png)
