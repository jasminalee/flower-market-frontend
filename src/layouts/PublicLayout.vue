<template>
  <div class="public-layout">
    <header class="public-header">
      <div class="header-content">
        <h1 class="logo">花卉市场</h1>
        <nav class="nav-menu">
          <router-link to="/">首页</router-link>
          <router-link to="/about">关于我们</router-link>
          <router-link to="/login">登录</router-link>
        </nav>
      </div>
    </header>
    
    <main class="public-main">
      <slot />
    </main>
    
    <footer class="public-footer">
      <p>&copy; 2025 花卉市场. 保留所有权利.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.public-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.public-header {
  background-color: #42b883;
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.logo {
  margin: 0;
  font-size: 1.5rem;
}

.nav-menu a {
  color: white;
  text-decoration: none;
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-menu a:hover {
  background-color: rgba(255,255,255,0.2);
}

.nav-menu a.router-link-active {
  background-color: rgba(255,255,255,0.3);
}

.public-main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.public-footer {
  background-color: #f5f5f5;
  padding: 1rem;
  text-align: center;
  border-top: 1px solid #e0e0e0;
}
</style>