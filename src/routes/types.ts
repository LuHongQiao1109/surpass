/**
 * 路由配置类型定义
 *
 * 公司标准做法：为路由配置定义完整的 TypeScript 类型
 * 好处：
 * 1. 类型安全 - 编译时检查配置错误
 * 2. IDE 智能提示 - 配置路由时有自动补全
 * 3. 易于维护 - 新增字段时所有使用处都会提示
 */

import { ReactNode } from 'react'

/**
 * 路由配置项接口
 *
 * path: 路由路径，支持动态参数如 /users/:id
 * element: 路由对应的 React 组件
 * name: 路由名称，用于权限判断和面包屑
 * children: 子路由配置（嵌套路由）
 * index: 是否为索引路由（子路由的默认页面）
 * elementProps: 传递给路由组件的额外 props
 * meta: 路由元数据，用于权限、标题等
 */
export interface RouteConfig {
  /** 路由路径 */
  path?: string
  /** 路由对应的组件 */
  element: ReactNode
  /** 路由名称/标识，用于权限判断 */
  name?: string
  /** 子路由配置（支持嵌套路由） */
  children?: RouteConfig[]
  /** 是否为索引路由（子路由的默认页面） */
  index?: boolean
  /** 传递给路由组件的额外 props */
  elementProps?: Record<string, unknown>
  /** 路由元数据 */
  meta?: {
    /** 页面标题 */
    title?: string
    /** 是否需要权限验证 */
    requiresAuth?: boolean
    /** 允许访问的角色列表 */
    roles?: string[]
    /** 是否隐藏于导航菜单 */
    hideInNav?: boolean
    /** 自定义数据 */
    [key: string]: unknown
  }
}

/**
 * 用户角色类型
 * 用于权限控制，可根据业务扩展
 */
export type UserRole = 'admin' | 'user' | 'guest'

/**
 * 用户信息类型
 * 用于权限判断
 */
export interface UserInfo {
  id: string
  name: string
  roles: UserRole[]
  isAuthenticated: boolean
}

/**
 * 权限控制组件 Props
 */
export interface ProtectedRouteProps {
  children: ReactNode
  requiredRoles?: UserRole[]
  fallback?: ReactNode
  redirectTo?: string
}
