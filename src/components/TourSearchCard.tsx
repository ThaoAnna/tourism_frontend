import { Search } from "lucide-react";
import type { CategoryOption } from "../types";
import Container from "./layout/Container";

interface TourSearchCardProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedDuration: string;
  onDurationChange: (value: string) => void;
  categories: CategoryOption[];
  durations: CategoryOption[];
  onSearch: () => void;
}

const fieldClass =
  "w-full min-h-11 px-3 text-sm text-ink bg-sand/50 border border-navy/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald/25 focus:border-emerald transition-colors";

const labelClass = "block text-xs font-semibold uppercase tracking-wide text-muted mb-1.5";

export default function TourSearchCard({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedDuration,
  onDurationChange,
  categories,
  durations,
  onSearch,
}: TourSearchCardProps) {
  return (
    <div className="relative z-20 -mt-16 md:-mt-20 px-5 md:px-8">
      <Container>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearch();
          }}
          className="bg-white rounded-2xl shadow-xl shadow-navy/10 border border-navy/5 p-4 sm:p-5 md:p-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 items-end">
            <div className="sm:col-span-2 lg:col-span-1">
              <label htmlFor="tour-search" className={labelClass}>
                Destination
              </label>
              <input
                id="tour-search"
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="City, tour name, or style..."
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="tour-type" className={labelClass}>
                Tour type
              </label>
              <select
                id="tour-type"
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className={fieldClass}
              >
                {categories.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="tour-duration" className={labelClass}>
                Duration
              </label>
              <select
                id="tour-duration"
                value={selectedDuration}
                onChange={(e) => onDurationChange(e.target.value)}
                className={fieldClass}
              >
                {durations.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn-emerald w-full gap-2 !min-h-11">
              <Search className="w-4 h-4" aria-hidden />
              Search
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
}
