interface Props {
  filter: string;
  onFilterChange: (value: string) => void;
}

export default function FilterDropdown({ filter, onFilterChange }: Props) {
  return (
    <select
      value={filter}
      onChange={(e) => onFilterChange(e.target.value)}
      className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option value="all">All Destinations</option>
      <option value="highRated">Top Rated</option>
    </select>
  );
}
