<template>
  <el-page-header class="page-header" title="个人中心">
    <template #content>
      收获地址
    </template>
  </el-page-header>
  <div class="shipping-address-container">
    <!-- 地址列表 -->
    <el-card class="shipping-address-card">
      <div class="address-list">
        <div 
          v-for="address in addressList" 
          :key="address.id"
          class="address-card"
          :class="{ 'default': address.isDefault === 1 }"
        >
          <el-tag v-if="address.isDefault === 1" class="default-tag" type="primary">默认地址</el-tag>
          <div class="receiver-info">
            <span>{{ address.receiverName }}</span>
            <span v-if="address.isDefault !== 1" class="set-default" @click="setDefault(address)">
              设为默认
            </span>
          </div>
          <div class="receiver-phone">{{ address.receiverPhone }}</div>
          <div class="address-detail">
            {{ address.province }}{{ address.city }}{{ address.district }}{{ address.detailAddress }}
          </div>
          <div class="address-actions">
            <el-button size="small" @click="editAddress(address)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteAddress(address)">删除</el-button>
          </div>
        </div>
        
        <!-- 新增地址按钮放在列表末尾 -->
        <div class="address-card add-address-card" @click="showAddForm">
          <div class="add-address-content">
            <el-icon size="24"><Plus /></el-icon>
            <span>新增收货地址</span>
          </div>
        </div>
      </div>
      
      <!-- 空状态 -->
      <el-empty v-if="addressList.length === 0 && !showAddCardOnly" description="暂无收货地址">
        <el-button type="primary" @click="showAddForm">新增地址</el-button>
      </el-empty>
    </el-card>
    
    <!-- 地址表单对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑收货地址' : '新增收货地址'"
      width="600px"
      @close="resetForm"
    >
      <el-form
        ref="addressFormRef"
        :model="addressForm"
        :rules="addressRules"
        label-width="100px"
        class="address-form"
      >
        <el-form-item label="收货人" prop="receiverName">
          <el-input v-model="addressForm.receiverName" placeholder="请输入收货人姓名" />
        </el-form-item>
        
        <el-form-item label="联系电话" prop="receiverPhone">
          <el-input v-model="addressForm.receiverPhone" placeholder="请输入联系电话" />
        </el-form-item>
        
        <el-form-item label="所在地区" required>
          <el-cascader
            v-model="selectedRegion"
            :options="regionOptions"
            :props="{ expandTrigger: 'hover' }"
            placeholder="请选择省/市/区"
            style="width: 100%"
            @change="handleRegionChange"
          />
        </el-form-item>
        
        <el-form-item label="详细地址" prop="detailAddress">
          <el-input 
            v-model="addressForm.detailAddress" 
            type="textarea" 
            placeholder="请输入详细地址，如道路、门牌号、小区、楼栋号、单元等信息"
            :rows="3"
          />
        </el-form-item>
        
        <el-form-item label="邮政编码" prop="postalCode">
          <el-input v-model="addressForm.postalCode" placeholder="请输入邮政编码" />
        </el-form-item>
        
        <el-form-item label="设为默认" prop="isDefault">
          <el-switch v-model="isDefaultAddress" />
        </el-form-item>
      </el-form>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm" :loading="loading">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useAuthStore } from '@/config/store.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import receiverAddressApi from '@/api/receiverAddress.js'
import '@/assets/shippingAddress.css'

// 获取认证存储实例
const authStore = useAuthStore()

// 响应式数据
const addressList = ref([])
const dialogVisible = ref(false)
const isEdit = ref(false)
const loading = ref(false)
const addressFormRef = ref()

// 表单数据
const addressForm = reactive({
  id: undefined,
  userId: undefined,
  receiverName: '',
  receiverPhone: '',
  province: '',
  city: '',
  district: '',
  detailAddress: '',
  postalCode: '',
  isDefault: 0
})

// 默认地址开关
const isDefaultAddress = ref(false)

// 级联选择器选中的地区
const selectedRegion = ref([])

// 控制是否只显示新增卡片
const showAddCardOnly = computed(() => addressList.value.length === 0)

// 地区选项（示例数据）
const regionOptions = [
  {
    value: '北京市',
    label: '北京市',
    children: [
      {
        value: '北京市',
        label: '北京市',
        children: [
          { value: '东城区', label: '东城区' },
          { value: '西城区', label: '西城区' },
          { value: '朝阳区', label: '朝阳区' },
          { value: '丰台区', label: '丰台区' },
          { value: '石景山区', label: '石景山区' }
        ]
      }
    ]
  },
  {
    value: '广东省',
    label: '广东省',
    children: [
      {
        value: '深圳市',
        label: '深圳市',
        children: [
          { value: '南山区', label: '南山区' },
          { value: '福田区', label: '福田区' },
          { value: '罗湖区', label: '罗湖区' }
        ]
      },
      {
        value: '广州市',
        label: '广州市',
        children: [
          { value: '天河区', label: '天河区' },
          { value: '越秀区', label: '越秀区' }
        ]
      }
    ]
  }
]

// 表单验证规则
const addressRules = {
  receiverName: [
    { required: true, message: '请输入收货人姓名', trigger: 'blur' }
  ],
  receiverPhone: [
    { required: true, message: '请输入联系电话', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  detailAddress: [
    { required: true, message: '请输入详细地址', trigger: 'blur' }
  ],
  postalCode: [
    { pattern: /^[1-9]\d{5}$/, message: '请输入正确的邮政编码', trigger: 'blur' }
  ]
}

/**
 * 显示新增表单
 */
const showAddForm = () => {
  isEdit.value = false
  dialogVisible.value = true
}

/**
 * 编辑地址
 */
const editAddress = (address) => {
  isEdit.value = true
  // 填充表单数据
  Object.assign(addressForm, address)
  isDefaultAddress.value = address.isDefault === 1
  
  // 设置级联选择器的值
  if (address.province && address.city && address.district) {
    selectedRegion.value = [address.province, address.city, address.district]
  }
  
  dialogVisible.value = true
}

/**
 * 删除地址
 */
const deleteAddress = (address) => {
  ElMessageBox.confirm(
    `确定要删除收货地址"${address.receiverName}"吗？`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(async () => {
    try {
      const result = await receiverAddressApi.remove(address.id)
      if (result && result.code === 200) {
        ElMessage.success('删除成功')
        loadAddressList()
      } else {
        ElMessage.error(result?.message || '删除失败')
      }
    } catch (error) {
      ElMessage.error('删除失败：' + (error.message || '网络错误'))
    }
  }).catch(() => {
    // 用户取消操作
  })
}

/**
 * 设置默认地址
 */
const setDefault = async (address) => {
  try {
    // 先将所有地址设为非默认
    for (const addr of addressList.value) {
      if (addr.isDefault === 1) {
        addr.isDefault = 0
        await receiverAddressApi.save(addr)
      }
    }
    
    // 再将当前地址设为默认
    address.isDefault = 1
    const result = await receiverAddressApi.save(address)
    
    if (result && result.code === 200) {
      ElMessage.success('设置默认地址成功')
      loadAddressList()
    } else {
      ElMessage.error(result?.message || '设置失败')
    }
  } catch (error) {
    ElMessage.error('设置失败：' + (error.message || '网络错误'))
  }
}

/**
 * 处理地区选择变化
 */
const handleRegionChange = (value) => {
  if (value && value.length === 3) {
    addressForm.province = value[0]
    addressForm.city = value[1]
    addressForm.district = value[2]
  }
}

/**
 * 提交表单
 */
const submitForm = async () => {
  if (!addressFormRef.value) return
  
  await addressFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        // 设置用户ID
        addressForm.userId = authStore.user.id
        
        // 设置是否默认地址
        addressForm.isDefault = isDefaultAddress.value ? 1 : 0
        
        // 调用API保存地址
        const result = await receiverAddressApi.save(addressForm)
        
        if (result && result.code === 200) {
          ElMessage.success(isEdit.value ? '更新成功' : '新增成功')
          dialogVisible.value = false
          loadAddressList()
        } else {
          ElMessage.error(result?.message || (isEdit.value ? '更新失败' : '新增失败'))
        }
      } catch (error) {
        ElMessage.error((isEdit.value ? '更新失败' : '新增失败') + '：' + (error.message || '网络错误'))
      } finally {
        loading.value = false
      }
    }
  })
}

/**
 * 重置表单
 */
const resetForm = () => {
  if (addressFormRef.value) {
    addressFormRef.value.resetFields()
  }
  
  // 重置表单数据
  Object.assign(addressForm, {
    id: undefined,
    userId: undefined,
    receiverName: '',
    receiverPhone: '',
    province: '',
    city: '',
    district: '',
    detailAddress: '',
    postalCode: '',
    isDefault: 0
  })
  
  // 重置级联选择器
  selectedRegion.value = []
  isDefaultAddress.value = false
}

/**
 * 加载地址列表
 */
const loadAddressList = async () => {
  try {
    if (authStore.user && authStore.user.id) {
      const result = await receiverAddressApi.listByUserId(authStore.user.id)
      
      if (result && result.code === 200) {
        addressList.value = result.data || []
      } else {
        ElMessage.error('获取地址列表失败: ' + (result?.message || '未知错误'))
      }
    }
  } catch (error) {
    ElMessage.error('获取地址列表失败：' + (error.message || '网络错误'))
  }
}

// 组件挂载时加载地址列表
onMounted(() => {
  loadAddressList()
})
</script>

<style src="@/assets/shippingAddress.css" scoped>

</style>