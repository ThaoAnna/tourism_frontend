import { useState } from "react";
import { destinations } from "../data/destination";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import DestinationCard from "../components/DestinationCard";
import Footer from "../components/Footer";
import { AuroraCanvas } from "../components/ui/aurora-canvas";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = destinations.filter((d) => {
    const matchesSearch = d.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "highRated" ? d.rating >= 4.8 : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Aurora background */}
      <AuroraCanvas
        className="absolute inset-0 -z-10 h-full w-full"
        colors={["#00ff87", "#60efff", "#0061ff", "#ff0099"]}
        speed={0.5}
        layers={3}
        interactive
      />

      {/* Main page content */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 relative z-10 max-w-7xl">
        <Header />

        {/* Search and Filter Section */}
        <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 pt-4 sm:pt-6 lg:pt-8">
          <SearchBar onSearch={setSearchTerm} />
          <FilterDropdown filter={filter} onFilterChange={setFilter} />
        </div>

        {/* Destinations Section */}
        <section id="home" className="scroll-mt-20 sm:scroll-mt-24 lg:scroll-mt-28">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">
              All Destinations
            </h2>
            <p className="text-sm sm:text-base text-gray-500">
              {filtered.length} destination{filtered.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 pb-8">
            {filtered.map((dest) => (
              <DestinationCard key={dest.id} {...dest} />
            ))}
          </div>

          {/* Empty State */}
          {filtered.length === 0 && (
            <div className="text-center py-12 sm:py-16 lg:py-20">
              <p className="text-gray-500 text-base sm:text-lg">
                No destinations found. Try adjusting your search or filters.
              </p>
            </div>
          )}
        </section>

        <Footer />
      </div>
    </div>
  );
}