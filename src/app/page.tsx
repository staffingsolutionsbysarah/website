'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Briefcase, Building2, CheckCircle2, Cog, Truck, Wrench, ShieldCheck, ChevronLeft, ChevronRight, Scale, ClipboardList, Award, Zap, Hammer, Quote } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const services = [
  {
    title: 'Permanent Recruitment',
    body: 'Targeted hiring for full-time roles where retention, reliability, and team fit are critical.',
  },
  {
    title: 'Temporary & Contract Staffing',
    body: 'Fast staffing support for urgent backfills, project peaks, and fluctuating workforce demand.',
  },
  {
    title: 'Retained Search',
    body: 'Dedicated, priority search for executive, specialized, or highly confidential operations roles.',
  },
  {
    title: 'RPO (Recruitment Process Outsourcing)',
    body: 'Scalable, end-to-end recruitment management to handle volume hiring or assist in building entire teams.',
  },
  {
    title: 'Supervisor & Leadership Search',
    body: 'Focused search for hard-to-fill supervisors, managers, and specialist leadership roles.',
  },
];

const industries = [
  { label: 'Manufacturing & Industrial', icon: Cog },
  { label: 'Skilled Trades', icon: Wrench },
  { label: 'Construction & Field Ops', icon: Building2 },
  { label: 'Logistics & Distribution', icon: Truck },
  { label: 'Legal', icon: Scale },
  { label: 'Project Management', icon: ClipboardList },
  { label: 'Quality Production', icon: Award },
  { label: 'Millwrights & Mechanics', icon: Hammer },
  { label: 'Electricians', icon: Zap },
];

const steps = [
  'Deep dive into your role requirements, team culture, and hiring timeline',
  'Active search across targeted channels and vetted recruiter networks',
  'Present 3-4 qualified candidates with clear fit rationale',
  'Structured interview support with scorecards and feedback loops',
  'Offer negotiation and onboarding assistance through acceptance',
  '2, 4, and 8-week follow-ups to protect retention',
];

const reviews = [
  {
    text: "Sarah found us three solid millwrights right when we needed them. She understands the plant environment and didn't just toss us random resumes to sift through.",
    author: "Maintenance Manager",
    company: "Food Processing",
  },
  {
    text: "We were struggling to find good mechanics for the floor. They stepped in, figured out what we actually needed, and got us reliable guys who showed up and worked hard.",
    author: "Operations Director",
    company: "Industrial Manufacturing",
  },
  {
    text: "Even for our lower-level shop floor roles, the candidates are screened better than what we used to see. It takes a huge load off our supervisors.",
    author: "Plant Supervisor",
    company: "Packaging Facility",
  },
  {
    text: "No fluff, just straightforward recruiting. We needed a few dependable operators for the third shift and they were lined up in days.",
    author: "Shift Lead",
    company: "Automotive Assembly",
  },
];

export default function HomePage() {
  const [carouselItems, setCarouselItems] = useState(industries);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [openServiceIndex, setOpenServiceIndex] = useState<number | null>(null);

  const [reviewItems, setReviewItems] = useState(reviews);
  const [isReviewAutoPlaying, setIsReviewAutoPlaying] = useState(true);

  const slideNext = useCallback(() => {
    setCarouselItems((prev) => {
      const newItems = [...prev];
      const first = newItems.shift();
      if (first) newItems.push(first);
      return newItems;
    });
  }, []);

  const slidePrev = () => {
    setCarouselItems((prev) => {
      const newItems = [...prev];
      const last = newItems.pop();
      if (last) newItems.unshift(last);
      return newItems;
    });
  };

  const slideNextReview = useCallback(() => {
    setReviewItems((prev) => {
      const newItems = [...prev];
      const first = newItems.shift();
      if (first) newItems.push(first);
      return newItems;
    });
  }, []);

  const slidePrevReview = () => {
    setReviewItems((prev) => {
      const newItems = [...prev];
      const last = newItems.pop();
      if (last) newItems.unshift(last);
      return newItems;
    });
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(slideNext, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, slideNext]);

  useEffect(() => {
    if (!isReviewAutoPlaying) return;
    const timer = setInterval(slideNextReview, 6000);
    return () => clearInterval(timer);
  }, [isReviewAutoPlaying, slideNextReview]);

  return (
    <div className="relative overflow-hidden bg-[#F4F2ED] text-[var(--color-dark)]">
      <div className="pointer-events-none absolute -top-24 right-[-80px] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,_rgba(198,166,74,0.3)_0%,_rgba(198,166,74,0)_70%)]" />
      <div className="pointer-events-none absolute top-[28%] left-[-90px] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,_rgba(120,148,146,0.2)_0%,_rgba(120,148,146,0)_72%)]" />
      <div className="pointer-events-none absolute -bottom-28 right-[20%] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,_rgba(44,52,52,0.13)_0%,_rgba(44,52,52,0)_70%)]" />

      <section className="relative border-b border-black/10 px-6 pt-10 pb-16 md:pt-14 md:pb-24">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="max-w-[16ch] text-5xl font-medium leading-[0.95] tracking-[-0.03em] md:text-7xl">
              Recruitment support for hiring managers responsible for delivering critical roles.
            </h1>
            <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-black/70 md:text-lg">
              You work directly with an experienced recruiter who understands industrial hiring environments and manages each search with a practical, structured process focused on role fit, reliability, and long-term success.
            </p>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            className="w-full max-w-md mx-auto lg:ml-auto"
          >
            <div className="bg-white rounded-3xl p-8 shadow-[0_28px_60px_rgba(0,0,0,0.06)] border border-black/[0.04]">
              <h2 className="text-3xl font-medium tracking-tight text-[#2C3434]">Let&apos;s talk hiring.</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-black/60">
                Skip the back-and-forth. Grab a time directly on my calendar.
              </p>

              <form className="mt-8 flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">First Name</label>
                    <input type="text" placeholder="Jane" className="w-full rounded-lg border border-black/10 bg-[#FAF9F6] px-4 py-3.5 text-sm transition-colors placeholder:text-black/30 focus:border-[#C6A64A] focus:outline-none focus:ring-1 focus:ring-[#C6A64A]" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">Last Name</label>
                    <input type="text" placeholder="Doe" className="w-full rounded-lg border border-black/10 bg-[#FAF9F6] px-4 py-3.5 text-sm transition-colors placeholder:text-black/30 focus:border-[#C6A64A] focus:outline-none focus:ring-1 focus:ring-[#C6A64A]" />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">Work Email</label>
                  <input type="email" placeholder="jane@company.com" className="w-full rounded-lg border border-black/10 bg-[#FAF9F6] px-4 py-3.5 text-sm transition-colors placeholder:text-black/30 focus:border-[#C6A64A] focus:outline-none focus:ring-1 focus:ring-[#C6A64A]" />
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">Company / Industry</label>
                  <input type="text" placeholder="e.g. Acme Logistics" className="w-full rounded-lg border border-black/10 bg-[#FAF9F6] px-4 py-3.5 text-sm transition-colors placeholder:text-black/30 focus:border-[#C6A64A] focus:outline-none focus:ring-1 focus:ring-[#C6A64A]" />
                </div>

                <button type="button" className="mt-2 flex w-full items-center justify-center gap-2 bg-[#2C3434] py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#C6A64A]">
                  See Available Times
                  <ArrowRight className="h-4 w-4" />
                </button>

                <div className="mt-4 flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#C6A64A]" />
                  <span className="text-xs text-black/50 font-medium">Direct recruiter communication</span>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#1F2628] px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20">

            {/* Left Column: Services Accordion */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.1 } },
              }}
              className="flex flex-col"
            >
              <div className="mb-10">
                <h2 className="text-4xl font-medium tracking-tight md:text-5xl text-white">Recruitment services built for real hiring pressure</h2>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#E4CF8C]">Clear. Practical. Accountable.</p>
              </div>

              <div className="flex flex-col border-t border-white/10">
                {services.map((service, index) => {
                  const isOpen = openServiceIndex === index;
                  return (
                    <motion.div
                      variants={fadeUp}
                      key={service.title}
                      className="group cursor-pointer border-b border-white/10 py-6 transition-colors hover:bg-white/[0.03] px-4 -mx-4 rounded-xl"
                      onMouseEnter={() => { if (openServiceIndex === null) setOpenServiceIndex(index); }}
                      onMouseLeave={() => { if (openServiceIndex === index) setOpenServiceIndex(null); }}
                      onClick={() => setOpenServiceIndex(isOpen ? null : index)}
                    >
                      <h3 className={`text-2xl font-medium tracking-tight transition-colors ${isOpen ? 'text-[#E4CF8C]' : 'text-white group-hover:text-[#E4CF8C]'}`}>
                        {service.title}
                      </h3>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <p className="pt-4 text-sm leading-relaxed text-white/70 md:text-base">
                              {service.body}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Column: Industries Carousel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center"
            >
              <div className="mb-8 pl-2">
                <h2 className="text-3xl font-medium tracking-tight md:text-4xl text-white">Industries we support</h2>
                <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-white/60">
                  Targeted expertise across industrial, technical, and operational sectors that need dependable hiring support.
                </p>
              </div>

              <div
                className="overflow-hidden px-2 py-4"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
                onTouchStart={() => setIsAutoPlaying(false)}
                onTouchEnd={() => setIsAutoPlaying(true)}
              >
                <div className="flex flex-col gap-4">
                  <AnimatePresence initial={false} mode="popLayout">
                    {carouselItems.slice(0, 3).map((industry) => (
                      <motion.div
                        layout
                        key={industry.label}
                        initial={{ opacity: 0, x: -40, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 100, scale: 0.9 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(e, { offset }: any) => {
                          if (offset.x < -40) slideNext();
                          if (offset.x > 40) slidePrev();
                        }}
                        className="group relative flex w-full cursor-grab items-center gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 shadow-sm transition-colors hover:bg-white/[0.08] hover:border-[#E4CF8C]/30 active:cursor-grabbing"
                      >
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#E4CF8C]/10 transition-colors group-hover:bg-[#E4CF8C]">
                          <industry.icon className="h-6 w-6 text-[#E4CF8C] transition-colors group-hover:text-[#1F2628]" />
                        </div>
                        <p className="text-base font-bold tracking-tight text-white/90">{industry.label}</p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="mt-8 flex justify-end gap-3 pr-2">
                  <button
                    onClick={slidePrev}
                    aria-label="Previous industry"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-transparent shadow-sm transition-all hover:bg-white/10 hover:border-white/30 hover:scale-105 active:scale-95 text-white/60 hover:text-white"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={slideNext}
                    aria-label="Next industry"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-transparent shadow-sm transition-all hover:bg-white/10 hover:border-white/30 hover:scale-105 active:scale-95 text-white/60 hover:text-white"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#FAF9F6] px-6 py-16 text-[#2C3434] md:py-24">
        <motion.div
          className="mx-auto max-w-[1200px]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-4xl font-medium tracking-tight md:text-5xl">How each search is managed</h2>
              <p className="mt-3 text-sm text-black/60 md:text-base">A practical process designed for speed, quality, and retention.</p>
            </div>
            <p className="hidden text-[11px] font-semibold uppercase tracking-[0.25em] text-black/40 md:block">Rigorous. Transparent. Proven.</p>
          </div>

          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step} className="group relative rounded-2xl border border-black/[0.08] bg-white p-6 shadow-sm transition-all hover:border-[#C6A64A]/30 hover:shadow-md">
                <p className="text-sm font-bold tracking-[0.2em] text-[#C6A64A]">STEP 0{index + 1}</p>
                <p className="mt-3 text-sm leading-relaxed text-black/75 md:text-base">{step}</p>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#C6A64A]/40 transition-all group-hover:w-full" />
              </li>
            ))}
          </ol>
        </motion.div>
      </section>

      <section className="overflow-hidden bg-[#FAF9F6] py-16 pb-20 text-[#2C3434] md:py-20 border-t border-black/10">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-medium tracking-tight md:text-5xl">What our partners say</h2>
            <p className="mt-4 text-base text-black/60 font-medium">Real outcomes from hiring managers under pressure.</p>
          </motion.div>
        </div>

        <div className="mt-14 w-full relative">
          {/* Subtle gradient edges to mask the scrolling items */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-[10%] bg-gradient-to-r from-[#FAF9F6] to-transparent md:w-[15%]" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-[10%] bg-gradient-to-l from-[#FAF9F6] to-transparent md:w-[15%]" />

          <div
            className="flex cursor-grab active:cursor-grabbing w-full justify-center px-4"
            onMouseEnter={() => setIsReviewAutoPlaying(false)}
            onMouseLeave={() => setIsReviewAutoPlaying(true)}
            onTouchStart={() => setIsReviewAutoPlaying(false)}
            onTouchEnd={() => setIsReviewAutoPlaying(true)}
          >
            <AnimatePresence initial={false} mode="popLayout">
              {reviewItems.slice(0, 3).map((review, index) => {
                // The center item is at index 1 in the visible slice of 3 items
                const isCenter = index === 1;

                return (
                  <motion.div
                    layout
                    key={review.text}
                    initial={{ opacity: 0, x: 100, scale: 0.8 }}
                    animate={{
                      opacity: isCenter ? 1 : 0.4,
                      x: 0,
                      scale: isCenter ? 1 : 0.85,
                    }}
                    exit={{ opacity: 0, x: -100, scale: 0.8 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(e, { offset }: any) => {
                      if (offset.x < -50) slideNextReview();
                      if (offset.x > 50) slidePrevReview();
                    }}
                    className={`relative mx-2 flex w-[85vw] max-w-[420px] shrink-0 flex-col justify-between rounded-3xl border border-black/10 bg-white p-7 shadow-[0_22px_40px_rgba(0,0,0,0.04)] md:mx-4 md:w-[500px] md:p-8 transition-shadow ${isCenter ? 'z-20 shadow-xl' : 'z-0'}`}
                  >
                    <div>
                      <Quote className={`mb-5 h-7 w-7 transition-colors ${isCenter ? 'text-[#C6A64A]' : 'text-black/15'}`} />
                      <p className={`text-base leading-relaxed md:text-lg md:leading-[1.6] transition-colors ${isCenter ? 'text-black/80' : 'text-black/40'}`}>
                        &quot;{review.text}&quot;
                      </p>
                    </div>

                    <div className="mt-8 border-t border-black/5 pt-5">
                      <p className={`font-semibold tracking-tight transition-colors ${isCenter ? 'text-black' : 'text-black/50'}`}>
                        {review.author}
                      </p>
                      <p className={`mt-1 text-sm font-medium transition-colors ${isCenter ? 'text-[#C6A64A]' : 'text-black/30'}`}>
                        {review.company}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="mt-12 flex justify-center gap-4">
            <button
              onClick={slidePrevReview}
              aria-label="Previous review"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm transition-all hover:bg-[#F4F2ED] hover:scale-105 active:scale-95 text-black/60 hover:text-black"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={slideNextReview}
              aria-label="Next review"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm transition-all hover:bg-[#F4F2ED] hover:scale-105 active:scale-95 text-black/60 hover:text-black"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
