/**
 * 路由配置文件
 *
 * 公司标准做法：
 * 1. 配置化 - 路由集中配置，便于管理和动态修改
 * 2. 懒加载 - 使用 React.lazy() 实现代码分割，提升首屏加载性能
 * 3. 嵌套路由 - 支持 children 配置嵌套路由
 *
 * 性能优势：
 * - 每个 lazy() 导入的组件会被打包成独立的 chunk 文件
 * - 只有访问对应路由时才会加载对应的代码
 * - 首屏只需加载首页相关代码，显著提升 FCP (First Contentful Paint)
 */

import { lazy, Suspense, ReactNode } from 'react'
import { RouteConfig } from './types'

/**
 * 懒加载页面组件
 *
 * 使用 React.lazy() + dynamic import 语法
 * 打包工具 (Vite/Webpack) 会自动进行代码分割
 */
const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const Users = lazy(() => import('@/pages/Users'))
const UserDetail = lazy(() => import('@/pages/UserDetail'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const Login = lazy(() => import('@/pages/Login'))
const Test = lazy(() => import('@/pages/Test'))

/**
 * 加载fallback 组件
 * 在懒加载组件完成加载前显示的占位 UI
 */
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">加载中...</p>
      </div>
    </div>
  )
}

/**
 * 包装组件 - 为懒加载组件添加 Suspense 边界
 *
 * 公司最佳实践：
 * - 每个懒加载组件都应该包裹在 Suspense 中
 * - fallback 可以是统一的 Loading 组件，也可以是 Skeleton 骨架屏
 */
/**
 * 
lazy 组件必须被 Suspense 包裹，核心原因在于 React.lazy 是异步的，而 React 需要一种机制来处理“数据/代码尚未就绪”时的 UI 展示。

以下是详细解释：

1. React.lazy 的本质是异步加载
React.lazy 允许你动态导入组件（Code Splitting）。当你渲染一个 lazy 组件时，React 会发起一个网络请求去加载该组件对应的 JavaScript 文件。

问题：网络请求需要时间。在代码下载并解析完成之前，组件是无法渲染的。
现状：此时组件处于“pending”（等待中）状态。
2. Suspense 的作用是“捕获”等待状态
Suspense 组件的设计初衷就是用来处理异步依赖（如代码加载、数据获取）。

捕获机制：当 Suspense 的子树中有组件抛出“Promise”或表示“我还没准备好”的信号时，Suspense 会拦截这个状态。
展示 fallback：在等待期间，Suspense 会渲染你提供的 fallback 属性内容（例如：“加载中...”、“Spinner 图标”）。
切换显示：一旦懒加载的组件准备就绪，Suspense 会自动用实际组件替换掉 fallback。
3. 如果不包裹 Suspense 会发生什么？
如果你直接渲染一个 lazy 组件而没有外层的 Suspense：

报错：React 会抛出一个错误：Error: A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator... 或者更直接的 Lazy element type must resolve to a class or function.
原因：React 不知道在代码加载期间该显示什么。它不能留白，也不能无限期阻塞主线程，因此强制要求开发者通过 Suspense 明确指定“加载态”的 UI。
*/
function withSuspense(element: ReactNode): ReactNode {
  return <Suspense fallback={<LoadingFallback />}>{element}</Suspense>
}

/**
 * 路由配置数组
 *
 * 结构说明：
 * - path: 路由路径，支持动态参数 (:id) 和嵌套 (*)
 * - element: 路由对应的组件
 * - name: 路由标识名，用于权限控制和编程式导航
 * - children: 子路由配置（实现嵌套路由）
 * - index: 索引路由，父路由路径匹配时默认显示的子路由
 * - meta: 元数据，用于权限、标题、导航等配置
 *
 * 权限说明：
 * - requiresAuth: true 表示需要登录才能访问
 * - roles: 指定允许访问的角色列表，如 ['admin'] 仅管理员可访问
 */
const routes: RouteConfig[] = [
  {
    path: '/login',
    element: withSuspense(<Login />),
    name: 'login',
    meta: {
      title: '登录',
      hideInNav: true,
    },
  },
  {
    path: '/',
    element: withSuspense(<Home />),
    name: 'home',
    meta: {
      title: '首页',
      requiresAuth: false,
    },
  },
  {
    path: '/about',
    element: withSuspense(<About />),
    name: 'about',
    meta: {
      title: '关于我们',
      requiresAuth: false,
    },
  },
  {
    path: '/users',
    element: withSuspense(<Users />),
    name: 'users',
    meta: {
      title: '用户列表',
      requiresAuth: false,
    },
  },
  {
    path: '/users/:id',
    element: withSuspense(<UserDetail />),
    name: 'userDetail',
    meta: {
      title: '用户详情',
      requiresAuth: false,
    },
  },
  {
    path: '/test',
    element: withSuspense(<Test />),
    name: 'test',
    meta: {
      title: '测试页面',
      requiresAuth: true, // 示例：需要登录才能访问
    },
  },
  {
    path: '*',
    element: withSuspense(<NotFound />),
    name: 'notFound',
    meta: {
      hideInNav: true,
    },
  },
]

export default routes
