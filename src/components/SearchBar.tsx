interface Props {
  onSearch: (term: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  return (
    <input
      type="text"
      placeholder="Search destinations..."
      onChange={(e) => onSearch(e.target.value)}
      className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
}
