
export default function Header() {
  return (
    <header className="fixed inset-x-0 top-5 z-10 border-b border-black/5 dark:border-white/10">
        <div className="flex h-16 items-center justify-between gap-8 px-4 sm:pz-6">
            <div className="flex flex-row text-3xl font-bold text-gray-900 h-16 items-center justify-between gap-8">
                <h1>Live another life</h1>
            </div>
            <div className="flex item-center gap-6 max-md:hidden">
                <button className="inline-flex items-center gap-1 rounded-full bg-gray-950/2">
                    <a href="#home" className="hover:text-purple-600">
                        Home
                    </a>
                </button>
                <button className="inline-flex items-center gap-1 rounded-full bg-gray-950/2">
                    <a href="#register" className="hover:text-purple-600">
                        Register
                    </a>
                </button>
                <button className="inline-flex items-center gap-1 rounded-full bg-gray-950/2">
                    <a href="#review" className="hover:text-purple-600">
                        Review
                    </a>
                </button>
            </div>
        </div>
    </header>
  );
}
