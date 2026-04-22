/**
 * 登录页面（演示用）
 *
 * 用于演示权限控制功能
 * 实际项目中应该对接真实的认证 API
 */

import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

interface UserInfo {
  id: string
  name: string
  roles: string[]
  token: string
}

// 模拟用户数据库
const MOCK_USERS: Record<string, UserInfo> = {
  admin: {
    id: '1',
    name: '管理员',
    roles: ['admin', 'user'],
    token: 'admin-token-123',
  },
  user: {
    id: '2',
    name: '普通用户',
    roles: ['user'],
    token: 'user-token-456',
  },
}

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // 获取重定向路径
  const searchParams = new URLSearchParams(location.search)
  const from = searchParams.get('redirect') || '/'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // 模拟登录验证
    const user = MOCK_USERS[username.toLowerCase()]

    if (user && password === '123456') {
      // 登录成功，保存 token 到 localStorage
      localStorage.setItem('token', user.token)
      localStorage.setItem('user', JSON.stringify(user))

      // 跳转到之前访问的页面或首页
      navigate(from, { replace: true })
    } else {
      setError('用户名或密码错误（提示：admin/123456 或 user/123456）')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          用户登录
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              用户名
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="输入 admin 或 user"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              密码
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="输入 123456"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
          >
            登录
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 font-semibold mb-2">测试账号：</p>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>管理员：<code className="bg-gray-200 px-2 py-0.5 rounded">admin / 123456</code></li>
            <li>普通用户：<code className="bg-gray-200 px-2 py-0.5 rounded">user / 123456</code></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Login
