import React, { useState } from 'react';
import { Clock, Package, Truck, Search, Filter, Eye } from 'lucide-react';

const PendingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const pendingParcels = [
    { id: 'TRK-123789456', sender: 'Vikram Singh', receiver: 'Neha Gupta', from: 'Delhi', to: 'Jaipur', status: 'handover', date: '2024-01-13', amount: '₹519' },
    { id: 'TRK-998877665', sender: 'Anita Desai', receiver: 'Raj Malhotra', from: 'Chennai', to: 'Bangalore', status: 'picked_up', date: '2024-01-12', amount: '₹432' },
    { id: 'TRK-443322110', sender: 'Rajesh Kumar', receiver: 'Sunita Verma', from: 'Kolkata', to: 'Delhi', status: 'booking', date: '2024-01-11', amount: '₹678' }
  ];

  const stats = [
    { label: 'Booking', value: '12', color: 'bg-gray-100 text-gray-700', icon: Package },
    { label: 'Picked Up', value: '8', color: 'bg-blue-100 text-blue-700', icon: Truck },
    { label: 'Handover', value: '6', color: 'bg-purple-100 text-purple-700', icon: Package },
    { label: 'In Transit', value: '15', color: 'bg-orange-100 text-orange-700', icon: Truck }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      booking: { color: 'bg-gray-100 text-gray-700', text: 'Booking' },
      picked_up: { color: 'bg-blue-100 text-blue-700', text: 'Picked Up' },
      handover: { color: 'bg-purple-100 text-purple-700', text: 'Handover' },
      in_transit: { color: 'bg-orange-100 text-orange-700', text: 'In Transit' }
    };
    const badge = badges[status] || badges.booking;
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>{badge.text}</span>;
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black flex items-center gap-3">
            <Clock className="w-8 h-8" />
            Pending Parcels
          </h1>
          <p className="text-black/80 mt-1">Track and manage pending shipments</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-4">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
              </div>
              <p className="text-gray-500 text-sm mt-2">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Tracking ID..."
              className="w-full pl-9 pr-4 py-2 border rounded-xl focus:outline-none focus:border-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tracking ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Route</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pendingParcels.map((parcel) => (
                <tr key={parcel.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="font-mono font-semibold text-sm text-purple-600">{parcel.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span>{parcel.from}</span>
                      <span className="text-gray-400">→</span>
                      <span>{parcel.to}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(parcel.status)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{parcel.date}</td>
                  <td className="px-6 py-4 font-semibold text-green-600">{parcel.amount}</td>
                  <td className="px-6 py-4">
                    <button className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg">
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

export default PendingPage;