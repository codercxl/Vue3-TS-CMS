const modalConfig = {
  pageName: 'goods',
  header: {
    newTitle: '导入商品'
  },
  formItems: [
    {
      type: 'input',
      label: '商品名称',
      prop: 'name',
      placeholder: '请输入商品名称'
    },
    {
      type: 'input',
      label: '原价',
      prop: 'oldPrice',
      placeholder: '请输入商品原价'
    },
    {
      type: 'input',
      label: '现价',
      prop: 'newPrice',
      placeholder: '请输入商品现价'
    },
    {
      type: 'input',
      label: '发货地址',
      prop: 'address',
      placeholder: '请输入发货地址'
    }
  ]
}

export default modalConfig
