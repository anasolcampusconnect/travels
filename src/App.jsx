import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import ImportPage from './pages/ImportPage';
import ExportPage from './pages/ExportPage';
import TrackPage from './pages/TrackPage';
import AdminDashboard from './pages/AdminDashboard';
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
import NotificationsPage from './pages/NotificationsPage';  // Add this import

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Layout>
        <Routes>
          {/* Redirects */}
          <Route path="/travels" element={<Navigate to="/" replace />} />
          <Route path="/travel" element={<Navigate to="/" replace />} />
          
          {/* Main Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/import" element={<ImportPage />} />
          <Route path="/export" element={<ExportPage />} />
          <Route path="/track" element={<TrackPage />} />
          <Route path="/track/:id" element={<TrackPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/create-parcel" element={<CreateParcelPage />} />
          
          {/* Parcel Management Routes */}
          <Route path="/parcels" element={<ParcelsPage />} />
          <Route path="/delivered" element={<DeliveredPage />} />
          <Route path="/pending" element={<PendingPage />} />
          
          {/* Reports & Analytics Routes */}
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/revenue" element={<RevenuePage />} />
          <Route path="/users" element={<UsersPage />} />
          
          {/* Support Routes */}
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />  {/* Add this route */}
          
          {/* 404 - Not Found */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;