import React from 'react';
import TourCard from './TourCard';
import type { Tour } from '../types/index';

interface TourListProps {
  tours: Tour[];
  onViewDetails: (tour: Tour) => void;
  onBookClick: (tour: Tour) => void;
  loading: boolean;
}

const TourList: React.FC<TourListProps> = ({ tours, onViewDetails, onBookClick, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-gray-200 rounded-lg h-96 animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (tours.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          No tours found. Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tours.map(tour => (
        <TourCard 
          key={tour.id} 
          tour={tour}
          onViewDetails={onViewDetails}
          onBookClick={onBookClick}
        />
      ))}
    </div>
  );
};

export default TourList;