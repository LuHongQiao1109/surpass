# vite-env.d.ts 文件详解

## 一、文件作用

`vite-env.d.ts` 是一个 **TypeScript 类型声明文件**，主要作用是为 Vite 项目提供环境变量和模块的类型定义。

---

## 二、核心功能

### 2.1 引用 Vite 客户端类型

```typescript
/// <reference types="vite/client" />
```

这行代码告诉 TypeScript 加载 `vite/client` 中定义的所有类型，包括：

- **环境变量类型**：如 `import.meta.env`
- **模块类型**：如 CSS、图片、SVG 等静态资源的导入
- **HMR 类型**：热模块替换的 API

### 2.2 解决 CSS 导入报错

**没有这个文件时**，TypeScript 会报错：

```typescript
import './App.css'  // ❌ 错误：无法找到模块声明
                    //    TS2882: Cannot find module or type declarations
```

**有了 `vite/client` 的类型定义后**，TypeScript 知道 `.css` 文件是合法的模块：

```typescript
// vite/client 内部定义了：
declare module '*.css' {
  const content: string
  export default content
}
```

### 2.3 提供 `import.meta.env` 类型

```typescript
// 现在这些有类型提示和检查
console.log(import.meta.env.MODE)     // string - 开发模式
console.log(import.meta.env.DEV)      // boolean
console.log(import.meta.env.PROD)     // boolean
console.log(import.meta.env.BASE_URL) // string
```

---

## 三、Vite 内置类型定义

`vite/client` 内部已经定义了很多模块类型：

| 模块类型 | 定义 |
|---------|------|
| `*.css` | CSS 样式文件 |
| `*.scss`, `*.sass` | Sass 样式文件 |
| `*.less` | Less 样式文件 |
| `*.styl` | Stylus 样式文件 |
| `*.png`, `*.jpg`, `*.gif` | 图片资源 |
| `*.svg` | SVG 文件 |
| `*.json` | JSON 文件 |
| `*.webmanifest` | Web Manifest |
| `*.mp4`, `*.webm` | 视频文件 |
| `*.mp3`, `*.wav` | 音频文件 |
| `*.woff`, `*.woff2` | 字体文件 |

---

## 四、自定义扩展

你可以在这个文件中添加自定义类型：

### 4.1 自定义环境变量

```typescript
/// <reference types="vite/client" />

// 自定义环境变量类型
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_TITLE: string
  readonly VITE_SENTRY_DSN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

### 4.2 声明图片资源类型

```typescript
// 声明 PNG 图片类型
declare module '*.png' {
  const content: string
  export default content
}

// 声明 SVG 组件类型
declare module '*.svg' {
  import React = require('react')
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}
```

### 4.3 声明其他资源类型

```typescript
// 声明视频资源
declare module '*.mp4' {
  const src: string
  export default src
}

// 声明字体资源
declare module '*.woff2' {
  const src: string
  export default src
}
```

---

## 五、使用场景对比

| 场景 | 是否需要 | 原因 |
|------|----------|------|
| 导入 CSS 文件 | ✅ 需要 | 否则 TS 不识别 CSS 模块 |
| 使用 `import.meta.env` | ✅ 需要 | 获得类型提示 |
| 导入图片/静态资源 | ✅ 需要 | 否则 TS 报错 |
| 纯 TypeScript 逻辑代码 | ❌ 可选 | 不涉及 Vite 特性 |

---

## 六、完整示例

```typescript
/// <reference types="vite/client" />

// ============================================
// 1. 自定义环境变量类型
// ============================================
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_TITLE: string
  readonly VITE_SENTRY_DSN: string
  readonly MODE: string
  readonly DEV: boolean
  readonly PROD: boolean
  readonly BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// ============================================
// 2. 声明图片资源类型
// ============================================
declare module '*.png' {
  const content: string
  export default content
}

declare module '*.jpg' {
  const content: string
  export default content
}

declare module '*.svg' {
  import React = require('react')
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}

// ============================================
// 3. 声明其他资源
// ============================================
declare module '*.mp4' {
  const src: string
  export default src
}

declare module '*.woff2' {
  const src: string
  export default src
}
```

---

## 七、注意事项

1. **文件位置**：通常放在 `src/` 目录下
2. **文件命名**：必须以 `.d.ts` 结尾
3. **引用语法**：`/// <reference types="..." />` 必须在文件顶部
4. **不要删除**：删除后 CSS 和资源导入会报类型错误

---

## 八、相关文件

- `tsconfig.json` - TypeScript 主配置
- `tsconfig.node.json` - Vite 配置专用
- `vite-env.d.ts` - Vite 环境类型声明（本文件）

---

## 参考链接

- [Vite 官方文档 - 静态资源处理](https://vitejs.dev/guide/assets.html)
- [Vite 官方文档 - 环境变量](https://vitejs.dev/guide/env-and-mode.html)
- [TypeScript 官方文档 - 类型声明文件](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)
