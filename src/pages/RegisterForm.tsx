import Header from "../components/Header";
import { AuroraCanvas } from "../components/ui/aurora-canvas";
import Container from "../components/layout/Container";

export default function RegisterForm() {
  return (
    <div className="min-h-screen relative pt-16">
      <AuroraCanvas
        className="absolute inset-0 -z-10 h-full w-full"
        colors={["#00ff87", "#60efff", "#0061ff", "#ff0099"]}
        speed={0.25}
        layers={3}
        interactive
      />
      <Header />

      <main className="section-spacing">
        <Container className="flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 lg:mb-12 text-gray-800 tracking-tight">
            Register
          </h2>
          <form className="bg-white/90 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-md border border-white/50">
            <div className="mb-5">
              <label className="block text-gray-700 mb-2 font-semibold">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none transition-shadow"
              />
            </div>

            <div className="mb-5">
              <label className="block text-gray-700 mb-2 font-semibold">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none transition-shadow"
              />
            </div>
            <div className="mb-5">
              <label className="block text-gray-700 mb-2 font-semibold">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none transition-shadow"
              />
            </div>
            <div className="mb-5">
              <label className="block text-gray-700 mb-2 font-semibold">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none transition-shadow"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-white font-semibold rounded-full hover:opacity-90 transition"
            >
              Register
            </button>
          </form>
        </Container>
      </main>
    </div>
  );
}
