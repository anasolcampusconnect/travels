import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, BarChart3, PieChart, 
  Calendar, Download, Filter, ArrowUpRight,
  ArrowDownRight, Users, Package, DollarSign, Eye,
  Activity, Clock, CheckCircle, XCircle
} from 'lucide-react';

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('weekly');
  
  const stats = [
    { label: 'Total Shipments', value: '12,847', change: '+23%', trend: 'up', icon: Package, color: 'from-blue-500 to-cyan-500' },
    { label: 'Active Users', value: '3,421', change: '+12%', trend: 'up', icon: Users, color: 'from-green-500 to-emerald-500' },
    { label: 'Revenue', value: '₹8.4L', change: '+18%', trend: 'up', icon: DollarSign, color: 'from-purple-500 to-pink-500' },
    { label: 'Conversion Rate', value: '64.2%', change: '+5%', trend: 'up', icon: Eye, color: 'from-orange-500 to-red-500' }
  ];

  const weeklyData = [
    { day: 'Mon', shipments: 245, revenue: 45230 },
    { day: 'Tue', shipments: 289, revenue: 52340 },
    { day: 'Wed', shipments: 312, revenue: 58920 },
    { day: 'Thu', shipments: 298, revenue: 54310 },
    { day: 'Fri', shipments: 356, revenue: 67230 },
    { day: 'Sat', shipments: 278, revenue: 49870 },
    { day: 'Sun', shipments: 234, revenue: 42340 }
  ];

  const topRoutes = [
    { from: 'Hyderabad', to: 'Bangalore', shipments: 1234, revenue: '₹2.3L' },
    { from: 'Mumbai', to: 'Pune', shipments: 987, revenue: '₹1.8L' },
    { from: 'Delhi', to: 'Jaipur', shipments: 876, revenue: '₹1.6L' },
    { from: 'Chennai', to: 'Bangalore', shipments: 765, revenue: '₹1.4L' }
  ];

  return (
    <div className="animate-fadeIn space-y-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black flex items-center gap-3">
            <BarChart3 className="w-8 h-8" />
            Analytics Dashboard
          </h1>
          <p className="text-black/80 mt-1">Track your business performance and insights</p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-black/10 backdrop-blur rounded-xl p-1">
            {['daily', 'weekly', 'monthly'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  timeRange === range ? 'bg-white text-purple-600 shadow-md' : 'text-white hover:bg-white/20'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-xl text-white hover:bg-white/20 transition-all">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all group">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shipments Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-600" />
                Shipment Trends
              </h3>
              <p className="text-sm text-gray-500 mt-1">Daily shipment volume</p>
            </div>
            <Filter className="w-5 h-5 text-gray-400 cursor-pointer hover:text-purple-600" />
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {weeklyData.map((data, idx) => {
              const height = (data.shipments / 400) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full bg-purple-100 rounded-lg relative overflow-hidden cursor-pointer group-hover:opacity-80 transition">
                    <div className="w-full bg-gradient-to-t from-purple-600 to-pink-600 rounded-lg transition-all duration-500" style={{ height: `${height}%`, minHeight: '4px' }}></div>
                  </div>
                  <span className="text-xs text-gray-500">{data.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                Revenue Overview
              </h3>
              <p className="text-sm text-gray-500 mt-1">Weekly revenue in ₹</p>
            </div>
            <Calendar className="w-5 h-5 text-gray-400 cursor-pointer hover:text-green-600" />
          </div>
          <div className="space-y-3">
            {weeklyData.map((data, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-10">{data.day}</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: `${(data.revenue / 70000) * 100}%` }}></div>
                </div>
                <span className="text-xs font-semibold text-gray-700">₹{(data.revenue / 1000).toFixed(0)}k</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Routes Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Top Performing Routes
              </h3>
              <p className="text-sm text-gray-500 mt-1">Most active shipment routes</p>
            </div>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">View All →</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Route</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Shipments</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topRoutes.map((route, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800">{route.from}</span>
                      <span className="text-gray-400">→</span>
                      <span className="text-gray-600">{route.to}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-800">{route.shipments.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-green-600 font-semibold">{route.revenue}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs">
                      <ArrowUpRight className="w-3 h-3" /> +{Math.floor(Math.random() * 20) + 5}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;