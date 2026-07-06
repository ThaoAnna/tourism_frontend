// src/pages/Home.tsx
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import TourSearchCard from "../components/TourSearchCard";
import TourList from "../components/TourList";
import BookingForm from "../pages/BookingForm";
import PageShell from "../components/layout/PageShell";
import Container from "../components/layout/Container";
import type { Tour, BookingRequest } from "../types";
import { CATEGORIES, DURATION_OPTIONS } from "../utils/constants";
import { toursData } from "../data/tour";
import { bookingService } from "../services/bookingService";

function matchesDuration(duration: number, filter: string): boolean {
  if (filter === "all") return true;
  if (filter === "1-7") return duration >= 1 && duration <= 7;
  if (filter === "8-10") return duration >= 8 && duration <= 10;
  if (filter === "11+") return duration >= 11;
  return true;
}

const Home: React.FC = () => {
  const history = useHistory();
  const toursSectionRef = useRef<HTMLElement>(null);
  const [tours] = useState<Tour[]>(toursData);
  const [filteredTours, setFilteredTours] = useState<Tour[]>(toursData);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDuration, setSelectedDuration] = useState<string>("all");
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);
  const [loading] = useState<boolean>(false);

  useEffect(() => {
    filterTours();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedCategory, selectedDuration]);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  const filterTours = (): void => {
    let filtered = [...tours];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (tour) =>
          tour.name.toLowerCase().includes(q) ||
          tour.route.some((city) => city.toLowerCase().includes(q)) ||
          tour.style.toLowerCase().includes(q) ||
          tour.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((tour) => tour.style === selectedCategory);
    }

    if (selectedDuration !== "all") {
      filtered = filtered.filter((tour) =>
        matchesDuration(tour.duration, selectedDuration)
      );
    }

    setFilteredTours(filtered);
  };

  const scrollToTours = () => {
    toursSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleViewDetails = (tour: Tour): void => {
    history.push(`/tour/${tour.id}`);
  };

  const handleBookClick = (tour: Tour): void => {
    setSelectedTour(tour);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = async (
    bookingData: BookingRequest
  ): Promise<void> => {
    await bookingService.create(bookingData);
    alert("Booking successful! Check your email for confirmation.");
    setShowBookingModal(false);
    setSelectedTour(null);
  };

  const sectionTitle =
    selectedCategory === "all"
      ? "All European Tours"
      : CATEGORIES.find((c) => c.value === selectedCategory)?.label ??
        "European Tours";

  return (
    <PageShell className="!pt-16">
      <Header />

      <Hero onExploreTours={scrollToTours} onPlanTrip={scrollToTours} />

      <TourSearchCard
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedDuration={selectedDuration}
        onDurationChange={setSelectedDuration}
        categories={CATEGORIES}
        durations={DURATION_OPTIONS}
        onSearch={scrollToTours}
      />

      <main className="flex-1">
        <section
          id="tours"
          ref={toursSectionRef}
          className="scroll-mt-24 pt-12 md:pt-16 lg:pt-20 pb-16 md:pb-24"
        >
          <Container wide>
            <div className="mb-10 lg:mb-12 max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-navy tracking-tight">
                {sectionTitle}
              </h2>
              <p className="text-muted mt-3 text-base leading-relaxed">
                Choose from curated experiences designed for culture lovers,
                couples, families, and first-time travelers.
              </p>
              <p className="text-sm text-muted/80 mt-2">
                {filteredTours.length} tour
                {filteredTours.length !== 1 ? "s" : ""} available
              </p>
            </div>

            <div id="experiences">
              <TourList
                tours={filteredTours}
                onViewDetails={handleViewDetails}
                onBookClick={handleBookClick}
                loading={loading}
              />
            </div>
          </Container>
        </section>
      </main>

      <Footer />

      {showBookingModal && selectedTour && (
        <div className="fixed inset-0 bg-navy/50 backdrop-blur-sm flex items-center justify-center z-50 p-5">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-navy">
                Book: {selectedTour.name}
              </h2>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-muted hover:text-ink text-3xl leading-none"
                aria-label="Close booking modal"
              >
                ×
              </button>
            </div>
            {/* Future: payment method selection (PayPal / Stripe) before confirm */}
            <BookingForm
              tour={selectedTour}
              onSubmit={handleBookingSubmit}
              onCancel={() => setShowBookingModal(false)}
            />
          </div>
        </div>
      )}
    </PageShell>
  );
};

export default Home;
