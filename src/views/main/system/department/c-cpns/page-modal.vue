<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建部门' : '编辑部门'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入部门名称" />
          </el-form-item>
          <el-form-item label="领导名称" prop="leader">
            <el-input v-model="formData.leader" placeholder="请输入领导名称" />
          </el-form-item>
          <el-form-item label="上级部门" prop="parentId">
            <el-select
              v-model="formData.parentId"
              placeholder="请选择上级部门"
              style="width: 100%"
            >
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
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
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { ref, reactive } from 'vue'

// 1.定义内部的属性
const dialogVisible = ref(false)
const isNewRef = ref(true)
const editDataRef = ref()
const formData = reactive<any>({
  name: '',
  leader: '',
  parentId: ''
})

// 2.获取roles/departments数据
const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireDepartments } = storeToRefs(mainStore)

// 3.定义设置dialogVisible方法
function setModalVisible(isNew: boolean = true, itemData?: any) {
  dialogVisible.value = true
  editDataRef.value = itemData
  if (!isNew && itemData) {
    isNewRef.value = isNew
    // 编辑部门
    for (const key in formData) {
      formData[key] = itemData[key]
    }
  } else {
    // 新建部门
    for (const key in formData) {
      formData[key] = ''
    }
  }
}

defineExpose({ setModalVisible })

// 4.点击确定按钮
function handleConfirmClick() {
  dialogVisible.value = false
  if (isNewRef.value) {
    // 新建部门
    systemStore.newPageDataAction('department', formData)
  } else {
    // 编辑部门
    systemStore.editPageDataAction(
      'department',
      editDataRef?.value.id,
      formData
    )
  }
}
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
