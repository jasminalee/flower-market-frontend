# 花卉市场 (Flower Market)

一个基于Vue 3 + Element Plus的复合型Web应用，包含前台展示网站和后台管理系统。

## 项目概述

本项目是一个复合型Web应用，包含两大核心部分：

1. **前台展示网站** - 面向所有公开用户，用于展示花卉产品
2. **后台管理系统** - 仅供授权的内部员工使用，用于管理网站内容、用户、权限等

## 技术栈

- Vue 3 (Composition API)
- TypeScript
- Element Plus
- Vue Router 4
- Pinia (状态管理)
- Axios (HTTP客户端)
- Vite (构建工具)

## 功能特性

### 前台展示网站
- 响应式产品展示页面
- 关于我们页面
- 导航至后台管理的入口

### 后台管理系统
- 用户认证和权限控制 (RBAC)
- 响应式布局设计 (适配桌面端、平板端、移动端)
- 主题切换功能 (亮色/暗色主题)
- 用户管理模块
- 角色管理模块
- 权限管理框架

## 项目结构

```
src/
├── assets/           # 静态资源文件
├── components/       # 公共组件
├── directives/       # 自定义指令
├── layouts/          # 布局组件
├── router/           # 路由配置
├── services/         # API服务和模拟数据
├── stores/           # Pinia状态管理
├── utils/            # 工具函数
├── views/            # 页面视图
│   ├── public/       # 前台页面
│   └── admin/        # 后台页面
└── App.vue           # 根组件
```

## 安装和运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 开发规范

- 使用TypeScript进行类型检查
- 遵循ESLint和Prettier代码规范
- 组件使用Composition API setup语法糖
- 样式使用scoped CSS避免全局污染
- 路由按功能模块分离
- 状态管理使用Pinia

## 权限管理

本系统实现了基于角色的访问控制(RBAC)：
- 管理员: 拥有所有权限
- 运营人员: 负责商品管理和订单处理
- 客服人员: 负责客户服务和售后处理

## 主题切换

系统支持亮色和暗色主题切换，会根据用户偏好自动保存设置。

## 数据模拟

在后端服务部署前，前端内置了数据模拟机制，确保后台管理系统的所有功能均可独立开发和演示。

## 浏览器兼容性

- Chrome >= 80
- Firefox >= 74
- Safari >= 13
- Edge >= 80

## 许可证

MIT