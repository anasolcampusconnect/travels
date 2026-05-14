import React, { useState } from 'react';
import { 
  CheckCircle, Package, Truck, MapPin, Calendar,
  Download, Search, Filter, Eye, Star, Clock
} from 'lucide-react';

const DeliveredPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const deliveredParcels = [
    { id: 'TRK-987654321', customer: 'Ramesh Kumar', from: 'Hyderabad', to: 'Bangalore', date: '2024-01-15', amount: '₹543', rating: 5 },
    { id: 'TRK-555666777', customer: 'Priya Sharma', from: 'Mumbai', to: 'Pune', date: '2024-01-14', amount: '₹384', rating: 4 },
    { id: 'TRK-123789456', customer: 'Vikram Singh', from: 'Delhi', to: 'Jaipur', date: '2024-01-13', amount: '₹519', rating: 5 },
    { id: 'TRK-998877665', customer: 'Anita Desai', from: 'Chennai', to: 'Bangalore', date: '2024-01-12', amount: '₹432', rating: 4 },
    { id: 'TRK-443322110', customer: 'Rajesh Kumar', from: 'Kolkata', to: 'Delhi', date: '2024-01-11', amount: '₹678', rating: 5 }
  ];

  const stats = [
    { label: 'Total Delivered', value: '4,523', change: '+23%', icon: CheckCircle, color: 'from-green-500 to-emerald-500' },
    { label: 'On-Time Delivery', value: '98.5%', change: '+2.1%', icon: Clock, color: 'from-blue-500 to-cyan-500' },
    { label: 'Avg Delivery Time', value: '2.4 days', change: '-0.3', icon: Truck, color: 'from-purple-500 to-pink-500' },
    { label: 'Customer Rating', value: '4.8 ★', change: '+0.2', icon: Star, color: 'from-yellow-500 to-orange-500' }
  ];

  return (
    <div className="animate-fadeIn space-y-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <CheckCircle className="w-8 h-8" />
            Delivered Parcels
          </h1>
          <p className="text-white/80 mt-1">Track and manage successfully delivered shipments</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-xl text-white hover:bg-white/20 transition-all">
          <Download className="w-4 h-4" /> Export Report
        </button>
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
                <span className="text-sm font-semibold text-green-600">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Tracking ID, Customer, or Route..."
            className="w-full pl-9 pr-4 py-2 border rounded-xl focus:outline-none focus:border-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Delivered Parcels Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Package className="w-5 h-5 text-green-600" />
            Recently Delivered
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tracking ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Route</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Delivered On</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {deliveredParcels.map((parcel) => (
                <tr key={parcel.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono font-semibold text-sm text-purple-600">{parcel.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-800">{parcel.customer}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span>{parcel.from}</span>
                      <span className="text-gray-400">→</span>
                      <span>{parcel.to}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar className="w-3 h-3" /> {parcel.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-green-600">{parcel.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold">{parcel.rating}.0</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
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

export default DeliveredPage;