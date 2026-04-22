import { useParams, Link } from 'react-router-dom'

// 模拟用户数据
const users = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员', bio: '热爱编程，喜欢 React 和 TypeScript' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: '编辑', bio: '内容创作者，专注于技术写作' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: '用户', bio: '前端开发初学者' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: '用户', bio: '全栈开发者' },
]

function UserDetail() {
  const { id } = useParams<{ id: string }>()
  const user = users.find(u => u.id === Number(id))

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">用户不存在</p>
          <Link to="/users" className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
            返回用户列表
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mr-6">
              {user.name[0]}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-gray-500">{user.role}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">邮箱</p>
              <p className="text-lg text-gray-800">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">个人简介</p>
              <p className="text-gray-700">{user.bio}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">用户 ID</p>
              <p className="text-gray-700 font-mono">{user.id}</p>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Link
              to="/users"
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              返回列表
            </Link>
            <Link
              to="/"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              返回首页
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetail
