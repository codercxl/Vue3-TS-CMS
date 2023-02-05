<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="
        isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle
      "
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import useSystemStore from '@/store/main/system/system'
import { ref, reactive } from 'vue'

// 接收配置
interface IProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle?: string
    }
    formItems: any[]
  }
  otherInfo?: any
}
const props = defineProps<IProps>()

// 1.定义内部的属性
const dialogVisible = ref(false)
const isNewRef = ref(true)
const editDataRef = ref()

const initialData: any = {}
for (const item of props.modalConfig.formItems) {
  initialData[item.prop] = item.initialValue ?? ''
}
const formData = reactive<any>(initialData)

// 2.获取roles/departments数据
const systemStore = useSystemStore()

// 3.定义设置dialogVisible方法
function setModalVisible(isNew: boolean = true, itemData?: any) {
  dialogVisible.value = true
  editDataRef.value = itemData
  if (!isNew && itemData) {
    isNewRef.value = isNew
    // 编辑
    for (const key in formData) {
      formData[key] = itemData[key]
    }
  } else {
    isNewRef.value = isNew
    // 新建
    for (const key in formData) {
      formData[key] = ''
    }
  }
}

defineExpose({ setModalVisible })
// 4.点击确定按钮
function handleConfirmClick() {
  dialogVisible.value = false
  let infoData = formData
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
  }
  if (isNewRef.value) {
    // 新建
    systemStore.newPageDataAction(props.modalConfig.pageName, infoData)
  } else {
    // 编辑
    systemStore.editPageDataAction(
      props.modalConfig.pageName,
      editDataRef?.value.id,
      infoData
    )
  }
}
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
