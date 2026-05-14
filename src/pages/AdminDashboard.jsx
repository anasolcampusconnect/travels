import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Package, TrendingUp, Users, DollarSign } from 'lucide-react';
import AdminParcelList from '../components/parcel/AdminParcelList';
import { getAllParcels } from '../services/parcelService';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const parcels = getAllParcels();
  
  const stats = [
    { title: 'Total Parcels', value: parcels.length, icon: Package, color: 'from-blue-500 to-cyan-500' },
    { title: 'In Transit', value: parcels.filter(p => p.status === 'in_transit').length, icon: TrendingUp, color: 'from-orange-500 to-red-500' },
    { title: 'Delivered', value: parcels.filter(p => p.status === 'delivered').length, icon: Users, color: 'from-green-500 to-emerald-500' },
    { title: 'Revenue', value: `₹${parcels.reduce((sum, p) => sum + p.pricing.total, 0)}`, icon: DollarSign, color: 'from-purple-500 to-pink-500' }
  ];
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-white/80 mt-1">Manage parcels, track shipments, and monitor operations</p>
            </div>
            <button
              onClick={() => navigate('/create-parcel')}
              className="flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" /> New Parcel
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 -mt-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
              </div>
              <h3 className="text-gray-600 font-medium">{stat.title}</h3>
            </div>
          ))}
        </div>
        
        {/* Parcel List */}
        <AdminParcelList />
      </div>
    </div>
  );
};

export default AdminDashboard;