/**
 * Mock API 数据和方法
 * 模拟后端接口，提供完整的RBAC权限管理功能
 */

// 模拟用户数据
const mockUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    name: '超级管理员',
    email: 'admin@flowermarket.com',
    phone: '13800138000',
    avatar: '/src/assets/placeholders/avatar.svg',
    status: 'active',
    createdAt: '2024-01-01 10:00:00',
    updatedAt: '2024-01-15 16:30:00',
    roleIds: [1],
    roles: ['超级管理员']
  },
  {
    id: 2,
    username: 'manager',
    password: 'manager123',
    name: '系统管理员',
    email: 'manager@flowermarket.com',
    phone: '13800138001',
    avatar: '/src/assets/placeholders/avatar.svg',
    status: 'active',
    createdAt: '2024-01-02 09:00:00',
    updatedAt: '2024-01-15 14:20:00',
    roleIds: [2],
    roles: ['系统管理员']
  },
  {
    id: 3,
    username: 'user',
    password: 'user123',
    name: '普通用户',
    email: 'user@flowermarket.com',
    phone: '13800138002',
    avatar: '/src/assets/placeholders/avatar.svg',
    status: 'active',
    createdAt: '2024-01-03 14:30:00',
    updatedAt: '2024-01-10 11:15:00',
    roleIds: [3],
    roles: ['普通用户']
  },
  {
    id: 4,
    username: 'editor',
    password: 'editor123',
    name: '内容编辑',
    email: 'editor@flowermarket.com',
    phone: '13800138003',
    avatar: '/src/assets/placeholders/avatar.svg',
    status: 'disabled',
    createdAt: '2024-01-04 16:00:00',
    updatedAt: '2024-01-12 10:45:00',
    roleIds: [4],
    roles: ['内容编辑']
  }
]

// 模拟角色数据
const mockRoles = [
  {
    id: 1,
    name: '超级管理员',
    code: 'super_admin',
    description: '拥有系统所有权限的超级管理员',
    status: 'active',
    sort: 1,
    createdAt: '2024-01-01 10:00:00',
    updatedAt: '2024-01-01 10:00:00',
    permissionIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    permissions: ['所有权限']
  },
  {
    id: 2,
    name: '系统管理员',
    code: 'system_admin',
    description: '负责系统管理和维护的管理员',
    status: 'active',
    sort: 2,
    createdAt: '2024-01-01 10:05:00',
    updatedAt: '2024-01-01 10:05:00',
    permissionIds: [1, 2, 3, 4, 5, 6, 7, 8],
    permissions: ['系统管理权限']
  },
  {
    id: 3,
    name: '普通用户',
    code: 'user',
    description: '系统普通用户，具有基本权限',
    status: 'active',
    sort: 3,
    createdAt: '2024-01-01 10:10:00',
    updatedAt: '2024-01-01 10:10:00',
    permissionIds: [9, 10],
    permissions: ['基本查看权限']
  },
  {
    id: 4,
    name: '内容编辑',
    code: 'editor',
    description: '负责内容编辑和维护',
    status: 'disabled',
    sort: 4,
    createdAt: '2024-01-01 10:15:00',
    updatedAt: '2024-01-01 10:15:00',
    permissionIds: [9, 10, 11],
    permissions: ['内容管理权限']
  }
]

// 模拟权限数据
const mockPermissions = [
  {
    id: 1,
    name: '用户管理',
    code: 'system:user:list',
    type: 'menu',
    parentId: 0,
    path: '/admin/system/users',
    icon: 'UserFilled',
    sort: 1,
    status: 'active',
    description: '用户列表查看权限'
  },
  {
    id: 2,
    name: '用户新增',
    code: 'system:user:create',
    type: 'button',
    parentId: 1,
    path: '',
    icon: '',
    sort: 1,
    status: 'active',
    description: '创建新用户权限'
  },
  {
    id: 3,
    name: '用户编辑',
    code: 'system:user:update',
    type: 'button',
    parentId: 1,
    path: '',
    icon: '',
    sort: 2,
    status: 'active',
    description: '编辑用户信息权限'
  },
  {
    id: 4,
    name: '用户删除',
    code: 'system:user:delete',
    type: 'button',
    parentId: 1,
    path: '',
    icon: '',
    sort: 3,
    status: 'active',
    description: '删除用户权限'
  },
  {
    id: 5,
    name: '角色管理',
    code: 'system:role:list',
    type: 'menu',
    parentId: 0,
    path: '/admin/system/roles',
    icon: 'UserFilled',
    sort: 2,
    status: 'active',
    description: '角色列表查看权限'
  },
  {
    id: 6,
    name: '角色新增',
    code: 'system:role:create',
    type: 'button',
    parentId: 5,
    path: '',
    icon: '',
    sort: 1,
    status: 'active',
    description: '创建新角色权限'
  },
  {
    id: 7,
    name: '角色编辑',
    code: 'system:role:update',
    type: 'button',
    parentId: 5,
    path: '',
    icon: '',
    sort: 2,
    status: 'active',
    description: '编辑角色信息权限'
  },
  {
    id: 8,
    name: '角色删除',
    code: 'system:role:delete',
    type: 'button',
    parentId: 5,
    path: '',
    icon: '',
    sort: 3,
    status: 'active',
    description: '删除角色权限'
  },
  {
    id: 9,
    name: '权限管理',
    code: 'system:permission:list',
    type: 'menu',
    parentId: 0,
    path: '/admin/system/permissions',
    icon: 'Lock',
    sort: 3,
    status: 'active',
    description: '权限列表查看权限'
  },
  {
    id: 10,
    name: '仪表板',
    code: 'dashboard:view',
    type: 'menu',
    parentId: 0,
    path: '/admin/dashboard',
    icon: 'Monitor',
    sort: 0,
    status: 'active',
    description: '仪表板查看权限'
  },
  {
    id: 11,
    name: '产品管理',
    code: 'product:list',
    type: 'menu',
    parentId: 0,
    path: '/admin/products',
    icon: 'Goods',
    sort: 4,
    status: 'active',
    description: '产品列表查看权限'
  },
  {
    id: 12,
    name: '订单管理',
    code: 'order:list',
    type: 'menu',
    parentId: 0,
    path: '/admin/orders',
    icon: 'List',
    sort: 5,
    status: 'active',
    description: '订单列表查看权限'
  }
]

/**
 * 工具函数：延迟执行（模拟网络请求）
 */
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * 工具函数：生成响应格式
 */
const createResponse = (success, data = null, message = '') => ({
  success,
  data,
  message,
  timestamp: Date.now()
})

/**
 * Mock API 接口
 */
export const mockApi = {
  // 认证相关接口
  auth: {
    /**
     * 用户登录
     */
    async login(credentials) {
      await delay(800) // 模拟网络延迟
      
      const { username, password } = credentials
      const user = mockUsers.find(u => u.username === username && u.password === password)
      
      if (user) {
        // 获取用户权限
        const userRoles = mockRoles.filter(role => user.roleIds.includes(role.id))
        const userPermissions = []
        
        userRoles.forEach(role => {
          mockPermissions.forEach(permission => {
            if (role.permissionIds.includes(permission.id)) {
              userPermissions.push(permission.code)
            }
          })
        })
        
        // 移除密码字段
        const { password: _, ...userInfo } = user
        
        return createResponse(true, {
          token: `mock_token_${user.id}_${Date.now()}`,
          user: userInfo,
          permissions: [...new Set(userPermissions)], // 去重
          roles: userRoles.map(role => role.code)
        }, '登录成功')
      } else {
        return createResponse(false, null, '用户名或密码错误')
      }
    },

    /**
     * 获取用户信息
     */
    async getUserInfo(token) {
      await delay(300)
      
      // 简单的token验证（实际项目中应该更严格）
      if (token && token.startsWith('mock_token_')) {
        const userId = parseInt(token.split('_')[2])
        const user = mockUsers.find(u => u.id === userId)
        
        if (user) {
          const { password: _, ...userInfo } = user
          return createResponse(true, userInfo, '获取用户信息成功')
        }
      }
      
      return createResponse(false, null, 'Token无效')
    }
  },

  // 用户管理接口
  users: {
    /**
     * 获取用户列表
     */
    async list(params = {}) {
      await delay(600)
      
      let result = [...mockUsers].map(user => {
        const { password: _, ...userInfo } = user
        return userInfo
      })
      
      // 搜索过滤
      if (params.keyword) {
        const keyword = params.keyword.toLowerCase()
        result = result.filter(user => 
          user.username.toLowerCase().includes(keyword) ||
          user.name.toLowerCase().includes(keyword) ||
          user.email.toLowerCase().includes(keyword)
        )
      }
      
      // 状态过滤
      if (params.status) {
        result = result.filter(user => user.status === params.status)
      }
      
      // 分页处理
      const page = params.page || 1
      const size = params.size || 10
      const total = result.length
      const start = (page - 1) * size
      const end = start + size
      
      return createResponse(true, {
        list: result.slice(start, end),
        total,
        page,
        size
      }, '获取用户列表成功')
    },

    /**
     * 创建用户
     */
    async create(userData) {
      await delay(500)
      
      // 检查用户名是否已存在
      if (mockUsers.some(user => user.username === userData.username)) {
        return createResponse(false, null, '用户名已存在')
      }
      
      const newUser = {
        id: Math.max(...mockUsers.map(u => u.id)) + 1,
        ...userData,
        avatar: '/src/assets/placeholders/avatar.svg',
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString()
      }
      
      mockUsers.push(newUser)
      
      const { password: _, ...userInfo } = newUser
      return createResponse(true, userInfo, '创建用户成功')
    },

    /**
     * 更新用户
     */
    async update(id, userData) {
      await delay(500)
      
      const userIndex = mockUsers.findIndex(user => user.id === id)
      if (userIndex === -1) {
        return createResponse(false, null, '用户不存在')
      }
      
      // 检查用户名是否被其他用户占用
      if (userData.username && mockUsers.some(user => user.id !== id && user.username === userData.username)) {
        return createResponse(false, null, '用户名已被占用')
      }
      
      mockUsers[userIndex] = {
        ...mockUsers[userIndex],
        ...userData,
        updatedAt: new Date().toLocaleString()
      }
      
      const { password: _, ...userInfo } = mockUsers[userIndex]
      return createResponse(true, userInfo, '更新用户成功')
    },

    /**
     * 删除用户
     */
    async delete(id) {
      await delay(500)
      
      const userIndex = mockUsers.findIndex(user => user.id === id)
      if (userIndex === -1) {
        return createResponse(false, null, '用户不存在')
      }
      
      // 不允许删除超级管理员
      if (mockUsers[userIndex].username === 'admin') {
        return createResponse(false, null, '不能删除超级管理员')
      }
      
      mockUsers.splice(userIndex, 1)
      return createResponse(true, null, '删除用户成功')
    }
  },

  // 角色管理接口
  roles: {
    /**
     * 获取角色列表
     */
    async list(params = {}) {
      await delay(500)
      
      let result = [...mockRoles]
      
      // 搜索过滤
      if (params.keyword) {
        const keyword = params.keyword.toLowerCase()
        result = result.filter(role => 
          role.name.toLowerCase().includes(keyword) ||
          role.code.toLowerCase().includes(keyword) ||
          role.description.toLowerCase().includes(keyword)
        )
      }
      
      // 状态过滤
      if (params.status) {
        result = result.filter(role => role.status === params.status)
      }
      
      // 分页处理
      const page = params.page || 1
      const size = params.size || 10
      const total = result.length
      const start = (page - 1) * size
      const end = start + size
      
      return createResponse(true, {
        list: result.slice(start, end),
        total,
        page,
        size
      }, '获取角色列表成功')
    },

    /**
     * 创建角色
     */
    async create(roleData) {
      await delay(500)
      
      // 检查角色编码是否已存在
      if (mockRoles.some(role => role.code === roleData.code)) {
        return createResponse(false, null, '角色编码已存在')
      }
      
      const newRole = {
        id: Math.max(...mockRoles.map(r => r.id)) + 1,
        ...roleData,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
        permissionIds: roleData.permissionIds || [],
        permissions: []
      }
      
      mockRoles.push(newRole)
      return createResponse(true, newRole, '创建角色成功')
    },

    /**
     * 更新角色
     */
    async update(id, roleData) {
      await delay(500)
      
      const roleIndex = mockRoles.findIndex(role => role.id === id)
      if (roleIndex === -1) {
        return createResponse(false, null, '角色不存在')
      }
      
      // 检查角色编码是否被其他角色占用
      if (roleData.code && mockRoles.some(role => role.id !== id && role.code === roleData.code)) {
        return createResponse(false, null, '角色编码已被占用')
      }
      
      mockRoles[roleIndex] = {
        ...mockRoles[roleIndex],
        ...roleData,
        updatedAt: new Date().toLocaleString()
      }
      
      return createResponse(true, mockRoles[roleIndex], '更新角色成功')
    },

    /**
     * 删除角色
     */
    async delete(id) {
      await delay(500)
      
      const roleIndex = mockRoles.findIndex(role => role.id === id)
      if (roleIndex === -1) {
        return createResponse(false, null, '角色不存在')
      }
      
      // 检查是否有用户使用此角色
      const usedByUser = mockUsers.some(user => user.roleIds.includes(id))
      if (usedByUser) {
        return createResponse(false, null, '该角色正在被用户使用，无法删除')
      }
      
      mockRoles.splice(roleIndex, 1)
      return createResponse(true, null, '删除角色成功')
    }
  },

  // 权限管理接口
  permissions: {
    /**
     * 获取权限列表
     */
    async list(params = {}) {
      await delay(400)
      
      let result = [...mockPermissions]
      
      // 搜索过滤
      if (params.keyword) {
        const keyword = params.keyword.toLowerCase()
        result = result.filter(permission => 
          permission.name.toLowerCase().includes(keyword) ||
          permission.code.toLowerCase().includes(keyword) ||
          permission.description.toLowerCase().includes(keyword)
        )
      }
      
      // 类型过滤
      if (params.type) {
        result = result.filter(permission => permission.type === params.type)
      }
      
      // 状态过滤
      if (params.status) {
        result = result.filter(permission => permission.status === params.status)
      }
      
      return createResponse(true, result, '获取权限列表成功')
    },

    /**
     * 获取权限树
     */
    async tree() {
      await delay(300)
      
      // 构建权限树结构
      const buildTree = (permissions, parentId = 0) => {
        return permissions
          .filter(permission => permission.parentId === parentId)
          .map(permission => ({
            ...permission,
            children: buildTree(permissions, permission.id)
          }))
      }
      
      const tree = buildTree(mockPermissions)
      return createResponse(true, tree, '获取权限树成功')
    }
  }
}