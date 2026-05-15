import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Upload, 
  Download, 
  History, 
  Settings,
  Package,
  Search,
  MapPin,
  Truck,
  Users,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Box,
  UserCheck,
  FileText,
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  
  const menuGroups = [
    {
      title: 'MAIN MENU',
      items: [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard, color: '#8b5cf6' },
        { path: '/import', label: 'Import Data', icon: Upload, color: '#10b981' },
        { path: '/admin', label: 'Admin Dashboard', icon: Users, color: '#8b5cf6' },
        { path: '/export', label: 'Export Data', icon: Download, color: '#f59e0b' },
        { path: '/track', label: 'Track Parcel', icon: MapPin, color: '#ef4444' }
      ]
    },
    {
      title: 'PARCEL MANAGEMENT',
      items: [
        { path: '/parcels', label: 'All Parcels', icon: Package, color: '#8b5cf6' },
        { path: '/create-parcel', label: 'New Parcel', icon: Box, color: '#06b6d4' },
        { path: '/pending', label: 'Pending', icon: Clock, color: '#f59e0b', badge: 3 },
        { path: '/delivered', label: 'Delivered', icon: CheckCircle, color: '#10b981', badge: 12 }
      ]
    },
    {
      title: 'REPORTS & ANALYTICS',
      items: [
        { path: '/analytics', label: 'Analytics', icon: TrendingUp, color: '#8b5cf6' },
        { path: '/revenue', label: 'Revenue', icon: DollarSign, color: '#10b981' },
        { path: '/users', label: 'Users', icon: Users, color: '#ef4444' }
      ]
    },
    {
      title: 'SUPPORT',
      items: [
        { path: '/history', label: 'History', icon: History, color: '#8b5cf6' },
        { path: '/settings', label: 'Settings', icon: Settings, color: '#6b7280' },
        { path: '/help', label: 'Help & Support', icon: HelpCircle, color: '#6b7280' }
      ]
    }
  ];
  
  return (
    <aside className={`
      fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-xl transition-all duration-300 z-40
      ${collapsed ? 'w-20' : 'w-72'}
    `}>
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 w-6 h-6 bg-white border rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all z-50"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
      
      {/* Scrollable Menu Area - with padding bottom to avoid overlapping fixed profile */}
      <div className="h-full overflow-y-auto pb-24">
        <div className="py-6">
          {menuGroups.map((group, idx) => (
            <div key={idx} className="mb-6">
              {!collapsed && (
                <div className="px-4 mb-3">
                  <span className="text-[10px] font-semibold text-gray-400 tracking-wider">
                    {group.title}
                  </span>
                </div>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={`
                        relative group flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl transition-all duration-200
                        ${isActive 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md' 
                          : 'text-gray-600 hover:bg-gray-100'
                        }
                        ${collapsed ? 'justify-center' : ''}
                      `}
                      title={collapsed ? item.label : ''}
                    >
                      {/* Active Indicator */}
                      {isActive && !collapsed && (
                        <div className="absolute left-0 w-1 h-8 bg-white rounded-r-full"></div>
                      )}
                      
                      {/* Icon with Gradient */}
                      <div className={`
                        relative transition-all duration-200
                        ${collapsed ? 'w-10 h-10 flex items-center justify-center rounded-lg' : ''}
                        ${isActive 
                          ? 'text-white' 
                          : collapsed ? 'bg-gray-100 text-gray-600 group-hover:bg-purple-100 group-hover:text-purple-600' : ''
                        }
                      `}>
                        <Icon className={`w-5 h-5 ${collapsed ? 'mx-auto' : ''}`} />
                      </div>
                      
                      {/* Label */}
                      {!collapsed && (
                        <span className="font-medium text-sm flex-1">{item.label}</span>
                      )}
                      
                      {/* Badge */}
                      {item.badge && !collapsed && (
                        <span className={`
                          px-2 py-0.5 rounded-full text-xs font-semibold
                          ${isActive 
                            ? 'bg-white/20 text-white' 
                            : 'bg-red-100 text-red-600'
                          }
                        `}>
                          {item.badge}
                        </span>
                      )}
                      
                      {/* Tooltip for collapsed mode */}
                      {collapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                          {item.label}
                        </div>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Profile Section - Fixed at Bottom */}
      {!collapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">Admin User</p>
              <p className="text-xs text-gray-500">admin@parceltrack.com</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Collapsed mode profile - simple icon at bottom */}
      {collapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t bg-white flex justify-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
            <UserCheck className="w-4 h-4 text-white" />
          </div>
        </div>
      )}
      
      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #c7d2fe;
          border-radius: 4px;
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;