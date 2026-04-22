/**
 * App 根组件
 *
 * 整合 Layout 和 Routes，并为需要认证的路由包裹 ProtectedRoute
 */
import Layout from '@/components/Layout'
import AppRoutes from '@/routes'

function App() {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  )
}

export default App
