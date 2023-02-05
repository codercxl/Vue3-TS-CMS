import {
  deletePageById,
  deleteUserById,
  editPageData,
  editUserData,
  newPageData,
  newUserData,
  postPageListData,
  postUsersListData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import useMainStore from '../main'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    // 用户管理页面网络请求
    async postUsersListAction(queryInfo: any) {
      const usersListRes = await postUsersListData(queryInfo)
      const { list, totalCount } = usersListRes.data
      this.usersList = list
      this.usersTotalCount = totalCount
    },
    async deleteUserByIdAction(id: number) {
      // 1.删除数据操作
      const deleteRes = await deleteUserById(id)
      console.log(deleteRes)
      // 2.重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async newUserInfoAction(userInfo: any) {
      // 1.新建用户
      const newUserRes = await newUserData(userInfo)
      console.log(newUserRes)
      // 2.重新请求新的数据以更新表单
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async editUserInfoAction(id: number, userInfo: any) {
      // 1.编辑用户
      const editRes = await editUserData(id, userInfo)
      console.log(editRes.data)
      // 2.重新请求新的数据以更新表单
      this.postUsersListAction({ offset: 0, size: 10 })
    },

    /** 针对页面的网络请求 */
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListRes = await postPageListData(pageName, queryInfo)
      console.log(pageListRes.data)
      const { totalCount, list } = pageListRes.data
      console.log(totalCount, list)

      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const deleteResult = await deletePageById(pageName, id)
      console.log(deleteResult)
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 获取完整的数据
      const mainStore = useMainStore()
      mainStore.postEntireDataAction()
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      const newResult = await newPageData(pageName, pageInfo)
      console.log(newResult)
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 获取完整的数据
      const mainStore = useMainStore()
      mainStore.postEntireDataAction()
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const editResult = await editPageData(pageName, id, pageInfo)
      console.log(editResult)
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 获取完整的数据
      const mainStore = useMainStore()
      mainStore.postEntireDataAction()
    }
  }
})

export default useSystemStore
