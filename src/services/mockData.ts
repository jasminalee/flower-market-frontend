// 模拟用户数据
export const mockUsers = [
  { id: 1, username: 'admin', email: 'admin@example.com', role: '管理员', status: '启用', createTime: '2025-01-01' },
  { id: 2, username: 'user1', email: 'user1@example.com', role: '普通用户', status: '启用', createTime: '2025-01-02' },
  { id: 3, username: 'user2', email: 'user2@example.com', role: '普通用户', status: '禁用', createTime: '2025-01-03' },
  { id: 4, username: 'guest', email: 'guest@example.com', role: '访客', status: '启用', createTime: '2025-01-04' }
]

// 模拟角色数据
export const mockRoles = [
  { id: 1, name: '管理员', description: '系统管理员，拥有所有权限', userCount: 1, createTime: '2025-01-01' },
  { id: 2, name: '运营人员', description: '负责商品管理和订单处理', userCount: 3, createTime: '2025-01-02' },
  { id: 3, name: '客服人员', description: '负责客户服务和售后处理', userCount: 2, createTime: '2025-01-03' }
]

// 模拟权限数据
export const mockPermissions = [
  {
    id: 1,
    label: '系统管理',
    children: [
      {
        id: 2,
        label: '用户管理',
        children: [
          { id: 3, label: '查看用户' },
          { id: 4, label: '编辑用户' },
          { id: 5, label: '删除用户' }
        ]
      },
      {
        id: 6,
        label: '角色管理',
        children: [
          { id: 7, label: '查看角色' },
          { id: 8, label: '编辑角色' },
          { id: 9, label: '删除角色' }
        ]
      }
    ]
  },
  {
    id: 10,
    label: '商品管理',
    children: [
      { id: 11, label: '查看商品' },
      { id: 12, label: '编辑商品' },
      { id: 13, label: '删除商品' }
    ]
  }
]

// 模拟登录函数
export const mockLogin = (username: string, password: string): Promise<{ success: boolean; token?: string; message?: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (username === 'admin' && password === '123456') {
        resolve({
          success: true,
          token: 'fake-jwt-token',
          message: '登录成功'
        })
      } else {
        resolve({
          success: false,
          message: '用户名或密码错误'
        })
      }
    }, 1000)
  })
}

// 模拟获取用户列表
export const mockGetUsers = (): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUsers)
    }, 500)
  })
}

// 模拟获取角色列表
export const mockGetRoles = (): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRoles)
    }, 500)
  })
}