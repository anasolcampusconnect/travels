import React from 'react';
import { Navigate } from 'react-router-dom';

export const routes = [
  {
    path: '/',
    element: 'Dashboard',
    exact: true,
    requiresAuth: false,
    icon: '📊',
    label: 'Dashboard'
  },
  {
    path: '/import',
    element: 'ImportPage',
    exact: true,
    requiresAuth: false,
    icon: '📥',
    label: 'Import Data'
  },
  {
    path: '/export',
    element: 'ExportPage',
    exact: true,
    requiresAuth: false,
    icon: '📤',
    label: 'Export Data'
  },
  {
    path: '/history',
    element: 'HistoryPage',
    exact: true,
    requiresAuth: false,
    icon: '📜',
    label: 'History'
  },
  {
    path: '/settings',
    element: 'SettingsPage',
    exact: true,
    requiresAuth: false,
    icon: '⚙️',
    label: 'Settings'
  },
  {
    path: '*',
    element: () => <Navigate to="/" replace />,
    label: 'Not Found'
  }
];

export const navigationItems = routes.filter(route => route.label !== 'Not Found');