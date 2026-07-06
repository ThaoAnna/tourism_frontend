import React from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";
import type { Tour } from "../types/index";
import { formatPrice } from "../utils/helpers";
import { getTourRating } from "../utils/constants";

interface TourCardProps {
  tour: Tour;
  onViewDetails: (tour: Tour) => void;
  onBookClick?: (tour: Tour) => void;
  index?: number;
}

const TourCard: React.FC<TourCardProps> = ({
  tour,
  onViewDetails,
  onBookClick,
  index = 0,
}) => {
  const history = useHistory();
  const { rating, reviewCount } = {
    rating: tour.rating ?? getTourRating(tour.id).rating,
    reviewCount: tour.reviewCount ?? getTourRating(tour.id).reviewCount,
  };
  const locationLabel = tour.route.slice(0, 3).join(" · ");
  const shortDescription =
    tour.description.length > 110
      ? `${tour.description.slice(0, 110).trim()}…`
      : tour.description;

  const handleBookNow = () => {
    if (onBookClick) {
      onBookClick(tour);
      return;
    }
    history.push({
      pathname: "/booking",
      state: { tour },
    });
  };

  return (
    <motion.article
      className="group bg-white rounded-2xl overflow-hidden border border-navy/5 shadow-md shadow-navy/5 flex flex-col h-full"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.08, 0.4),
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      whileHover={{ y: -6, boxShadow: "0 20px 40px -12px rgba(19, 34, 56, 0.18)" }}
    >
      <div
        className="relative overflow-hidden cursor-pointer"
        onClick={() => onViewDetails(tour)}
      >
        <img
          src={tour.imageUrl}
          alt={tour.name}
          className="w-full h-56 object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent pointer-events-none" />
        <span className="absolute top-3 left-3 bg-white/95 text-navy px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
          {tour.style}
        </span>
        <span className="absolute top-3 right-3 bg-navy/80 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
          {tour.duration} Days
        </span>
      </div>

      <div className="p-5 md:p-6 flex flex-col flex-1">
        <h3
          className="text-lg font-bold text-ink leading-snug cursor-pointer hover:text-emerald transition-colors"
          onClick={() => onViewDetails(tour)}
        >
          {tour.name}
        </h3>

        <div className="flex items-center gap-1.5 mt-2 text-sm text-muted">
          <MapPin className="w-4 h-4 text-terracotta shrink-0" aria-hidden />
          <span className="truncate">{locationLabel}</span>
        </div>

        <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-2">
          {shortDescription}
        </p>

        <div className="flex items-center gap-1.5 mt-3 text-sm">
          <Star className="w-4 h-4 fill-gold text-gold" aria-hidden />
          <span className="font-semibold text-ink">{rating.toFixed(1)}</span>
          <span className="text-muted">({reviewCount} reviews)</span>
        </div>

        <div className="mt-auto pt-5 border-t border-navy/5">
          <div className="flex items-end justify-between gap-3 mb-4">
            <div>
              <p className="text-xs text-muted uppercase tracking-wide font-medium">
                From
              </p>
              <p className="text-2xl font-bold text-emerald leading-none mt-0.5">
                {formatPrice(tour.totalPrice.min)}
              </p>
              <p className="text-xs text-muted mt-1">per person</p>
            </div>
            <p className="text-xs text-muted text-right pb-0.5">
              up to {formatPrice(tour.totalPrice.max)}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onViewDetails(tour)}
              className="btn-outline flex-1"
            >
              View Details
            </button>
            <button
              type="button"
              onClick={handleBookNow}
              className="btn-emerald flex-1"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default TourCard;
