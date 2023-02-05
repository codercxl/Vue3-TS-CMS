<template>
  <div class="content">
    <div class="header">
      <div class="title">
        <h3>用户列表</h3>
      </div>
      <el-button v-if="isCreate" type="primary" @click="newUserBtnClick">
        新建用户
      </el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="60px" />
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="60px"
        />
        <el-table-column
          align="center"
          prop="name"
          label="用户名"
          width="150px"
        />
        <el-table-column
          align="center"
          prop="realname"
          label="真实姓名"
          width="150px"
        />
        <el-table-column
          align="center"
          prop="cellphone"
          label="手机号码"
          width="150px"
        />
        <el-table-column align="center" label="状态" width="100px">
          <!-- 因为数据在 el-table 上绑定 所以这里要使用作用域插槽 -->
          <!-- scoped 会拿到整行的数据 -->
          <template #default="scoped">
            <el-button
              size="small"
              :type="scoped.row.enable ? 'primary' : 'danger'"
              plain
              @click="enableBtnClick(scoped.row.enable, scoped.row.id)"
            >
              {{ scoped.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="更新时间">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="140px">
          <template #default="scope">
            <el-button
              v-if="isUpdate"
              size="small"
              icon="Edit"
              type="primary"
              text
              @click="handlEditClick(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              v-if="isDelete"
              size="small"
              icon="Delete"
              type="danger"
              text
              @click="handleDeleteClick(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        :small="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import useSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'
import usePermissions from '@/hooks/usePermissions'

// 用户的权限判断
const isCreate = usePermissions('users:create')
const isDelete = usePermissions('users:delete')
const isUpdate = usePermissions('users:delete')
const isQuery = usePermissions('users:query')

// 1.发起action，请求usersList的数据
const systemStore = useSystemStore()
// 在网络请求之前作为初始化值
const currentPage = ref(1)
const pageSize = ref(10)
fetchUserListData()

// 2.获取usersList数据,进行展示
// storeToRefs: 响应式数据
const { usersList, usersTotalCount } = storeToRefs(systemStore)

// 3.页码相关的逻辑
function handleSizeChange() {
  fetchUserListData()
}

function handleCurrentChange() {
  fetchUserListData()
}

// 4.定义函数, 用于发送网络请求
function fetchUserListData(formData: any = {}) {
  if (!isQuery) return

  // 1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  const queryInfo = { ...pageInfo, ...formData }
  // 2.发起网络请求
  systemStore.postUsersListAction(queryInfo)
}

// 把网络请求暴露出去
defineExpose({ fetchUserListData })

// 5.状态切换
function enableBtnClick(enable: number, id: number) {
  const enableRes = usersList.value.find((item) => item.id === id)
  if (enableRes && enableRes.id > 10) enableRes.enable = Number(!enable)
  if (id <= 10) {
    alert('该用户id小于10不允许该操作, 权限不足')
  }
}

// 发出自定义事件
const emit = defineEmits(['newClick', 'editClick'])
// 6.删除/新建/编辑操作
function handleDeleteClick(id: number) {
  if (id <= 10) {
    alert('该用户id小于10不允许删除, 权限不足')
  }
  systemStore.deleteUserByIdAction(id)
}

function newUserBtnClick() {
  emit('newClick')
}

function handlEditClick(itemData: any) {
  emit('editClick', itemData)
}
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}

.header {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .title {
    font-size: 22px;
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
