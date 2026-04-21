# Tailwind CSS 使用指南

## 一、Tailwind CSS 简介

Tailwind CSS 是一个**实用优先（utility-first）**的 CSS 框架，提供大量预定义的 CSS 类，让你可以直接在 HTML/JSX 中快速构建样式。

### 传统 CSS vs Tailwind CSS

```jsx
// 传统 CSS
// Button.jsx
function Button() {
  return <button className="btn-primary">点击</button>
}

// Button.css
.btn-primary {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 600;
}

// Tailwind CSS
function Button() {
  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold">
      点击
    </button>
  )
}
```

---

## 二、项目配置

### 2.1 已安装的依赖

```json
{
  "devDependencies": {
    "tailwindcss": "^3.4.1",
    "postcss": "^8.5.10",
    "autoprefixer": "^10.5.0"
  }
}
```

**注意：** 项目使用 Tailwind CSS v3 版本。v4 版本配置方式不同，暂不推荐使用。

### 2.2 配置文件

**tailwind.config.js**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**postcss.config.js**
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**src/index.css**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 其他全局样式 */
```

---

## 三、核心概念

### 3.1 基础样式（Base）

Tailwind 的 `@tailwind base` 会重置浏览器默认样式。

```jsx
// 浏览器默认样式被重置，更一致
<h1>标题</h1>
<p>段落</p>
```

### 3.2 组件类（Components）

`@tailwind components` 允许你定义可复用的组件类。

```css
/* src/index.css */
@layer components {
  .btn-primary {
    @apply bg-blue-500 text-white px-4 py-2 rounded-md;
  }
  
  .btn-primary:hover {
    @apply bg-blue-600;
  }
}
```

```jsx
<button className="btn-primary">点击</button>
```

### 3.3 实用类（Utilities）

`@tailwind utilities` 提供所有实用的工具类。

```jsx
<div className="flex items-center justify-center h-screen">
  <p className="text-gray-700 text-lg">居中内容</p>
</div>
```

---

## 四、常用工具类速查

### 4.1 布局（Layout）

| 类名 | 说明 | CSS 等价 |
|------|------|---------|
| `container` | 响应式容器 | `max-width` 断点 |
| `flex` | Flexbox | `display: flex` |
| `grid` | Grid 布局 | `display: grid` |
| `block` | 块级元素 | `display: block` |
| `inline-block` | 行内块 | `display: inline-block` |
| `hidden` | 隐藏 | `display: none` |

### 4.2 间距（Spacing）

```jsx
// p-{n} 内边距 (padding)
<p className="p-4">    {/* padding: 1rem (16px) */}
<p className="px-4">   {/* padding-left/right: 1rem */}
<p className="py-2">   {/* padding-top/bottom: 0.5rem */}
<p className="pt-4">   {/* padding-top: 1rem */}

// m-{n} 外边距 (margin)
<div className="m-4">  {/* margin: 1rem */}
<div className="mx-auto"> {/* 水平居中 */}
<div className="mt-8">  {/* margin-top: 2rem */}
```

**间距数值对应表：**

| 类名后缀 | rem | px (假设 16px 基准) |
|---------|-----|-------------------|
| `0` | 0 | 0px |
| `1` | 0.25 | 4px |
| `2` | 0.5 | 8px |
| `3` | 0.75 | 12px |
| `4` | 1 | 16px |
| `5` | 1.25 | 20px |
| `6` | 1.5 | 24px |
| `8` | 2 | 32px |
| `10` | 2.5 | 40px |
| `12` | 3 | 48px |
| `16` | 4 | 64px |

### 4.3 尺寸（Sizing）

```jsx
<div className="w-64 h-64">     {/* 宽/高 256px */}
<div className="w-full h-screen"> {/* 100% 宽，100vh 高 */}
<div className="w-1/2">          {/* 50% 宽 */}
<div className="max-w-md">       {/* 最大宽度 */}
```

### 4.4 排版（Typography）

```jsx
<h1 className="text-3xl font-bold text-gray-900">
  标题
</h1>
<p className="text-sm text-gray-600 leading-relaxed">
  段落文本
</p>
```

**字体大小：**
| 类名 | font-size |
|------|-----------|
| `text-xs` | 0.75rem (12px) |
| `text-sm` | 0.875rem (14px) |
| `text-base` | 1rem (16px) |
| `text-lg` | 1.125rem (18px) |
| `text-xl` | 1.25rem (20px) |
| `text-2xl` | 1.5rem (24px) |
| `text-3xl` | 1.875rem (30px) |
| `text-4xl` | 2.25rem (36px) |

**字重：**
- `font-light` - 300
- `font-normal` - 400
- `font-medium` - 500
- `font-semibold` - 600
- `font-bold` - 700

### 4.5 颜色（Colors）

```jsx
<p className="text-blue-500">蓝色文字</p>
<div className="bg-red-500">红色背景</div>
<div className="border-green-500">绿色边框</div>
```

**颜色层级（50-950）：**
```
blue-50   → 最浅
blue-100
blue-200
...
blue-500  → 基准色
...
blue-900
blue-950  → 最深
```

### 4.6 边框（Borders）

```jsx
<div className="border border-gray-300 rounded-lg">
  带边框的卡片
</div>
<div className="border-2 border-blue-500 rounded-full">
  圆形边框
</div>
```

### 4.7 效果（Effects）

```jsx
<div className="shadow-lg hover:shadow-xl transition-shadow">
  带阴影的卡片
</div>
<div className="opacity-50">
  半透明
</div>
```

**阴影等级：**
- `shadow-sm` - 小阴影
- `shadow` - 默认阴影
- `shadow-md` - 中等阴影
- `shadow-lg` - 大阴影
- `shadow-xl` - 超大阴影
- `shadow-2xl` - 特大阴影
- `shadow-none` - 无阴影

### 4.8 响应式（Responsive）

```jsx
<div className="
  w-full           /* 默认（小屏） */
  md:w-1/2         /* >= 768px */
  lg:w-1/3         /* >= 1024px */
  xl:w-1/4         /* >= 1280px */
">
  响应式宽度
</div>
```

**断点：**
| 前缀 | 最小宽度 |
|------|---------|
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |
| `2xl:` | 1536px |

### 4.9 伪类（Pseudo-classes）

```jsx
<button className="
  bg-blue-500 
  hover:bg-blue-600      /* 悬停 */
  focus:ring-2           /* 聚焦 */
  active:bg-blue-700     /* 激活 */
  disabled:opacity-50    /* 禁用 */
">
  按钮
</button>
```

**常用伪类：**
- `hover:` - 悬停
- `focus:` - 聚焦
- `active:` - 激活
- `disabled:` - 禁用
- `first:` - 第一个子元素
- `last:` - 最后一个子元素
- `odd:` - 奇数
- `even:` - 偶数

---

## 五、实战示例

### 5.1 按钮组件

```jsx
// src/components/Button.jsx
function Button({ children, variant = 'primary', ...props }) {
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
    outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
  }

  return (
    <button
      className={`
        px-4 py-2 
        rounded-md 
        font-medium 
        transition-colors
        duration-200
        ${variants[variant]}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
```

### 5.2 卡片组件

```jsx
// src/components/Card.jsx
function Card({ title, children }) {
  return (
    <div className="
      bg-white 
      rounded-lg 
      shadow-md 
      overflow-hidden
      hover:shadow-lg
      transition-shadow
      duration-300
    ">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">
          {title}
        </h3>
        <div className="text-gray-600">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Card
```

### 5.3 导航栏组件

```jsx
// src/components/Navbar.jsx
function Navbar() {
  return (
    <nav className="
      bg-white 
      shadow-sm 
      fixed 
      w-full 
      top-0 
      z-50
    ">
      <div className="
        max-w-7xl 
        mx-auto 
        px-4 
        sm:px-6 
        lg:px-8
      ">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-900">
              Logo
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              首页
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              关于
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              联系
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
```

### 5.4 响应式网格布局

```jsx
// src/components/Grid.jsx
function Grid() {
  return (
    <div className="
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      lg:grid-cols-3 
      gap-4 
      p-4
    ">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="
            bg-white 
            p-6 
            rounded-lg 
            shadow
          "
        >
          卡片 {item}
        </div>
      ))}
    </div>
  )
}

export default Grid
```

### 5.5 表单组件

```jsx
// src/components/Form.jsx
function Form() {
  return (
    <form className="space-y-6 max-w-md mx-auto p-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          邮箱
        </label>
        <input
          type="email"
          className="
            w-full 
            px-3 
            py-2 
            border 
            border-gray-300 
            rounded-md 
            focus:ring-2 
            focus:ring-blue-500 
            focus:border-blue-500
          "
          placeholder="you@example.com"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          密码
        </label>
        <input
          type="password"
          className="
            w-full 
            px-3 
            py-2 
            border 
            border-gray-300 
            rounded-md 
            focus:ring-2 
            focus:ring-blue-500 
            focus:border-blue-500
          "
        />
      </div>
      
      <button
        type="submit"
        className="
          w-full 
          bg-blue-500 
          text-white 
          py-2 
          px-4 
          rounded-md 
          hover:bg-blue-600 
          transition-colors
        "
      >
        提交
      </button>
    </form>
  )
}

export default Form
```

---

## 六、自定义配置

### 6.1 扩展主题

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        'brand-blue': '#1E40AF',
        'brand-green': '#10B981',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
}
```

### 6.2 添加自定义类

```css
/* src/index.css */
@layer components {
  .btn-primary {
    @apply bg-blue-500 text-white px-4 py-2 rounded-md font-medium;
  }
  
  .btn-primary:hover {
    @apply bg-blue-600;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }
}
```

---

## 七、VS Code 插件推荐

1. **Tailwind CSS IntelliSense**（必备）
   - 自动补全类名
   - 显示颜色预览
   - 悬停显示 CSS

2. **CSS Peek**
   - 快速查看样式定义

3. **Prettier**
   - 自动格式化类名顺序

---

## 八、最佳实践

### 8.1 类名组织

```jsx
// ✅ 推荐：按功能分组
<div className="
  flex items-center justify-center  /* 布局 */
  h-screen                           /* 尺寸 */
  bg-gray-100                        /* 样式 */
">

// ❌ 不推荐：杂乱无章
<div className="h-screen flex bg-gray-100 items-center justify-center">
```

### 8.2 使用模板字符串处理长类名

```jsx
<div className={`
  bg-white
  rounded-lg
  shadow-md
  p-6
  ${isActive ? 'border-blue-500' : 'border-gray-200'}
`}>
```

### 8.3 提取重复样式为组件

```jsx
// 提取前
<div className="bg-white rounded-lg shadow-md p-6">...</div>
<div className="bg-white rounded-lg shadow-md p-6">...</div>

// 提取后
function Card({ children }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {children}
    </div>
  )
}
```

---

## 九、常用资源

### 官方文档
- [Tailwind CSS 官方文档](https://tailwindcss.com/docs)
- [Tailwind Play (在线编辑器)](https://play.tailwindcss.com/)

### 工具
- [Tailwind CSS 颜色选择器](https://uicolors.app/create)
- [Tailwind 组件库](https://tailwindui.com/)
- [DaisyUI (免费组件)](https://daisyui.com/)

### 中文资源
- [Tailwind CSS 中文文档](https://tailwindcss.cn/)

---

## 十、快速参考卡片

```
布局：flex, grid, block, hidden
间距：p-4, m-4, px-4, py-2, mx-auto
尺寸：w-full, h-screen, w-1/2, max-w-md
排版：text-xl, font-bold, text-center, leading-relaxed
颜色：text-blue-500, bg-gray-100, border-red-300
边框：border, rounded-lg, border-2
效果：shadow-lg, opacity-50, transition
响应式：sm:, md:, lg:, xl:
伪类：hover:, focus:, active:
```
