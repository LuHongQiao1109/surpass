/**
 * 路由递归渲染组件
 *
 * 公司标准做法：
 * 1. 配置驱动 - 从配置数组递归生成 Route 组件
 * 2. 支持嵌套路由 - 自动处理 children 配置
 * 3. 易于扩展 - 新增路由只需修改配置文件
 *
 * 优势：
 * - 路由配置与渲染逻辑分离
 * - 支持动态路由（从 API 获取配置）
 * - 便于实现路由权限、面包屑等功能
 */

import { Routes, Route } from 'react-router-dom'
import { RouteConfig, UserRole } from './types'
import routes from './config'
import ProtectedRoute from './ProtectedRoute'

/**
 * 递归渲染路由配置
 *
 * @param routes 路由配置数组
 * @returns 渲染后的 Route 组件数组
 */
function renderRoutes(routes: RouteConfig[]) {
  return routes.map((route, index) => {
    const { path, element, children, index: isIndex, meta, name, ...rest } = route

    // 根据 meta 配置决定是否包裹 ProtectedRoute
    const requiresAuth = meta?.requiresAuth
    const roles = meta?.roles as UserRole[] | undefined

    // 构建受保护的组件
    let protectedElement = element
    if (requiresAuth) {
      protectedElement = (
        <ProtectedRoute requiredRoles={roles}>
          {element}
        </ProtectedRoute>
      )
    }

    // 如果有子路由，渲染嵌套结构
    if (children && children.length > 0) {
      return (
        <Route key={path || index} path={path} element={protectedElement} {...rest}>
          {renderRoutes(children)}
        </Route>
      )
    }

    // 无子路由，渲染普通 Route
    return (
      <Route
        key={path || index}
        path={path}
        element={protectedElement}
        index={isIndex}
        {...rest}
      />
    )
  })
}

/**
 * AppRoutes 组件
 *
 * 将路由配置转换为 React Router 的 Routes 结构
 */
function AppRoutes() {
  return (
    <Routes>
      {renderRoutes(routes)}
    </Routes>
  )
}

export default AppRoutes
