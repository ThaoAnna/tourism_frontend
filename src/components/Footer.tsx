import Container from "./layout/Container";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <Container className="section-spacing">
        <h2 className="text-4xl md:text-5xl font-serif italic tracking-wide bg-gradient-to-r from-pink-300 via-orange-200 to-yellow-300 bg-clip-text text-transparent mb-4">
          Wanderlust
        </h2>
        <p className="text-base text-gray-200 leading-relaxed font-light max-w-xl">
          Explore the world&apos;s most beautiful destinations. Discover, dream,
          and book your next adventure with ease.
        </p>
      </Container>

      <div className="border-t border-gray-800 py-6">
        <Container>
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Wanderlust. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}
