import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-yellow-200 via-orange-200 to-pink-200 border-b border-black/10 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            alt="Wanderluster logo"
            className="h-12 w-12 object-contain"
          />
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-wide">
            Wanderluster
          </h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a
            href="#home"
            className="px-4 py-2 rounded-full bg-green-300 text-gray-800 font-semibold hover:text-purple-600 hover:scale-105 transition-all duration-200"
          >
            Home
          </a>
          <a
            href="#register"
            className="px-4 py-2 rounded-full bg-lime-300 text-gray-800 font-semibold hover:text-purple-600 hover:scale-105 transition-all duration-200"
          >
            Register
          </a>
          <a
            href="#review"
            className="px-4 py-2 rounded-full bg-yellow-300 text-gray-800 font-semibold hover:text-purple-600 hover:scale-105 transition-all duration-200"
          >
            Review
          </a>
        </nav>
      </div>
    </header>
  );
}
