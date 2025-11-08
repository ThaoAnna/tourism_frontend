export default function RegisterForm() {
  return (
    <section
      id="register"
      className="min-h-screen flex flex-col items-center justify-center bg-white pt-32 pb-20 px-6"
    >
      <h2 className="text-4xl font-bold mb-8 text-gray-800">Register</h2>
      <form className="bg-gray-100 p-8 rounded-2xl shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-semibold">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-semibold">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-white font-semibold rounded-full hover:opacity-90 transition"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
