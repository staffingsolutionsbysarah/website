import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#1F2628] px-4 pb-10 pt-24 text-white md:px-6 md:pb-12 md:pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(198,166,74,0.12),rgba(198,166,74,0))]" />

      <div className="mx-auto max-w-[1380px]">
        <div className="editorial-rule" />

        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12 mt-12">
          <div className="max-w-[34rem]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E7D08A]">
              Staffing Solutions by Sarah Fell
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/72 md:text-base">
              Ontario-first recruitment support for industrial, skilled trades, operations, and business-side hiring.
            </p>
            <div className="mt-8 flex gap-4 text-sm text-white/58">
              <p>Serving Ontario&apos;s Industrial Sector Since 2013</p>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E7D08A]">Hubs</p>
            <nav className="mt-6 flex flex-col gap-3">
              <Link href="/hire-talent" className="text-sm text-white/64 hover:text-[#E7D08A] transition-colors">Hire Talent</Link>
              <Link href="/find-work" className="text-sm text-white/64 hover:text-[#E7D08A] transition-colors">Find Work</Link>
              <Link href="/services" className="text-sm text-white/64 hover:text-[#E7D08A] transition-colors">Services</Link>
              <Link href="/industries" className="text-sm text-white/64 hover:text-[#E7D08A] transition-colors">Industries</Link>
              <Link href="/locations" className="text-sm text-white/64 hover:text-[#E7D08A] transition-colors">Locations</Link>
            </nav>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E7D08A]">Company</p>
            <nav className="mt-6 flex flex-col gap-3">
              <Link href="/about" className="text-sm text-white/64 hover:text-[#E7D08A] transition-colors">About Sarah</Link>
              <Link href="/contact" className="text-sm text-white/64 hover:text-[#E7D08A] transition-colors">Contact</Link>
              <Link href="/book-a-call" className="text-sm text-white/64 hover:text-[#E7D08A] transition-colors">Book a Call</Link>
              <Link href="/jobs" className="text-sm text-white/64 hover:text-[#E7D08A] transition-colors">Active Jobs</Link>
            </nav>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E7D08A]">Authority</p>
            <nav className="mt-6 flex flex-col gap-3">
              <Link href="/insights" className="text-sm text-white/64 hover:text-[#E7D08A] transition-colors">Insights</Link>
              <Link href="/case-studies" className="text-sm text-white/64 hover:text-[#E7D08A] transition-colors">Case Studies</Link>
              <Link href="/newsletter" className="text-sm text-white/64 hover:text-[#E7D08A] transition-colors">Newsletter</Link>
            </nav>
          </div>
        </div>

        <div className="mt-16 editorial-rule" />

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <Link href="/privacy" className="text-[10px] uppercase tracking-[0.18em] text-white/42 hover:text-[#E7D08A] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-[10px] uppercase tracking-[0.18em] text-white/42 hover:text-[#E7D08A] transition-colors">Terms of Use</Link>
            <Link href="/disclaimer" className="text-[10px] uppercase tracking-[0.18em] text-white/42 hover:text-[#E7D08A] transition-colors">Disclaimer</Link>
          </div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/42">
            © 2024 Staffing Solutions by Sarah Fell Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
