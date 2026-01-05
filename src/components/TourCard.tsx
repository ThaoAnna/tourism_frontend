import React from 'react';
import { useHistory } from 'react-router-dom';
import { Navigation } from 'lucide-react';
import type { Tour } from '../types/index';
import { formatPrice } from '../utils/helpers';

interface TourCardProps {
  tour: Tour;
  onViewDetails: (tour: Tour) => void;
}

const TourCard: React.FC<TourCardProps> = ({ tour, onViewDetails }) => {
  const history = useHistory();

  const handleBookNow = () => {
    // Navigate to booking page with tour data in state
    history.push({
      pathname: '/booking',
      state: { tour }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative cursor-pointer" onClick={() => onViewDetails(tour)}>
        <img 
          src={tour.imageUrl} 
          alt={tour.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-semibold text-blue-600">
          {tour.style}
        </div>
        <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {tour.duration} Days
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 cursor-pointer" onClick={() => onViewDetails(tour)}>
          {tour.name}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-3 text-sm">
          <Navigation className="w-4 h-4 mr-1" />
          <span className="truncate">{tour.route.join(' → ')}</span>
        </div>
        
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 mb-1">Highlights:</p>
          <ul className="text-xs text-gray-600 space-y-1">
            {tour.experience.slice(0, 3).map((exp, index) => (
              <li key={index}>• {exp}</li>
            ))}
          </ul>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(tour.totalPrice.min)}
            </span>
            <span className="text-gray-500 text-sm ml-1">/ person</span>
            <p className="text-xs text-gray-400">From {formatPrice(tour.totalPrice.min)} to {formatPrice(tour.totalPrice.max)}</p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => onViewDetails(tour)}
              className="bg-gray-100 text-gray-700 px-4 py-1 rounded text-sm hover:bg-gray-200 transition-colors duration-200 font-medium"
            >
              Details
            </button>
            <button
              onClick={handleBookNow}
              className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-white px-4 py-1 rounded text-sm hover:opacity-90 transition-all duration-200 font-medium shadow-md"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;