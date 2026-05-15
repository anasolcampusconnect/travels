import React from 'react';
import { Package, Truck, Clock, CheckCircle, TrendingUp, Calendar, MapPin, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const UserDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { title: 'Total Parcels', value: '24', icon: Package, color: 'from-blue-500 to-cyan-500' },
    { title: 'In Transit', value: '3', icon: Truck, color: 'from-orange-500 to-red-500' },
    { title: 'Pending', value: '2', icon: Clock, color: 'from-yellow-500 to-orange-500' },
    { title: 'Delivered', value: '19', icon: CheckCircle, color: 'from-green-500 to-emerald-500' }
  ];

  const recentParcels = [
    { id: 'TRK-987654321', from: 'Hyderabad', to: 'Bangalore', status: 'delivered', date: '2024-01-15' },
    { id: 'TRK-555666777', from: 'Mumbai', to: 'Pune', status: 'in_transit', date: '2024-01-14' },
    { id: 'TRK-123789456', from: 'Delhi', to: 'Jaipur', status: 'handover', date: '2024-01-13' }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      delivered: 'bg-green-100 text-green-700',
      in_transit: 'bg-blue-100 text-blue-700',
      handover: 'bg-purple-100 text-purple-700'
    };
    return badges[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="animate-fadeIn space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-3xl">
            {user?.avatar || '👤'}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user?.name}!</h1>
            <p className="text-gray-500">Track and manage your parcels easily</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-4">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Send a Parcel</h3>
              <p className="text-white/80 text-sm mb-4">Book a new parcel delivery</p>
              <button className="px-4 py-2 bg-white text-purple-600 rounded-xl text-sm font-semibold hover:shadow-lg transition">
                Book Now →
              </button>
            </div>
            <Package className="w-12 h-12 text-white/20" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Track Parcel</h3>
              <p className="text-white/80 text-sm mb-4">Enter tracking ID to track</p>
              <button className="px-4 py-2 bg-white text-green-600 rounded-xl text-sm font-semibold hover:shadow-lg transition">
                Track Now →
              </button>
            </div>
            <MapPin className="w-12 h-12 text-white/20" />
          </div>
        </div>
      </div>

      {/* Recent Parcels */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Package className="w-5 h-5 text-purple-600" />
            Recent Parcels
          </h3>
        </div>
        <div className="divide-y">
          {recentParcels.map((parcel) => (
            <div key={parcel.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex flex-wrap justify-between items-center gap-3">
                <div>
                  <p className="font-mono font-semibold text-purple-600">{parcel.id}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <MapPin className="w-3 h-3" />
                    {parcel.from} → {parcel.to}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(parcel.status)}`}>
                    {parcel.status}
                  </span>
                  <span className="text-xs text-gray-400">{parcel.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;