import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Search, Package, CheckCircle, Clock, Truck, 
  Bus, MapPin, Flag, Bike, Navigation, 
  Copy, Check, AlertCircle, ArrowLeft
} from 'lucide-react';
import { getParcelByTrackingId } from '../../services/parcelService';
import ParcelTimeline from './ParcelTimeline';
import ParcelCard from './ParcelCard';
import toast from 'react-hot-toast';

const TrackParcel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trackingId, setTrackingId] = useState(id || '');
  const [parcel, setParcel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  
  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recent_tracking_ids');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);
  
  useEffect(() => {
    if (id) {
      handleTrack();
    }
  }, [id]);
  
  const saveToRecent = (id) => {
    const updated = [id, ...recentSearches.filter(s => s !== id)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recent_tracking_ids', JSON.stringify(updated));
  };
  
  const handleTrack = (e) => {
    if (e) e.preventDefault();
    if (!trackingId.trim()) {
      setError('Please enter tracking ID');
      return;
    }
    
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      const found = getParcelByTrackingId(trackingId);
      if (found) {
        setParcel(found);
        setError('');
        saveToRecent(trackingId);
        navigate(`/track/${trackingId}`);
      } else {
        setParcel(null);
        setError('No parcel found with this tracking ID. Please check and try again.');
      }
      setLoading(false);
    }, 800);
  };
  
  const copyTrackingId = () => {
    if (parcel) {
      navigator.clipboard.writeText(parcel.trackingId);
      toast.success('Tracking ID copied!');
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="text-center mb-8">
            <button 
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>
            <div className="inline-flex p-4 bg-white/20 backdrop-blur rounded-full mb-4">
              <Navigation className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Track Your Parcel</h1>
            <p className="text-white/80 text-lg max-w-md mx-auto">
              Enter your tracking ID to get real-time updates on your parcel
            </p>
          </div>
          
          {/* Search Card */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <form onSubmit={handleTrack} className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter Tracking ID (e.g., TRK-987654321)"
                    className="w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:border-purple-500 transition-all"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? <Clock className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  {loading ? 'Tracking...' : 'Track'}
                </button>
              </form>
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> {error}
                </div>
              )}
              
              {/* Recent Searches */}
              {recentSearches.length > 0 && !parcel && !id && (
                <div className="mt-4 pt-3 border-t">
                  <p className="text-xs text-gray-500 mb-2">Recent Searches:</p>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map(id => (
                      <button
                        key={id}
                        onClick={() => {
                          setTrackingId(id);
                          handleTrack();
                        }}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-600 transition-colors"
                      >
                        {id}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Parcel Details */}
      {parcel && (
        <div className="container mx-auto px-4 pb-12">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Header Card with Tracking ID */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Tracking ID</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-mono font-bold text-gray-800">{parcel.trackingId}</span>
                    <button onClick={copyTrackingId} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                      <Copy className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2 ${
                  parcel.status === 'delivered' ? 'bg-green-100 text-green-700' :
                  parcel.status === 'in_transit' ? 'bg-blue-100 text-blue-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {parcel.status === 'delivered' ? <CheckCircle className="w-4 h-4" /> :
                   parcel.status === 'in_transit' ? <Truck className="w-4 h-4" /> :
                   <Clock className="w-4 h-4" />}
                  {parcel.status === 'delivered' ? 'Delivered ✓' :
                   parcel.status === 'in_transit' ? 'In Transit' :
                   'Processing'}
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Booking</span>
                  <span>Pickup</span>
                  <span>Handover</span>
                  <span>Transit</span>
                  <span>Reached</span>
                  <span>Delivery</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-500" 
                       style={{ width: `${(parcel.timeline.filter(e => e.completed).length / parcel.timeline.length) * 100}%` }} />
                </div>
              </div>
            </div>
            
            {/* Parcel Info Card */}
            <ParcelCard parcel={parcel} />
            
            {/* Timeline */}
            <ParcelTimeline timeline={parcel.timeline} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackParcel;