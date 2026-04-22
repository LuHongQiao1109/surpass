import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-indigo-600 mb-8">首页</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 卡片 1 */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">关于我</h2>
            <p className="text-gray-600 mb-4">
              这是一个 React Router 学习项目，用于练习路由配置和页面跳转。
            </p>
            <Link
              to="/about"
              className="inline-block px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
            >
              了解更多
            </Link>
          </div>

          {/* 卡片 2 */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">测试代码</h2>
            <p className="text-gray-600 mb-4">
              查看各种 React 组件和 Tailwind CSS 样式的测试效果。
            </p>
            <Link
              to="/test"
              className="inline-block px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              查看测试
            </Link>
          </div>

          {/* 卡片 3 */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">用户列表</h2>
            <p className="text-gray-600 mb-4">
              演示动态路由和参数传递的用户列表页面。
            </p>
            <Link
              to="/users"
              className="inline-block px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition"
            >
              查看用户
            </Link>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">快速导航</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/about" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition">
              关于页面
            </Link>
            <Link to="/test" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition">
              测试页面
            </Link>
            <Link to="/users" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition">
              用户列表
            </Link>
            <Link to="/not-found" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition">
              404 页面
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
