const contentConfig = {
  pageName: 'goods',
  header: {
    title: '商品列表',
    btnTitle: '新建商品'
  },
  propsList: [
    { type: 'selection', width: '60px' },
    { type: 'index', label: '序号', width: '60px' },
    { type: 'normal', label: '商品名称', prop: 'name', width: '150px' },
    { type: 'normal', label: '原价', prop: 'oldPrice', width: '60px' },
    { type: 'normal', label: '现价', prop: 'newPrice', width: '60px' },
    { type: 'normal', label: '库存', prop: 'inventoryCount', width: '60px' },
    { type: 'normal', label: '销量', prop: 'saleCount', width: '60px' },
    { type: 'normal', label: '收藏', prop: 'favorCount', width: '60px' },

    {
      type: 'custom',
      label: '状态',
      prop: 'status',
      width: '85px',
      slotName: 'statusBtn'
    },
    {
      type: 'custom',
      label: '图片',
      prop: 'imgUrl',
      width: '120px',
      slotName: 'image'
    },

    { type: 'normal', label: '发货地址', prop: 'address', width: '90px' },

    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' }
  ]
}

export default contentConfig
