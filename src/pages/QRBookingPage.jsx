// src/pages/QRBookingPage.jsx
import React, { useState } from 'react';
import { QrCode, Camera, Upload, Package, MapPin, User, Phone, Calendar, Clock, CheckCircle } from 'lucide-react';

const QRBookingPage = () => {
  const [scanning, setScanning] = useState(false);
  const [qrData, setQrData] = useState(null);
  
  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setQrData({
        trackingId: 'TRK-QR-123456',
        sender: 'Ramesh Kumar',
        receiver: 'Suresh Reddy',
        from: 'Hyderabad',
        to: 'Bangalore',
        weight: '2.5 kg',
        amount: '₹543'
      });
      setScanning(false);
    }, 2000);
  };
  
  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center gap-3">
        <QrCode className="w-8 h-8 text-purple-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">QR Booking</h1>
          <p className="text-gray-500">Scan QR code to book or track your parcel</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="mb-6">
            <div className="w-48 h-48 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300">
              {scanning ? (
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-sm text-gray-500">Scanning...</p>
                </div>
              ) : qrData ? (
                <CheckCircle className="w-16 h-16 text-green-500" />
              ) : (
                <Camera className="w-16 h-16 text-gray-400" />
              )}
            </div>
          </div>
          
          <button
            onClick={handleScan}
            disabled={scanning}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition disabled:opacity-50"
          >
            {scanning ? 'Scanning...' : 'Scan QR Code'}
          </button>
          
          <div className="mt-4">
            <p className="text-xs text-gray-400">or</p>
            <button className="mt-2 text-purple-600 hover:text-purple-700 flex items-center gap-2 justify-center">
              <Upload className="w-4 h-4" /> Upload QR Image
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Details</h3>
          
          {qrData ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Tracking ID</p>
                  <p className="font-mono font-semibold text-gray-800">{qrData.trackingId}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <User className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Sender</p>
                  <p className="font-semibold text-gray-800">{qrData.sender}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <User className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Receiver</p>
                  <p className="font-semibold text-gray-800">{qrData.receiver}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <MapPin className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-500">Route</p>
                  <p className="font-semibold text-gray-800">{qrData.from} → {qrData.to}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <Package className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-500">Weight & Amount</p>
                  <p className="font-semibold text-gray-800">{qrData.weight} • {qrData.amount}</p>
                </div>
              </div>
              
              <button className="w-full py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition">
                Confirm Booking
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <QrCode className="w-16 h-16 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400">Scan a QR code to view booking details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRBookingPage;