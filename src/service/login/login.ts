import hyRequest from '..'
import type { IAccount } from '@/types'
// import { localCache } from '@/utils/cache'
// import { LOGIN_TOKEN } from '@/global/constants'

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

// 必须携带 token
export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: `/users/${id}`
    // 方式一：弊端 > 每个请求都得写一次 headers
    // headers: {
    //   Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN)
    // }
    // 方式二：请求拦截器给所有网络请求统一配置 token > index.ts
  })
}

export function getUserMenusByRoleId(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
