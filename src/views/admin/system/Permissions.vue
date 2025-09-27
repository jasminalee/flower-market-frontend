<template>
  <div class="permissions-page">
    <!-- 页面头部（使用 Element Plus 的 el-page-header） -->
    <el-page-header class="page-header" :title="'权限管理'">
      <template #content>
        管理系统中的所有权限和菜单配置
      </template>
    </el-page-header>

    <!-- 搜索和筛选 -->
    <el-card class="filter-card">
      <el-row type="flex" justify="space-between" align="middle" class="filters-bar">
        <el-col :span="18">
          <el-form :model="searchForm" inline>
            <el-form-item label="关键字">
              <el-input
                  class="search-input"
                  v-model="searchForm.keyword"
                  placeholder="搜索权限名称或编码"
                  clearable
                  @keyup.enter="handleSearch"
              >
                <template #prefix>
                  <el-icon>
                    <Search/>
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item label="类型">
              <el-select v-model="searchForm.type" placeholder="选择类型" clearable>
                <el-option label="菜单" value="menu"/>
                <el-option label="按钮" value="button"/>
              </el-select>
            </el-form-item>

            <el-form-item label="状态">
              <el-select v-model="searchForm.status" placeholder="选择状态" clearable>
                <el-option label="启用" value="active"/>
                <el-option label="禁用" value="disabled"/>
              </el-select>

            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSearch">查询</el-button>
              <el-button @click="handleReset">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>

        <el-col :span="6" style="text-align: right;">
          <el-button
              type="primary"
              @click="handleAdd"
              v-if="hasPermission('system:permission:create')"
          >
            <el-icon>
              <Plus/>
            </el-icon>
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
                <component :is="row.icon"/>
              </el-icon>
              {{ row.name }}
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="code" label="权限编码" min-width="180"/>

        <el-table-column label="类型" width="100">
          <template #default="{ row }">
            <el-tag :type="row.type === 'menu' ? 'primary' : 'success'" size="small">
              {{ row.type === 'menu' ? '菜单' : '按钮' }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="path" label="路由路径" min-width="160"/>

        <el-table-column prop="sort" label="排序" width="80"/>

        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'danger'" size="small">
              {{ row.status === 'active' ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="description" label="描述" min-width="200"/>
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
                <component :is="data.icon"/>
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
import {ref, reactive, onMounted} from 'vue'
import {useAuthStore} from '@/config/store.js'
import {mockApi} from '@/config/mock.js'
import {ElMessage} from 'element-plus'
import {Search, Refresh, Plus} from '@element-plus/icons-vue'

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

/**
 * 新增权限
 */
const handleAdd = () => {
  // TODO: 实现新增权限逻辑
  ElMessage.success('新增权限功能尚未实现')
}

// 生命周期
onMounted(() => {
  loadPermissionList()
  loadPermissionTree()
})
</script>
