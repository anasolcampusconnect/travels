import React from 'react';
import Card from '../components/common/Card';

const Dashboard = () => {
  const stats = [
    { title: 'Total Imports', value: '0', icon: '📥', color: 'from-blue-500 to-cyan-500' },
    { title: 'Total Exports', value: '0', icon: '📤', color: 'from-green-500 to-emerald-500' },
    { title: 'Successful', value: '0', icon: '✅', color: 'from-purple-500 to-pink-500' },
    { title: 'Failed', value: '0', icon: '❌', color: 'from-red-500 to-rose-500' }
  ];
  
  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-white/80">Welcome to Import/Export Dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl">{stat.icon}</span>
              <span className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </span>
            </div>
            <h3 className="text-gray-600 font-medium">{stat.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;