import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreateParcel from '../components/parcel/CreateParcel';
import { ArrowLeft } from 'lucide-react';

const CreateParcelPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <button 
          onClick={() => navigate('/admin')}
          className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
        <CreateParcel onSuccess={(parcel) => {
          navigate(`/track/${parcel.trackingId}`);
        }} />
      </div>
    </div>
  );
};

export default CreateParcelPage;