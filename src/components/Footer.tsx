export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#1F2628] px-4 pb-10 pt-24 text-white md:px-6 md:pb-12 md:pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(198,166,74,0.12),rgba(198,166,74,0))]" />

      <div className="mx-auto max-w-[1380px]">
        <div className="editorial-rule" />

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[34rem]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E7D08A]">
              Staffing Solutions by Sarah Fell
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
              Ontario-first recruitment support for industrial, skilled trades, operations, and business-side hiring.
            </p>
          </div>

          <div className="text-sm text-white/58 lg:text-right">
            <p>Ontario-first, Canada-wide</p>
            <p className="mt-2">Serving Ontario&apos;s Industrial Sector Since 2013</p>
          </div>
        </div>

        <div className="mt-8 editorial-rule" />

        <p className="mt-6 text-xs uppercase tracking-[0.18em] text-white/42">
          © 2024 Staffing Solutions by Sarah Fell Inc.
        </p>
      </div>
    </footer>
  );
}
