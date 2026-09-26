import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import HomePage from '@/components/homepage/HomePage'
import DashboardLayout from '@/components/layout/DashboardLayout'

// User Portal Pages
import UserOverview from '@/components/dashboard/user/UserOverview'
import UserBookings from '@/components/dashboard/user/UserBookings'
import UserProfile from '@/components/dashboard/user/UserProfile'

// Admin Portal Pages
import AdminOverview from '@/components/dashboard/admin/AdminOverview'
import AdminMembers from '@/components/dashboard/admin/AdminMembers'
import AdminSchedule from '@/components/dashboard/admin/AdminSchedule'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<HomePage />} />

          {/* User Portal Routes */}
          <Route path="/dashboard" element={<DashboardLayout role="user" />}>
            <Route index element={<UserOverview />} />
            <Route path="bookings" element={<UserBookings />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>

          {/* Admin Portal Routes */}
          <Route path="/admin" element={<DashboardLayout role="admin" />}>
            <Route index element={<AdminOverview />} />
            <Route path="members" element={<AdminMembers />} />
            <Route path="schedule" element={<AdminSchedule />} />
          </Route>

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
