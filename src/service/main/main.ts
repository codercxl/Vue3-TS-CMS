import hyRequest from '..'

// 角色列表
export function postEntireRoles() {
  return hyRequest.post({
    url: '/role/list'
  })
}

// 部门列表
export function postEntireDepartments() {
  return hyRequest.post({
    url: '/department/list'
  })
}

export function postEntireMenus() {
  return hyRequest.post({
    url: '/menu/list'
  })
}
