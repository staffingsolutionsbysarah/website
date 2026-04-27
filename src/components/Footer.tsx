import Link from 'next/link';
import { Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#2C3434] px-4 pb-10 pt-24 text-white md:px-6 md:pb-12 md:pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(139,118,76,0.12),rgba(139,118,76,0))]" />

      <div className="mx-auto max-w-[1380px]">
        <div className="editorial-rule" />

        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12 mt-12">
          <div className="max-w-[34rem]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#AB9D82]">
              Staffing Solutions by Sarah Fell
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/72 md:text-base">
              Ontario-first recruitment support for industrial, skilled trades, operations, and business-side hiring.
            </p>
            <div className="mt-8 flex gap-4 text-sm text-white/58">
              <p>Serving Ontario&apos;s Industrial Sector Since 2013</p>
            </div>
            <a
              href="https://www.linkedin.com/in/sarah-fell-3b8a5810"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-xs text-white/42 hover:text-[#AB9D82] transition-colors"
            >
              <Linkedin className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#AB9D82]">Hubs</p>
            <nav className="mt-6 flex flex-col gap-3">
              <Link href="/hire-talent" className="text-sm text-white/64 hover:text-[#AB9D82] transition-colors">Hire Talent</Link>
              <Link href="/find-work" className="text-sm text-white/64 hover:text-[#AB9D82] transition-colors">Find Work</Link>
              <Link href="/services" className="text-sm text-white/64 hover:text-[#AB9D82] transition-colors">Services</Link>
              <Link href="/industries" className="text-sm text-white/64 hover:text-[#AB9D82] transition-colors">Industries</Link>
              <Link href="/locations" className="text-sm text-white/64 hover:text-[#AB9D82] transition-colors">Locations</Link>
            </nav>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#AB9D82]">Company</p>
            <nav className="mt-6 flex flex-col gap-3">
              <Link href="/about" className="text-sm text-white/64 hover:text-[#AB9D82] transition-colors">About Sarah</Link>
              <Link href="/contact" className="text-sm text-white/64 hover:text-[#AB9D82] transition-colors">Contact</Link>
              <Link href="/book-a-call" className="text-sm text-white/64 hover:text-[#AB9D82] transition-colors">Book a Call</Link>
              <Link href="/jobs" className="text-sm text-white/64 hover:text-[#AB9D82] transition-colors">Active Jobs</Link>
            </nav>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#AB9D82]">Authority</p>
            <nav className="mt-6 flex flex-col gap-3">
              <Link href="/insights" className="text-sm text-white/64 hover:text-[#AB9D82] transition-colors">Insights</Link>
              <Link href="/case-studies" className="text-sm text-white/64 hover:text-[#AB9D82] transition-colors">Case Studies</Link>
              <Link href="/newsletter" className="text-sm text-white/64 hover:text-[#AB9D82] transition-colors">Newsletter</Link>
            </nav>
          </div>
        </div>

        <div className="mt-16 editorial-rule" />

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <Link href="/privacy" className="text-[10px] uppercase tracking-[0.18em] text-white/42 hover:text-[#AB9D82] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-[10px] uppercase tracking-[0.18em] text-white/42 hover:text-[#AB9D82] transition-colors">Terms of Use</Link>
            <Link href="/disclaimer" className="text-[10px] uppercase tracking-[0.18em] text-white/42 hover:text-[#AB9D82] transition-colors">Disclaimer</Link>
          </div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/42">
            © 2026 Staffing Solutions by Sarah Fell Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
