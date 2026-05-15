import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { 
  Send, User, Phone, Mail, MapPin, Package, 
  Weight, Ruler, IndianRupee, Bus, Building,
  ArrowRight, ChevronLeft, CheckCircle, Truck,
  Navigation, Clock, AlertCircle
} from 'lucide-react';
import { createParcel, locations, parcelTypes, busOperators, calculatePrice } from '../../services/parcelService';

const CreateParcel = ({ onSuccess }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    sender: { name: '', phone: '', email: '', address: '' },
    receiver: { name: '', phone: '', email: '', address: '' },
    parcel: { type: 'Documents', weight: '', dimensions: '', description: '', value: '' },
    journey: { from: '', to: '', busNumber: '', busOperator: '' }
  });
  const [priceBreakdown, setPriceBreakdown] = useState(null);
  
  const calculateDistance = (from, to) => {
    const distances = {
      'Hyderabad-Bangalore': 570, 'Hyderabad-Mumbai': 710, 'Hyderabad-Delhi': 1550,
      'Mumbai-Pune': 150, 'Mumbai-Delhi': 1400, 'Mumbai-Ahmedabad': 520,
      'Delhi-Jaipur': 280, 'Delhi-Chandigarh': 250, 'Delhi-Lucknow': 550,
      'Bangalore-Chennai': 350, 'Bangalore-Hyderabad': 570, 'Bangalore-Kochi': 550,
      'Chennai-Bangalore': 350, 'Chennai-Hyderabad': 630, 'Chennai-Mumbai': 1200
    };
    const key = `${from}-${to}`;
    return distances[key] || Math.floor(Math.random() * 500) + 100;
  };
  
  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
    
    if (section === 'journey' && formData.journey.from && formData.journey.to) {
      const distance = calculateDistance(formData.journey.from, formData.journey.to);
      const weight = parseFloat(formData.parcel.weight) || 1;
      const price = calculatePrice(distance, weight, formData.parcel.type);
      setPriceBreakdown(price);
    }
    
    if (section === 'parcel' && formData.journey.from && formData.journey.to) {
      const distance = calculateDistance(formData.journey.from, formData.journey.to);
      const weight = parseFloat(value) || 1;
      const price = calculatePrice(distance, weight, formData.parcel.type);
      setPriceBreakdown(price);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.journey.from || !formData.journey.to) {
      toast.error('Please select source and destination');
      return;
    }
    
    if (!formData.parcel.weight) {
      toast.error('Please enter parcel weight');
      return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      const distance = calculateDistance(formData.journey.from, formData.journey.to);
      const weight = parseFloat(formData.parcel.weight);
      const pricing = calculatePrice(distance, weight, formData.parcel.type);
      
      const parcelData = {
        ...formData,
        parcel: { ...formData.parcel, weight: `${weight} kg` },
        pricing,
        journey: { ...formData.journey, distance: `${distance} km` }
      };
      
      const newParcel = createParcel(parcelData);
      setLoading(false);
      
      if (onSuccess) {
        onSuccess(newParcel);
      } else {
        toast.success(`Parcel created! Tracking ID: ${newParcel.trackingId}`);
        setStep(1);
        setFormData({
          sender: { name: '', phone: '', email: '', address: '' },
          receiver: { name: '', phone: '', email: '', address: '' },
          parcel: { type: 'Documents', weight: '', dimensions: '', description: '', value: '' },
          journey: { from: '', to: '', busNumber: '', busOperator: '' }
        });
        setPriceBreakdown(null);
      }
    }, 1000);
  };
  
  const steps = [
    { number: 1, title: "Sender", icon: User },
    { number: 2, title: "Receiver", icon: User },
    { number: 3, title: "Parcel", icon: Package },
    { number: 4, title: "Journey", icon: Bus }
  ];
  
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-white px-6 py-5">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Package className="w-6 h-6" />
          Book Parcel Delivery
        </h2>
        <p className="text-white/80 text-sm mt-1">Send parcels across India with real-time tracking</p>
      </div>
      
      {/* Steps */}
      <div className="px-6 pt-6">
        <div className="flex justify-between items-center">
          {steps.map((s, idx) => (
            <div key={s.number} className="flex items-center flex-1">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full
                transition-all duration-300
                ${step >= s.number 
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg' 
                  : 'bg-gray-200 text-gray-500'
                }
              `}>
                {step > s.number ? <CheckCircle className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
              </div>
              <div className="flex-1 h-1 mx-2 bg-gray-200 rounded">
                <div className={`h-full rounded transition-all duration-500 ${step > s.number ? 'w-full bg-gradient-to-r from-blue-500 to-cyan-500' : 'w-0'}`} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between px-2 mt-2">
          {steps.map(s => (
            <span key={s.number} className="text-xs font-medium text-gray-500">{s.title}</span>
          ))}
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        {/* Step 1: Sender Details */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Sender Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative group">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input type="text" placeholder="Full Name" required
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-gray-800"
                  value={formData.sender.name} onChange={(e) => handleInputChange('sender', 'name', e.target.value)} />
              </div>
              <div className="relative group">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within:text-blue-500" />
                <input type="tel" placeholder="Phone Number" required
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-gray-800"
                  value={formData.sender.phone} onChange={(e) => handleInputChange('sender', 'phone', e.target.value)} />
              </div>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within:text-blue-500" />
                <input type="email" placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-gray-800"
                  value={formData.sender.email} onChange={(e) => handleInputChange('sender', 'email', e.target.value)} />
              </div>
              <div className="relative group md:col-span-2">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within:text-blue-500" />
                <input type="text" placeholder="Full Address" required
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-gray-800"
                  value={formData.sender.address} onChange={(e) => handleInputChange('sender', 'address', e.target.value)} />
              </div>
            </div>
          </div>
        )}
        
        {/* Step 2: Receiver Details */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center">
                <User className="w-4 h-4 text-cyan-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Receiver Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative group">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within:text-cyan-500" />
                <input type="text" placeholder="Full Name" required
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 text-gray-800"
                  value={formData.receiver.name} onChange={(e) => handleInputChange('receiver', 'name', e.target.value)} />
              </div>
              <div className="relative group">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within:text-cyan-500" />
                <input type="tel" placeholder="Phone Number" required
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 text-gray-800"
                  value={formData.receiver.phone} onChange={(e) => handleInputChange('receiver', 'phone', e.target.value)} />
              </div>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within:text-cyan-500" />
                <input type="email" placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 text-gray-800"
                  value={formData.receiver.email} onChange={(e) => handleInputChange('receiver', 'email', e.target.value)} />
              </div>
              <div className="relative group md:col-span-2">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within:text-cyan-500" />
                <input type="text" placeholder="Full Address" required
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 text-gray-800"
                  value={formData.receiver.address} onChange={(e) => handleInputChange('receiver', 'address', e.target.value)} />
              </div>
            </div>
          </div>
        )}
        
        {/* Step 3: Parcel Info */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Package className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Parcel Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-gray-800"
                value={formData.parcel.type} onChange={(e) => handleInputChange('parcel', 'type', e.target.value)}>
                {parcelTypes.map(type => <option key={type}>{type}</option>)}
              </select>
              <div className="relative group">
                <Weight className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within:text-blue-500" />
                <input type="number" step="0.1" placeholder="Weight (kg)" required
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-gray-800"
                  value={formData.parcel.weight} onChange={(e) => handleInputChange('parcel', 'weight', e.target.value)} />
              </div>
              <div className="relative group">
                <Ruler className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within:text-blue-500" />
                <input type="text" placeholder="Dimensions (LxWxH cm)"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-gray-800"
                  value={formData.parcel.dimensions} onChange={(e) => handleInputChange('parcel', 'dimensions', e.target.value)} />
              </div>
              <div className="relative group">
                <IndianRupee className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within:text-blue-500" />
                <input type="number" placeholder="Item Value (₹)"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-gray-800"
                  value={formData.parcel.value} onChange={(e) => handleInputChange('parcel', 'value', e.target.value)} />
              </div>
              <textarea placeholder="Description (Optional)" rows="3"
                className="md:col-span-2 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-gray-800"
                value={formData.parcel.description} onChange={(e) => handleInputChange('parcel', 'description', e.target.value)} />
            </div>
          </div>
        )}
        
        {/* Step 4: Journey Details */}
        {step === 4 && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center">
                <Bus className="w-4 h-4 text-cyan-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Journey Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 text-gray-800" required
                value={formData.journey.from} onChange={(e) => handleInputChange('journey', 'from', e.target.value)}>
                <option value="">From City</option>
                {locations.map(loc => <option key={loc}>{loc}</option>)}
              </select>
              <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 text-gray-800" required
                value={formData.journey.to} onChange={(e) => handleInputChange('journey', 'to', e.target.value)}>
                <option value="">To City</option>
                {locations.filter(l => l !== formData.journey.from).map(loc => <option key={loc}>{loc}</option>)}
              </select>
              <div className="relative group">
                <Bus className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within:text-cyan-500" />
                <input type="text" placeholder="Bus Number" required
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 text-gray-800"
                  value={formData.journey.busNumber} onChange={(e) => handleInputChange('journey', 'busNumber', e.target.value)} />
              </div>
              <div className="relative group">
                <Building className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within:text-cyan-500" />
                <select className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 text-gray-800"
                  value={formData.journey.busOperator} onChange={(e) => handleInputChange('journey', 'busOperator', e.target.value)}>
                  <option value="">Select Bus Operator</option>
                  {busOperators.map(op => <option key={op}>{op}</option>)}
                </select>
              </div>
            </div>
            
            {priceBreakdown && (
              <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-green-600" />
                  Price Breakdown
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-600">Base Price:</span><span className="font-semibold text-gray-800">₹{priceBreakdown.basePrice}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Distance Charge (₹0.5/km):</span><span className="text-gray-800">₹{priceBreakdown.distancePrice}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Weight Charge (₹50/kg):</span><span className="text-gray-800">₹{priceBreakdown.weightPrice}</span></div>
                  <div className="border-t pt-2 mt-2"><div className="flex justify-between font-semibold"><span className="text-gray-700">Subtotal:</span><span className="text-gray-800">₹{priceBreakdown.subtotal}</span></div></div>
                  <div className="flex justify-between"><span className="text-gray-600">GST (18%):</span><span className="text-gray-800">₹{priceBreakdown.gst}</span></div>
                  <div className="border-t pt-2 mt-2"><div className="flex justify-between font-bold text-lg"><span className="text-gray-800">Total:</span><span className="text-green-600">₹{priceBreakdown.total}</span></div></div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Navigation Buttons */}
        <div className="flex justify-between gap-3 mt-8 pt-4 border-t border-gray-200">
          {step > 1 && (
            <button type="button" onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          )}
          {step < 4 ? (
            <button type="button" onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 px-6 py-2.5 ml-auto bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium hover:shadow-lg transition-all">
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button type="submit" disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 ml-auto bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50">
              {loading ? <Clock className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {loading ? 'Creating...' : 'Create Parcel'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateParcel;