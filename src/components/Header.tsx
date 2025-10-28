// import { GlobeEuropeAfrica } from "lucide-react";

export default function Header() {
  return (
    <header className="text-center py-8">
      <div className="flex justify-center items-center gap-2 mb-2">
        {/* <GlobeEuropeAfrica className="text-blue-500" size={28} /> */}
        <h1 className="text-3xl font-bold text-gray-900">European Tours</h1>
      </div>
      <p className="text-gray-500">Discover the beauty of Europe</p>
    </header>
  );
}
