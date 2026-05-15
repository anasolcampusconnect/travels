// src/components/parcel/ParcelCard.jsx
import React from 'react';
import { User, MapPin, Package, IndianRupee, Bus, Phone, Mail, Weight, Ruler, Tag } from 'lucide-react';

const ParcelCard = ({ parcel }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-blue-600 font-semibold mb-1">SENDER</p>
              <h4 className="font-bold text-gray-800">{parcel.sender.name}</h4>
              <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                <Phone className="w-3 h-3" /> {parcel.sender.phone}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <Mail className="w-3 h-3" /> {parcel.sender.email}
              </p>
              <p className="text-sm text-gray-500 mt-1">{parcel.sender.address}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-green-600 font-semibold mb-1">RECEIVER</p>
              <h4 className="font-bold text-gray-800">{parcel.receiver.name}</h4>
              <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                <Phone className="w-3 h-3" /> {parcel.receiver.phone}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <Mail className="w-3 h-3" /> {parcel.receiver.email}
              </p>
              <p className="text-sm text-gray-500 mt-1">{parcel.receiver.address}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <Bus className="w-4 h-4 text-purple-600" />
              <p className="text-xs text-purple-600 font-semibold">JOURNEY DETAILS</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">From:</span>
              <span className="font-semibold text-gray-800">{parcel.journey.from}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">To:</span>
              <span className="font-semibold text-gray-800">{parcel.journey.to}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Distance:</span>
              <span>{parcel.journey.distance}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Bus Number:</span>
              <span className="font-mono font-semibold">{parcel.journey.busNumber}</span>
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-4 h-4 text-orange-600" />
              <p className="text-xs text-orange-600 font-semibold">PARCEL DETAILS</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-gray-500">Type</p>
                <p className="font-semibold text-gray-800">{parcel.parcel.type}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Weight</p>
                <p className="font-semibold text-gray-800 flex items-center gap-1">
                  <Weight className="w-3 h-3" /> {parcel.parcel.weight}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Dimensions</p>
                <p className="font-semibold text-gray-800 flex items-center gap-1">
                  <Ruler className="w-3 h-3" /> {parcel.parcel.dimensions || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Value</p>
                <p className="font-semibold text-gray-800 flex items-center gap-1">
                  <Tag className="w-3 h-3" /> ₹{parcel.parcel.value || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <IndianRupee className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-gray-800">Total Amount:</span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-green-600">₹{parcel.pricing.total}</span>
            <p className="text-xs text-gray-500">Including GST</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParcelCard;