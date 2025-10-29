import type  { Destination } from "../data/destination";

export default function DestinationCard({ name, country, image, rating }: Destination) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition">
      <img src={image} alt={name} className="w-full h-52 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500 mb-2">{country}</p>
        <div className="flex items-center gap-1 text-yellow-500">
          <span className="text-gray-700">{rating}</span>
        </div>
      </div>
    </div>
  );
}
