<template>
    <!-- 页面头部 -->
    <el-page-header class="page-header" :title="'权限管理'">
      <template #content>
        管理系统中的菜单、按钮和接口权限
      </template>
    </el-page-header>

    <!-- 搜索和筛选 -->
    <el-card class="filter-card">
      <el-row type="flex" justify="space-between" align="middle" class="filters-bar">
        <el-col :span="18">
          <el-form :model="searchForm" inline>
            <el-form-item label="权限名称">
              <el-input
                  class="search-input"
                  v-model="searchForm.permissionName"
                  placeholder="搜索权限名称"
                  clearable
                  @keyup.enter="handleSearch"
              >
                <template #prefix>
                  <el-icon><Search /></el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item label="权限类型">
              <el-select v-model="searchForm.permissionType" placeholder="选择权限类型" clearable>
                <el-option label="菜单" value="1" />
                <el-option label="按钮" value="2" />
                <el-option label="接口" value="3" />
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
              v-if="hasPermission('system:permission:create')"
          >
            <el-icon><Plus /></el-icon>
            新增权限
          </el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 权限列表 -->
    <el-card class="table-card">
      <el-table
          :data="permissionList"
          :loading="loading"
          stripe
          style="width: 100%"
          row-key="id"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          default-expand-all
      >
        <el-table-column prop="permissionName" label="权限名称" min-width="150" />
        <el-table-column prop="permissionCode" label="权限编码" min-width="150" />
        <el-table-column prop="permissionType" label="权限类型" min-width="100">
          <template #default="{ row }">
            <el-tag v-if="row.permissionType === '1'" type="primary">菜单</el-tag>
            <el-tag v-else-if="row.permissionType === '2'" type="success">按钮</el-tag>
            <el-tag v-else-if="row.permissionType === '3'" type="warning">接口</el-tag>
            <span v-else>{{ getPermissionTypeText(row.permissionType) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="资源路径" min-width="150" />
        <el-table-column prop="method" label="请求方法" min-width="100" />
        <el-table-column prop="sort" label="排序" min-width="80" />
        <el-table-column prop="createTime" label="创建时间" min-width="160" />

        <el-table-column label="操作" width="250" fixed="right">
          <template #default="{ row }">
            <el-button
                type="warning"
                size="small"
                text
                @click="handleEdit(row)"
                v-if="hasPermission('system:permission:update')"
            >
              <el-icon><Edit /></el-icon>
              编辑
            </el-button>

            <el-button
                type="primary"
                size="small"
                text
                @click="handleAddChild(row)"
                v-if="hasPermission('system:permission:create')"
            >
              <el-icon><Plus /></el-icon>
              添加下级
            </el-button>

            <el-button
                type="danger"
                size="small"
                text
                @click="handleDelete(row)"
                v-if="hasPermission('system:permission:delete')"
            >
              <el-icon><Delete /></el-icon>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 权限表单对话框 -->
    <el-dialog
        :title="dialogTitle"
        v-model="dialogVisible"
        width="600px"
    >
      <el-form
          ref="permissionFormRef"
          :model="permissionForm"
          :rules="permissionRules"
          label-width="100px"
      >
        <el-form-item label="权限名称" prop="permissionName">
          <el-input v-model="permissionForm.permissionName" placeholder="请输入权限名称" />
        </el-form-item>

        <el-form-item label="权限编码" prop="permissionCode">
          <el-input
              v-model="permissionForm.permissionCode"
              placeholder="请输入权限编码"
              :disabled="isEdit"
          />
        </el-form-item>

        <el-form-item label="权限类型" prop="permissionType">
          <el-select v-model="permissionForm.permissionType" placeholder="请选择权限类型" style="width: 100%">
            <el-option label="菜单" value="1" />
            <el-option label="按钮" value="2" />
            <el-option label="接口" value="3" />
          </el-select>
        </el-form-item>

        <el-form-item label="上级权限" prop="parentId">
          <el-tree-select
              v-model="permissionForm.parentId"
              :data="permissionTreeData"
              :props="{ value: 'id', label: 'permissionName', children: 'children' }"
              node-key="id"
              placeholder="请选择上级权限"
              check-strictly
              style="width: 100%"
              clearable
          />
        </el-form-item>

        <el-form-item label="资源路径" prop="url">
          <el-input v-model="permissionForm.url" placeholder="请输入资源路径（如：/sysUser/page）" />
        </el-form-item>

        <el-form-item label="请求方法" prop="method" v-if="permissionForm.permissionType === '3'">
          <el-select v-model="permissionForm.method" placeholder="请选择请求方法" style="width: 100%" clearable>
            <el-option label="GET" value="GET" />
            <el-option label="POST" value="POST" />
            <el-option label="PUT" value="PUT" />
            <el-option label="DELETE" value="DELETE" />
          </el-select>
        </el-form-item>

        <el-form-item label="排序号" prop="sort">
          <el-input-number v-model="permissionForm.sort" :min="0" controls-position="right" style="width: 100%" />
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
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import { useAuthStore } from '@/config/store.js'
import sysPermissionApi from '@/api/sysPermission.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Search, Refresh, Edit, Delete } from '@element-plus/icons-vue'

const authStore = useAuthStore()

// 响应式数据
const loading = ref(false)
const saving = ref(false)
const dialogVisible = ref(false)
const isEdit = ref(false)
const isAddChild = ref(false)
const permissionFormRef = ref()

// 权限列表数据
const permissionList = ref([])
const permissionTreeData = ref([])

// 搜索表单
const searchForm = reactive({
  permissionName: '',
  permissionCode: '',
  permissionType: ''
})

// 权限表单
const permissionForm = reactive({
  id: null,
  permissionName: '',
  permissionCode: '',
  permissionType: '',
  parentId: null,
  url: '',
  method: '',
  sort: 0
})

// 表单验证规则
const permissionRules = {
  permissionName: [
    { required: true, message: '请输入权限名称', trigger: 'blur' },
    { min: 2, max: 50, message: '权限名称长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  permissionCode: [
    { required: true, message: '请输入权限编码', trigger: 'blur' },
    { min: 2, max: 50, message: '权限编码长度在 2 到 50 个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z][a-zA-Z0-9_:]*$/, message: '权限编码只能包含字母、数字、下划线和冒号，且以字母开头', trigger: 'blur' }
  ],
  permissionType: [
    { required: true, message: '请选择权限类型', trigger: 'change' }
  ],
  url: [
    { max: 200, message: '资源路径长度不能超过 200 个字符', trigger: 'blur' }
  ],
  method: [
    { max: 10, message: '请求方法长度不能超过 10 个字符', trigger: 'blur' }
  ]
}

// 计算属性
const dialogTitle = computed(() => {
  if (isAddChild.value) return '添加下级权限'
  return isEdit.value ? '编辑权限' : '新增权限'
})

const hasPermission = (permission) => authStore.hasPermission(permission)

// 获取权限类型文本描述
const getPermissionTypeText = (type) => {
  const typeMap = {
    '1': '菜单',
    '2': '按钮',
    '3': '接口'
  }
  return typeMap[type] || '未知'
}

/**
 * 加载权限列表（使用list接口而非page接口）
 */
const loadPermissionList = async () => {
  loading.value = true
  try {
    // 构建查询参数，权限类型默认不传
    const params = {}
    
    if (searchForm.permissionName) {
      params.permissionName = searchForm.permissionName
    }
    
    if (searchForm.permissionCode) {
      params.permissionCode = searchForm.permissionCode
    }
    
    // 权限类型默认不传，只有选择了才传
    if (searchForm.permissionType) {
      params.permissionType = searchForm.permissionType
    }

    // 使用list接口而非page接口
    const response = await sysPermissionApi.list(params)
    if (response && response.code === 200) {
      const records = response.data || []
      // 转换为树形结构
      permissionList.value = buildTree(records)
      
      // 构建权限树用于上级权限选择（排除当前编辑的节点及其子节点）
      buildPermissionTree(records)
    } else {
      ElMessage.error('获取权限列表失败')
    }
  } catch (error) {
    console.error('加载权限列表失败:', error)
    ElMessage.error('加载权限列表失败: ' + (error.message || '未知错误'))
  } finally {
    loading.value = false
  }
}

/**
 * 构建树形结构
 */
const buildTree = (data) => {
  const map = {}
  const roots = []
  
  // 初始化所有节点
  data.forEach(item => {
    map[item.id] = { ...item, children: [] }
  })
  
  // 构建树结构
  data.forEach(item => {
    const node = map[item.id]
    if (!item.parentId || item.parentId === 0) {
      roots.push(node)
    } else {
      const parent = map[item.parentId]
      if (parent) {
        parent.children.push(node)
      }
    }
  })
  
  return roots
}

/**
 * 构建权限树（用于选择上级权限）
 */
const buildPermissionTree = (data) => {
  // 如果是编辑状态，需要排除当前节点及其子节点，防止自己选自己作为父节点
  const idToExclude = isEdit.value ? permissionForm.id : null
  const idsToExclude = new Set()
  
  if (idToExclude) {
    // 收集需要排除的节点ID（包括子节点）
    const collectIds = (id) => {
      idsToExclude.add(id)
      data.filter(item => item.parentId === id).forEach(child => {
        collectIds(child.id)
      })
    }
    collectIds(idToExclude)
  }
  
  // 构建树，排除指定节点
  const map = {}
  const roots = []
  
  // 初始化所有节点（排除需要排除的节点）
  data.filter(item => !idsToExclude.has(item.id)).forEach(item => {
    map[item.id] = { ...item, children: [] }
  })
  
  // 构建树结构
  data.filter(item => !idsToExclude.has(item.id)).forEach(item => {
    const node = map[item.id]
    if (!item.parentId || item.parentId === 0) {
      roots.push(node)
    } else {
      const parent = map[item.parentId]
      if (parent) {
        parent.children.push(node)
      }
    }
  })
  
  permissionTreeData.value = roots
}

/**
 * 搜索
 */
const handleSearch = () => {
  loadPermissionList()
  ElMessage.success('搜索成功')
}

/**
 * 重置搜索
 */
const handleReset = () => {
  searchForm.permissionName = ''
  searchForm.permissionCode = ''
  searchForm.permissionType = ''
  loadPermissionList()
  ElMessage.info('搜索条件已重置')
}

/**
 * 新增权限
 */
const handleAdd = () => {
  isEdit.value = false
  isAddChild.value = false
  resetPermissionForm()
  nextTick(() => {
    if (permissionFormRef.value) {
      permissionFormRef.value.clearValidate()
    }
  })
  // 重新加载权限树
  loadPermissionList().then(() => {
    dialogVisible.value = true
  })
}

/**
 * 添加下级权限
 */
const handleAddChild = (permission) => {
  isEdit.value = false
  isAddChild.value = true
  resetPermissionForm()
  permissionForm.parentId = permission.id
  nextTick(() => {
    if (permissionFormRef.value) {
      permissionFormRef.value.clearValidate()
    }
  })
  // 重新加载权限树
  loadPermissionList().then(() => {
    dialogVisible.value = true
  })
}

/**
 * 编辑权限
 */
const handleEdit = (permission) => {
  isEdit.value = true
  isAddChild.value = false
  Object.assign(permissionForm, {
    id: permission.id,
    permissionName: permission.permissionName,
    permissionCode: permission.permissionCode,
    permissionType: permission.permissionType,
    parentId: permission.parentId,
    url: permission.url,
    method: permission.method,
    sort: permission.sort
  })
  nextTick(() => {
    if (permissionFormRef.value) {
      permissionFormRef.value.clearValidate()
    }
  })
  // 重新加载权限树（排除当前节点及其子节点）
  loadPermissionList().then(() => {
    dialogVisible.value = true
  })
}

/**
 * 删除权限
 */
const handleDelete = async (permission) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除权限 "${permission.permissionName}" 吗？此操作将同时删除其所有子权限。`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )

    const response = await sysPermissionApi.remove(permission.id)
    if (response !== undefined) {
      ElMessage.success('删除成功')
      loadPermissionList()
    } else {
      ElMessage.error('删除失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除权限失败:', error)
      ElMessage.error('删除失败')
    }
  }
}

/**
 * 保存权限
 */
const handleSave = async () => {
  if (!permissionFormRef.value) return

  try {
    await permissionFormRef.value.validate()

    saving.value = true

    const permissionData = {
      id: permissionForm.id,
      permissionName: permissionForm.permissionName,
      permissionCode: permissionForm.permissionCode,
      permissionType: permissionForm.permissionType,
      parentId: permissionForm.parentId || 0, // 如果没有父节点，默认为0
      url: permissionForm.url,
      method: permissionForm.method,
      sort: permissionForm.sort
    }

    const response = await sysPermissionApi.save(permissionData)

    if (response !== undefined) {
      ElMessage.success(isEdit.value ? '更新成功' : '创建成功')
      dialogVisible.value = false
      loadPermissionList()
    } else {
      ElMessage.error('保存失败')
    }
  } catch (error) {
    console.error('保存权限失败:', error)
    ElMessage.error('保存失败')
  } finally {
    saving.value = false
  }
}

/**
 * 重置权限表单
 */
const resetPermissionForm = () => {
  Object.assign(permissionForm, {
    id: null,
    permissionName: '',
    permissionCode: '',
    permissionType: '',
    parentId: null,
    url: '',
    method: '',
    sort: 0
  })

  if (permissionFormRef.value) {
    permissionFormRef.value.resetFields()
  }
}

// 生命周期
onMounted(() => {
  loadPermissionList()
})
</script>

<style scoped>

</style>