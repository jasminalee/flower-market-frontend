<template>
  <div class="users-page">
    <!-- 页面头部（使用 Element Plus 的 el-page-header） -->
    <el-page-header class="page-header" :title="'用户管理'">
      <template #content>
        管理系统中的所有用户账户
      </template>
    </el-page-header>

    <!-- 搜索和筛选 -->
    <el-card class="filter-card">
      <el-row type="flex" justify="space-between" align="middle" class="filters-bar">
        <el-col :span="18">
          <el-form :model="searchForm" inline>
            <el-form-item label="关键词">
              <el-input
                  class="search-input"
                  v-model="searchForm.keyword"
                  placeholder="搜索用户名、姓名或邮箱"
                  clearable
                  @clear="handleSearch"
                  @keyup.enter="handleSearch"
              >
                <template #prefix>
                  <el-icon>
                    <Search/>
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item label="状态">
              <el-select v-model="searchForm.status" placeholder="选择状态" clearable>
                <el-option label="启用" value="1"/>
                <el-option label="禁用" value="0"/>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="handleSearch">
                <el-icon>
                  <Search/>
                </el-icon>
                搜索
              </el-button>
              <el-button @click="handleReset">
                <el-icon>
                  <Refresh/>
                </el-icon>
                重置
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>

        <el-col :span="6" style="text-align: right;">
          <el-button
              :icon="Plus"
              type="primary"
              @click="handleAdd"
              v-if="hasPermission('system:user:create')"
          >
            新增用户
          </el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 用户列表 -->
    <el-card class="table-card">
      <el-table :data="userList" :loading="loading" stripe style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"/>
        <el-table-column label="头像" width="80">
          <template #default="{ row }">
            <el-avatar :size="40" :src="row.avatar" :icon="User"/>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" min-width="120"/>
        <el-table-column prop="nickname" label="姓名" min-width="120"/>
        <el-table-column prop="email" label="邮箱" min-width="180"/>
        <el-table-column prop="phone" label="手机号" min-width="120"/>
        <el-table-column prop="addr" label="地址" min-width="200">
          <template #default="{ row }">
            <span v-if="row.addr" class="addr-cell" :title="row.addr">{{ row.addr }}</span>
            <span v-else>N/A</span>
          </template>
        </el-table-column>
        <el-table-column label="角色" min-width="120">
          <template #default="{ row }">
            <el-tag v-if="getRoleById(row.roleId)" size="small" style="margin-right: 4px;">
              {{ getRoleById(row.roleId).roleName }}
            </el-tag>
            <span v-else>N/A</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusDisplay(row.status).type">
              {{ getStatusDisplay(row.status).text }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="160"/>

        <el-table-column label="操作" width="240" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" text @click="handleView(row)" :icon="View">查看</el-button>
            <el-button type="warning" size="small" text @click="handleEdit(row)" :icon="Edit" v-if="hasPermission('system:user:update')">编辑</el-button>
            <el-button type="danger" size="small" text @click="handleDelete(row)" :icon="Delete" v-if="hasPermission('system:user:delete') && row.username !== 'admin'" >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
            v-model:current-page="pagination.page"
            v-model:page-size="pagination.size"
            :page-sizes="[10, 20, 50, 100]"
            :total="pagination.total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 用户表单对话框 -->
    <el-dialog
        :title="dialogTitle"
        v-model="dialogVisible"
        width="600px"
        :close-on-click-modal="false"
    >
      <el-form
          ref="userFormRef"
          :model="userForm"
          :rules="userRules"
          label-width="80px"
      >
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="用户名" prop="username">
              <el-input
                  v-model="userForm.username"
                  placeholder="请输入用户名"
                  :disabled="formMode === 'edit' || formMode === 'view'"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="nickname">
              <el-input v-model="userForm.nickname" placeholder="请输入姓名" :disabled="isFormDisabled"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="userForm.email" placeholder="请输入邮箱" :disabled="isFormDisabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="userForm.phone" placeholder="请输入手机号" :disabled="isFormDisabled"/>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="16">
          <el-col :span="24">
            <el-form-item label="地址" prop="addr">
              <el-input v-model="userForm.addr" placeholder="请输入地址" :disabled="isFormDisabled"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="16" v-if="showPasswordFields">
          <el-col :span="12">
            <el-form-item label="密码" prop="password">
              <el-input
                  v-model="userForm.password"
                  type="password"
                  placeholder="请输入密码"
                  show-password
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input
                  v-model="userForm.confirmPassword"
                  type="password"
                  placeholder="请确认密码"
                  show-password
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="角色" prop="roleId">
              <el-select v-model="userForm.roleId" placeholder="选择角色" :disabled="isFormDisabled" clearable>
                <el-option
                    v-for="role in roleOptions"
                    :key="role.id"
                    :label="role.roleName"
                    :value="role.id"
                />
              </el-select>
              <!-- 调试信息 -->
              <div v-if="false">Debug: userForm.roleId = {{ userForm.roleId }}</div>
              <div v-if="false">Debug: roleOptions = {{ roleOptions }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="userForm.status" :disabled="isFormDisabled">
                <el-radio :label="1">启用</el-radio>
                <el-radio :label="0">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button v-if="showSaveButton" type="primary" @click="handleSave" :loading="saving">
            {{ saving ? '保存中...' : '保存' }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {ref, reactive, computed, onMounted} from 'vue'
import {useAuthStore} from '@/config/store.js'
import sysUserApi from '@/api/sysUser'
import sysRoleApi from '@/api/sysRole'
import {ElMessage, ElMessageBox} from 'element-plus'
import {
  Plus, Search, Refresh, User, View, Edit, Delete
} from '@element-plus/icons-vue'

const authStore = useAuthStore()

// 响应式数据
const loading = ref(false)
const saving = ref(false)
const dialogVisible = ref(false)
const formMode = ref('create') // 'create', 'edit', 'view'
const userFormRef = ref()
const selectedUsers = ref([])

// 用户列表数据
const userList = ref([])
const roleOptions = ref([])
const roleMap = ref(new Map()) // 角色映射，用于通过ID快速查找角色

// 搜索表单
const searchForm = reactive({
  keyword: '',
  status: ''
})

// 分页信息
const pagination = reactive({
  page: 1,
  size: 10,
  total: 0
})

// 用户表单
const userForm = reactive({
  id: null,
  username: '',
  nickname: '',
  email: '',
  phone: '',
  addr: '',
  password: '',
  confirmPassword: '',
  roleId: null,
  status: 1
})

// 计算属性
const dialogTitle = computed(() => {
  switch (formMode.value) {
    case 'edit': return '编辑用户'
    case 'view': return '查看用户'
    default: return '新增用户'
  }
})

const isFormDisabled = computed(() => formMode.value === 'view')
const showPasswordFields = computed(() => formMode.value === 'create')
const showSaveButton = computed(() => formMode.value !== 'view')

const hasPermission = (permission) => authStore.hasPermission(permission)

// 添加状态显示的计算属性
const getStatusDisplay = computed(() => (status) => {
  return {
    type: status === 1 ? 'success' : 'danger',
    text: status === 1 ? '启用' : '禁用'
  }
})

// 验证器：确认密码（提取为顶层函数以避免 linter 警告）
const validateConfirmPassword = (rule, value) => {
  if (value !== userForm.password) {
    return Promise.reject(new Error('两次输入的密码不一致'))
  }
  return Promise.resolve()
}

// 表单验证规则
const userRules = {
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur'}
  ],
  nickname: [
    {required: true, message: '请输入姓名', trigger: 'blur'},
    {min: 2, max: 50, message: '姓名长度在 2 到 50 个字符', trigger: 'blur'}
  ],
  email: [
    {required: true, message: '请输入邮箱', trigger: 'blur'},
    {type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur'}
  ],
  phone: [
    {required: true, message: '请输入手机号', trigger: 'blur'},
    {pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式', trigger: 'blur'}
  ],
  addr: [
    {required: false, message: '请输入地址', trigger: 'blur'},
    {max: 200, message: '地址长度不能超过200个字符', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur'}
  ],
  confirmPassword: [
    {required: true, message: '请确认密码', trigger: 'blur'},
    {validator: validateConfirmPassword, trigger: 'blur'}
  ],
  roleId: [
    {required: true, message: '请选择角色', trigger: 'change'}
  ]
}

// 加载用户列表
const loadUserList = async () => {
  loading.value = true
  try {
    // map status to backend expected value (1 active, 0 disabled)
    let statusParam
    if (searchForm.status !== '' && searchForm.status != null) {
      const statusNum = Number(searchForm.status)
      if (!isNaN(statusNum)) {
        statusParam = statusNum
      }
    }

    const params = {
      current: pagination.page,
      size: pagination.size,
      keyword: searchForm.keyword || undefined,
      status: statusParam
    }
    const response = await sysUserApi.page(params)
    // backend returns { records: [...], total }
    if (response) {
      const records = response.data.records || []
      console.log('Loaded user records:', records)
      userList.value = records
      pagination.total = response.total != null ? response.total : (response.count || 0)
      pagination.page = response.current || pagination.page
      pagination.size = response.size || pagination.size
    }
  } catch (error) {
    console.error('加载用户列表失败:', error)
    ElMessage.error('加载用户列表失败')
  } finally {
    loading.value = false
  }
}

/**
 * 加载角色选项
 */
const loadRoleOptions = async () => {
  try {
    const response = await sysRoleApi.list()
    if (response && response.code === 200) {
      const records = response.data || []
      console.log('Loaded role options:', records)
      // 统一使用接口定义的字段名
      roleOptions.value = records
      
      // 构建角色映射表，便于通过ID查找角色
      roleMap.value.clear()
      records.forEach(role => {
        roleMap.value.set(role.id, role)
      })
      console.log('Role map built:', roleMap.value)
    }
  } catch (error) {
    console.error('加载角色选项失败:', error)
    ElMessage.error('加载角色选项失败')
  }
}

/**
 * 搜索
 */
const handleSearch = () => {
  pagination.page = 1
  loadUserList()
}

/**
 * 重置搜索
 */
const handleReset = () => {
  searchForm.keyword = ''
  searchForm.status = ''
  pagination.page = 1
  loadUserList()
}

/**
 * 分页大小改变
 */
const handleSizeChange = (newSize) => {
  pagination.size = newSize
  pagination.page = 1
  loadUserList()
}

/**
 * 当前页改变
 */
const handleCurrentChange = (newPage) => {
  pagination.page = newPage
  loadUserList()
}

/**
 * 选择改变
 */
const handleSelectionChange = (selection) => {
  selectedUsers.value = selection
}

/**
 * 新增用户
 */
const handleAdd = () => {
  formMode.value = 'create'
  resetUserForm()
  dialogVisible.value = true
}

/**
 * 查看用户
 */
const handleView = (user) => {
  formMode.value = 'view'
  handleOpenForm(user)
}

/**
 * 编辑用户
 */
const handleEdit = (user) => {
  formMode.value = 'edit'
  handleOpenForm(user)
}

/**
 * 打开表单（查看/编辑通用方法）
 */
const handleOpenForm = (user) => {
  console.log('User data:', user); // 调试信息
  
  // 处理角色ID，兼容不同的数据结构
  let roleId = null;
  if (user.roleId !== undefined && user.roleId !== null) {
    // 直接有 roleId 字段
    roleId = user.roleId;
  } else if (user.role && user.role.id !== undefined) {
    // 有 role 对象，其中包含 id
    roleId = user.role.id;
  } else if (user.roles && Array.isArray(user.roles) && user.roles.length > 0) {
    // 有 roles 数组，取第一个角色的 id
    roleId = user.roles[0].id;
  }
  
  Object.assign(userForm, {
    id: user.id,
    username: user.username,
    nickname: user.nickname,
    email: user.email,
    phone: user.phone,
    addr: user.addr || '',
    roleId: roleId,
    status: user.status === 1 ? 1 : 0,
    password: '',
    confirmPassword: ''
  })
  console.log('userForm after assignment:', userForm); // 调试信息
  dialogVisible.value = true
}

/**
 * 删除用户
 */
const handleDelete = async (user) => {
  try {
    await ElMessageBox.confirm(
        `确定要删除用户 "${user.nickname}" 吗？`,
        '确认删除',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
    )

    const response = await sysUserApi.remove(user.id)
    if (response !== undefined) {
      ElMessage.success('删除成功')
      loadUserList()
    } else {
      ElMessage.error('删除失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除用户失败:', error)
      ElMessage.error('删除失败')
    }
  }
}

/**
 * 保存用户
 */
const handleSave = async () => {
  // 查看模式下不保存
  if (formMode.value === 'view') {
    dialogVisible.value = false
    return
  }

  if (!userFormRef.value) return

  try {
    await userFormRef.value.validate()

    saving.value = true

    // 构建用户数据对象
    const userData = {
      id: userForm.id,
      username: userForm.username,
      nickname: userForm.nickname,
      email: userForm.email,
      phone: userForm.phone,
      addr: userForm.addr,
      roleId: userForm.roleId,
      status: userForm.status === 1 ? 1 : 0
    }

    // 如果是新增模式，添加密码
    if (formMode.value === 'create') {
      userData.password = userForm.password
    }

    const response = await sysUserApi.save(userData)

    if (response !== undefined) {
      ElMessage.success(formMode.value === 'edit' ? '更新成功' : '创建成功')
      dialogVisible.value = false
      loadUserList()
    } else {
      ElMessage.error('保存失败')
    }
  } catch (error) {
    console.error('保存用户失败:', error)
    ElMessage.error('保存失败')
  } finally {
    saving.value = false
  }
}

/**
 * 重置用户表单
 */
const resetUserForm = () => {
  Object.assign(userForm, {
    id: null,
    username: '',
    nickname: '',
    email: '',
    phone: '',
    addr: '',
    password: '',
    confirmPassword: '',
    roleId: null,
    status: 1
  })

  if (userFormRef.value) {
    userFormRef.value.resetFields()
  }
}

// 根据角色ID获取角色信息
const getRoleById = (roleId) => {
  if (!roleId) return null
  return roleMap.value.get(roleId)
}

// 生命周期
onMounted(() => {
  loadUserList()
  loadRoleOptions()
})
</script>

<style scoped>
.addr-cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  display: block;
}
</style>
