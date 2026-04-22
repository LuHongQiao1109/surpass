import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-teal-600 mb-8">关于我</h1>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-lg text-gray-700 mb-6">
            这是一个使用 React 18 + Vite + TypeScript + Tailwind CSS 构建的学习项目。
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">技术栈</h2>
          <ul className="space-y-2 mb-8">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              React 18 - 前端框架
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              Vite - 构建工具
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              TypeScript - 类型系统
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
              Tailwind CSS - 样式框架
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
              React Router v7 - 路由管理
            </li>
          </ul>

          <Link
            to="/"
            className="inline-block px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition"
          >
            返回首页
          </Link>
        </div>
      </div>
    </div>
  )
}

export default About
