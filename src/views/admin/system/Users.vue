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
                <el-option label="启用" value="active"/>
                <el-option label="禁用" value="disabled"/>
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
              type="primary"
              @click="handleAdd"
              v-if="hasPermission('system:user:create')"
          >
            <el-icon>
              <Plus/>
            </el-icon>
            新增用户
          </el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 用户列表 -->
    <el-card class="table-card">
      <el-table
          :data="userList"
          :loading="loading"
          stripe
          style="width: 100%"
          @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"/>

        <el-table-column label="头像" width="80">
          <template #default="{ row }">
            <el-avatar :size="40" :src="row.avatar">
              <el-icon>
                <User/>
              </el-icon>
            </el-avatar>
          </template>
        </el-table-column>

        <el-table-column prop="username" label="用户名" min-width="120"/>

        <el-table-column prop="name" label="姓名" min-width="120"/>

        <el-table-column prop="email" label="邮箱" min-width="180"/>

        <el-table-column prop="phone" label="手机号" min-width="120"/>

        <el-table-column label="角色" min-width="120">
          <template #default="{ row }">
            <el-tag
                v-for="role in row.roles"
                :key="role"
                size="small"
                style="margin-right: 4px;"
            >
              {{ role }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'danger'">
              {{ row.status === 'active' ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="createdAt" label="创建时间" min-width="160"/>

        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button
                type="primary"
                size="small"
                text
                @click="handleView(row)"
            >
              <el-icon>
                <View/>
              </el-icon>
              查看
            </el-button>

            <el-button
                type="warning"
                size="small"
                text
                @click="handleEdit(row)"
                v-if="hasPermission('system:user:update')"
            >
              <el-icon>
                <Edit/>
              </el-icon>
              编辑
            </el-button>

            <el-button
                type="danger"
                size="small"
                text
                @click="handleDelete(row)"
                v-if="hasPermission('system:user:delete') && row.username !== 'admin'"
            >
              <el-icon>
                <Delete/>
              </el-icon>
              删除
            </el-button>
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
                  :disabled="isEdit"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="userForm.name" placeholder="请输入姓名"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="userForm.email" placeholder="请输入邮箱"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="userForm.phone" placeholder="请输入手机号"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="16" v-if="!isEdit">
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
            <el-form-item label="角色" prop="roleIds">
              <el-select v-model="userForm.roleIds" placeholder="选择角色" multiple>
                <el-option
                    v-for="role in roleOptions"
                    :key="role.id"
                    :label="role.name"
                    :value="role.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="userForm.status">
                <el-radio label="active">启用</el-radio>
                <el-radio label="disabled">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSave" :loading="saving">
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
import {mockApi} from '@/config/mock.js'
import sysUserApi from '@/api/sysUser'
import {ElMessage, ElMessageBox} from 'element-plus'
import {
  Plus, Search, Refresh, User, View, Edit, Delete
} from '@element-plus/icons-vue'

const authStore = useAuthStore()

// 响应式数据
const loading = ref(false)
const saving = ref(false)
const dialogVisible = ref(false)
const isEdit = ref(false)
const userFormRef = ref()
const selectedUsers = ref([])

// 用户列表数据
const userList = ref([])
const roleOptions = ref([])

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
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  roleIds: [],
  status: 'active'
})

// 计算属性
const dialogTitle = computed(() => isEdit.value ? '编辑用户' : '新增用户')
const hasPermission = (permission) => authStore.hasPermission(permission)

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
  name: [
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
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur'}
  ],
  confirmPassword: [
    {required: true, message: '请确认密码', trigger: 'blur'},
    {validator: validateConfirmPassword, trigger: 'blur'}
  ],
  roleIds: [
    {required: true, message: '请选择角色', trigger: 'change'}
  ]
}

// 加载用户列表
const loadUserList = async () => {
  loading.value = true
  try {
    // map status to backend expected value (1 active, 0 disabled)
    const statusParam = searchForm.status === 'active' ? 1 : searchForm.status === 'disabled' ? 0 : undefined

    const params = {
      current: pagination.page,
      size: pagination.size,
      keyword: searchForm.keyword || undefined,
      status: statusParam
    }
    console.log('params:', params)
    const response = await sysUserApi.page(params)
    console.log('response:', response)
    // backend returns { records: [...], total }
    if (response) {
      const records = response.records || []
      userList.value = records.map(u => ({
        id: u.id,
        username: u.username,
        name: u.nickname || u.name || u.username,
        email: u.email,
        phone: u.phone,
        addr: u.addr || '',
        status: Number(u.status) === 1 ? 'active' : 'disabled',
        createdAt: u.createTime || u.createdAt || '',
        avatar: u.avatar || '',
        roleIds: u.roleIds || [],
        roles: u.roles || []
      }))
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
    const response = await mockApi.roles.list({size: 100})
    if (response.success) {
      roleOptions.value = response.data.list.filter(role => role.status === 'active')
    }
  } catch (error) {
    console.error('加载角色选项失败:', error)
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
  isEdit.value = false
  resetUserForm()
  dialogVisible.value = true
}

/**
 * 查看用户
 */
const handleView = (user) => {
  ElMessage.info(`查看用户：${user.name}`)
  // 这里可以实现查看用户详情的功能
}

/**
 * 编辑用户
 */
const handleEdit = (user) => {
  isEdit.value = true
  Object.assign(userForm, {
    id: user.id,
    username: user.username,
    name: user.name,
    email: user.email,
    phone: user.phone,
    roleIds: user.roleIds || [],
    status: user.status,
    password: '',
    confirmPassword: ''
  })
  dialogVisible.value = true
}

/**
 * 删除用户
 */
const handleDelete = async (user) => {
  try {
    await ElMessageBox.confirm(
        `确定要删除用户 "${user.name}" 吗？`,
        '确认删除',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
    )

    const response = await mockApi.users.delete(user.id)
    if (response.success) {
      ElMessage.success('删除成功')
      loadUserList()
    } else {
      ElMessage.error(response.message || '删除失败')
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
  if (!userFormRef.value) return

  try {
    await userFormRef.value.validate()

    saving.value = true

    const userData = {
      username: userForm.username,
      name: userForm.name,
      email: userForm.email,
      phone: userForm.phone,
      roleIds: userForm.roleIds,
      status: userForm.status
    }

    if (!isEdit.value) {
      userData.password = userForm.password
    }

    const response = isEdit.value
        ? await mockApi.users.update(userForm.id, userData)
        : await mockApi.users.create(userData)

    if (response.success) {
      ElMessage.success(isEdit.value ? '更新成功' : '创建成功')
      dialogVisible.value = false
      loadUserList()
    } else {
      ElMessage.error(response.message || '保存失败')
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
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    roleIds: [],
    status: 'active'
  })

  if (userFormRef.value) {
    userFormRef.value.resetFields()
  }
}

// 生命周期
onMounted(() => {
  loadUserList()
  loadRoleOptions()
})
</script>

<style scoped>

</style>
