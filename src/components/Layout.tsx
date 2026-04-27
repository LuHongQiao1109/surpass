import { Link, useLocation } from 'react-router-dom'

interface LayoutProps {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  const location = useLocation()

  const navItems = [
    { path: '/', label: '首页' },
    { path: '/calendar', label: '日历' },
    { path: '/users', label: '用户' },
    { path: '/about', label: '技术栈' },
    { path: '/test', label: '测试' },
  ]

  return (
    <div className="h-screen bg-gray-100 flex flex-col justify-between">
      {/* 导航栏 */}
      <nav className="bg-white shadow-md top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-indigo-600">
                React Router
              </Link>
            </div>

            {/* 导航链接 */}
            <div className="flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition ${
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
      <main className="flex-1">
        {children}
      </main>

      {/* 页脚 */}
      <footer className="bg-white border-t ">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-gray-500 text-sm">
            © 2026 React Router 学习项目。使用 React 18 + Vite + TypeScript + Tailwind CSS 构建
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
