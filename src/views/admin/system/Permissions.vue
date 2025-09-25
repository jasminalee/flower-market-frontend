<template>
  <div class="permissions-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <h1>权限管理</h1>
          <p>管理系统中的所有权限和菜单配置</p>
        </div>
      </div>
    </div>

    <!-- 搜索和筛选 -->
    <el-card class="filter-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="关键词">
          <el-input
            v-model="searchForm.keyword"
            placeholder="搜索权限名称或编码"
            clearable
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        
        <el-form-item label="类型">
          <el-select v-model="searchForm.type" placeholder="选择类型" clearable>
            <el-option label="菜单" value="menu" />
            <el-option label="按钮" value="button" />
          </el-select>
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
    </el-card>

    <!-- 权限列表 -->
    <el-card class="table-card">
      <el-table
        :data="permissionList"
        :loading="loading"
        row-key="id"
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        stripe
        style="width: 100%"
      >
        <el-table-column prop="name" label="权限名称" min-width="200">
          <template #default="{ row }">
            <div class="permission-name">
              <el-icon v-if="row.icon" :size="16" style="margin-right: 8px;">
                <component :is="row.icon" />
              </el-icon>
              {{ row.name }}
            </div>
          </template>
        </el-table-column>
        
        <el-table-column prop="code" label="权限编码" min-width="180" />
        
        <el-table-column label="类型" width="100">
          <template #default="{ row }">
            <el-tag :type="row.type === 'menu' ? 'primary' : 'success'" size="small">
              {{ row.type === 'menu' ? '菜单' : '按钮' }}
            </el-tag>
          </template>
        </el-table-column>
        
        <el-table-column prop="path" label="路由路径" min-width="160" />
        
        <el-table-column prop="sort" label="排序" width="80" />
        
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'danger'" size="small">
              {{ row.status === 'active' ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        
        <el-table-column prop="description" label="描述" min-width="200" />
      </el-table>
    </el-card>

    <!-- 权限树形展示 -->
    <el-card class="tree-card" style="margin-top: 16px;">
      <template #header>
        <div class="card-header">
          <span>权限树形结构</span>
          <el-button type="text" @click="expandAll">
            {{ allExpanded ? '收起全部' : '展开全部' }}
          </el-button>
        </div>
      </template>
      
      <el-tree
        ref="permissionTreeRef"
        :data="permissionTree"
        :props="treeProps"
        node-key="id"
        :default-expand-all="allExpanded"
        :expand-on-click-node="false"
        class="permission-tree"
      >
        <template #default="{ node, data }">
          <div class="tree-node">
            <div class="node-content">
              <el-icon v-if="data.icon" :size="16" style="margin-right: 8px;">
                <component :is="data.icon" />
              </el-icon>
              <span class="node-label">{{ data.name }}</span>
              <el-tag 
                :type="data.type === 'menu' ? 'primary' : 'success'" 
                size="small" 
                style="margin-left: 8px;"
              >
                {{ data.type === 'menu' ? '菜单' : '按钮' }}
              </el-tag>
            </div>
            <div class="node-extra">
              <span class="permission-code">{{ data.code }}</span>
              <el-tag 
                :type="data.status === 'active' ? 'success' : 'danger'" 
                size="small"
                style="margin-left: 8px;"
              >
                {{ data.status === 'active' ? '启用' : '禁用' }}
              </el-tag>
            </div>
          </div>
        </template>
      </el-tree>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useAuthStore } from '@/store/auth'
import { mockApi } from '@/mock/api'
import { ElMessage } from 'element-plus'
import { Search, Refresh } from '@element-plus/icons-vue'

const authStore = useAuthStore()

// 响应式数据
const loading = ref(false)
const allExpanded = ref(true)
const permissionTreeRef = ref()

// 权限列表数据
const permissionList = ref([])
const permissionTree = ref([])

// 搜索表单
const searchForm = reactive({
  keyword: '',
  type: '',
  status: ''
})

// 树形组件配置
const treeProps = {
  children: 'children',
  label: 'name'
}

// 计算属性
const hasPermission = (permission) => authStore.hasPermission(permission)

/**
 * 加载权限列表
 */
const loadPermissionList = async () => {
  loading.value = true
  try {
    const params = {
      keyword: searchForm.keyword,
      type: searchForm.type,
      status: searchForm.status
    }
    
    const response = await mockApi.permissions.list(params)
    if (response.success) {
      permissionList.value = response.data
    }
  } catch (error) {
    console.error('加载权限列表失败:', error)
    ElMessage.error('加载权限列表失败')
  } finally {
    loading.value = false
  }
}

/**
 * 加载权限树
 */
const loadPermissionTree = async () => {
  try {
    const response = await mockApi.permissions.tree()
    if (response.success) {
      permissionTree.value = response.data
    }
  } catch (error) {
    console.error('加载权限树失败:', error)
    ElMessage.error('加载权限树失败')
  }
}

/**
 * 搜索
 */
const handleSearch = () => {
  loadPermissionList()
}

/**
 * 重置搜索
 */
const handleReset = () => {
  searchForm.keyword = ''
  searchForm.type = ''
  searchForm.status = ''
  loadPermissionList()
}

/**
 * 展开/收起全部
 */
const expandAll = () => {
  allExpanded.value = !allExpanded.value
  
  if (permissionTreeRef.value) {
    const tree = permissionTreeRef.value
    if (allExpanded.value) {
      // 展开全部节点
      permissionTree.value.forEach(node => {
        tree.setExpanded(node.id, true)
        if (node.children) {
          node.children.forEach(child => {
            tree.setExpanded(child.id, true)
          })
        }
      })
    } else {
      // 收起全部节点
      permissionTree.value.forEach(node => {
        tree.setExpanded(node.id, false)
        if (node.children) {
          node.children.forEach(child => {
            tree.setExpanded(child.id, false)
          })
        }
      })
    }
  }
}

// 生命周期
onMounted(() => {
  loadPermissionList()
  loadPermissionTree()
})
</script>

<style scoped>
.permissions-page {
  /* 页面容器样式已在全局定义 */
}

/* 页面头部 */
.page-header {
  margin-bottom: 24px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.header-left h1 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.header-left p {
  color: #666;
  margin: 0;
}

/* 卡片样式 */
.filter-card {
  margin-bottom: 16px;
}

.tree-card .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 权限名称样式 */
.permission-name {
  display: flex;
  align-items: center;
}

/* 权限树样式 */
.permission-tree {
  margin-top: 16px;
}

.tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 16px;
}

.node-content {
  display: flex;
  align-items: center;
}

.node-label {
  font-weight: 500;
}

.node-extra {
  display: flex;
  align-items: center;
}

.permission-code {
  font-size: 12px;
  color: #999;
  font-family: monospace;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .tree-node {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding-right: 8px;
  }

  .node-extra {
    margin-left: 24px;
  }
}

@media (max-width: 480px) {
  .permissions-page {
    padding: 16px;
    margin: -24px;
  }

  .header-left h1 {
    font-size: 1.25rem;
  }
}
</style>