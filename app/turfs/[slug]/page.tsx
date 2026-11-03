"use client";

import { use, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  MapPin,
  Star,
  Share2,
  Heart,
  ArrowLeft,
  Calendar,
  Clock,
  Sparkles,
} from "lucide-react";
import { MOCK_TURFS } from "@/lib/mock-data";
import { BookingPanel } from "@/components/booking-panel";
import { formatINR } from "@/lib/utils";

const FACILITY_ICONS: Record<string, string> = {
  Football: "⚽",
  Cricket: "🏏",
  Badminton: "🏸",
  Tennis: "🎾",
  Floodlights: "💡",
  Parking: "🅿️",
  Cafeteria: "☕",
  "Locker rooms": "🚿",
  "Drinking water": "💧",
  "Air conditioning": "❄️",
  "Skyline view": "🏙️",
  "Equipment rental": "🎒",
  "Dugout seating": "🪑",
  "First aid": "🩹",
};

export default function TurfDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const turf = MOCK_TURFS.find((t) => t.slug === slug);

  if (!turf) {
    notFound();
  }

  // Generate 7 upcoming dates starting today
  const dates = useMemo(() => {
    const list = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const isToday = i === 0;
      const dayName = isToday ? "Today" : d.toLocaleDateString("en-IN", { weekday: "short" });
      const dateStr = d.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
      const fullDate = d.toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
      list.push({ dayName, dateStr, fullDate, isToday });
    }
    return list;
  }, []);

  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState("7:00 PM – 8:00 PM");
  const [isFav, setIsFav] = useState(false);
  const [isMobileCheckoutOpen, setIsMobileCheckoutOpen] = useState(false);

  const timeSlots = [
    "6:00 AM – 7:00 AM",
    "7:00 AM – 8:00 AM",
    "8:00 AM – 9:00 AM",
    "4:00 PM – 5:00 PM",
    "5:00 PM – 6:00 PM",
    "6:00 PM – 7:00 PM",
    "7:00 PM – 8:00 PM",
    "8:00 PM – 9:00 PM",
    "9:00 PM – 10:00 PM",
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: turf.name,
        text: `Book slots at ${turf.name} on TurfBook!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const selectedDateObject = dates[selectedDateIndex];

  return (
    <div className="min-h-screen bg-[#F6F8F6] pb-24 lg:pb-12">
      {/* ── Top Bar ── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-1.5 font-bold text-slate-800 hover:text-[#00D066] transition text-sm"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </Link>

          <span className="font-extrabold text-sm sm:text-base text-slate-900 truncate max-w-[200px] sm:max-w-none">
            {turf.name}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              aria-label="Share turf"
              className="p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
            >
              <Share2 size={16} />
            </button>
            <button
              onClick={() => setIsFav(!isFav)}
              aria-label="Add to favorites"
              className="p-2 rounded-full bg-slate-100 text-slate-700 hover:text-red-500 hover:bg-slate-200 transition"
            >
              <Heart
                size={16}
                className={isFav ? "fill-red-500 text-red-500" : ""}
              />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-5">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Left Column: Details, Photos, Slots, Amenities */}
          <div className="space-y-6">
            {/* Hero Turf Image */}
            <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden rounded-3xl bg-slate-900 shadow-card">
              <Image
                src={turf.turf_images[0]?.public_url || "/images/turfs/greenleaf.jpg"}
                alt={turf.name}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Badges on image */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="flex items-center gap-1 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-xs font-bold text-slate-900 shadow-md">
                  <MapPin size={12} className="text-[#00D066]" />
                  {turf.distance} away
                </span>
              </div>

              <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-black/70 backdrop-blur-md px-3 py-1 text-xs font-bold text-white shadow-md">
                <Star size={13} className="text-amber-400 fill-amber-400" />
                <span>{turf.rating.toFixed(1)}</span>
                <span className="text-white/60">({turf.review_count})</span>
              </div>
            </div>

            {/* Title & Location Header */}
            <div className="rounded-3xl bg-white p-5 sm:p-6 shadow-sm border border-slate-100">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {turf.turf_sports.map((s) => (
                  <span
                    key={s.sports.name}
                    className="inline-flex items-center gap-1 rounded-full bg-[#00D066]/15 px-3 py-1 text-xs font-bold text-[#042618]"
                  >
                    <span>{FACILITY_ICONS[s.sports.name] || "🏟️"}</span>
                    <span>{s.sports.name}</span>
                  </span>
                ))}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                {turf.name}
              </h1>

              <p className="mt-1 flex items-center gap-1.5 text-xs sm:text-sm text-slate-500">
                <MapPin size={14} className="text-[#00D066] shrink-0" />
                <span>{turf.address}</span>
              </p>

              {/* Price Callout */}
              <div className="mt-4 flex items-baseline gap-2 pt-4 border-t border-slate-100">
                <span className="text-2xl sm:text-3xl font-black text-[#042618]">
                  {formatINR(turf.hourly_price)}
                </span>
                <span className="text-xs sm:text-sm text-slate-500 font-semibold">
                  / hour
                </span>
              </div>
            </div>

            {/* Facilities & Amenities */}
            <div className="rounded-3xl bg-white p-5 sm:p-6 shadow-sm border border-slate-100">
              <h2 className="text-base sm:text-lg font-black text-slate-900 mb-3">
                Facilities & Amenities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {turf.turf_facilities.map((f) => (
                  <div
                    key={f.facilities.name}
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100/80"
                  >
                    <span className="text-xl">
                      {FACILITY_ICONS[f.facilities.name] || "✨"}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">
                      {f.facilities.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* About this Turf */}
            <div className="rounded-3xl bg-white p-5 sm:p-6 shadow-sm border border-slate-100">
              <h2 className="text-base sm:text-lg font-black text-slate-900 mb-2">
                About this Turf
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {turf.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-xl p-3">
                <Sparkles size={16} className="shrink-0" />
                <span>Free cancellation up to {turf.cancellation_hours} hours prior to slot time.</span>
              </div>
            </div>

            {/* ── Screen 3: Available Slots Section ── */}
            <div className="rounded-3xl bg-white p-5 sm:p-6 shadow-sm border border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                  <Calendar size={18} className="text-[#00D066]" /> Available Slots
                </h2>
                <span className="text-xs font-bold text-slate-400">
                  {timeSlots.length} slots
                </span>
              </div>

              {/* Horizontal Date Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {dates.map((d, index) => {
                  const isSelected = selectedDateIndex === index;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedDateIndex(index)}
                      className={`flex flex-col items-center justify-center min-w-[76px] py-2.5 px-3 rounded-2xl transition font-bold text-xs shrink-0 ${
                        isSelected
                          ? "bg-[#00D066] text-slate-950 shadow-glow"
                          : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60"
                      }`}
                    >
                      <span className="text-[11px] opacity-80">{d.dayName}</span>
                      <span className="text-xs font-black">{d.dateStr}</span>
                    </button>
                  );
                })}
              </div>

              {/* Time Slots Grid */}
              <div className="pt-2">
                <p className="text-xs font-bold text-slate-500 mb-2.5 flex items-center gap-1.5">
                  <Clock size={13} /> Select Time Slot for {selectedDateObject.fullDate}:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold text-center transition ${
                          isSelected
                            ? "bg-[#042618] text-white ring-2 ring-[#00D066] shadow-sm"
                            : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Customer Reviews */}
            <div className="rounded-3xl bg-white p-5 sm:p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  Reviews & Ratings
                </h2>
                <div className="flex items-center gap-1 font-black text-sm text-slate-900">
                  <Star size={15} className="text-amber-400 fill-amber-400" />
                  <span>{turf.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">
                    ({turf.review_count} reviews)
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {turf.reviews.map((r, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs sm:text-sm text-slate-900">
                        {r.profiles?.full_name || "Verified Player"}
                      </span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: r.rating }).map((_, j) => (
                          <Star
                            key={j}
                            size={12}
                            className="text-amber-400 fill-amber-400"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {r.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Desktop Booking Checkout Panel */}
          <div>
            <BookingPanel
              turf={turf}
              selectedDate={selectedDateObject.fullDate}
              selectedSlot={selectedSlot}
              onSlotChange={setSelectedSlot}
            />
          </div>
        </div>
      </main>

      {/* ── Mobile Sticky Bottom Bar (Matching Screen 3) ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-4 py-3 lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Total Price</p>
            <p className="text-lg font-black text-[#042618]">
              {formatINR(turf.hourly_price)}
              <span className="text-xs font-normal text-slate-500"> / hr</span>
            </p>
          </div>

          <button
            onClick={() => setIsMobileCheckoutOpen(true)}
            className="flex-1 rounded-2xl bg-[#00D066] py-3 px-6 font-black text-slate-950 text-sm shadow-glow hover:bg-[#02b85a] transition text-center"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Mobile Checkout Modal Drawer */}
      <BookingPanel
        turf={turf}
        selectedDate={selectedDateObject.fullDate}
        selectedSlot={selectedSlot}
        isOpenMobile={isMobileCheckoutOpen}
        onCloseMobile={() => setIsMobileCheckoutOpen(false)}
      />
    </div>
  );
}
