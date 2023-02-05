const searchConfig = {
  pageName: 'goods',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '商品名称',
      placeholder: '请输入商品名称'
    },
    {
      type: 'input',
      prop: 'address',
      label: '商品地址',
      placeholder: '请输入商品地址'
    },
    { type: 'date-picker', prop: 'createAt', label: '创建时间' },
    {
      type: 'select',
      prop: 'status',
      label: '商品状态',
      placeholder: '请选择状态',
      options: ['上架', '下架']
    }
  ]
}

export default searchConfig
