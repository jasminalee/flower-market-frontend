<template>
  <div class="roles-page">
    <!-- 页面头部（使用 Element Plus 的 el-page-header） -->
    <el-page-header class="page-header" :title="'角色管理'">
      <template #content>
        管理系统中的用户角色和权限
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
                placeholder="搜索角色名称或编码"
                clearable
                @keyup.enter="handleSearch"
              >
                <template #prefix>
                  <el-icon><Search /></el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item label="状态">
              <el-select v-model="searchForm.status" placeholder="选择状态" clearable>
                <el-option label="启用" value="active" />
                <el-option label="禁用" value="disabled" />
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="handleSearch">
                <el-icon><Search /></el-icon>
                搜索
              </el-button>
              <el-button @click="handleReset">
                <el-icon><Refresh /></el-icon>
                重置
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>

        <el-col :span="6" style="text-align: right;">
          <el-button
            type="primary"
            @click="handleAdd"
            v-if="hasPermission('system:role:create')"
          >
            <el-icon><Plus /></el-icon>
            新增角色
          </el-button>
        </el-col>
      </el-row>
     </el-card>

    <!-- 角色列表 -->
    <el-card class="table-card">
      <el-table
        :data="roleList"
        :loading="loading"
        stripe
        style="width: 100%"
      >
        <el-table-column prop="name" label="角色名称" min-width="120" />
        <el-table-column prop="code" label="角色编码" min-width="120" />
        <el-table-column prop="description" label="描述" min-width="200" />
        <el-table-column prop="sort" label="排序" width="80" />
        
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'danger'">
              {{ row.status === 'active' ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        
        <el-table-column prop="createdAt" label="创建时间" min-width="160" />
        
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button
              type="warning"
              size="small"
              text
              @click="handleEdit(row)"
              v-if="hasPermission('system:role:update')"
            >
              <el-icon><Edit /></el-icon>
              编辑
            </el-button>
            
            <el-button
              type="danger"
              size="small"
              text
              @click="handleDelete(row)"
              v-if="hasPermission('system:role:delete') && row.code !== 'super_admin'"
            >
              <el-icon><Delete /></el-icon>
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

    <!-- 角色表单对话框 -->
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      width="600px"
    >
      <el-form
        ref="roleFormRef"
        :model="roleForm"
        :rules="roleRules"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" placeholder="请输入角色名称" />
        </el-form-item>
        
        <el-form-item label="角色编码" prop="code">
          <el-input 
            v-model="roleForm.code" 
            placeholder="请输入角色编码"
            :disabled="isEdit"
          />
        </el-form-item>
        
        <el-form-item label="描述" prop="description">
          <el-input 
            v-model="roleForm.description" 
            type="textarea"
            placeholder="请输入角色描述"
            :rows="3"
          />
        </el-form-item>
        
        <el-form-item label="排序" prop="sort">
          <el-input-number 
            v-model="roleForm.sort" 
            :min="1" 
            :max="999"
            placeholder="排序"
          />
        </el-form-item>
        
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="roleForm.status">
            <el-radio label="active">启用</el-radio>
            <el-radio label="disabled">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
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
import { ref, reactive, computed, onMounted } from 'vue'
import { useAuthStore } from '@/config/store.js'
import { mockApi } from '@/config/mock.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Search, Refresh, Edit, Delete } from '@element-plus/icons-vue'

const authStore = useAuthStore()

// 响应式数据
const loading = ref(false)
const saving = ref(false)
const dialogVisible = ref(false)
const isEdit = ref(false)
const roleFormRef = ref()

// 角色列表数据
const roleList = ref([])

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

// 角色表单
const roleForm = reactive({
  id: null,
  name: '',
  code: '',
  description: '',
  sort: 1,
  status: 'active'
})

// 表单验证规则
const roleRules = {
  name: [
    { required: true, message: '请输入角色名称', trigger: 'blur' },
    { min: 2, max: 50, message: '角色名称长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入角色编码', trigger: 'blur' },
    { min: 2, max: 50, message: '角色编码长度在 2 到 50 个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/, message: '角色编码只能包含字母、数字和下划线，且以字母开头', trigger: 'blur' }
  ],
  description: [
    { max: 200, message: '描述长度不能超过 200 个字符', trigger: 'blur' }
  ],
  sort: [
    { required: true, message: '请输入排序', trigger: 'blur' }
  ]
}

// 计算属性
const dialogTitle = computed(() => isEdit.value ? '编辑角色' : '新增角色')
const hasPermission = (permission) => authStore.hasPermission(permission)

/**
 * 加载角色列表
 */
const loadRoleList = async () => {
  loading.value = true
  try {
    const params = {
      page: pagination.page,
      size: pagination.size,
      keyword: searchForm.keyword,
      status: searchForm.status
    }
    
    const response = await mockApi.roles.list(params)
    if (response.success) {
      roleList.value = response.data.list
      pagination.total = response.data.total
    }
  } catch (error) {
    console.error('加载角色列表失败:', error)
    ElMessage.error('加载角色列表失败')
  } finally {
    loading.value = false
  }
}

/**
 * 搜索
 */
const handleSearch = () => {
  pagination.page = 1
  loadRoleList()
}

/**
 * 重置搜索
 */
const handleReset = () => {
  searchForm.keyword = ''
  searchForm.status = ''
  pagination.page = 1
  loadRoleList()
}

/**
 * 分页大小改变
 */
const handleSizeChange = (newSize) => {
  pagination.size = newSize
  pagination.page = 1
  loadRoleList()
}

/**
 * 当前页改变
 */
const handleCurrentChange = (newPage) => {
  pagination.page = newPage
  loadRoleList()
}

/**
 * 新增角色
 */
const handleAdd = () => {
  isEdit.value = false
  resetRoleForm()
  dialogVisible.value = true
}

/**
 * 编辑角色
 */
const handleEdit = (role) => {
  isEdit.value = true
  Object.assign(roleForm, {
    id: role.id,
    name: role.name,
    code: role.code,
    description: role.description,
    sort: role.sort,
    status: role.status
  })
  dialogVisible.value = true
}

/**
 * 删除角色
 */
const handleDelete = async (role) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除角色 "${role.name}" 吗？`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    const response = await mockApi.roles.delete(role.id)
    if (response.success) {
      ElMessage.success('删除成功')
      loadRoleList()
    } else {
      ElMessage.error(response.message || '删除失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除角色失败:', error)
      ElMessage.error('删除失败')
    }
  }
}

/**
 * 保存角色
 */
const handleSave = async () => {
  if (!roleFormRef.value) return
  
  try {
    await roleFormRef.value.validate()
    
    saving.value = true
    
    const roleData = {
      name: roleForm.name,
      code: roleForm.code,
      description: roleForm.description,
      sort: roleForm.sort,
      status: roleForm.status
    }
    
    const response = isEdit.value 
      ? await mockApi.roles.update(roleForm.id, roleData)
      : await mockApi.roles.create(roleData)
    
    if (response.success) {
      ElMessage.success(isEdit.value ? '更新成功' : '创建成功')
      dialogVisible.value = false
      loadRoleList()
    } else {
      ElMessage.error(response.message || '保存失败')
    }
  } catch (error) {
    console.error('保存角色失败:', error)
    ElMessage.error('保存失败')
  } finally {
    saving.value = false
  }
}

/**
 * 重置角色表单
 */
const resetRoleForm = () => {
  Object.assign(roleForm, {
    id: null,
    name: '',
    code: '',
    description: '',
    sort: 1,
    status: 'active'
  })
  
  if (roleFormRef.value) {
    roleFormRef.value.resetFields()
  }
}

// 生命周期
onMounted(() => {
  loadRoleList()
})
</script>

<style scoped>
</style>
