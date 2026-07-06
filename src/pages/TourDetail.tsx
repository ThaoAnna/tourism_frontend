import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingForm from "../pages/BookingForm";
import PageShell from "../components/layout/PageShell";
import Container from "../components/layout/Container";
import type { Tour, BookingRequest } from "../types/index";
import { toursData } from "../data/tour";
import { bookingService } from "../services/bookingService";
import {
  MapPin,
  Clock,
  Navigation,
  ArrowLeft,
  CheckCircle,
  Star,
  X,
  Utensils,
  BedDouble,
  Bus,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { formatPrice } from "../utils/helpers";
import { getTourRating } from "../utils/constants";

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
          <div className="text-center">
            <p className="text-muted text-lg font-medium">Tour not found</p>
            <button
              onClick={() => history.push("/")}
              className="btn-outline mt-6"
            >
              Back to Home
            </button>
          </div>
        </main>
        <Footer />
      </PageShell>
    );
  }

  const { rating, reviewCount } = {
    rating: tour.rating ?? getTourRating(tour.id).rating,
    reviewCount: tour.reviewCount ?? getTourRating(tour.id).reviewCount,
  };

  return (
    <PageShell>
      <Header />

      <main className="flex-1 pb-16 lg:pb-24">
        {/* Hero */}
        <div className="relative h-64 sm:h-72 md:h-80 lg:h-[22rem] overflow-hidden">
          <img
            src={tour.imageUrl}
            alt={tour.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/30 to-navy/10" />
          <Container wide className="relative h-full flex flex-col justify-end pb-8 md:pb-10">
            <button
              onClick={() => history.push("/")}
              className="absolute top-6 left-5 md:left-8 inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium transition-colors bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Tours
            </button>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-gold text-navy px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                {tour.style}
              </span>
              <span className="bg-white/15 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold border border-white/20">
                {tour.duration} Days
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight max-w-3xl">
              {tour.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mt-4 text-white/85 text-sm">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-gold shrink-0" />
                <span>{tour.route.join(" · ")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-gold text-gold shrink-0" />
                <span className="font-semibold text-white">{rating.toFixed(1)}</span>
                <span className="text-white/70">({reviewCount} reviews)</span>
              </div>
            </div>
          </Container>
        </div>

        <Container wide className="mt-8 lg:mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10 md:space-y-14">
              {/* Quick stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { icon: Clock, label: "Duration", value: `${tour.duration} days` },
                  { icon: Navigation, label: "Cities", value: `${tour.route.length} stops` },
                  { icon: ShieldCheck, label: "Booking", value: "Free cancellation" },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="bg-white rounded-2xl border border-navy/5 p-4 shadow-sm shadow-navy/5"
                  >
                    <Icon className="w-5 h-5 text-emerald mb-2" />
                    <p className="text-xs text-muted uppercase tracking-wide font-medium">{label}</p>
                    <p className="text-sm font-semibold text-ink mt-0.5">{value}</p>
                  </div>
                ))}
              </div>

              {/* About */}
              <section>
                <h2 className="text-xl md:text-2xl font-bold text-navy mb-4 tracking-tight">
                  About This Tour
                </h2>
                <p className="text-muted leading-relaxed text-base md:text-lg">
                  {tour.description}
                </p>
              </section>

              {/* Itinerary */}
              <section>
                <h2 className="text-xl md:text-2xl font-bold text-navy mb-6 tracking-tight">
                  Tour Itinerary
                </h2>
                <div className="bg-white rounded-2xl border border-navy/5 p-6 md:p-8 shadow-sm shadow-navy/5">
                  <div className="flex items-start gap-3 mb-8 pb-6 border-b border-navy/5">
                    <div className="w-10 h-10 rounded-xl bg-emerald/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-emerald" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-1">
                        Full route
                      </p>
                      <p className="text-base font-semibold text-ink leading-snug">
                        {tour.route.join(" → ")}
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute left-[15px] top-2 bottom-2 w-px bg-emerald/20 hidden sm:block" />
                    <div className="space-y-6">
                      {tour.routeDetails.map((detail, index) => (
                        <div key={index} className="flex gap-4 sm:gap-5">
                          <div className="relative shrink-0">
                            <div className="w-8 h-8 rounded-full bg-emerald text-white text-xs font-bold flex items-center justify-center relative z-10">
                              {index + 1}
                            </div>
                          </div>
                          <div className="flex-1 pt-0.5">
                            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                              <span className="text-xs font-bold uppercase tracking-wide text-emerald">
                                {detail.day}
                              </span>
                              <span className="font-semibold text-ink">{detail.location}</span>
                            </div>
                            {detail.description && (
                              <p className="text-muted text-sm mt-1.5 leading-relaxed">
                                {detail.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Highlights + Included */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                <section>
                  <div className="flex items-center gap-2 mb-5">
                    <Sparkles className="w-5 h-5 text-gold" />
                    <h2 className="text-xl font-bold text-navy tracking-tight">
                      Highlights
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {tour.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
                        <span className="text-muted text-sm leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <div className="flex items-center gap-2 mb-5">
                    <CheckCircle className="w-5 h-5 text-emerald" />
                    <h2 className="text-xl font-bold text-navy tracking-tight">
                      What&apos;s Included
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {tour.experience.map((exp, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
                        <span className="text-muted text-sm leading-relaxed">{exp}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>

            {/* Sticky sidebar */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-4">
                <div className="bg-white rounded-2xl border border-navy/5 shadow-lg shadow-navy/8 overflow-hidden">
                  <div className="bg-navy px-6 py-5">
                    <p className="text-xs text-white/60 uppercase tracking-wide font-medium">
                      Starting from
                    </p>
                    <p className="text-3xl font-bold text-white mt-1">
                      {formatPrice(tour.totalPrice.min)}
                    </p>
                    <p className="text-sm text-white/70 mt-1">per person</p>
                    <p className="text-xs text-white/50 mt-2">
                      up to {formatPrice(tour.totalPrice.max)}
                    </p>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-sm font-bold text-navy uppercase tracking-wide">
                      Price Breakdown
                    </h3>
                    <div className="space-y-3">
                      {[
                        { icon: Bus, label: "Transport", value: tour.priceBreakdown.transport },
                        {
                          icon: BedDouble,
                          label: `Hotel (${tour.duration - 1} nights)`,
                          value: tour.priceBreakdown.hotel,
                        },
                        {
                          icon: Utensils,
                          label: "Food & Activities",
                          value: tour.priceBreakdown.foodAndActivities,
                        },
                      ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-sand flex items-center justify-center shrink-0">
                              <Icon className="w-4 h-4 text-emerald" />
                            </div>
                            <span className="text-sm text-muted truncate">{label}</span>
                          </div>
                          <span className="text-sm font-semibold text-ink shrink-0">
                            {formatPrice(value)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-navy/10 pt-4 flex justify-between items-center">
                      <span className="text-sm font-semibold text-ink">Total estimate</span>
                      <span className="text-base font-bold text-emerald">
                        {formatPrice(tour.totalPrice.min)} – {formatPrice(tour.totalPrice.max)}
                      </span>
                    </div>

                    <button
                      onClick={() => setShowBookingModal(true)}
                      className="btn-emerald w-full !min-h-12 !text-base mt-2"
                    >
                      Book This Tour
                    </button>

                    <p className="text-xs text-center text-muted">
                      No payment required now · Instant confirmation
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </main>

      <Footer />

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-navy/10 px-5 py-3 flex items-center justify-between gap-4 shadow-[0_-4px_20px_rgba(19,34,56,0.08)]">
        <div>
          <p className="text-xs text-muted">From</p>
          <p className="text-lg font-bold text-emerald leading-none">
            {formatPrice(tour.totalPrice.min)}
          </p>
        </div>
        <button
          onClick={() => setShowBookingModal(true)}
          className="btn-emerald !min-h-11 px-8"
        >
          Book Now
        </button>
      </div>

      {showBookingModal && (
        <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6">
          <div className="bg-sand rounded-2xl max-w-md w-full max-h-[90vh] flex flex-col shadow-2xl shadow-navy/20 overflow-hidden border border-navy/10">
            <div className="shrink-0 bg-white flex justify-between items-center px-5 sm:px-6 py-4 sm:py-5 border-b border-navy/10">
              <div className="min-w-0 pr-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Reserve your spot
                </p>
                <h2 className="text-base sm:text-lg font-bold text-navy mt-0.5 leading-snug truncate">
                  {tour.name}
                </h2>
              </div>
              <button
                onClick={() => setShowBookingModal(false)}
                className="w-9 h-9 rounded-full bg-sand flex items-center justify-center text-muted hover:text-ink hover:bg-sand-dark transition-colors shrink-0"
                aria-label="Close booking modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5">
              <BookingForm
                tour={tour}
                onSubmit={handleBookingSubmit}
                onCancel={() => setShowBookingModal(false)}
              />
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
};

export default TourDetail;
