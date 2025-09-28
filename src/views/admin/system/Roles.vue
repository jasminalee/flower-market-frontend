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
        <el-table-column prop="roleName" label="角色名称" min-width="120" />
        <el-table-column prop="roleCode" label="角色编码" min-width="120" />
        <el-table-column prop="description" label="描述" min-width="200" />
        
        <el-table-column prop="createTime" label="创建时间" min-width="160" />
        
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
              v-if="hasPermission('system:role:delete') && row.roleCode !== 'super_admin'"
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
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleForm.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        
        <el-form-item label="角色编码" prop="roleCode">
          <el-input 
            v-model="roleForm.roleCode" 
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
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import { useAuthStore } from '@/config/store.js'
import sysRoleApi from '@/api/sysRole.js'
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
  keyword: ''
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
  roleName: '',
  roleCode: '',
  description: ''
})

// 表单验证规则
const roleRules = {
  roleName: [
    { required: true, message: '请输入角色名称', trigger: 'blur' },
    { min: 2, max: 50, message: '角色名称长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  roleCode: [
    { required: true, message: '请输入角色编码', trigger: 'blur' },
    { min: 2, max: 50, message: '角色编码长度在 2 到 50 个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/, message: '角色编码只能包含字母、数字和下划线，且以字母开头', trigger: 'blur' }
  ],
  description: [
    { max: 200, message: '描述长度不能超过 200 个字符', trigger: 'blur' }
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
      current: pagination.page,
      size: pagination.size,
      roleName: searchForm.keyword || undefined,
      roleCode: searchForm.keyword || undefined
    }
    
    const response = await sysRoleApi.page(params)
    if (response) {
      const records = response.data.records || []
      roleList.value = records
      pagination.total = response.total != null ? response.total : (response.count || 0)
      pagination.page = response.current || pagination.page
      pagination.size = response.size || pagination.size
      // Only show success message for non-initial loads
      if (pagination.total > 0) {
        ElMessage.success(`角色列表加载成功，共 ${pagination.total} 条记录`)
      }
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
  ElMessage.success('操作成功')
}

/**
 * 重置搜索
 */
const handleReset = () => {
  searchForm.keyword = ''
  pagination.page = 1
  loadRoleList()
  ElMessage.info('搜索条件已重置')
}

/**
 * 分页大小改变
 */
const handleSizeChange = (newSize) => {
  pagination.size = newSize
  pagination.page = 1
  loadRoleList()
  ElMessage.info(`页面大小已更改为 ${newSize} 条/页`)
}

/**
 * 当前页改变
 */
const handleCurrentChange = (newPage) => {
  pagination.page = newPage
  loadRoleList()
  ElMessage.info(`正在加载第 ${newPage} 页`)
}

/**
 * 新增角色
 */
const handleAdd = () => {
  isEdit.value = false
  resetRoleForm()
  nextTick(() => {
    if (roleFormRef.value) {
      roleFormRef.value.clearValidate()
    }
  })
  dialogVisible.value = true
}

/**
 * 编辑角色
 */
const handleEdit = (role) => {
  isEdit.value = true
  Object.assign(roleForm, {
    id: role.id,
    roleName: role.roleName,
    roleCode: role.roleCode,
    description: role.description
  })
  dialogVisible.value = true
}

/**
 * 删除角色
 */
const handleDelete = async (role) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除角色 "${role.roleName}" 吗？`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    const response = await sysRoleApi.remove(role.id)
    if (response !== undefined) {
      ElMessage.success('删除成功')
      loadRoleList()
    } else {
      ElMessage.error('删除失败')
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
      id: roleForm.id,
      roleName: roleForm.roleName,
      roleCode: roleForm.roleCode,
      description: roleForm.description
    }
    
    const response = await sysRoleApi.save(roleData)
    
    if (response !== undefined) {
      ElMessage.success(isEdit.value ? '更新成功' : '创建成功')
      dialogVisible.value = false
      loadRoleList()
    } else {
      ElMessage.error('保存失败')
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
    roleName: '',
    roleCode: '',
    description: ''
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