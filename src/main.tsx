import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)


/**
 * 
 * 1. StrictMode 的主要作用
      在开发环境中，StrictMode 会强制执行以下检查：
      识别不安全的生命周期：警告使用已废弃或不安全的生命周期方法（如 componentWillMount）。
      警告过时的字符串 Ref API：提醒开发者使用 createRef 或回调 Ref。
      警告遗留的上下文 API：提醒使用新的 Context API。
      检测意外的副作用：这是最关键的一点。在开发模式下，React 会故意双重调用某些函数（如组件构造函数、useState/useReducer/useEffect 的初始化函数），以帮助你发现不纯的代码或未被正确清理的副作用。
      警告过时的 findDOMNode 用法。
      检测缺失的依赖项数组：在 useEffect 等 Hook 中，如果依赖项数组不完整，会发出警告
 * 
 * */


/**
 *  在 React 应用中，`BrowserRouter` 是最常用的路由组件，但并不是唯一的选择。选择它通常是因为它最符合现代 Web 开发的标准和需求。
    以下是为什么通常首选 `BrowserRouter`，以及与其他路由组件的区别：

    ### 1. 为什么首选 `BrowserRouter`？

    *   **URL 美观且标准**：
        `BrowserRouter` 使用 HTML5 的 `history.pushState` API，生成的 URL 是标准的“干净”URL（例如 `https://example.com/about`），而不是带有哈希符号的 URL（如 `https://example.com/#/about`）。这对 SEO（搜索引擎优化）更友好，用户体验也更好。
    *   **服务器端渲染 (SSR) 兼容性好**：
        虽然 `BrowserRouter` 主要用于客户端，但它与现代 SSR 框架（如 Next.js 或 Remix）的理念一致，即 URL 直接对应资源路径。
    *   **浏览器历史记录管理完善**：
        它能完美处理浏览器的“前进”、“后退”按钮，保持历史记录栈的正常运作。
    *   **社区标准**：
        绝大多数 React 教程、文档和第三方库都默认假设你使用的是基于 HTML5 history 的路由。

    ### 2. 其他路由组件及其适用场景

    React Router 提供了多种路由器，适用于不同环境：

    | 路由器组件 | 特点 | 适用场景 |
    | :--- | :--- | :--- |
    | **`BrowserRouter`** | 使用 HTML5 `pushState` API，URL 无 `#`。 | **大多数现代 Web 应用**（SPA）、需要 SEO 优化的项目。 |
    | **`HashRouter`** | 使用 URL 的哈希部分（`#`）来模拟路由。例如 `example.com/#/about`。 | **静态文件托管**（如 GitHub Pages）、旧版浏览器支持、无法配置服务器重定向的环境。 |
    | **`MemoryRouter`** | 将路由历史保存在内存中，不读取也不写入地址栏。 | **非浏览器环境**（如 React Native、单元测试、Storybook、Electron 应用内部视图）。 |
    | **`StaticRouter`** | 用于服务器端渲染，位置不会改变。 | **服务端渲染 (SSR)** 的初始渲染阶段（通常在 Next.js 等框架中底层使用，开发者较少直接调用）。 |

    ### 3. 为什么不选 `HashRouter`？

    虽然 `HashRouter` 配置简单（不需要服务器端配置 fallback 到 `index.html`），但它有以下缺点：
    *   **URL 不美观**：带有 `#` 号，看起来不够专业。
    *   **SEO 较差**：搜索引擎对哈希路由的索引能力较弱（尽管现代搜索引擎有所改进，但仍不如标准 URL）。
    *   **锚点冲突**：如果页面内需要使用 HTML 锚点（如 `<a href="#section1">`），会与路由哈希冲突。

    ### 4. 为什么不选 `MemoryRouter`？

    *   **无法分享链接**：因为 URL 不变化，用户无法复制当前页面的链接分享给他人。
    *   **不支持浏览器导航**：浏览器的后退/前进按钮可能无法按预期工作（取决于具体实现）。

    ### 5. 总结建议

    *   **如果你正在构建一个标准的 Web 应用**（如你的 `learnReact` 项目），并且服务器可以配置将所有路由请求重定向到 `index.html`（Vite、Create React App、Nginx、Apache 等都支持），**请始终使用 `BrowserRouter`**。
    *   **如果你将应用部署在 GitHub Pages 等静态托管服务上**，且无法配置服务器重定向，可以使用 `HashRouter` 作为快速解决方案。
    *   **如果你在写单元测试或非浏览器环境的组件**，使用 `MemoryRouter`。

    在你的项目中，由于使用了 Vite + React，默认配置已经支持 HTML5 history 模式，因此 `BrowserRouter` 是最佳选择。
 * 
 * 
 * 
*/