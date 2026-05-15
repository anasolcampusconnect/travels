// src/routes.jsx
import React from 'react';

export const routes = [
  { path: '/', label: 'Dashboard', icon: '📊', requiresAuth: true },
  { path: '/import', label: 'Import Data', icon: '📥', requiresAuth: true },
  { path: '/export', label: 'Export Data', icon: '📤', requiresAuth: true },
  { path: '/track', label: 'Track Parcel', icon: '📍', requiresAuth: true },
  { path: '/parcels', label: 'Parcels', icon: '📦', requiresAuth: true },
  { path: '/analytics', label: 'Analytics', icon: '📈', requiresAuth: true },
  { path: '/users', label: 'Users', icon: '👥', requiresAuth: true, adminOnly: true },
  { path: '/settings', label: 'Settings', icon: '⚙️', requiresAuth: true },
  { path: '/help', label: 'Help', icon: '❓', requiresAuth: true }
];

export default routes;