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
      <div className="tour-grid">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-gray-200 rounded-xl h-96 animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (tours.length === 0) {
    return (
      <div className="text-center py-16 lg:py-24">
        <p className="text-gray-500 text-lg">
          No tours found. Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="tour-grid">
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
