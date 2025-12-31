import { AuroraCanvas } from "../components/ui/aurora-canvas";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function LoginForm() {
  return (
    <section
      id="login"
      className="pt-20 pb-10 flex flex-col items-center justify-center"
    >
      <div className="pb-10 pt-0">
        <Header/>
      </div>
      <AuroraCanvas
        className="absolute inset-0 -z-10 h-full w-full"
        colors={["#00ff87", "#60efff", "#0061ff", "#ff0099"]}
        speed={0.25}
        layers={3}
        interactive
      />

      <h2 className="text-4xl font-bold mb-8 text-gray-800">Login</h2>
      <form className="bg-gray-100 p-8 rounded-2xl shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-semibold">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-semibold">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-white font-semibold rounded-full hover:opacity-90 transition"
        >
          Submit
        </button>

        <Link
          to="/registerForm"
          className="flex align-item items-center pt-4 text-l "
        >
          <h4>Don't have account yet? Sign in </h4>
        </Link>
      </form>
    </section>
  );
}
