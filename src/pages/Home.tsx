// src/pages/Home.tsx
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import TourList from "../components/TourList";
import BookingForm from "../pages/BookingForm";
import type { Tour, BookingRequest } from "../types";
import { CATEGORIES } from "../utils/constants";
import { toursData } from "../data/tour";

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
    try {
      console.log("Booking submitted:", bookingData);
      alert("Booking successful! Check your email for confirmation.");
      setShowBookingModal(false);
      setSelectedTour(null);
    } catch (err) {
      alert("Failed to create booking. Please try again.");
      console.error("Error creating booking:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="bg-white border-b sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4">
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
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedCategory === "all"
              ? "All European Tours"
              : CATEGORIES.find((c) => c.value === selectedCategory)?.label}
          </h2>
          <p className="text-gray-600 mt-1">
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
      </main>

      <Footer />

      {showBookingModal && selectedTour && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Book: {selectedTour.name}</h2>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-500 hover:text-gray-700 text-3xl"
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
    </div>
  );
};

export default Home;