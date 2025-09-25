<template>
  <div class="role-manage-view">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>角色管理</span>
          <div class="header-actions">
            <el-input
              v-model="searchKeyword"
              placeholder="搜索角色..."
              style="width: 200px; margin-right: 10px;"
              clearable
            />
            <el-button type="primary" @click="handleAddRole">
              <el-icon><Plus /></el-icon>
              添加角色
            </el-button>
          </div>
        </div>
      </template>
      
      <!-- 角色表格 -->
      <el-table :data="filteredRoles" style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="角色名称" />
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="userCount" label="用户数" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)" v-permission="'role.edit'">
              编辑
            </el-button>
            <el-button size="small" @click="handlePermission(scope.row)">
              权限
            </el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)" v-permission="'role.delete'">
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
          :total="totalRoles"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    
    <!-- 角色编辑对话框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
      <el-form
        ref="roleFormRef"
        :model="currentRole"
        :rules="roleFormRules"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="currentRole.name" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="currentRole.description" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 权限配置对话框 -->
    <el-dialog v-model="permissionDialogVisible" title="权限配置" width="600px">
      <el-tree
        ref="permissionTreeRef"
        :data="permissions"
        show-checkbox
        node-key="id"
        :default-checked-keys="selectedPermissions"
        :props="defaultProps"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="permissionDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSavePermissions">保存</el-button>
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
import type { ElTree } from 'element-plus'
import { mockGetRoles, mockRoles, mockPermissions } from '@/services/mockData'

// 表单引用
const roleFormRef = ref<FormInstance>()
const permissionTreeRef = ref<InstanceType<typeof ElTree>>()

// 状态
const loading = ref(false)
const dialogVisible = ref(false)
const permissionDialogVisible = ref(false)
const dialogTitle = ref('')
const isEdit = ref(false)

// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const totalRoles = ref(5)

// 搜索
const searchKeyword = ref('')

// 当前角色数据
const currentRole = reactive({
  id: 0,
  name: '',
  description: '',
  userCount: 0,
  createTime: ''
})

// 角色表单验证规则
const roleFormRules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入角色名称', trigger: 'blur' }
  ],
  description: [
    { required: true, message: '请输入描述', trigger: 'blur' }
  ]
})

// 权限树配置
const defaultProps = {
  children: 'children',
  label: 'label'
}

// 选中的权限
const selectedPermissions = ref([1, 3, 5])

// 权限数据
const permissions = ref([
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
])

// 模拟角色数据
const roles = ref([
  { id: 1, name: '管理员', description: '系统管理员，拥有所有权限', userCount: 1, createTime: '2025-01-01' },
  { id: 2, name: '运营人员', description: '负责商品管理和订单处理', userCount: 3, createTime: '2025-01-02' },
  { id: 3, name: '客服人员', description: '负责客户服务和售后处理', userCount: 2, createTime: '2025-01-03' }
])

// 计算属性 - 过滤后的角色数据
const filteredRoles = computed(() => {
  if (!searchKeyword.value) {
    return roles.value
  }
  const keyword = searchKeyword.value.toLowerCase()
  return roles.value.filter(role => 
    role.name.toLowerCase().includes(keyword) ||
    role.description.toLowerCase().includes(keyword)
  )
})

const loadRoles = async () => {
  loading.value = true
  try {
    // 使用模拟数据服务
    const roleData = await mockGetRoles()
    roles.value = roleData
  } catch (error) {
    ElMessage.error('获取角色数据失败')
  } finally {
    loading.value = false
  }
}

// 组件挂载时加载数据
onMounted(() => {
  loadRoles()
})
const handleAddRole = () => {
  dialogTitle.value = '添加角色'
  isEdit.value = false
  // 重置表单
  Object.assign(currentRole, {
    id: 0,
    name: '',
    description: '',
    userCount: 0,
    createTime: ''
  })
  dialogVisible.value = true
}

const handleEdit = (role: any) => {
  dialogTitle.value = '编辑角色'
  isEdit.value = true
  // 填充表单数据
  Object.assign(currentRole, role)
  dialogVisible.value = true
}

const handlePermission = (role: any) => {
  // 这里应该根据角色加载对应的权限
  permissionDialogVisible.value = true
}

const handleDelete = (role: any) => {
  ElMessageBox.confirm(
    `确定要删除角色"${role.name}"吗？此操作不可恢复！`,
    '确认删除',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'error'
    }
  ).then(() => {
    const index = roles.value.findIndex(r => r.id === role.id)
    if (index > -1) {
      roles.value.splice(index, 1)
      ElMessage.success('删除成功')
    }
  })
}

const handleSubmit = () => {
  if (!roleFormRef.value) return
  
  roleFormRef.value.validate((valid) => {
    if (valid) {
      if (isEdit.value) {
        // 编辑角色
        const index = roles.value.findIndex(r => r.id === currentRole.id)
        if (index > -1) {
          roles.value[index] = { ...currentRole }
          ElMessage.success('更新成功')
        }
      } else {
        // 添加角色
        const newRole = {
          ...currentRole,
          id: roles.value.length + 1,
          userCount: 0,
          createTime: new Date().toISOString().split('T')[0]
        }
        roles.value.push(newRole)
        ElMessage.success('添加成功')
      }
      dialogVisible.value = false
    }
  })
}

const handleSavePermissions = () => {
  // 获取选中的权限节点
  if (permissionTreeRef.value) {
    const checkedKeys = permissionTreeRef.value.getCheckedKeys()
    const halfCheckedKeys = permissionTreeRef.value.getHalfCheckedKeys()
    console.log('选中的权限:', [...checkedKeys, ...halfCheckedKeys])
    ElMessage.success('权限保存成功')
    permissionDialogVisible.value = false
  }
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