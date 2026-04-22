# React 学习笔记索引

本文件夹包含 React 18 + Vite + TypeScript 项目的学习笔记和配置指南。

---

## 文档列表

### 1. [React18 学习大纲.md](./React18 学习大纲.md)
**内容：** React 18 核心技术点学习大纲

**涵盖内容：**
- React 基础概念（JSX、组件、渲染）
- React Hooks（useState、useEffect、useMemo 等）
- React 18 新特性（并发特性、Transitions、Suspense）
- 状态管理（Context、Redux Toolkit、Zustand）
- 性能优化（memo、useMemo、useCallback、代码分割）
- React Router v6+ 路由
- 数据获取（React Query、SWR）
- 表单处理（React Hook Form）
- TypeScript 与 React
- 测试（Jest、React Testing Library）
- 工程化（Vite、ESLint、样式方案）
- 8 周学习路径建议

---

### 2. [vite-env.d.ts 详解.md](./vite-env.d.ts 详解.md)
**内容：** TypeScript 类型声明文件详解

**涵盖内容：**
- vite-env.d.ts 文件的作用
- 引用 Vite 客户端类型
- 解决 CSS 导入报错
- import.meta.env 类型定义
- Vite 内置类型定义表格
- 自定义环境变量和方法
- 完整示例代码
- 使用场景对比

---

### 3. [路径别名配置指南.md](./路径别名配置指南.md)
**内容：** Vite + React + TypeScript 路径别名配置

**涵盖内容：**
- 路径别名概念和对比示例
- 4 步完整配置流程
- 配置原理解析（为什么需要两处配置）
- baseUrl 和 paths 的含义
- ignoreDeprecations 的作用
- 常用别名模式（单一别名、多别名）
- 使用示例和导入演示
- 常见问题解决方案（VSCode、ESLint、重启服务）
- 完整配置文件模板

---

### 4. [TypeScript 入门与项目实战.md](./TypeScript 入门与项目实战.md)
**内容：** TypeScript 类型系统入门 + 本项目实战用法

**涵盖内容：**
- TypeScript 简介和优势
- 核心类型（基础类型、接口、类型别名、泛型）
- React + TypeScript 实战（组件、Hooks、事件类型）
- 工具类型（Partial、Pick、Omit、Record 等）
- 类型守卫与类型断言
- 项目配置文件详解（tsconfig.json、vite-env.d.ts）
- 最佳实践和代码组织建议
- 快速参考表

---

### 6. [React Router 使用指南.md](./React Router 使用指南.md)
**内容：** React Router v7 路由管理使用指南

**涵盖内容：**
- React Router 简介和核心概念
- 路由配置（BrowserRouter、Routes、Route）
- 导航组件（Link、NavLink、Navigate）
- 路由 Hooks（useNavigate、useParams、useLocation）
- 动态路由和嵌套路由
- 编程式导航
- 受保护的路由（路由守卫）
- 懒加载路由
- 搜索参数和状态传递
- **公司标准路由配置（4 点核心）**
  - 懒加载路由（Lazy Loading）
  - 受保护的路由（ProtectedRoute）
  - 嵌套路由（Nested Routes）
  - 配置化路由（Configuration-Driven）
- 常见问题和最佳实践

---

## 快速链接

| 主题                | 文档                                                   |
| ------------------- | ------------------------------------------------------ |
| React 18 学习路线   | [React18 学习大纲.md](./React18 学习大纲.md)           |
| TypeScript 入门     | [TypeScript 入门与项目实战.md](./TypeScript 入门与项目实战.md) |
| 路径别名配置        | [路径别名配置指南.md](./路径别名配置指南.md)           |
| 多环境配置          | [多环境配置指南.md](./多环境配置指南.md)               |
| Tailwind CSS        | [Tailwind CSS 使用指南.md](./Tailwind CSS 使用指南.md) |
| React Router        | [React Router 使用指南.md](./React Router 使用指南.md) |

---

## 项目结构

```
learn-react/
├── docs/                      # 文档文件夹
│   ├── README.md             # 本索引文件
│   ├── React18 学习大纲.md
│   ├── TypeScript 入门与项目实战.md  # 新增
│   ├── vite-env.d.ts 详解.md
│   ├── 路径别名配置指南.md
│   ├── 多环境配置指南.md
│   ├── Tailwind CSS 使用指南.md
│   └── React Router 使用指南.md
├── src/
│   ├── components/           # 组件目录
│   │   ├── Layout.tsx        # 布局组件
│   │   └── ...
│   ├── pages/                # 页面目录
│   │   ├── Home.tsx          # 首页
│   │   ├── About.tsx         # 关于页
│   │   ├── Users.tsx         # 用户列表
│   │   ├── UserDetail.tsx    # 用户详情
│   │   └── NotFound.tsx      # 404 页面
│   ├── routes/               # 路由配置
│   │   └── index.tsx
│   ├── views/                # 视图目录
│   ├── App.tsx               # 主组件
│   ├── main.tsx              # 入口文件（含 BrowserRouter）
│   ├── index.css             # 全局样式（含 Tailwind）
│   └── vite-env.d.ts         # Vite 类型声明
├── .env.development          # 开发环境配置
├── .env.test                 # 测试环境配置
├── .env.production           # 生产环境配置
├── .env.example              # 环境配置示例
├── tailwind.config.js        # Tailwind 配置
├── postcss.config.js         # PostCSS 配置
├── index.html
├── package.json
├── tsconfig.json             # TypeScript 配置
├── tsconfig.node.json        # Vite 配置专用
└── vite.config.ts            # Vite 配置
```

---

## 更新记录

| 日期       | 内容                                          |
| ---------- | --------------------------------------------- |
| 2026-04-22 | 整理 7 篇学习笔记（新增 TypeScript 入门与实战） |
