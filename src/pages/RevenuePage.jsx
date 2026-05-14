import React, { useState } from 'react';
import { 
  DollarSign, TrendingUp, TrendingDown, Calendar, 
  Download, Filter, ArrowUpRight, ArrowDownRight,
  Package, Truck, Users, Clock, Wallet, CreditCard,CheckCircle
} from 'lucide-react';

const RevenuePage = () => {
  const [period, setPeriod] = useState('monthly');
  
  const stats = [
    { label: 'Total Revenue', value: '₹8,42,390', change: '+18.5%', trend: 'up', icon: DollarSign, color: 'from-green-500 to-emerald-500' },
    { label: 'This Month', value: '₹1,23,450', change: '+12.3%', trend: 'up', icon: Calendar, color: 'from-blue-500 to-cyan-500' },
    { label: 'Avg Order Value', value: '₹2,340', change: '+5.2%', trend: 'up', icon: Wallet, color: 'from-purple-500 to-pink-500' },
    { label: 'Pending Payments', value: '₹45,230', change: '-8.1%', trend: 'down', icon: Clock, color: 'from-orange-500 to-red-500' }
  ];

  const transactions = [
    { id: 'TRX-001', date: '2024-01-15', customer: 'Ramesh Kumar', amount: '₹2,340', status: 'completed', method: 'UPI' },
    { id: 'TRX-002', date: '2024-01-14', customer: 'Priya Sharma', amount: '₹1,890', status: 'completed', method: 'Card' },
    { id: 'TRX-003', date: '2024-01-14', customer: 'Amit Patel', amount: '₹3,450', status: 'pending', method: 'Net Banking' },
    { id: 'TRX-004', date: '2024-01-13', customer: 'Suresh Reddy', amount: '₹1,200', status: 'completed', method: 'UPI' },
    { id: 'TRX-005', date: '2024-01-13', customer: 'Neha Gupta', amount: '₹2,890', status: 'completed', method: 'Card' }
  ];

  return (
    <div className="animate-fadeIn space-y-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <DollarSign className="w-8 h-8" />
            Revenue Analytics
          </h1>
          <p className="text-white/80 mt-1">Track your earnings and financial performance</p>
        </div>
        <div className="flex gap-3">
          <select className="px-4 py-2 bg-white/10 backdrop-blur rounded-xl text-white border border-white/20">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-xl text-white hover:bg-white/20 transition-all">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
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

      {/* Revenue Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Revenue Trend
            </h3>
            <p className="text-sm text-gray-500 mt-1">Monthly revenue performance</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs bg-purple-100 text-purple-600 rounded-lg">Weekly</button>
            <button className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg">Monthly</button>
            <button className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg">Yearly</button>
          </div>
        </div>
        <div className="h-80 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-16 h-16 text-green-400 mx-auto mb-3" />
            <p className="text-gray-500">Revenue chart visualization will appear here</p>
            <p className="text-xs text-gray-400 mt-1">Showing revenue trends over time</p>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-purple-600" />
                Recent Transactions
              </h3>
              <p className="text-sm text-gray-500 mt-1">Latest payment activities</p>
            </div>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">View All →</button>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {transactions.map((tx) => (
            <div key={tx.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${tx.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'} flex items-center justify-center`}>
                    {tx.status === 'completed' ? <CheckCircle className="w-5 h-5 text-green-600" /> : <Clock className="w-5 h-5 text-yellow-600" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{tx.customer}</p>
                    <p className="text-xs text-gray-500">{tx.id} • {tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">{tx.amount}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${tx.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {tx.status}
                    </span>
                    <span className="text-xs text-gray-400">{tx.method}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenuePage;