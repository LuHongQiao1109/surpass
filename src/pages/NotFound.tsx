import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className=" bg-gradient-to-br from-gray-900 to-gray-800 p-8 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-white mb-4">404</h1>
        <p className="text-2xl text-gray-300 mb-8">页面未找到</p>
        <p className="text-gray-400 mb-8">抱歉，您访问的页面不存在或已被移除</p>
        <Link
          to="/"
          className="inline-block px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition"
        >
          返回首页
        </Link>
      </div>
    </div>
  )
}

export default NotFound
