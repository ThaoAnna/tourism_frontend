import { Link } from "react-router-dom";
import Container from "./layout/Container";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-yellow-200 via-orange-200 to-pink-200 border-b border-black/10 shadow-md">
      <Container className="flex items-center justify-between py-3">
        <nav className="flex items-center">
          <Link
            to="/"
            className="text-2xl font-extrabold text-gray-900 tracking-wide"
          >
            Wanderluster
          </Link>
        </nav>

        <nav className="hidden md:flex items-center gap-4">
          <Link
            to="/"
            className="px-4 py-2 rounded-full bg-green-300 text-gray-800 font-semibold hover:text-purple-600 hover:scale-105 transition-all duration-200"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 rounded-full bg-lime-300 text-gray-800 font-semibold hover:text-purple-600 hover:scale-105 transition-all duration-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 rounded-full bg-yellow-300 text-gray-800 font-semibold hover:text-purple-600 hover:scale-105 transition-all duration-200"
          >
            Register
          </Link>
        </nav>
      </Container>
    </header>
  );
}
