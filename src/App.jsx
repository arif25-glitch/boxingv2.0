import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/module-auth/context/AuthContext'
import { DataProvider } from '@/data/DataContext'
import HomePage from '@/app-homepage/HomePage'
import LoginPage from '@/module-auth/pages/LoginPage'
import UserLayout from '@/app-user/module-dashboard/components/UserLayout'

// User Portal Pages
import UserOverview from '@/app-user/module-dashboard/pages/UserOverview'
import UserBookings from '@/app-user/module-dashboard/pages/UserBookings'
import UserProfile from '@/app-user/module-dashboard/pages/UserProfile'

// Admin Portal Pages
import AdminOverview from '@/app-admin/module-admin/pages/AdminOverview'
import AdminMembers from '@/app-admin/module-admin/pages/AdminMembers'
import AdminSchedule from '@/app-admin/module-admin/pages/AdminSchedule'
import AdminContent from '@/app-admin/module-admin/pages/AdminContent'
import AdminLayout from '@/app-admin/module-admin/components/AdminLayout'

function RequireRole({ role, children }) {
  const { user } = useAuth()
  return user?.role === role ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<HomePage />} />

          {/* Login Page */}
          <Route path="/login" element={<LoginPage />} />

          {/* User Portal Routes */}
          <Route path="/dashboard" element={<RequireRole role="user"><UserLayout /></RequireRole>}>
            <Route index element={<UserOverview />} />
            <Route path="bookings" element={<UserBookings />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>

          {/* Admin Portal Routes */}
          <Route path="/admin" element={<RequireRole role="admin"><AdminLayout /></RequireRole>}>
            <Route index element={<AdminOverview />} />
            <Route path="members" element={<AdminMembers />} />
            <Route path="schedule" element={<AdminSchedule />} />
            <Route path="content" element={<AdminContent />} />
          </Route>

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  )
}

export default App
