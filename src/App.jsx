// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ImportPage from './pages/ImportPage';
import ExportPage from './pages/ExportPage';
import TrackPage from './pages/TrackPage';
import CreateParcelPage from './pages/CreateParcelPage';
import AnalyticsPage from './pages/AnalyticsPage';
import RevenuePage from './pages/RevenuePage';
import UsersPage from './pages/UsersPage';
import DeliveredPage from './pages/DeliveredPage';
import ParcelsPage from './pages/ParcelsPage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import PendingPage from './pages/PendingPage';
import NotificationsPage from './pages/NotificationsPage';
import CustomerChatPage from './pages/CustomerChatPage';
import QRBookingPage from './pages/QRBookingPage';

function App() {
  return (
    <AuthProvider>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.2)',
          },
        }}
      />
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/public/track/:id" element={<TrackPage />} />
          
          {/* Redirects */}
          <Route path="/travels" element={<Navigate to="/" replace />} />
          <Route path="/travel" element={<Navigate to="/" replace />} />
          
          {/* Protected Routes with Layout */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout>
                <UserDashboard />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin" element={
            <ProtectedRoute adminOnly={true}>
              <Layout>
                <AdminDashboard />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/import" element={
            <ProtectedRoute>
              <Layout>
                <ImportPage />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/export" element={
            <ProtectedRoute>
              <Layout>
                <ExportPage />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/track" element={
            <ProtectedRoute>
              <Layout>
                <TrackPage />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/qr-booking" element={
            <ProtectedRoute>
              <Layout>
                <QRBookingPage/>
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/track/:id" element={
            <ProtectedRoute>
              <Layout>
                <TrackPage />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/create-parcel" element={
            <ProtectedRoute>
              <Layout>
                <CreateParcelPage />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/parcels" element={
            <ProtectedRoute>
              <Layout>
                <ParcelsPage />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/delivered" element={
            <ProtectedRoute>
              <Layout>
                <DeliveredPage />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/pending" element={
            <ProtectedRoute>
              <Layout>
                <PendingPage />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/analytics" element={
            <ProtectedRoute>
              <Layout>
                <AnalyticsPage />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/revenue" element={
            <ProtectedRoute>
              <Layout>
                <RevenuePage />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/users" element={
            <ProtectedRoute adminOnly={true}>
              <Layout>
                <UsersPage />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/history" element={
            <ProtectedRoute>
              <Layout>
                <HistoryPage />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <ProtectedRoute>
              <Layout>
                <SettingsPage />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/help" element={
            <ProtectedRoute>
              <Layout>
                <HelpPage />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/notifications" element={
            <ProtectedRoute>
              <Layout>
                <NotificationsPage />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/customer-chat" element={
            <ProtectedRoute>
              <Layout>
                <CustomerChatPage />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/qr-booking" element={
            <ProtectedRoute>
              <Layout>
                <QRBookingPage />
              </Layout>
            </ProtectedRoute>
          } />
          
          {/* 404 - Not Found */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  );
}

export default App;