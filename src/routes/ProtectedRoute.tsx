/**
 * 权限控制路由守卫组件
 *
 * 公司标准做法：
 * 1. 封装 ProtectedRoute 组件，统一处理权限逻辑
 * 2. 支持角色权限判断 (RBAC - Role Based Access Control)
 * 3. 未授权时重定向到指定页面或显示 fallback UI
 *
 * 使用场景：
 * - 用户登录状态验证
 * - 管理员页面权限控制
 * - 会员专属内容访问控制
 */

import { Navigate } from 'react-router-dom'
import { ProtectedRouteProps, UserInfo, UserRole } from './types'

/**
 * 模拟当前用户信息
 *
 * 实际项目中应该从：
 * - Redux/ Zustand / Context 全局状态
 * - localStorage / sessionStorage
 * - API 接口获取
 */
const getCurrentUser = (): UserInfo | null => {
  // TODO: 替换为真实的用户认证逻辑
  // 示例：从 localStorage 获取 token 并解析用户信息
  const token = localStorage.getItem('token')

  if (!token) {
    return null // 未登录
  }

  // 模拟已登录用户（可根据实际情况修改）
  return {
    id: '1',
    name: '演示用户',
    roles: ['user'], // 默认角色
    isAuthenticated: true,
  }
}

/**
 * 检查用户是否拥有所需角色
 *
 * @param userRoles 用户拥有的角色列表
 * @param requiredRoles 需要的角色列表
 * @returns 是否拥有权限
 */
const hasRequiredRoles = (userRoles: UserRole[], requiredRoles: UserRole[]): boolean => {
  // 如果没有指定角色要求，则允许访问
  if (!requiredRoles || requiredRoles.length === 0) {
    return true
  }
  // 检查用户角色是否包含至少一个所需角色
  return requiredRoles.some((role) => userRoles.includes(role))
}

/**
 * ProtectedRoute 组件
 *
 * Props:
 * - children: 受保护的子组件/路由
 * - requiredRoles: 允许访问的角色列表
 * - fallback: 未授权时显示的 UI（可选）
 * - redirectTo: 未授权时重定向的路径（可选）
 *
 * 优先级：
 * 1. 如果指定了 fallback，显示 fallback
 * 2. 如果指定了 redirectTo，重定向到该路径
 * 3. 默认重定向到登录页 /login
 */
function ProtectedRoute({
  children,
  requiredRoles,
  fallback,
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const user = getCurrentUser()

  // 1. 检查是否已登录
  if (!user || !user.isAuthenticated) {
    // 显示 fallback 或重定向
    if (fallback) {
      return <>{fallback}</>
    }
    // 重定向到登录页，携带当前路径作为回调参数
    return <Navigate to={`${redirectTo}?redirect=${encodeURIComponent(window.location.pathname)}`} replace />
  }

  // 2. 检查是否有所需角色
  if (requiredRoles && !hasRequiredRoles(user.roles, requiredRoles)) {
    // 权限不足，显示 403 或重定向
    if (fallback) {
      return <>{fallback}</>
    }
    // 重定向到无权限页面
    return <Navigate to="/403" replace />
  }

  // 3. 验证通过，渲染子组件
  return <>{children}</>
}

export default ProtectedRoute

/**
 * 使用示例：
 *
 * // 基础用法 - 仅需登录
 * <Route element={<ProtectedRoute />}>
 *   <Route path="/dashboard" element={<Dashboard />} />
 * </Route>
 *
 * // 高级用法 - 需要特定角色
 * <Route element={<ProtectedRoute requiredRoles={['admin']} />}>
 *   <Route path="/admin" element={<AdminPanel />} />
 * </Route>
 *
 * // 自定义 fallback
 * <Route
 *   element={
 *     <ProtectedRoute
 *       requiredRoles={['vip']}
 *       fallback={<UpgradePrompt />}
 *     />
 *   }
 * >
 *   <Route path="/vip-content" element={<VIPContent />} />
 * </Route>
 */
