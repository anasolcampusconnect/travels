import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  CheckCircle, 
  XCircle,
  Package,
  Truck,
  DollarSign,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Clock
} from 'lucide-react';
import Card from '../components/common/Card';

const Dashboard = () => {
  const stats = [
    { 
      title: 'Total Imports', 
      value: '2,847', 
      icon: TrendingUp, 
      trend: '+12.5%',
      trendUp: true,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    { 
      title: 'Total Exports', 
      value: '1,943', 
      icon: TrendingDown, 
      trend: '+8.2%',
      trendUp: true,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    { 
      title: 'Successful', 
      value: '4,523', 
      icon: CheckCircle, 
      trend: '+23.1%',
      trendUp: true,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    { 
      title: 'Failed', 
      value: '267', 
      icon: XCircle, 
      trend: '-5.4%',
      trendUp: false,
      color: 'from-red-500 to-rose-500',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600'
    }
  ];

  const recentActivities = [
    { id: 1, type: 'import', title: 'Customer Data Import', status: 'completed', time: '2 minutes ago', records: 1250, user: 'John Doe' },
    { id: 2, type: 'export', title: 'Sales Report Export', status: 'completed', time: '1 hour ago', records: 845, user: 'Jane Smith' },
    { id: 3, type: 'import', title: 'Product Catalog', status: 'processing', time: '3 hours ago', records: 3420, user: 'Mike Johnson' },
    { id: 4, type: 'export', title: 'Inventory Data', status: 'failed', time: '5 hours ago', records: 0, user: 'Sarah Williams' }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'processing': return <Clock className="w-4 h-4 text-yellow-500 animate-pulse" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="animate-fadeIn space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
          <Package className="w-10 h-10" />
          Dashboard Overview
        </h1>
        <p className="text-white/80 text-lg">Welcome back! Here's what's happening with your shipments today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              {/* Gradient Border Effect */}
              <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${stat.color}`}></div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center gap-1 text-sm font-semibold ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.trendUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                      {stat.trend}
                    </div>
                    <span className="text-xs text-gray-400">vs last month</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
                  <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts & Activities Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Performance Overview
              </h3>
              <p className="text-sm text-gray-500 mt-1">Import/Export trends for last 6 months</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition">Weekly</button>
              <button className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition">Monthly</button>
              <button className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition">Yearly</button>
            </div>
          </div>
          
          {/* Chart Placeholder */}
          <div className="h-64 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-2" />
              <p className="text-gray-500">Chart visualization will appear here</p>
              <p className="text-xs text-gray-400 mt-1">Showing import/export trends</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-green-600" />
            Quick Stats
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Parcels</p>
                  <p className="text-xl font-bold text-gray-800">4,790</p>
                </div>
              </div>
              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">+15%</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Active Shipments</p>
                  <p className="text-xl font-bold text-gray-800">156</p>
                </div>
              </div>
              <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Active</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Active Users</p>
                  <p className="text-xl font-bold text-gray-800">89</p>
                </div>
              </div>
              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">+7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                Recent Activities
              </h3>
              <p className="text-sm text-gray-500 mt-1">Latest import/export operations</p>
            </div>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">View All →</button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Operation</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Records</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      activity.type === 'import' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {activity.type === 'import' ? '📥 Import' : '📤 Export'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-800">{activity.title}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{activity.records.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                        <Users className="w-3 h-3 text-purple-600" />
                      </div>
                      <span className="text-sm text-gray-600">{activity.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      {getStatusIcon(activity.status)}
                      <span className={`text-sm capitalize ${
                        activity.status === 'completed' ? 'text-green-600' :
                        activity.status === 'processing' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-lg font-semibold mb-2">Quick Import</h4>
              <p className="text-white/80 text-sm mb-4">Import your data with AI-powered validation</p>
              <button className="px-4 py-2 bg-white text-purple-600 rounded-xl text-sm font-semibold hover:shadow-lg transition">
                Start Import →
              </button>
            </div>
            <Package className="w-12 h-12 text-white/20" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-lg font-semibold mb-2">Export Reports</h4>
              <p className="text-white/80 text-sm mb-4">Generate custom reports in multiple formats</p>
              <button className="px-4 py-2 bg-white text-green-600 rounded-xl text-sm font-semibold hover:shadow-lg transition">
                Export Now →
              </button>
            </div>
            <Truck className="w-12 h-12 text-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;