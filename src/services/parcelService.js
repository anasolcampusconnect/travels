import { toast } from 'react-hot-toast';

// Mock Database
let parcels = [
  {
    id: "PKG-001",
    trackingId: "TRK-987654321",
    status: "delivered",
    sender: {
      name: "Ramesh Kumar",
      phone: "+919876543210",
      email: "ramesh@example.com",
      address: "Hitech City, Hyderabad, Telangana - 500081"
    },
    receiver: {
      name: "Suresh Reddy",
      phone: "+919876543211",
      email: "suresh@example.com",
      address: "Electronic City, Bangalore, Karnataka - 560100"
    },
    parcel: {
      type: "Documents",
      weight: "0.5 kg",
      dimensions: "30x20x10 cm",
      description: "Important business documents and contracts",
      value: 500
    },
    pricing: {
      basePrice: 150,
      distancePrice: 285,
      weightPrice: 25,
      subtotal: 460,
      gst: 83,
      total: 543
    },
    journey: {
      from: "Hyderabad",
      to: "Bangalore",
      distance: "570 km",
      busNumber: "AP-29-TC-1234",
      busOperator: "Orange Travels",
      departureTime: "2024-01-15T08:30:00",
      estimatedArrival: "2024-01-15T18:00:00"
    },
    timeline: [
      { id: 1, status: "booking", title: "Booking Confirmed", description: "Your parcel has been booked successfully", location: "Hyderabad", timestamp: "2024-01-15T09:00:00", completed: true },
      { id: 2, status: "picked_up", title: "Picked Up", description: "Parcel picked up from sender", location: "Hyderabad", timestamp: "2024-01-15T10:00:00", completed: true },
      { id: 3, status: "handover", title: "Handover to Bus", description: "Parcel handed over to bus conductor", location: "Hyderabad Bus Stand", timestamp: "2024-01-15T10:30:00", completed: true },
      { id: 4, status: "in_transit", title: "In Transit", description: "Parcel is on the way to destination", location: "Enroute", timestamp: "2024-01-15T11:00:00", completed: true },
      { id: 5, status: "reached", title: "Reached Destination", description: "Parcel arrived at destination city", location: "Bangalore Bus Stand", timestamp: "2024-01-15T17:30:00", completed: true },
      { id: 6, status: "out_for_delivery", title: "Out for Delivery", description: "Parcel out for final delivery", location: "Bangalore", timestamp: "2024-01-15T18:00:00", completed: true },
      { id: 7, status: "delivered", title: "Delivered", description: "Parcel delivered to receiver", location: "Bangalore", timestamp: "2024-01-15T19:00:00", completed: true }
    ]
  },
  {
    id: "PKG-002",
    trackingId: "TRK-555666777",
    status: "in_transit",
    sender: {
      name: "Priya Sharma",
      phone: "+919876543212",
      email: "priya@example.com",
      address: "Andheri West, Mumbai, Maharashtra - 400053"
    },
    receiver: {
      name: "Amit Patel",
      phone: "+919876543213",
      email: "amit@example.com",
      address: "Koregaon Park, Pune, Maharashtra - 411001"
    },
    parcel: {
      type: "Electronics",
      weight: "2 kg",
      dimensions: "40x30x20 cm",
      description: "Laptop and accessories - Dell XPS",
      value: 85000
    },
    pricing: {
      basePrice: 150,
      distancePrice: 75,
      weightPrice: 100,
      subtotal: 325,
      gst: 59,
      total: 384
    },
    journey: {
      from: "Mumbai",
      to: "Pune",
      distance: "150 km",
      busNumber: "MH-01-AB-5678",
      busOperator: "SRS Travels",
      departureTime: "2024-01-16T10:00:00",
      estimatedArrival: "2024-01-16T15:00:00"
    },
    timeline: [
      { id: 1, status: "booking", title: "Booking Confirmed", description: "Your parcel has been booked successfully", location: "Mumbai", timestamp: "2024-01-16T09:00:00", completed: true },
      { id: 2, status: "picked_up", title: "Picked Up", description: "Parcel picked up from sender", location: "Mumbai", timestamp: "2024-01-16T09:30:00", completed: true },
      { id: 3, status: "handover", title: "Handover to Bus", description: "Parcel handed over to bus conductor", location: "Mumbai Central", timestamp: "2024-01-16T10:00:00", completed: true },
      { id: 4, status: "in_transit", title: "In Transit", description: "Parcel is on the way", location: "Enroute", timestamp: "2024-01-16T10:30:00", completed: true },
      { id: 5, status: "reached", title: "Reached Destination", description: "Parcel arrived at destination city", location: "Pune", timestamp: null, completed: false },
      { id: 6, status: "out_for_delivery", title: "Out for Delivery", description: "Parcel out for final delivery", location: "Pune", timestamp: null, completed: false },
      { id: 7, status: "delivered", title: "Delivered", description: "Parcel delivered to receiver", location: "Pune", timestamp: null, completed: false }
    ]
  },
  {
    id: "PKG-003",
    trackingId: "TRK-123789456",
    status: "handover",
    sender: {
      name: "Vikram Singh",
      phone: "+919876543214",
      email: "vikram@example.com",
      address: "Connaught Place, New Delhi - 110001"
    },
    receiver: {
      name: "Neha Gupta",
      phone: "+919876543215",
      email: "neha@example.com",
      address: "MI Road, Jaipur, Rajasthan - 302001"
    },
    parcel: {
      type: "Clothing",
      weight: "3 kg",
      dimensions: "50x40x30 cm",
      description: "Wedding dresses and accessories",
      value: 25000
    },
    pricing: {
      basePrice: 150,
      distancePrice: 140,
      weightPrice: 150,
      subtotal: 440,
      gst: 79,
      total: 519
    },
    journey: {
      from: "Delhi",
      to: "Jaipur",
      distance: "280 km",
      busNumber: "DL-01-CD-9012",
      busOperator: "RSRTC",
      departureTime: "2024-01-17T07:00:00",
      estimatedArrival: "2024-01-17T12:00:00"
    },
    timeline: [
      { id: 1, status: "booking", title: "Booking Confirmed", description: "Your parcel has been booked successfully", location: "Delhi", timestamp: "2024-01-17T08:00:00", completed: true },
      { id: 2, status: "picked_up", title: "Picked Up", description: "Parcel picked up from sender", location: "Delhi", timestamp: "2024-01-17T09:00:00", completed: true },
      { id: 3, status: "handover", title: "Handover to Bus", description: "Parcel handed over to bus conductor", location: "Delhi Bus Stand", timestamp: "2024-01-17T09:30:00", completed: true },
      { id: 4, status: "in_transit", title: "In Transit", description: "Parcel is on the way", location: "Enroute", timestamp: null, completed: false },
      { id: 5, status: "reached", title: "Reached Destination", description: "Parcel arrived at destination city", location: "Jaipur", timestamp: null, completed: false },
      { id: 6, status: "out_for_delivery", title: "Out for Delivery", description: "Parcel out for final delivery", location: "Jaipur", timestamp: null, completed: false },
      { id: 7, status: "delivered", title: "Delivered", description: "Parcel delivered to receiver", location: "Jaipur", timestamp: null, completed: false }
    ]
  }
];

// Generate unique tracking ID
export const generateTrackingId = () => {
  const prefix = "TRK";
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefix}-${timestamp}${random}`;
};

// Generate OTP for delivery
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Get all parcels
export const getAllParcels = () => {
  return parcels;
};

// Get parcel by tracking ID
export const getParcelByTrackingId = (trackingId) => {
  return parcels.find(p => p.trackingId === trackingId);
};

// Get parcels by status
export const getParcelsByStatus = (status) => {
  return parcels.filter(p => p.status === status);
};

// Create new parcel
export const createParcel = (data) => {
  const newParcel = {
    id: `PKG-${String(parcels.length + 1).padStart(3, '0')}`,
    trackingId: generateTrackingId(),
    status: "booking",
    ...data,
    timeline: [
      { id: 1, status: "booking", title: "Booking Confirmed", description: "Your parcel has been booked successfully", location: data.journey.from, timestamp: new Date().toISOString(), completed: true },
      { id: 2, status: "picked_up", title: "Picked Up", description: "Parcel picked up from sender", location: data.journey.from, timestamp: null, completed: false },
      { id: 3, status: "handover", title: "Handover to Bus", description: "Parcel handed over to bus conductor", location: `${data.journey.from} Bus Stand`, timestamp: null, completed: false },
      { id: 4, status: "in_transit", title: "In Transit", description: "Parcel is on the way", location: "Enroute", timestamp: null, completed: false },
      { id: 5, status: "reached", title: "Reached Destination", description: "Parcel arrived at destination city", location: data.journey.to, timestamp: null, completed: false },
      { id: 6, status: "out_for_delivery", title: "Out for Delivery", description: "Parcel out for final delivery", location: data.journey.to, timestamp: null, completed: false },
      { id: 7, status: "delivered", title: "Delivered", description: "Parcel delivered to receiver", location: data.journey.to, timestamp: null, completed: false }
    ]
  };
  
  parcels.push(newParcel);
  toast.success(`✨ Parcel Created! Tracking ID: ${newParcel.trackingId}`);
  return newParcel;
};

// Update parcel status (Admin/Conductor)
export const updateParcelStatus = (trackingId, status, location = null) => {
  const parcel = getParcelByTrackingId(trackingId);
  if (!parcel) return null;
  
  const statusOrder = ["booking", "picked_up", "handover", "in_transit", "reached", "out_for_delivery", "delivered"];
  const currentIndex = statusOrder.indexOf(parcel.status);
  const newIndex = statusOrder.indexOf(status);
  
  if (newIndex > currentIndex) {
    for (let i = currentIndex + 1; i <= newIndex; i++) {
      const eventStatus = statusOrder[i];
      const event = parcel.timeline.find(e => e.status === eventStatus);
      if (event && !event.completed) {
        event.completed = true;
        event.timestamp = new Date().toISOString();
        if (location && (eventStatus === "handover" || eventStatus === "reached")) {
          event.location = location;
        }
      }
    }
    parcel.status = status;
    
    // Send notification based on status
    sendNotification(parcel, status);
    toast.success(`✅ Parcel ${parcel.trackingId} status updated to ${status}`);
  }
  
  return parcel;
};

// Send notifications
const sendNotification = (parcel, status) => {
  const messages = {
    handover: `🚌 Your parcel ${parcel.trackingId} has been handed over to bus ${parcel.journey.busNumber}. Track: ${window.location.origin}/track/${parcel.trackingId}`,
    reached: `📍 Your parcel ${parcel.trackingId} has reached ${parcel.journey.to}. Will be delivered soon!`,
    delivered: `✅ Your parcel ${parcel.trackingId} has been delivered to ${parcel.receiver.name}. Thank you for choosing us!`
  };
  
  if (messages[status]) {
    console.log(`📱 SMS to ${parcel.sender.phone}:`, messages[status]);
  }
};

// Calculate pricing
export const calculatePrice = (distance, weight, parcelType) => {
  const baseRate = 100;
  const perKmRate = 0.5;
  const perKgRate = 50;
  
  const distancePrice = distance * perKmRate;
  const weightPrice = weight * perKgRate;
  const subtotal = baseRate + distancePrice + weightPrice;
  const gst = subtotal * 0.18;
  const total = subtotal + gst;
  
  return {
    basePrice: Math.round(baseRate),
    distancePrice: Math.round(distancePrice),
    weightPrice: Math.round(weightPrice),
    subtotal: Math.round(subtotal),
    gst: Math.round(gst),
    total: Math.round(total)
  };
};

// Get all locations
export const locations = [
  "Hyderabad", "Bangalore", "Mumbai", "Delhi", "Chennai", 
  "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow",
  "Chandigarh", "Bhopal", "Indore", "Nagpur", "Surat"
];

// Get parcel types
export const parcelTypes = [
  "Documents", "Electronics", "Clothing", "Books", 
  "Fragile Items", "Food Items", "Medicines", "Furniture",
  "Automobile Parts", "Gifts", "Others"
];

// Get bus operators
export const busOperators = [
  "Orange Travels", "SRS Travels", "KPN Travels", "VRL Travels",
  "Sharma Travels", "Rajdhani Express", "Vijayawada Bus Service",
  "Green Line Travels", "Blue Star Express"
];

// Delete parcel (Admin only)
export const deleteParcel = (trackingId) => {
  const index = parcels.findIndex(p => p.trackingId === trackingId);
  if (index !== -1) {
    parcels.splice(index, 1);
    toast.success(`🗑️ Parcel ${trackingId} deleted successfully`);
    return true;
  }
  return false;
};