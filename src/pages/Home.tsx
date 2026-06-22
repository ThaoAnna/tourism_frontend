// src/pages/Home.tsx
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import TourList from "../components/TourList";
import BookingForm from "../pages/BookingForm";
import PageShell from "../components/layout/PageShell";
import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import type { Tour, BookingRequest } from "../types";
import { CATEGORIES } from "../utils/constants";
import { toursData } from "../data/tour";
import { bookingService } from "../services/bookingService";

const Home: React.FC = () => {
  const history = useHistory();
  const [tours] = useState<Tour[]>(toursData);
  const [filteredTours, setFilteredTours] = useState<Tour[]>(toursData);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);
  const [loading] = useState<boolean>(false);

  useEffect(() => {
    filterTours();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedCategory]);

  const filterTours = (): void => {
    let filtered = [...tours];

    if (searchQuery) {
      filtered = filtered.filter(
        (tour) =>
          tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tour.route.some((city) =>
            city.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          tour.style.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((tour) => tour.style === selectedCategory);
    }

    setFilteredTours(filtered);
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

  return (
    <PageShell>
      <Header />

      <div className="bg-white border-b border-gray-100 sticky top-16 z-30 shadow-sm">
        <Container className="py-6 lg:py-8">
          <div className="flex flex-col md:flex-row gap-4 lg:gap-6">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search tours by name, city, or style..."
            />
            <FilterDropdown
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={CATEGORIES}
            />
          </div>
        </Container>
      </div>

      <main className="flex-1">
        <Section>
          <Container wide>
            <div className="mb-10 lg:mb-14">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
                {selectedCategory === "all"
                  ? "All European Tours"
                  : CATEGORIES.find((c) => c.value === selectedCategory)?.label}
              </h2>
              <p className="text-gray-600 mt-2 text-base">
                {filteredTours.length} tour{filteredTours.length !== 1 ? "s" : ""}{" "}
                available
              </p>
            </div>

            <TourList
              tours={filteredTours}
              onViewDetails={handleViewDetails}
              onBookClick={handleBookClick}
              loading={loading}
            />
          </Container>
        </Section>
      </main>

      <Footer />

      {showBookingModal && selectedTour && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                Book: {selectedTour.name}
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
