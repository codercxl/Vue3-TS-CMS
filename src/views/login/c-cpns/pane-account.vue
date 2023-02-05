<template>
  <div class="pane-account">
    <el-form
      :model="account"
      :rules="accountRules"
      status-icon
      label-width="60px"
      size="large"
      ref="formRef"
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormRules, ElForm } from 'element-plus'
import type { IAccount } from '@/types'

import useLoginStore from '@/store/login/login'
import { localCache } from '@/utils/cache'

const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'

// 1.定义双向绑定数据
const account = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})

// 2.定义帐号校验规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '请输入帐号~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6~20位数字或字母组成',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur'
    }
  ]
}

// 3.执行帐号登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(isRemPwd: boolean) {
  // 判断输入的帐号密码是否符合规则
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1.获取用户输入的帐号密码
      const name = account.name
      const password = account.password

      // 2.携带账号密码在store中向服务器发送网络请求进行验证
      loginStore.loginAccountAction({ name, password }).then(() => {
        // 3.点击登录账号密码正确后判断是否要记住密码
        if (isRemPwd) {
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      })
    } else {
      ElMessage.error('Oops, 请您输入正确的格式.')
    }
  })
}

// 把该方法暴露给父组件 => login-panel
defineExpose({
  loginAction
})
</script>

<style lang="less" scoped></style>
