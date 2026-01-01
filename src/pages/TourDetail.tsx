import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingForm from "../pages/BookingForm";
import type { Tour, BookingRequest } from "../types/index";
import { toursData } from "../data/tour";
import {
  MapPin,
  Clock,
  // DollarSign,
  Navigation,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { formatPrice } from "../utils/helpers";

const TourDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [tour, setTour] = useState<Tour | null>(null);
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      const foundTour = toursData.find((t) => t.id === parseInt(id));
      setTour(foundTour || null);
    }
  }, [id]);

  const handleBookingSubmit = async (
    bookingData: BookingRequest
  ): Promise<void> => {
    try {
      console.log("Booking submitted:", bookingData);
      alert("Booking successful! Check your email for confirmation.");
      setShowBookingModal(false);
    } catch (err) {
      alert("Failed to create booking. Please try again.");
    }
  };

  if (!tour) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 text-lg">Tour not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        <button
          onClick={() => history.push("/")}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Tours
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={tour.imageUrl}
            alt={tour.name}
            className="w-full h-96 object-cover"
          />

          <div className="p-8">
            {/* Header Section */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold text-gray-800">
                    {tour.name}
                  </h1>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {tour.style}
                  </span>
                </div>
                <div className="flex items-center text-gray-600 space-x-4 mt-3">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-1" />
                    <span>{tour.duration} Days</span>
                  </div>
                  <div className="flex items-center">
                    <Navigation className="w-5 h-5 mr-1" />
                    <span>{tour.route.length} Cities</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">Starting from</p>
                <p className="text-4xl font-bold text-blue-600">
                  {formatPrice(tour.totalPrice.min)}
                </p>
                <p className="text-sm text-gray-500">per person</p>
                <p className="text-xs text-gray-400 mt-1">
                  up to {formatPrice(tour.totalPrice.max)}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                About This Tour
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {tour.description}
              </p>
            </div>

            {/* Route Details */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Tour Itinerary
              </h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-lg font-semibold text-gray-800">
                    {tour.route.join(" → ")}
                  </span>
                </div>
                <div className="space-y-3">
                  {tour.routeDetails.map((detail, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-24 font-semibold text-blue-600 text-sm">
                        {detail.day}:
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold text-gray-800">
                          {detail.location}
                        </span>
                        {detail.description && (
                          <span className="text-gray-600 ml-2">
                            - {detail.description}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Experience Highlights */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Experience Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tour.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Price Breakdown
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Transport</span>
                    <span className="font-semibold text-gray-800">
                      {formatPrice(tour.priceBreakdown.transport)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">
                      Hotel ({tour.duration - 1} nights)
                    </span>
                    <span className="font-semibold text-gray-800">
                      {formatPrice(tour.priceBreakdown.hotel)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Food & Activities</span>
                    <span className="font-semibold text-gray-800">
                      {formatPrice(tour.priceBreakdown.foodAndActivities)}
                    </span>
                  </div>
                  <div className="border-t-2 border-gray-300 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-800">
                        Total Estimated Cost
                      </span>
                      <span className="text-2xl font-bold text-blue-600">
                        {formatPrice(tour.totalPrice.min)} -{" "}
                        {formatPrice(tour.totalPrice.max)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                What's Included
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tour.experience.map((exp, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-700">{exp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Book Button */}
            <button
              onClick={() => setShowBookingModal(true)}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              Book This Tour Now
            </button>
          </div>
        </div>
      </main>

      <Footer />

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Book: {tour.name}</h2>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-500 hover:text-gray-700 text-3xl"
              >
                ×
              </button>
            </div>
            <BookingForm
              tour={tour}
              onSubmit={handleBookingSubmit}
              onCancel={() => setShowBookingModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default TourDetail;
