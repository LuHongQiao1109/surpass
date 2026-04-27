# React Router 使用指南

## 一、React Router 简介

React Router 是 React 应用最流行的路由库，允许你在应用中实现客户端路由，无需重新加载页面即可在不同视图之间导航。

### 为什么需要客户端路由？

| 传统服务端路由       | 客户端路由（React Router） |
| -------------------- | -------------------------- |
| 每次跳转都请求服务器 | 无需刷新页面               |
| 页面加载慢           | 快速切换视图               |
| 用户体验较差         | 流畅的 SPA 体验            |

---

## 二、已安装依赖

```json
{
  "dependencies": {
    "react-router-dom": "^7.14.2"
  }
}
```

**注意：** React Router v7 合并了 `react-router` 和 `react-router-dom`，现在只需安装 `react-router-dom`。

---

## 三、项目结构

```
src/
├── main.tsx              # 入口文件，配置 BrowserRouter
├── App.tsx               # 主组件，包含 Layout 和 Routes
├── components/
│   └── Layout.tsx        # 布局组件（导航栏 + 页脚）
├── pages/
│   ├── Home.tsx          # 首页
│   ├── About.tsx         # 关于页
│   ├── Users.tsx         # 用户列表页
│   ├── UserDetail.tsx    # 用户详情页（动态路由）
│   └── NotFound.tsx      # 404 页面
└── routes/
    ├── index.tsx         # 路由递归渲染组件
    ├── config.ts         # 路由配置文件
    ├── types.ts          # 路由类型定义
    └── ProtectedRoute.tsx # 受保护的路由组件
```

---

## 四、核心概念

### 4.1 BrowserRouter

`BrowserRouter` 是使用 HTML5 history API（pushState, replaceState, popState）的路由器，让 UI 与 URL 同步。

```tsx
// src/main.tsx
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
```

### 4.2 Routes 和 Route

`Routes` 是路由容器，`Route` 定义单个路由规则。

```tsx
// src/routes/index.tsx
import { Routes, Route } from 'react-router-dom'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  )
}
```

### 4.3 Link

`Link` 用于声明式导航，点击时不会刷新页面。

```tsx
import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <nav>
      <Link to="/">首页</Link>
      <Link to="/about">关于</Link>
      <Link to="/users">用户</Link>
    </nav>
  )
}
```

### 4.4 useLocation

获取当前 URL 位置信息，常用于高亮当前导航项。

```tsx
import { useLocation } from 'react-router-dom'

function Layout() {
  const location = useLocation()
  console.log(location.pathname) // 输出：/about

  return <div>当前路径：{location.pathname}</div>
}
```

### 4.5 useParams

获取动态路由参数。

```tsx
import { useParams } from 'react-router-dom'

function UserDetail() {
  const { id } = useParams<{ id: string }>()
  // 如果 URL 是 /users/123，则 id = "123"

  return <div>用户 ID: {id}</div>
}
```

### 4.6 useNavigate

编程式导航，用于在代码中跳转。

```tsx
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  const handleLogin = () => {
    // 登录成功后跳转
    navigate('/dashboard')
    // 或者带参数
    navigate('/dashboard', { replace: true })
  }

  return <button onClick={handleLogin}>登录</button>
}
```

---

## 五、路由配置详解

### 5.1 基础路由

```tsx
<Routes>
  {/* 精确匹配 */}
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
```

### 5.2 动态路由

```tsx
<Routes>
  {/* :id 是动态参数 */}
  <Route path="/users/:id" element={<UserDetail />} />
  {/* 多个参数 */}
  <Route path="/users/:userId/posts/:postId" element={<PostDetail />} />
</Routes>
```

### 5.3 嵌套路由

```tsx
<Routes>
  <Route path="/dashboard" element={<Dashboard />}>
    <Route index element={<DashboardHome />} />
    <Route path="stats" element={<Stats />} />
    <Route path="settings" element={<Settings />} />
  </Route>
</Routes>
```

### 5.4 404 路由

```tsx
<Routes>
  {/* 其他路由都不匹配时显示 */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

### 5.5 重定向

```tsx
<Routes>
  {/* 访问 /old 时重定向到 /new */}
  <Route path="/old" element={<Navigate to="/new" replace />} />
</Routes>
```

---

## 六、完整示例

### 6.1 入口文件配置

```tsx
// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

### 6.2 路由配置

```tsx
// src/routes/index.tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Users from '../pages/Users'
import UserDetail from '../pages/UserDetail'
import NotFound from '../pages/NotFound'

function AppRoutes() {
  return (
    <Routes>
      {/* 首页 */}
      <Route path="/" element={<Home />} />

      {/* 关于页面 */}
      <Route path="/about" element={<About />} />

      {/* 用户列表 */}
      <Route path="/users" element={<Users />} />

      {/* 用户详情（动态路由） */}
      <Route path="/users/:id" element={<UserDetail />} />

      {/* 重定向示例 */}
      <Route path="/old-home" element={<Navigate to="/" replace />} />

      {/* 404 页面 - 必须放在最后 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
```

### 6.3 布局组件

```tsx
// src/components/Layout.tsx
import { Link, useLocation, Outlet } from 'react-router-dom'

function Layout() {
  const location = useLocation()

  const navItems = [
    { path: '/', label: '首页' },
    { path: '/about', label: '关于' },
    { path: '/users', label: '用户' },
  ]

  return (
    <div className=" bg-gray-100">
      {/* 导航栏 */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <Link to="/" className="text-xl font-bold text-indigo-600">
              Logo
            </Link>
            <div className="flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md ${
                    location.pathname === item.path
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="py-6">
        <Outlet /> {/* 或者 {children} */}
      </main>
    </div>
  )
}

export default Layout
```

### 6.4 主组件

```tsx
// src/App.tsx
import Layout from '@/components/Layout'
import AppRoutes from '@/routes'

function App() {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  )
}

export default App
```

### 6.5 页面组件示例

```tsx
// src/pages/Home.tsx
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className=" bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <h1 className="text-5xl font-bold text-indigo-600 mb-8">首页</h1>

      <div className="grid gap-6">
        <Link to="/about" className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-semibold">关于我</h2>
          <p>了解更多关于我的信息...</p>
        </Link>

        <Link to="/users" className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-semibold">用户列表</h2>
          <p>查看所有用户...</p>
        </Link>
      </div>
    </div>
  )
}

export default Home
```

---

## 七、编程式导航

### 7.1 使用 useNavigate

```tsx
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await login(credentials)

    if (success) {
      // 跳转到首页
      navigate('/')
    }
  }

  return <form onSubmit={handleSubmit}>...</form>
}
```

### 7.2 带参数导航

```tsx
// 跳转到用户详情
navigate(`/users/${userId}`)

// 跳转并替换历史记录（不能返回）
navigate('/dashboard', { replace: true })

// 返回上一页
navigate(-1)
```

---

## 八、受保护的路由（路由守卫）

### 8.1 创建私有路由组件

```tsx
// src/components/PrivateRoute.tsx
import { Navigate, useLocation } from 'react-router-dom'

interface PrivateRouteProps {
  children: React.ReactNode
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const location = useLocation()
  const isAuthenticated = localStorage.getItem('token') // 检查登录状态

  if (!isAuthenticated) {
    // 重定向到登录页，并保存当前路径
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default PrivateRoute
```

### 8.2 使用私有路由

```tsx
// src/routes/index.tsx
import PrivateRoute from '@/components/PrivateRoute'

;<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />

  {/* 需要登录才能访问 */}
  <Route
    path="/dashboard"
    element={
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    }
  />
</Routes>
```

---

## 九、懒加载路由

### 9.1 使用 React.lazy 和 Suspense

```tsx
import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

// 懒加载组件
const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const Users = lazy(() => import('@/pages/Users'))

function AppRoutes() {
  return (
    <Suspense fallback={<div className="loading">加载中...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Suspense>
  )
}
```

---

## 十、搜索参数和状态

### 10.1 使用 useSearchParams

```tsx
import { useSearchParams } from 'react-router-dom'

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('q') // 获取 ?q=xxx

  const handleSearch = (newQuery) => {
    setSearchParams({ q: newQuery })
  }

  return (
    <div>
      <input
        value={query || ''}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  )
}
```

### 10.2 使用 location.state

```tsx
// 跳转时传递状态
navigate('/result', { state: { data: result } })

// 在目标页面接收
const location = useLocation()
const { data } = location.state
```

---

## 十一、常见问题

### Q1: 刷新页面后 404？

**原因：** 服务端没有正确配置。SPA 应用需要将所有路由指向 `index.html`。

**Vite 开发服务器：** 自动处理，无需配置。

**生产环境（Nginx 示例）：**

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### Q2: 如何在路由跳转时传递数据？

使用 `location.state`：

```tsx
// 发送
navigate('/detail', { state: { user } })

// 接收
const { state } = useLocation()
const user = state?.user
```

### Q3: 如何实现路由切换动画？

使用 `CSSTransition`：

```tsx
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useLocation } from 'react-router-dom'

function App() {
  const location = useLocation()

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} timeout={300} classNames="fade">
        <Routes location={location}>{/* routes */}</Routes>
      </CSSTransition>
    </TransitionGroup>
  )
}
```

---

## 十二、最佳实践

1. **使用 Link 而非 `<a>` 标签** - 避免页面刷新
2. **404 路由放在最后** - 否则会匹配所有路由
3. **使用绝对路径导入组件** - 避免相对路径混乱
4. **懒加载大型组件** - 优化首屏加载
5. **统一路由配置** - 将路由集中在 `routes/` 目录
6. **使用 TypeScript** - 获得路由参数的类型提示

---

## 十三、快速参考

| Hook / 组件        | 用途         |
| ------------------ | ------------ |
| `BrowserRouter`    | 路由容器     |
| `Routes` / `Route` | 路由定义     |
| `Link`             | 声明式导航   |
| `useNavigate`      | 编程式导航   |
| `useParams`        | 获取路由参数 |
| `useLocation`      | 获取位置信息 |
| `useSearchParams`  | 获取查询参数 |
| `Navigate`         | 重定向       |
| `Outlet`           | 嵌套路由出口 |

---

## 十四、公司标准路由配置（4 点核心）

> **说明：** 公司标准的路由配置需要满足以下 4 点要求，当前项目已完整实现。

### 14.1 懒加载路由（Lazy Loading）

**目的：** 实现代码分割，提升首屏加载性能（FCP）。

**原理：** 每个 `lazy()` 导入的组件会被打包成独立的 chunk 文件，只有访问对应路由时才会加载。

**当前项目实现：** `src/routes/config.ts`

```tsx
// 懒加载页面组件 - Vite 会自动进行代码分割
const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const Users = lazy(() => import('@/pages/Users'))

// 包装组件 - 为懒加载组件添加 Suspense 边界
function withSuspense(element: ReactNode): ReactNode {
  return <Suspense fallback={<LoadingFallback />}>{element}</Suspense>
}
```

**性能优势：**

- 首屏只需加载首页代码，其他页面按需加载
- 显著提升 FCP (First Contentful Paint)
- 减少初始加载时间

---

### 14.2 受保护的路由（路由守卫 / ProtectedRoute）

**目的：** 实现权限控制，保护需要登录或特定角色才能访问的路由。

**原理：** 封装 `ProtectedRoute` 组件，统一处理认证和授权逻辑。

**当前项目实现：** `src/routes/ProtectedRoute.tsx`

```tsx
// 权限控制核心逻辑
function ProtectedRoute({
  children,
  requiredRoles,
  fallback,
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const user = getCurrentUser()

  // 1. 检查是否已登录
  if (!user || !user.isAuthenticated) {
    return (
      <Navigate
        to={`${redirectTo}?redirect=${encodeURIComponent(window.location.pathname)}`}
        replace
      />
    )
  }

  // 2. 检查是否有所需角色 (RBAC)
  if (requiredRoles && !hasRequiredRoles(user.roles, requiredRoles)) {
    return <Navigate to="/403" replace />
  }

  // 3. 验证通过，渲染子组件
  return <>{children}</>
}
```

**使用场景：**

- 用户登录状态验证
- 管理员页面权限控制（RBAC）
- 会员专属内容访问控制

---

### 14.3 嵌套路由（Nested Routes）

**目的：** 支持父子路由结构，实现布局嵌套。

**原理：** 使用 `children` 配置嵌套路由，通过 `<Outlet />` 渲染子路由。

**配置示例：**

```tsx
const routes: RouteConfig[] = [
  {
    path: '/dashboard',
    element: withSuspense(<Dashboard />),
    name: 'dashboard',
    children: [
      {
        path: 'stats', // 完整路径：/dashboard/stats
        element: withSuspense(<Stats />),
      },
      {
        path: 'settings', // 完整路径：/dashboard/settings
        element: withSuspense(<Settings />),
      },
    ],
  },
]
```

**渲染逻辑：** `src/routes/index.tsx` 中的 `renderRoutes` 函数递归处理 `children`。

---

### 14.4 配置化路由（Configuration-Driven）

**目的：** 路由配置与渲染逻辑分离，便于管理和动态修改。

**原理：** 定义路由配置数组，递归生成 `Route` 组件。

**当前项目实现：**

**配置文件：** `src/routes/config.ts`

```tsx
const routes: RouteConfig[] = [
  {
    path: '/login',
    element: withSuspense(<Login />),
    name: 'login',
    meta: { title: '登录', hideInNav: true },
  },
  {
    path: '/test',
    element: withSuspense(<Test />),
    name: 'test',
    meta: { requiresAuth: true }, // 需要登录
  },
]
```

**类型定义：** `src/routes/types.ts`

```tsx
export interface RouteConfig {
  path?: string
  element: ReactNode
  name?: string
  children?: RouteConfig[] // 支持嵌套
  meta?: {
    title?: string
    requiresAuth?: boolean
    roles?: string[]
  }
}
```

**优势：**

- 路由集中管理，易于维护
- 支持动态路由（可从 API 获取配置）
- 便于实现路由权限、面包屑等功能

---

## 十五、路由配置使用示例

### 15.1 添加新路由

在 `config.ts` 中添加配置：

```tsx
const NewPage = lazy(() => import('@/pages/NewPage'))

const routes: RouteConfig[] = [
  // ... 现有路由
  {
    path: '/new-page',
    element: withSuspense(<NewPage />),
    name: 'newPage',
    meta: {
      title: '新页面',
      requiresAuth: true, // 需要登录
    },
  },
]
```

### 15.2 添加嵌套路由

```tsx
{
  path: '/dashboard',
  element: withSuspense(<Dashboard />),
  name: 'dashboard',
  children: [
    {
      path: 'overview',
      element: withSuspense(<Overview />),
      index: true,  // 默认子路由
    },
    {
      path: 'settings',
      element: withSuspense(<Settings />),
    },
  ],
}
```

### 15.3 添加角色权限控制

```tsx
{
  path: '/admin',
  element: withSuspense(<AdminPanel />),
  name: 'adminPanel',
  meta: {
    requiresAuth: true,
    roles: ['admin'],  // 仅管理员可访问
  },
}
```

---

## 十六、参考链接

- [React Router 官方文档](https://reactrouter.com/)
- [React Router GitHub](https://github.com/remix-run/react-router)
