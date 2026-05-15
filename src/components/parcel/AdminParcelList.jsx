// src/components/parcel/AdminParcelList.jsx
import React, { useState } from 'react';
import { Package, Search, Eye, Truck, CheckCircle, Clock, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { getAllParcels, updateParcelStatus } from '../../services/parcelService';
import toast from 'react-hot-toast';

const AdminParcelList = () => {
  const [parcels, setParcels] = useState(getAllParcels());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const filteredParcels = parcels.filter(parcel => {
    const matchesSearch = parcel.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          parcel.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          parcel.receiver.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || parcel.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  const totalPages = Math.ceil(filteredParcels.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentParcels = filteredParcels.slice(startIndex, startIndex + itemsPerPage);
  
  const handleStatusUpdate = (trackingId, newStatus) => {
    const updated = updateParcelStatus(trackingId, newStatus);
    if (updated) {
      setParcels(getAllParcels());
      toast.success(`Parcel ${trackingId} updated to ${newStatus}`);
    }
  };
  
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
  
  const statusOptions = [
    { value: 'booking', label: 'Booking Confirmed' },
    { value: 'picked_up', label: 'Picked Up' },
    { value: 'handover', label: 'Handover to Bus' },
    { value: 'in_transit', label: 'In Transit' },
    { value: 'reached', label: 'Reached Destination' },
    { value: 'out_for_delivery', label: 'Out for Delivery' },
    { value: 'delivered', label: 'Delivered' }
  ];
  
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Package className="w-6 h-6 text-purple-600" />
              Parcel Management
            </h2>
            <p className="text-gray-500 text-sm mt-1">Manage and track all parcels</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-gray-700 hover:bg-gray-200">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
        
        <div className="flex flex-wrap gap-4 mt-6">
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
            <option value="out_for_delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tracking ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Sender</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Receiver</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Route</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentParcels.map((parcel) => (
              <tr key={parcel.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <span className="font-mono font-semibold text-sm text-purple-600">{parcel.trackingId}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{parcel.sender.name}</div>
                  <div className="text-xs text-gray-500">{parcel.sender.phone}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{parcel.receiver.name}</div>
                  <div className="text-xs text-gray-500">{parcel.receiver.phone}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-700">{parcel.journey.from}</div>
                  <div className="text-xs text-gray-500">→ {parcel.journey.to}</div>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(parcel.status)}
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-green-600">₹{parcel.pricing.total}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <select
                      className="text-xs px-2 py-1 border rounded-lg focus:outline-none focus:border-purple-500"
                      value={parcel.status}
                      onChange={(e) => handleStatusUpdate(parcel.trackingId, e.target.value)}
                    >
                      {statusOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <button className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredParcels.length)} of {filteredParcels.length} parcels
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminParcelList;