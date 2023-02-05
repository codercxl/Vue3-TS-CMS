<template>
  <div class="department">
    <page-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-countent
      ref="countentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <page-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import { ref } from 'vue'
import PageSearch from './c-cpns/page-search.vue'
import PageCountent from './c-cpns/page-content.vue'
import PageModal from './c-cpns/page-modal.vue'

const countentRef = ref<InstanceType<typeof PageCountent>>()
// 点击search, content的操作
// 查询/重置按钮
function handleQueryClick(formData: any) {
  countentRef.value?.fetchPageListData(formData)
}
function handleResetClick() {
  countentRef.value?.fetchPageListData()
}

const modalRef = ref<InstanceType<typeof PageModal>>()
// 点击content, modal的操作
function handleNewClick() {
  modalRef.value?.setModalVisible()
}
function handleEditClick(itemData: any) {
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style scoped></style>
