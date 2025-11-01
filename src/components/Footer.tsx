export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 text-center md:text-left">
        {/* Brand / About section */}
        <h2 className="text-5xl font-serif italic tracking-wide bg-gradient-to-r from-pink-300 via-orange-200 to-yellow-300 bg-clip-text text-transparent mb-3 drop-shadow-lg">
          Wanderlust
        </h2>
        <p className="text-base text-gray-200 leading-relaxed font-light max-w-xl">
          Explore the world’s most beautiful destinations.  
          Discover, dream, and book your next adventure with ease.
        </p>
      </div>

      {/* Bottom line */}
      <div className="mt-10 text-center text-gray-500 text-sm border-t border-gray-800 pt-6">
        © {new Date().getFullYear()} Wanderlust. All rights reserved.
      </div>
    </footer>
  );
}