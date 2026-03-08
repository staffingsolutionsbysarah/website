export default function Footer() {
    return (
        <footer className="bg-[#1A1A1A] text-white py-12">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-gray-300 mb-8 border-b border-[var(--color-primary)]/50 pb-8">
                    <span className="flex items-center gap-2">📍 Ontario-first, Canada-wide</span>
                </div>

                <div className="flex flex-col items-center gap-4">
                    <p className="text-sm text-gray-400">
                        © 2024 Staffing Solutions by Sarah Fell Inc. <span className="hidden md:inline mx-2 text-gray-600">|</span><br className="md:hidden" /> Serving Ontario&apos;s Industrial Sector Since 2013
                    </p>
                    <div className="flex gap-6 text-xs text-gray-400 mt-4">
                        <a href="#" className="hover:text-white border-b border-transparent hover:border-[var(--color-primary)] pb-0.5 transition-all">Privacy Policy</a>
                        <a href="#" className="hover:text-white border-b border-transparent hover:border-[var(--color-primary)] pb-0.5 transition-all">Terms of Service</a>
                        <a href="#" className="hover:text-white border-b border-transparent hover:border-[var(--color-primary)] pb-0.5 transition-all">Accessibility</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
