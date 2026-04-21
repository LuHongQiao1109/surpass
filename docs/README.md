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

### 5. [Tailwind CSS 使用指南.md](./Tailwind CSS 使用指南.md)
**内容：** Tailwind CSS 实用优先 CSS 框架使用指南

**涵盖内容：**
- Tailwind CSS 简介和核心概念
- 项目配置（tailwind.config.js、postcss.config.js）
- 常用工具类速查（布局、间距、尺寸、排版、颜色）
- 响应式设计和伪类
- 实战示例（按钮、卡片、导航栏、表单组件）
- 自定义主题配置
- VS Code 插件推荐
- 最佳实践和快速参考

---

## 快速链接

| 主题 | 文档 |
|------|------|
| React 18 学习路线 | [React18 学习大纲.md](./React18 学习大纲.md) |
| TypeScript 类型声明 | [vite-env.d.ts 详解.md](./vite-env.d.ts 详解.md) |
| 路径别名配置 | [路径别名配置指南.md](./路径别名配置指南.md) |
| 多环境配置 | [多环境配置指南.md](./多环境配置指南.md) |
| Tailwind CSS | [Tailwind CSS 使用指南.md](./Tailwind CSS 使用指南.md) |

---

## 项目结构

```
learn-react/
├── docs/                      # 文档文件夹
│   ├── README.md             # 本索引文件
│   ├── React18 学习大纲.md
│   ├── vite-env.d.ts 详解.md
│   ├── 路径别名配置指南.md
│   ├── 多环境配置指南.md
│   └── Tailwind CSS 使用指南.md
├── src/
│   ├── components/           # 组件目录
│   ├── utils/                # 工具函数
│   ├── hooks/                # 自定义 Hooks
│   ├── views/                # 页面视图
│   ├── App.tsx               # 主组件
│   ├── main.tsx              # 入口文件
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

| 日期 | 内容 |
|------|------|
| 2026-04-21 | 创建文档索引，整理 5 篇学习笔记（新增 Tailwind CSS） |
