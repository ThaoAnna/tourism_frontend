import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingForm from "../pages/BookingForm";
import PageShell from "../components/layout/PageShell";
import Container from "../components/layout/Container";
import ReadableContent from "../components/layout/ReadableContent";
import type { Tour, BookingRequest } from "../types/index";
import { toursData } from "../data/tour";
import { bookingService } from "../services/bookingService";
import {
  MapPin,
  Clock,
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
    await bookingService.create(bookingData);
    alert("Booking successful! Check your email for confirmation.");
    setShowBookingModal(false);
  };

  if (!tour) {
    return (
      <PageShell>
        <Header />
        <main className="flex-1 flex items-center justify-center section-spacing">
          <p className="text-gray-500 text-lg">Tour not found</p>
        </main>
        <Footer />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <Header />

      <main className="flex-1 section-spacing">
        <Container wide>
          <button
            onClick={() => history.push("/")}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-8 lg:mb-12 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Tours
          </button>

          <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <img
              src={tour.imageUrl}
              alt={tour.name}
              className="w-full h-64 md:h-80 lg:h-[28rem] object-cover"
            />

            <div className="p-6 md:p-10 lg:p-12 section-gap">
              {/* Title & pricing — full card width */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-10">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
                      {tour.name}
                    </h1>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {tour.style}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center text-gray-600 gap-4">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-1.5" />
                      <span>{tour.duration} Days</span>
                    </div>
                    <div className="flex items-center">
                      <Navigation className="w-5 h-5 mr-1.5" />
                      <span>{tour.route.length} Cities</span>
                    </div>
                  </div>
                </div>
                <div className="lg:text-right shrink-0">
                  <p className="text-sm text-gray-500 mb-1">Starting from</p>
                  <p className="text-3xl md:text-4xl font-bold text-blue-600">
                    {formatPrice(tour.totalPrice.min)}
                  </p>
                  <p className="text-sm text-gray-500">per person</p>
                  <p className="text-xs text-gray-400 mt-1">
                    up to {formatPrice(tour.totalPrice.max)}
                  </p>
                </div>
              </div>

              {/* Description — readable width */}
              <section>
                <ReadableContent>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    About This Tour
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {tour.description}
                  </p>
                </ReadableContent>
              </section>

              {/* Itinerary — readable width */}
              <section>
                <ReadableContent>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Tour Itinerary
                  </h2>
                  <div className="bg-blue-50 p-6 md:p-8 rounded-xl">
                    <div className="flex items-start mb-6">
                      <MapPin className="w-5 h-5 text-blue-600 mr-2 mt-0.5 shrink-0" />
                      <span className="text-lg font-semibold text-gray-800 leading-snug">
                        {tour.route.join(" → ")}
                      </span>
                    </div>
                    <div className="space-y-4">
                      {tour.routeDetails.map((detail, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0">
                          <div className="sm:w-24 font-semibold text-blue-600 text-sm shrink-0">
                            {detail.day}:
                          </div>
                          <div className="flex-1">
                            <span className="font-semibold text-gray-800">
                              {detail.location}
                            </span>
                            {detail.description && (
                              <span className="text-gray-600 ml-0 sm:ml-2 block sm:inline mt-1 sm:mt-0">
                                — {detail.description}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ReadableContent>
              </section>

              {/* Highlights */}
              <section>
                <ReadableContent>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Experience Highlights
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    {tour.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                        <span className="text-gray-700 leading-relaxed">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </ReadableContent>
              </section>

              {/* Price breakdown — readable width */}
              <section>
                <ReadableContent>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Price Breakdown
                  </h2>
                  <div className="bg-gray-50 p-6 md:p-8 rounded-xl">
                    <div className="space-y-4">
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
                      <div className="border-t-2 border-gray-200 pt-4 mt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-gray-800">
                            Total Estimated Cost
                          </span>
                          <span className="text-xl md:text-2xl font-bold text-blue-600">
                            {formatPrice(tour.totalPrice.min)} –{" "}
                            {formatPrice(tour.totalPrice.max)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ReadableContent>
              </section>

              {/* What's included */}
              <section>
                <ReadableContent>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    What&apos;s Included
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    {tour.experience.map((exp, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                        <span className="text-gray-700 leading-relaxed">{exp}</span>
                      </div>
                    ))}
                  </div>
                </ReadableContent>
              </section>

              {/* CTA */}
              <div className="readable-content">
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg"
                >
                  Book This Tour Now
                </button>
              </div>
            </div>
          </article>
        </Container>
      </main>

      <Footer />

      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                Book: {tour.name}
              </h2>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
                aria-label="Close booking modal"
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
    </PageShell>
  );
};

export default TourDetail;
