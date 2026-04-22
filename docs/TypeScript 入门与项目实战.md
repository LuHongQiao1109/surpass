# TypeScript 入门与项目实战

> 本文档介绍 TypeScript 核心概念，并结合本项目代码演示实际用法。

---

## 一、TypeScript 简介

### 1.1 什么是 TypeScript？

**TypeScript** 是由微软开发的开源编程语言，是 JavaScript 的超集。

```
TypeScript = JavaScript + 类型系统
```

| 特性 | JavaScript | TypeScript |
|------|-----------|------------|
| 类型系统 | 动态类型 | 静态类型 |
| 编译 | 无需编译 | 需要编译 |
| 错误检测 | 运行时 | 编译时 |
| IDE 支持 | 基础 | 智能提示、重构 |
| 学习曲线 | 低 | 中等 |

### 1.2 为什么使用 TypeScript？

**优势：**
1. **类型安全** - 编译时捕获类型错误
2. **更好的 IDE 支持** - 智能补全、跳转定义
3. **代码可维护性** - 类型即文档
4. **重构更安全** - 修改代码时有类型检查

**项目中的体现：**
```tsx
// src/routes/types.ts - 路由配置类型定义
export interface RouteConfig {
  path?: string
  element: React.ReactNode
  name?: string
  meta?: {
    title?: string
    requiresAuth?: boolean
  }
}

// 配置时有智能提示，写错会报错
const routes: RouteConfig[] = [
  {
    path: '/login',
    element: <Login />,  // ✅ 必须是 ReactNode
    meta: { title: '登录' }  // ✅ 属性有提示
  }
]
```

---

## 二、TypeScript 核心类型

### 2.1 基础类型

```typescript
// 布尔值
let isDone: boolean = false

// 数字
let count: number = 42
let hex: number = 0xf00d

// 字符串
let name: string = "TypeScript"
let template: string = `Hello, ${name}`

// 数组
let list: number[] = [1, 2, 3]
let list2: Array<number> = [1, 2, 3]  // 泛型写法

// 元组 (固定长度和类型的数组)
let tuple: [string, number] = ["hello", 10]

// 枚举
enum Color {
  Red,
  Green,
  Blue
}
let c: Color = Color.Green

// any - 任意类型 (尽量少用)
let notSure: any = 4
notSure = "maybe a string"

// void - 空值 (函数无返回值)
function warnUser(): void {
  console.log("This is my warning message")
}

// null 和 undefined
let u: undefined = undefined
let n: null = null

// never - 永不存在的值
function error(message: string): never {
  throw new Error(message)
}

// object - 对象类型
let obj: object = { foo: "bar" }
```

### 2.2 项目中的基础类型应用

```typescript
// src/views/mainPage/type.ts
export interface TabList {
  id: number,        // 数字类型
  tabName: string,   // 字符串类型
}

// src/views/mainPage/index.tsx
const [tabList, setTabList] = useState<TabList[]>([])  // 数组类型

// 模拟数据 - 类型推断
let res: TabList[] = [
  { id: 1, tabName: "首页" },
  { id: 2, tabName: "日历" },
]
```

---

## 三、接口 (Interface)

### 3.1 接口基础

接口用于定义对象的结构：

```typescript
interface User {
  id: number
  name: string
  email?: string  // 可选属性
  readonly createdAt: Date  // 只读属性
}

// 使用接口
const user: User = {
  id: 1,
  name: "张三",
  createdAt: new Date()
}

// user.id = 2  // ❌ 错误：id 是只读的
```

### 3.2 项目中的接口应用

#### 路由配置接口

```typescript
// src/routes/types.ts
export interface RouteConfig {
  /** 路由路径 */
  path?: string
  /** 路由对应的组件 */
  element: ReactNode
  /** 路由名称/标识 */
  name?: string
  /** 子路由配置 */
  children?: RouteConfig[]
  /** 是否为索引路由 */
  index?: boolean
  /** 路由元数据 */
  meta?: {
    title?: string
    requiresAuth?: boolean
    roles?: string[]
    hideInNav?: boolean
    [key: string]: unknown  // 索引签名，允许额外属性
  }
}
```

#### 用户信息接口

```typescript
// src/routes/types.ts
export interface UserInfo {
  id: string
  name: string
  roles: UserRole[]
  isAuthenticated: boolean
}

// 使用示例
const getCurrentUser = (): UserInfo | null => {
  const token = localStorage.getItem('token')
  if (!token) return null
  
  return {
    id: '1',
    name: '演示用户',
    roles: ['user'],
    isAuthenticated: true
  }
}
```

#### 组件 Props 接口

```typescript
// src/components/Layout.tsx
interface LayoutProps {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      {children}
    </div>
  )
}

// src/routes/ProtectedRoute.tsx
export interface ProtectedRouteProps {
  children: ReactNode
  requiredRoles?: UserRole[]
  fallback?: ReactNode
  redirectTo?: string
}
```

---

## 四、类型别名 (Type Alias)

### 4.1 类型别名基础

```typescript
// 基础类型别名
type ID = string | number
type Callback = (data: unknown) => void

// 对象类型别名
type Point = {
  x: number
  y: number
}

// 联合类型
type Status = 'pending' | 'success' | 'error'

// 交叉类型
type A = { foo: number }
type B = { bar: string }
type C = A & B  // { foo: number; bar: string }
```

### 4.2 类型别名 vs 接口

| 特性 | interface | type |
|------|-----------|------|
| 声明合并 | ✅ 支持 | ❌ 不支持 |
| 联合类型 | ❌ 不支持 | ✅ 支持 |
| 映射类型 | ❌ 不支持 | ✅ 支持 |
| 继承/扩展 | `extends` | `&` 交叉 |

**建议：**
- 定义对象结构优先用 `interface`
- 联合类型、映射类型用 `type`

### 4.3 项目中的类型别名

```typescript
// src/routes/types.ts
// 联合类型 - 用户角色
export type UserRole = 'admin' | 'user' | 'guest'

// 使用
const hasRequiredRoles = (
  userRoles: UserRole[], 
  requiredRoles: UserRole[]
): boolean => {
  return requiredRoles.some((role) => userRoles.includes(role))
}
```

---

## 五、泛型 (Generics)

### 5.1 泛型基础

泛型允许我们创建可重用的、类型安全的组件和函数。

```typescript
// 泛型函数
function identity<T>(arg: T): T {
  return arg
}

// 使用
let output1 = identity<string>("hello")  // string
let output2 = identity(42)  // number - 类型推断

// 泛型接口
interface Box<T> {
  value: T
}

const stringBox: Box<string> = { value: "hello" }
const numberBox: Box<number> = { value: 42 }

// 泛型约束
interface Lengthwise {
  length: number
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg
}

logLength("hello")  // ✅
logLength([1, 2, 3])  // ✅
logLength(42)  // ❌ 错误：number 没有 length 属性
```

### 5.2 项目中的泛型应用

#### React Hooks 中的泛型

```typescript
// src/views/mainPage/index.tsx
// useState 泛型 - 指定状态类型
const [tabList, setTabList] = useState<TabList[]>([])

// src/pages/Users.tsx
// 泛型约束 - 可以是用户类型或 null
const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null)
```

#### 通用工具函数

```typescript
// 项目中可以添加的通用工具函数示例

// 泛型工具函数 - API 响应处理
interface ApiResponse<T> {
  data: T
  message: string
  code: number
}

async function handleResponse<T>(
  response: Response
): Promise<ApiResponse<T>> {
  const result = await response.json()
  return result as ApiResponse<T>
}

// 使用
const userData = await handleResponse<UserInfo>(fetch('/api/user'))
```

---

## 六、React + TypeScript 实战

### 6.1 函数组件类型

```typescript
import React, { FC, ReactNode } from 'react'

// 方式 1: 使用 FC (FunctionComponent)
const MyComponent: FC<{ name: string }> = ({ name }) => {
  return <div>Hello {name}</div>
}

// 方式 2: 直接定义 Props 类型 (推荐)
interface MyComponentProps {
  name: string
  children?: ReactNode
}

function MyComponent({ name, children }: MyComponentProps) {
  return (
    <div>
      Hello {name}
      {children}
    </div>
  )
}
```

### 6.2 Hooks 类型

#### useState

```typescript
// 基本类型推断
const [count, setCount] = useState(0)  // number

// 显式指定类型
const [user, setUser] = useState<UserInfo | null>(null)
const [list, setList] = useState<string[]>([])

// 复杂类型
interface FormData {
  name: string
  email: string
  age: number
}
const [formData, setFormData] = useState<FormData>({
  name: '',
  email: '',
  age: 0
})
```

#### useEffect

```typescript
// useEffect 通常不需要显式类型
useEffect(() => {
  const timer = setTimeout(() => {
    console.log('1 秒后执行')
  }, 1000)
  
  // 清理函数
  return () => clearTimeout(timer)
}, [])  // 依赖数组
```

#### useReducer

```typescript
// 定义 action 类型
type Action = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'set'; payload: number }

// 定义 state 类型
interface State {
  count: number
}

// reducer 函数
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'set':
      return { count: action.payload }
    default:
      return state
  }
}

// 使用
const [state, dispatch] = useReducer(reducer, { count: 0 })
```

#### 自定义 Hooks

```typescript
// hooks/useLocalStorage.ts
function useLocalStorage<T>(
  key: string, 
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value: T) => {
    setStoredValue(value)
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  return [storedValue, setValue]
}

// 使用
const [token, setToken] = useLocalStorage<string>('token', '')
const [user, setUser] = useLocalStorage<UserInfo | null>('user', null)
```

### 6.3 事件类型

```typescript
import React, { ChangeEvent, MouseEvent, FormEvent } from 'react'

function EventExample() {
  // 点击事件
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget)  // 有类型提示
  }

  // 表单提交事件
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  // 输入框变化事件
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }

  // 键盘事件
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} onKeyDown={handleKeyDown} />
      <button onClick={handleClick}>点击</button>
    </form>
  )
}
```

### 6.4 项目中的 React + TypeScript 实例

#### Layout 组件

```typescript
// src/components/Layout.tsx
interface LayoutProps {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: '首页' },
    { path: '/about', label: '关于' },
    { path: '/users', label: '用户' },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={location.pathname === item.path ? 'active' : ''}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <main>{children}</main>
    </div>
  )
}
```

#### 受保护的路线组件

```typescript
// src/routes/ProtectedRoute.tsx
function ProtectedRoute({
  children,
  requiredRoles,
  fallback,
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const user = getCurrentUser()

  // 1. 检查是否已登录
  if (!user || !user.isAuthenticated) {
    if (fallback) return <>{fallback}</>
    return (
      <Navigate 
        to={`${redirectTo}?redirect=${encodeURIComponent(window.location.pathname)}`} 
        replace 
      />
    )
  }

  // 2. 检查角色权限
  if (requiredRoles && !hasRequiredRoles(user.roles, requiredRoles)) {
    return <Navigate to="/403" replace />
  }

  return <>{children}</>
}
```

---

## 七、工具类型 (Utility Types)

TypeScript 内置了多个实用的工具类型：

### 7.1 常用工具类型

```typescript
// Partial<T> - 将所有属性变为可选
interface Todo {
  title: string
  description: string
}
const partialTodo: Partial<Todo> = { title: "Learn TS" }

// Required<T> - 将所有属性变为必填
const requiredTodo: Required<Todo> = { 
  title: "Learn TS", 
  description: "TypeScript 学习" 
}

// Pick<T, K> - 选择特定属性
type TodoPreview = Pick<Todo, 'title'>  // { title: string }

// Omit<T, K> - 排除特定属性
type TodoNoDesc = Omit<Todo, 'description'>  // { title: string }

// Record<K, T> - 创建记录类型
type PageInfo = Record<'home' | 'about' | 'contact', string>

// ReturnType<T> - 获取函数返回类型
function createUser() {
  return { id: 1, name: "张三" }
}
type User = ReturnType<typeof createUser>  // { id: number; name: string }

// Parameters<T> - 获取函数参数类型
function greet(name: string, age: number) {}
type GreetParams = Parameters<typeof greet>  // [string, number]
```

### 7.2 项目中的应用

```typescript
// src/routes/types.ts
// Record 的变体使用
elementProps?: Record<string, unknown>  // 任意属性的对象

// 扩展应用示例
interface ApiState<T> {
  data: T
  loading: boolean
  error: string | null
}

// 使用 Partial 创建更新类型
type UpdateUserDto = Partial<Omit<UserInfo, 'id' | 'roles'>>
// 等价于：{ name?: string; isAuthenticated?: boolean }
```

---

## 八、类型守卫与类型断言

### 8.1 类型守卫

```typescript
// typeof 类型守卫
function printId(id: number | string) {
  if (typeof id === "string") {
    console.log(id.toUpperCase())
  } else {
    console.log(id)
  }
}

// instanceof 类型守卫
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString())
  } else {
    console.log(x.toUpperCase())
  }
}

// 自定义类型守卫
interface Fish { swim(): void }
interface Bird { fly(): void }

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined
}

// 使用
const pet: Fish | Bird = { swim: () => {} }
if (isFish(pet)) {
  pet.swim()  // ✅ 类型收窄为 Fish
}
```

### 8.2 类型断言

```typescript
// 当你知道比 TypeScript 更多的信息时使用

// 方式 1: as 语法 (推荐)
const someValue: unknown = "hello"
const strLength = (someValue as string).length

// 方式 2: 尖括号语法 (JSX 中不能用)
const strLength2 = (<string>someValue).length

// 项目中常见用法 - DOM 元素
const canvas = document.getElementById('canvas') as HTMLCanvasElement
const input = document.querySelector('input') as HTMLInputElement

// React 中的类型断言
const inputRef = useRef<HTMLInputElement>(null)
```

---

## 九、模块与命名空间

### 9.1 模块导出/导入

```typescript
// 命名导出
export interface User {
  id: number
  name: string
}

export const defaultUser: User = { id: 0, name: 'Anonymous' }

export function createUser(name: string): User {
  return { id: Date.now(), name }
}

// 默认导出
export default function main() {}

// 导入
import { User, createUser } from './types'
import main from './main'
import * as Utils from './utils'  // 全部导入
```

### 9.2 项目中的模块组织

```typescript
// src/routes/types.ts - 类型定义
export interface RouteConfig { ... }
export type UserRole = 'admin' | 'user' | 'guest'
export interface ProtectedRouteProps { ... }

// src/routes/config.tsx - 路由配置
import { RouteConfig } from './types'
const routes: RouteConfig[] = [...]
export default routes

// src/routes/index.tsx - 路由渲染
import routes from './config'
import { RouteConfig } from './types'
function renderRoutes(routes: RouteConfig[]) { ... }
export default AppRoutes
```

---

## 十、项目配置文件

### 10.1 tsconfig.json 详解

```json
{
  "compilerOptions": {
    "target": "ES2020",              // 编译目标
    "lib": ["ES2020", "DOM", "DOM.Iterable"],  // 库文件
    "module": "ESNext",              // 模块系统
    "moduleResolution": "bundler",   // 模块解析策略
    
    // JSX 支持
    "jsx": "react-jsx",              // React 17+ JSX 转换
    
    // 严格模式
    "strict": true,                  // 启用所有严格检查
    "noUnusedLocals": true,          // 报告未使用局部变量的错误
    "noUnusedParameters": true,      // 报告未使用参数的错误
    "noFallthroughCasesInSwitch": true,  // switch 穿透检查
    
    // 路径别名
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    
    // 其他
    "skipLibCheck": true,            // 跳过声明文件检查
    "allowImportingTsExtensions": true,  // 允许导入.ts 扩展名
    "resolveJsonModule": true,       // 导入 JSON 模块
    "isolatedModules": true,         // 每个文件单独编译
    "noEmit": true                   // 不输出编译后的文件
  },
  "include": ["src"],                // 包含的文件
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 10.2 vite-env.d.ts

```typescript
// src/vite-env.d.ts
/// <reference types="vite/client" />

// 自定义类型声明
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

---

## 十一、最佳实践

### 11.1 类型安全建议

```typescript
// ✅ 好的做法
interface User {
  id: number
  name: string
}

function greet(user: User): string {
  return `Hello, ${user.name}`
}

// ❌ 避免使用 any
function badGreet(user: any): string {
  return `Hello, ${user.name}`  // 无类型检查
}

// ✅ 使用 unknown 代替 any (当不确定类型时)
function processValue(value: unknown): string {
  if (typeof value === 'string') {
    return value.toUpperCase()
  }
  return String(value)
}
```

### 11.2 React 组件类型建议

```typescript
// ✅ 推荐：明确定义 Props 接口
interface ButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
  children?: React.ReactNode
}

function Button({ label, onClick, disabled, children }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label} {children}
    </button>
  )
}

// ✅ 使用 React 内置类型
interface Props {
  children: React.ReactNode
  style?: React.CSSProperties
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}
```

### 11.3 类型组织建议

```
src/
├── types/              # 全局类型定义
│   ├── api.ts         # API 相关类型
│   ├── common.ts      # 通用类型
│   └── index.ts       # 类型导出
├── components/         # 组件
│   └── Button/
│       ├── Button.tsx
│       └── Button.types.ts  # 组件类型
├── hooks/
│   └── useUser/
│       ├── useUser.ts
│       └── useUser.types.ts
└── utils/
    └── format.ts
```

---

## 十二、学习资源

### 官方文档
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [TypeScript 中文手册](https://www.tslang.cn/)
- [React TypeScript Cheat Sheet](https://react-typescript-cheatsheet.netlify.app/)

### 练习平台
- [TypeScript Playground](https://www.typescriptlang.org/play) - 在线编写和测试 TypeScript 代码

### 推荐学习路径
1. 基础类型和接口
2. 泛型和工具类型
3. React + TypeScript 组件开发
4. 高级类型体操

---

## 附录：快速参考表

| 场景 | 语法 |
|------|------|
| 基础类型 | `string`, `number`, `boolean`, `null`, `undefined` |
| 数组 | `string[]` 或 `Array<string>` |
| 对象 | `{ name: string; age: number }` |
| 联合类型 | `string \| number` |
| 接口 | `interface User { name: string }` |
| 类型别名 | `type ID = string \| number` |
| 泛型 | `function identity<T>(arg: T): T` |
| 工具类型 | `Partial<T>`, `Pick<T, K>`, `Omit<T, K>` |
| React Props | `interface Props { children: ReactNode }` |
| React Hooks | `useState<User \| null>(null)` |
| 事件处理 | `(e: MouseEvent<HTMLButtonElement>) => void` |
| 类型断言 | `value as string` |

---

*最后更新：2026-04-22*
