import { defineStore } from 'pinia'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/map-menus'
import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'
import useMainStore from '../main/main'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permissions: string[]
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: [],
    permissions: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const res = await accountLoginRequest(account)
      const id = res.data.id
      this.token = res.data.token

      // 1.进行本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 2.获取用户详细信息(角色信息)
      const userInfoRes = await getUserInfoById(id)
      const userInfo = userInfoRes.data
      this.userInfo = userInfo

      // 3.根据角色请求用户的权限(菜单menus)
      const userMenusRes = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenusRes.data
      this.userMenus = userMenus

      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      // 4.请求所有roles/departments数据
      const mainStore = useMainStore()
      mainStore.postEntireDataAction()

      // 重要：菜单映射按钮权限
      const permissions = mapMenusToPermissions(userMenus)
      this.permissions = permissions

      // 5.根据菜单动态添加路由对象
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))

      // 6.登录成功 进行页面跳转(main页面)
      router.push('/main')
    },

    // 1.用户刷新默认加载数据
    loadLocalCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')

      if (token && userInfo && userMenus) {
        // 1.请求所有roles/departments数据
        const mainStore = useMainStore()
        mainStore.postEntireDataAction()

        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 重要：菜单映射按钮权限
        const permissions = mapMenusToPermissions(userMenus)
        this.permissions = permissions

        //2.根据菜单动态添加路由对象
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
