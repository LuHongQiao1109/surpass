# React 18 核心技术点学习大纲

## 一、React 基础概念

### 1.1 JSX 语法
- JSX 基本语法规则
- JavaScript 表达式嵌入 `{}`
- 属性传递（字符串 vs 表达式）
- 子节点传递
- JSX 与 `React.createElement` 的关系

### 1.2 组件基础
- 函数组件（Function Components）
- 类组件（Class Components）- 了解即可
- 组件的 props
- 组件的 state
- 受控组件 vs 非受控组件

### 1.3 渲染基础
- ReactDOM.createRoot (React 18 新 API)
- 组件生命周期（函数组件中使用 useEffect）
- 条件渲染
- 列表渲染与 key

---

## 二、React Hooks（核心）

### 2.1 基础 Hooks
| Hook | 用途 |
|------|------|
| `useState` | 状态管理 |
| `useEffect` | 副作用处理 |
| `useContext` | 上下文订阅 |

### 2.2 附加 Hooks
| Hook | 用途 |
|------|------|
| `useReducer` | 复杂状态管理 |
| `useCallback` | 缓存回调函数 |
| `useMemo` | 缓存计算结果 |
| `useRef` | 引用 DOM 或保存可变值 |

### 2.3 自定义 Hooks
- 提取复用逻辑
- Hooks 命名规范（`useXxx`）
- Hooks 规则（只能在顶层调用、只能在函数组件中调用）

---

## 三、React 18 新特性

### 3.1 并发特性（Concurrent Features）
- **自动批处理（Automatic Batching）**
  - React 17 vs React 18 批处理差异
  - `flushSync` 强制同步刷新

- **过渡更新（Transitions）**
  - `useTransition` Hook
  - `startTransition` API
  - 紧急更新 vs 非紧急更新

- **Suspense 改进**
  - 数据预加载
  - 加载状态管理

### 3.2 新 Hooks
| Hook | 用途 |
|------|------|
| `useId` | 生成唯一 ID（无障碍访问） |
| `useSyncExternalStore` | 同步外部数据源 |
| `useInsertionEffect` | CSS-in-JS 库使用 |

### 3.3 服务端渲染（SSR）改进
- `renderToPipeableStream`
- `Suspense` 流式 SSR
- Selective Hydration

---

## 四、状态管理

### 4.1 本地状态
- `useState`
- `useReducer`

### 4.2 全局状态
- Context API
  - `createContext`
  - `useContext`
  - Provider 模式

### 4.3 第三方状态管理库
- Redux Toolkit（推荐）
- Zustand
- Jotai
- Recoil

---

## 五、性能优化

### 5.1 组件优化
- `React.memo` - 记忆化组件
- `useMemo` - 记忆化计算
- `useCallback` - 记忆化函数

### 5.2 代码分割
- `React.lazy` - 懒加载组件
- `Suspense` - 加载回退
- 动态 `import()`

### 5.3 渲染优化
- 合理使用 `key`
- 避免内联对象/函数作为 props
- 使用 React DevTools Profiler

---

## 六、路由（React Router v6+）

### 6.1 基础路由
- `BrowserRouter`
- `Routes` / `Route`
- `Link` / `NavLink`
- `useNavigate`
- `useParams`

### 6.2 高级路由
- 嵌套路由
- 动态路由
- 路由守卫
- 懒加载路由

---

## 七、数据获取

### 7.1 基础方案
- `fetch` / `axios`
- `useEffect` + 状态管理

### 7.2 服务端状态管理（推荐）
- **React Query / TanStack Query**
  - 查询缓存
  - 自动重新验证
  - 乐观更新
- **SWR** (Vercel)
- **RTK Query**

---

## 八、表单处理

### 8.1 受控组件
- 基础表单控件
- 表单验证

### 8.2 表单库
- **React Hook Form**（推荐）
- Formik
- Zod（表单验证）

---

## 九、TypeScript 与 React

### 9.1 基础类型
- 组件 Props 类型
- State 类型
- Event 类型

### 9.2 Hooks 类型
- `useState<T>`
- `useRef<T>`
- 自定义 Hooks 泛型

### 9.3 高级类型
- `React.FC` / `React.FunctionComponent`
- `React.ReactNode`
- 泛型组件

---

## 十、测试

### 10.1 测试工具
- Jest
- React Testing Library
- Vitest（Vite 项目推荐）

### 10.2 测试类型
- 单元测试
- 组件测试
- E2E 测试（Playwright / Cypress）

---

## 十一、工程化

### 11.1 构建工具
- **Vite**（推荐）
- Create React App（传统）
- Next.js（SSR/SSG）

### 11.2 代码规范
- ESLint
- Prettier
- Husky + lint-staged

### 11.3 样式方案
- CSS Modules
- Styled-components
- Emotion
- Tailwind CSS
- CSS-in-JS

---

## 十二、学习路径建议

```
第 1 周：React 基础 + JSX + 组件
第 2 周：Hooks 基础（useState, useEffect）
第 3 周：Hooks 进阶（useContext, useReducer, useRef）
第 4 周：React 18 新特性 + 性能优化
第 5 周：React Router + 数据获取
第 6 周：TypeScript + 表单处理
第 7 周：测试 + 工程化
第 8 周：实战项目
```

---

## 十三、推荐资源

### 官方文档
- [React 官方文档](https://react.dev/)
- [React 18 更新日志](https://reactjs.org/blog/2022/03/29/react-v18.html)

### 实践项目
- Todo List
- 博客系统
- 电商前台
- 后台管理系统

### 常用工具链
```bash
# 推荐技术栈
Vite + React 18 + TypeScript + React Router + React Query + Zustand + Tailwind CSS
```

---

## 十四、React 18 迁移注意事项

1. **必须修改**
   - `ReactDOM.render` → `ReactDOM.createRoot`

2. **兼容性**
   - 大部分代码无需修改
   - 注意异步批处理可能影响的状态更新顺序

3. **新特性逐步采用**
   - 先使用自动批处理
   - 再考虑 `useTransition` 等并发特性
