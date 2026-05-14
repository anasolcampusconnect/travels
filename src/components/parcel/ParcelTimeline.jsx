import React from 'react';
import { 
  PackageCheck, Truck, Bus, Navigation, Flag, 
  Bike, CheckCircle, Clock, MapPin, Calendar
} from 'lucide-react';
import { format } from 'date-fns';

const ParcelTimeline = ({ timeline }) => {
  const getStatusIcon = (status, completed) => {
    const icons = {
      booking: PackageCheck,
      picked_up: Truck,
      handover: Bus,
      in_transit: Navigation,
      reached: Flag,
      out_for_delivery: Bike,
      delivered: CheckCircle
    };
    const Icon = icons[status] || Clock;
    return <Icon className={`w-5 h-5 ${completed ? 'text-white' : 'text-gray-400'}`} />;
  };
  
  const getStatusColor = (completed) => {
    return completed ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-200';
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-purple-600" />
        Tracking Timeline
      </h3>
      
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        
        {timeline.map((event, index) => (
          <div key={event.id} className="relative flex gap-4 mb-8 last:mb-0 group">
            {/* Icon Circle */}
            <div className="relative z-10">
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center
                transition-all duration-300 shadow-md
                ${getStatusColor(event.completed)}
                ${!event.completed && 'group-hover:scale-105'}
              `}>
                {getStatusIcon(event.status, event.completed)}
              </div>
              
              {/* Connecting Dot for incomplete */}
              {!event.completed && index < timeline.length - 1 && (
                <div className="absolute -bottom-8 left-5 w-2 h-2 bg-gray-300 rounded-full"></div>
              )}
            </div>
            
            {/* Content */}
            <div className="flex-1 pb-4">
              <div className="flex flex-wrap justify-between items-start gap-2">
                <h4 className={`font-semibold text-lg ${event.completed ? 'text-gray-800' : 'text-gray-500'}`}>
                  {event.title}
                </h4>
                {event.timestamp && (
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {format(new Date(event.timestamp), 'dd MMM yyyy, hh:mm a')}
                  </span>
                )}
              </div>
              
              <p className={`mt-1 text-sm ${event.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                {event.description}
              </p>
              
              {event.location && (
                <div className="mt-2 flex items-center gap-1 text-xs text-purple-600">
                  <MapPin className="w-3 h-3" />
                  {event.location}
                </div>
              )}
              
              {!event.completed && index === 0 && (
                <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-yellow-50 rounded-lg text-xs text-yellow-700">
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></div>
                  Expected Update Soon
                </div>
              )}
              
              {event.completed && index < timeline.length - 1 && !timeline[index + 1].completed && (
                <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-blue-50 rounded-lg text-xs text-blue-700">
                  <Truck className="w-3 h-3" />
                  Next: {timeline[index + 1].title}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParcelTimeline;