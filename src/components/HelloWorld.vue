<script setup>
import { ref } from 'vue';
import axios from 'axios';

defineProps({
  msg: {
    type: String,
    required: true,
  },
})

// 存储用户数据
const userData = ref(null);
// 加载状态
const loading = ref(false);


// 请求用户数据
const fetchUserData = async () => {
  try {
    loading.value = true;
    const response = await axios.get('http://localhost:18091/users');
    userData.value = response.data;
  } catch (error) {
    console.error('请求失败:', error);
    alert('获取数据失败，请检查接口是否可用');
  } finally {
    loading.value = false;
  }
};

// 2.清空数据
const clearData = () => {
  userData.value = null;
};
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      你成功的创建了vue项目！
      <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </h3>
    <!-- 按钮区域 -->
    <div class="button-group" style="margin-top: 20px;">
      <button
          @click="fetchUserData"
          :disabled="loading"
          style="padding: 8px 16px; margin-right: 10px; cursor: pointer;"
      >
        {{ loading ? '加载中...' : '请求用户数据' }}
      </button>
      <button
          @click="clearData"
          style="padding: 8px 16px; cursor: pointer;"
      >
        清空数据
      </button>
    </div>

    <!-- 数据展示区域 -->
    <div class="user-data" style="margin-top: 20px; padding: 10px; border: 1px solid #eee;">
      <h4>用户数据:</h4>
      <pre v-if="userData">{{ JSON.stringify(userData, null, 2) }}</pre>
      <p v-else>暂无数据</p>
    </div>

  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
