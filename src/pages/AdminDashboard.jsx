// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Package, TrendingUp, Users, DollarSign, 
  Truck, Clock, CheckCircle, AlertCircle, 
  Download, Search, Filter, Eye, MoreVertical,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { getAllParcels, updateParcelStatus } from '../services/parcelService';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [parcels, setParcels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  useEffect(() => {
    loadParcels();
  }, []);
  
  const loadParcels = () => {
    const allParcels = getAllParcels();
    setParcels(allParcels);
  };
  
  const stats = [
    { title: 'Total Parcels', value: parcels.length, icon: Package, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50', textColor: 'text-blue-600' },
    { title: 'In Transit', value: parcels.filter(p => p.status === 'in_transit').length, icon: Truck, color: 'from-orange-500 to-red-500', bg: 'bg-orange-50', textColor: 'text-orange-600' },
    { title: 'Delivered', value: parcels.filter(p => p.status === 'delivered').length, icon: CheckCircle, color: 'from-green-500 to-emerald-500', bg: 'bg-green-50', textColor: 'text-green-600' },
    { title: 'Revenue', value: `₹${parcels.reduce((sum, p) => sum + (p.pricing?.total || 0), 0).toLocaleString()}`, icon: DollarSign, color: 'from-purple-500 to-pink-500', bg: 'bg-purple-50', textColor: 'text-purple-600' }
  ];
  
  const filteredParcels = parcels.filter(parcel => {
    const matchesSearch = parcel.trackingId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          parcel.sender?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          parcel.receiver?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || parcel.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  const totalPages = Math.ceil(filteredParcels.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentParcels = filteredParcels.slice(startIndex, startIndex + itemsPerPage);
  
  const handleStatusUpdate = (trackingId, newStatus) => {
    const updated = updateParcelStatus(trackingId, newStatus);
    if (updated) {
      loadParcels();
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
      out_for_delivery: { color: 'bg-pink-100 text-pink-700', icon: Truck, text: 'Out for Delivery' },
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
    <div className="animate-fadeIn space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Package className="w-8 h-8" />
              Admin Dashboard
            </h1>
            <p className="text-white/80 mt-1">Manage parcels, track shipments, and monitor operations</p>
          </div>
          <button
            onClick={() => navigate('/create-parcel')}
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" /> New Parcel
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-all group">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            </div>
          );
        })}
      </div>
      
      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-lg p-5">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Tracking ID, Sender, Receiver..."
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
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
          <button className="px-4 py-2 bg-gray-100 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition">
            <Filter className="w-4 h-4" /> More Filters
          </button>
          <button className="px-4 py-2 bg-gray-100 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition ml-auto">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>
      
      {/* Parcels Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tracking ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Sender</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Receiver</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Route</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentParcels.length > 0 ? (
                currentParcels.map((parcel) => (
                  <tr key={parcel.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono font-semibold text-sm text-purple-600">{parcel.trackingId}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{parcel.sender?.name}</div>
                      <div className="text-xs text-gray-500">{parcel.sender?.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{parcel.receiver?.name}</div>
                      <div className="text-xs text-gray-500">{parcel.receiver?.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700">{parcel.journey?.from}</div>
                      <div className="text-xs text-gray-500">→ {parcel.journey?.to}</div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(parcel.status)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-green-600">₹{parcel.pricing?.total}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <select
                          className="text-xs px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                          value={parcel.status}
                          onChange={(e) => handleStatusUpdate(parcel.trackingId, e.target.value)}
                        >
                          {statusOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                        <button 
                          onClick={() => navigate(`/track/${parcel.trackingId}`)}
                          className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No parcels found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredParcels.length)} of {filteredParcels.length} parcels
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;