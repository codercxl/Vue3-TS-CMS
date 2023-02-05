<template>
  <div class="content">
    <div class="header">
      <div class="title">
        <h3>{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
      </div>
      <el-button v-if="isCreate" type="primary" @click="newUserBtnClick">
        {{ contentConfig?.header?.btnTitle ?? '新建数据' }}
      </el-button>
    </div>
    <div class="table">
      <el-table
        :data="pageList"
        border
        style="width: 100%"
        v-bind="contentConfig.childrenTree"
      >
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" :label="item.label">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
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
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot
                  :name="item.slotName"
                  v-bind="scope"
                  :prop="item.prop"
                ></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column
              show-overflow-tooltip
              align="center"
              v-bind="item"
            />
          </template>
          <!-- <el-table-column
            align="center"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
          /> -->
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        :small="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
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

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title: string
      btnTitle: string
    }
    propsList: any[]
    childrenTree?: any
  }
}
// 接收配置
const props = defineProps<IProps>()

// 0.获取按钮是否有对应的增删改查的权限
const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`)
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)

// 1.发起action，请求usersList的数据
const systemStore = useSystemStore()
// 在网络请求之前作为初始化值
const currentPage = ref(1)
const pageSize = ref(10)

// 当在第二页进行操作时 页码重置为一
systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (
      name === 'deletePageByIdAction' ||
      name === 'editPageDataAction' ||
      name === 'newPageDataAction'
    ) {
      currentPage.value = 1
    }
  })
})
fetchPageListData()

// 2.获取pageList数据,进行展示
// storeToRefs: 响应式数据
const { pageList, pageTotalCount } = storeToRefs(systemStore)

// 3.页码相关的逻辑
function handleSizeChange() {
  fetchPageListData()
}

function handleCurrentChange() {
  fetchPageListData()
}

// 4.定义函数, 用于发送网络请求
function fetchPageListData(formData: any = {}) {
  if (!isQuery) return

  // 1.获取offset/size>
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  const queryInfo = { ...pageInfo, ...formData }
  // 2.发起网络请求
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}

// 把网络请求暴露出去
defineExpose({ fetchPageListData })

// 发出自定义事件
const emit = defineEmits(['newClick', 'editClick'])
// 6.删除/新建/编辑操作
function handleDeleteClick(id: number) {
  if (id <= 10) {
    alert('该部门id小于6不允许删除, 权限不足')
  }
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
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
