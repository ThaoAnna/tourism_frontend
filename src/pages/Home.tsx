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
      {/* === Aurora background === */}
      <AuroraCanvas
        className="absolute inset-0 -z-10 h-full w-full"
        colors={["#00ff87", "#60efff", "#0061ff", "#ff0099"]}
        speed={0.25}
        layers={3}
        interactive
      />

      {/* === Main page content === */}
      <div className="max-w-5xl mx-auto px-6 py-4 relative z-10">
        <Header />

        <div className="space-y-4 mb-10 pt-15">
          <SearchBar onSearch={setSearchTerm} />
          <FilterDropdown filter={filter} onFilterChange={setFilter} />
        </div>

        <section id="home" className="scroll-mt-28">
          <h2 className="text-2xl font-bold mb-2">All Destinations</h2>
          <p className="text-gray-500 mb-6">
            {filtered.length} destinations found
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {filtered.map((dest) => (
              <DestinationCard key={dest.id} {...dest} />
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
