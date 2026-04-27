import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

// 模拟用户数据
const users = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: '编辑' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: '用户' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: '用户' },
]

function Users() {
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null)

  return (
    <div className=" bg-gradient-to-br from-orange-50 to-red-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-red-600 mb-8">用户列表</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 用户列表 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">用户列表</h2>
            <ul className="space-y-2">
              {users.map((user) => (
                <li
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`p-4 rounded-lg cursor-pointer transition ${
                    selectedUser?.id === user.id
                      ? 'bg-orange-100 border-2 border-orange-500'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">{user.name}</span>
                    <span className="text-sm text-gray-500">{user.role}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* 用户详情 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">用户详情</h2>
            {selectedUser ? (
              <div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">姓名</p>
                  <p className="text-lg text-gray-800">{selectedUser.name}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">邮箱</p>
                  <p className="text-lg text-gray-800">{selectedUser.email}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">角色</p>
                  <p className="text-lg text-gray-800">{selectedUser.role}</p>
                </div>
                <Link
                  to={`/users/${selectedUser.id}`}
                  className="inline-block px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
                >
                  查看详情页
                </Link>
              </div>
            ) : (
              <p className="text-gray-500">点击左侧用户查看详情</p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
          >
            返回首页
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Users
