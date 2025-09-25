<template>
  <div class="user-manage-view">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>用户管理</span>
          <div class="header-actions">
            <el-input
              v-model="searchKeyword"
              placeholder="搜索用户..."
              style="width: 200px; margin-right: 10px;"
              clearable
            />
            <el-button type="primary" @click="handleAddUser">
              <el-icon><Plus /></el-icon>
              添加用户
            </el-button>
          </div>
        </div>
      </template>
      
      <!-- 用户表格 -->
      <el-table :data="filteredUsers" style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="role" label="角色" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag :type="scope.row.status === '启用' ? 'success' : 'danger'">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">
              编辑
            </el-button>
            <el-button 
              size="small" 
              :type="scope.row.status === '启用' ? 'danger' : 'success'"
              @click="handleToggleStatus(scope.row)"
            >
              {{ scope.row.status === '启用' ? '禁用' : '启用' }}
            </el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)" v-permission="'user.delete'">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 分页组件 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="totalUsers"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    
    <!-- 用户编辑对话框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
      <el-form
        ref="userFormRef"
        :model="currentUser"
        :rules="userFormRules"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="currentUser.username" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="currentUser.email" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="currentUser.role" placeholder="请选择角色">
            <el-option label="管理员" value="管理员" />
            <el-option label="普通用户" value="普通用户" />
            <el-option label="访客" value="访客" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="currentUser.status" placeholder="请选择状态">
            <el-option label="启用" value="启用" />
            <el-option label="禁用" value="禁用" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { mockGetUsers, mockUsers } from '@/services/mockData'

// 表单引用
const userFormRef = ref<FormInstance>()

// 状态
const loading = ref(false)
const dialogVisible = ref(false)
const dialogTitle = ref('')
const isEdit = ref(false)

// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const totalUsers = ref(100)

// 搜索
const searchKeyword = ref('')

// 当前用户数据
const currentUser = reactive({
  id: 0,
  username: '',
  email: '',
  role: '',
  status: '启用',
  createTime: ''
})

// 用户表单验证规则
const userFormRules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  role: [
    { required: true, message: '请选择角色', trigger: 'change' }
  ],
  status: [
    { required: true, message: '请选择状态', trigger: 'change' }
  ]
})

// 模拟用户数据
const users = ref([
  { id: 1, username: 'admin', email: 'admin@example.com', role: '管理员', status: '启用', createTime: '2025-01-01' },
  { id: 2, username: 'user1', email: 'user1@example.com', role: '普通用户', status: '启用', createTime: '2025-01-02' },
  { id: 3, username: 'user2', email: 'user2@example.com', role: '普通用户', status: '禁用', createTime: '2025-01-03' },
  { id: 4, username: 'guest', email: 'guest@example.com', role: '访客', status: '启用', createTime: '2025-01-04' }
])

// 计算属性 - 过滤后的用户数据
const filteredUsers = computed(() => {
  if (!searchKeyword.value) {
    return users.value
  }
  const keyword = searchKeyword.value.toLowerCase()
  return users.value.filter(user => 
    user.username.toLowerCase().includes(keyword) ||
    user.email.toLowerCase().includes(keyword) ||
    user.role.toLowerCase().includes(keyword)
  )
})

const loadUsers = async () => {
  loading.value = true
  try {
    // 使用模拟数据服务
    const userData = await mockGetUsers()
    users.value = userData
  } catch (error) {
    ElMessage.error('获取用户数据失败')
  } finally {
    loading.value = false
  }
}

// 组件挂载时加载数据
onMounted(() => {
  loadUsers()
})
const handleAddUser = () => {
  dialogTitle.value = '添加用户'
  isEdit.value = false
  // 重置表单
  Object.assign(currentUser, {
    id: 0,
    username: '',
    email: '',
    role: '',
    status: '启用',
    createTime: ''
  })
  dialogVisible.value = true
}

const handleEdit = (user: any) => {
  dialogTitle.value = '编辑用户'
  isEdit.value = true
  // 填充表单数据
  Object.assign(currentUser, user)
  dialogVisible.value = true
}

const handleToggleStatus = (user: any) => {
  ElMessageBox.confirm(
    `确定要${user.status === '启用' ? '禁用' : '启用'}用户"${user.username}"吗？`,
    '确认操作',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    user.status = user.status === '启用' ? '禁用' : '启用'
    ElMessage.success('操作成功')
  })
}

const handleDelete = (user: any) => {
  ElMessageBox.confirm(
    `确定要删除用户"${user.username}"吗？此操作不可恢复！`,
    '确认删除',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'error'
    }
  ).then(() => {
    const index = users.value.findIndex(u => u.id === user.id)
    if (index > -1) {
      users.value.splice(index, 1)
      ElMessage.success('删除成功')
    }
  })
}

const handleSubmit = () => {
  if (!userFormRef.value) return
  
  userFormRef.value.validate((valid) => {
    if (valid) {
      if (isEdit.value) {
        // 编辑用户
        const index = users.value.findIndex(u => u.id === currentUser.id)
        if (index > -1) {
          users.value[index] = { ...currentUser }
          ElMessage.success('更新成功')
        }
      } else {
        // 添加用户
        const newUser = {
          ...currentUser,
          id: users.value.length + 1,
          createTime: new Date().toISOString().split('T')[0]
        }
        users.value.push(newUser)
        ElMessage.success('添加成功')
      }
      dialogVisible.value = false
    }
  })
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
  // 这里应该重新加载数据
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  // 这里应该重新加载数据
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>