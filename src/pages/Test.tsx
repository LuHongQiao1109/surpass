import { Link } from 'react-router-dom'

function Test() {
  return (
    <div className=" bg-gradient-to-br from-green-50 to-emerald-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-emerald-600 mb-8">测试页面</h1>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tailwind CSS 测试</h2>
          <div className="space-y-4">
            <button className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600">
              主要按钮
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
              次要按钮
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">导航测试</h2>
          <Link to="/" className="text-emerald-600 hover:underline">
            返回首页
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Test
