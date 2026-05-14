import React, { useState } from 'react';
import { 
  Package, Search, Filter, Eye, Truck, 
  CheckCircle, Clock, AlertCircle, Download,
  ChevronLeft, ChevronRight, MoreVertical
} from 'lucide-react';

const ParcelsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const parcels = [
    { id: 'TRK-987654321', sender: 'Ramesh Kumar', receiver: 'Suresh Reddy', from: 'Hyderabad', to: 'Bangalore', status: 'delivered', date: '2024-01-15', amount: '₹543' },
    { id: 'TRK-555666777', sender: 'Priya Sharma', receiver: 'Amit Patel', from: 'Mumbai', to: 'Pune', status: 'in_transit', date: '2024-01-14', amount: '₹384' },
    { id: 'TRK-123789456', sender: 'Vikram Singh', receiver: 'Neha Gupta', from: 'Delhi', to: 'Jaipur', status: 'handover', date: '2024-01-13', amount: '₹519' },
    { id: 'TRK-998877665', sender: 'Anita Desai', receiver: 'Raj Malhotra', from: 'Chennai', to: 'Bangalore', status: 'picked_up', date: '2024-01-12', amount: '₹432' },
    { id: 'TRK-443322110', sender: 'Rajesh Kumar', receiver: 'Sunita Verma', from: 'Kolkata', to: 'Delhi', status: 'booking', date: '2024-01-11', amount: '₹678' }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      booking: { color: 'bg-gray-100 text-gray-700', icon: Clock, text: 'Booking' },
      picked_up: { color: 'bg-blue-100 text-blue-700', icon: Truck, text: 'Picked Up' },
      handover: { color: 'bg-purple-100 text-purple-700', icon: Package, text: 'Handover' },
      in_transit: { color: 'bg-orange-100 text-orange-700', icon: Truck, text: 'In Transit' },
      reached: { color: 'bg-yellow-100 text-yellow-700', icon: CheckCircle, text: 'Reached' },
      delivered: { color: 'bg-green-100 text-green-700', icon: CheckCircle, text: 'Delivered' }
    };
    const badge = badges[status] || badges.booking;
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        <Icon className="w-3 h-3" /> {badge.text}
      </span>
    );
  };

  return (
    <div className="animate-fadeIn space-y-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Package className="w-8 h-8" />
            All Parcels
          </h1>
          <p className="text-white/80 mt-1">Manage and track all shipments</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-xl text-white hover:bg-white/20 transition-all">
          <Download className="w-4 h-4" /> Export List
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Tracking ID, Sender, Receiver..."
              className="w-full pl-9 pr-4 py-2 border rounded-xl focus:outline-none focus:border-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border rounded-xl focus:outline-none focus:border-purple-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="booking">Booking</option>
            <option value="picked_up">Picked Up</option>
            <option value="handover">Handover</option>
            <option value="in_transit">In Transit</option>
            <option value="reached">Reached</option>
            <option value="delivered">Delivered</option>
          </select>
          <button className="px-4 py-2 bg-gray-100 rounded-xl flex items-center gap-2 hover:bg-gray-200 transition">
            <Filter className="w-4 h-4" /> More Filters
          </button>
        </div>
      </div>

      {/* Parcels Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tracking ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Sender</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Receiver</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Route</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {parcels.map((parcel) => (
                <tr key={parcel.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono font-semibold text-sm text-purple-600">{parcel.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-800">{parcel.sender}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-800">{parcel.receiver}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span>{parcel.from}</span>
                      <span className="text-gray-400">→</span>
                      <span>{parcel.to}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{parcel.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-green-600">{parcel.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(parcel.status)}
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
        <div className="px-6 py-4 border-t flex justify-between items-center">
          <p className="text-sm text-gray-500">Showing 5 of 1,234 parcels</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 bg-purple-600 text-white rounded-lg">1</button>
            <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParcelsPage;