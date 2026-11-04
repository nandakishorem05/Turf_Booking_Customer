"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
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
import { MockTurf } from "@/lib/mock-data";
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

interface TurfDetailViewProps {
  turf: MockTurf;
}

export function TurfDetailView({ turf }: TurfDetailViewProps) {
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
    <div className="min-h-screen bg-[#F6F8F6] pb-24 lg:pb-12 w-full max-w-full overflow-x-hidden">
      {/* ── Top Bar ── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-3.5 py-2.5 sm:px-6 sm:py-3.5">
          <Link
            href="/"
            className="flex items-center gap-1 font-bold text-slate-800 hover:text-[#00D066] transition text-xs sm:text-sm"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </Link>

          <span className="font-extrabold text-xs sm:text-base text-slate-900 truncate max-w-[170px] sm:max-w-none text-center">
            {turf.name}
          </span>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handleShare}
              aria-label="Share turf"
              className="p-1.5 sm:p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
            >
              <Share2 size={15} />
            </button>
            <button
              onClick={() => setIsFav(!isFav)}
              aria-label="Add to favorites"
              className="p-1.5 sm:p-2 rounded-full bg-slate-100 text-slate-700 hover:text-red-500 hover:bg-slate-200 transition"
            >
              <Heart
                size={15}
                className={isFav ? "fill-red-500 text-red-500" : ""}
              />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-3.5 sm:px-6 pt-3.5 sm:pt-5">
        <div className="grid gap-5 lg:gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Left Column: Details, Photos, Slots, Amenities */}
          <div className="space-y-4 sm:space-y-6">
            {/* Hero Turf Image */}
            <div className="relative h-56 sm:h-80 md:h-96 w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-900 shadow-card">
              <Image
                src={turf.turf_images[0]?.public_url || "/images/turfs/greenleaf.jpg"}
                alt={turf.name}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Badges on image */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="flex items-center gap-1 rounded-full bg-white/95 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-bold text-slate-900 shadow-md">
                  <MapPin size={11} className="text-[#00D066]" />
                  {turf.distance} away
                </span>
              </div>

              <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/70 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-bold text-white shadow-md">
                <Star size={12} className="text-amber-400 fill-amber-400" />
                <span>{turf.rating.toFixed(1)}</span>
                <span className="text-white/60">({turf.review_count})</span>
              </div>
            </div>

            {/* Title & Location Header */}
            <div className="rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-6 shadow-sm border border-slate-100">
              <div className="flex flex-wrap items-center gap-1.5 mb-2">
                {turf.turf_sports.map((s) => (
                  <span
                    key={s.sports.name}
                    className="inline-flex items-center gap-1 rounded-full bg-[#00D066]/15 px-2.5 py-0.5 text-[11px] font-bold text-[#042618]"
                  >
                    <span>{FACILITY_ICONS[s.sports.name] || "🏟️"}</span>
                    <span>{s.sports.name}</span>
                  </span>
                ))}
              </div>

              <h1 className="text-xl sm:text-3xl font-black text-slate-900 leading-tight">
                {turf.name}
              </h1>

              <p className="mt-1 flex items-center gap-1 text-xs sm:text-sm text-slate-500">
                <MapPin size={13} className="text-[#00D066] shrink-0" />
                <span>{turf.address}</span>
              </p>

              {/* Price Callout */}
              <div className="mt-3 flex items-baseline gap-2 pt-3 border-t border-slate-100">
                <span className="text-xl sm:text-3xl font-black text-[#042618]">
                  {formatINR(turf.hourly_price)}
                </span>
                <span className="text-xs sm:text-sm text-slate-500 font-semibold">
                  / hour
                </span>
              </div>
            </div>

            {/* Facilities & Amenities */}
            <div className="rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-6 shadow-sm border border-slate-100">
              <h2 className="text-sm sm:text-base font-black text-slate-900 mb-2.5">
                Facilities & Amenities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {turf.turf_facilities.map((f) => (
                  <div
                    key={f.facilities.name}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <span className="text-base sm:text-lg shrink-0">
                      {FACILITY_ICONS[f.facilities.name] || "✨"}
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-slate-800 truncate">
                      {f.facilities.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* About this Turf */}
            <div className="rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-6 shadow-sm border border-slate-100">
              <h2 className="text-sm sm:text-base font-black text-slate-900 mb-1.5">
                About this Turf
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {turf.description}
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-xl p-2.5">
                <Sparkles size={15} className="shrink-0" />
                <span>Free cancellation up to {turf.cancellation_hours} hrs prior to slot.</span>
              </div>
            </div>

            {/* ── Screen 3: Available Slots Section ── */}
            <div className="rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-6 shadow-sm border border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-1.5">
                  <Calendar size={16} className="text-[#00D066]" /> Available Slots
                </h2>
                <span className="text-[11px] font-bold text-slate-400">
                  {timeSlots.length} slots
                </span>
              </div>

              {/* Horizontal Date Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                {dates.map((d, index) => {
                  const isSelected = selectedDateIndex === index;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedDateIndex(index)}
                      className={`flex flex-col items-center justify-center min-w-[70px] py-2 px-2.5 rounded-xl transition font-bold text-xs shrink-0 ${
                        isSelected
                          ? "bg-[#00D066] text-slate-950 shadow-glow"
                          : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60"
                      }`}
                    >
                      <span className="text-[10px] opacity-80">{d.dayName}</span>
                      <span className="text-xs font-black">{d.dateStr}</span>
                    </button>
                  );
                })}
              </div>

              {/* Time Slots Grid */}
              <div className="pt-1">
                <p className="text-[11px] font-bold text-slate-500 mb-2 flex items-center gap-1">
                  <Clock size={12} /> Select Slot for {selectedDateObject.fullDate}:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 px-1.5 rounded-xl text-[11px] sm:text-xs font-bold text-center transition ${
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
            <div className="rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm sm:text-base font-black text-slate-900">
                  Reviews & Ratings
                </h2>
                <div className="flex items-center gap-1 font-black text-xs sm:text-sm text-slate-900">
                  <Star size={13} className="text-amber-400 fill-amber-400" />
                  <span>{turf.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">
                    ({turf.review_count})
                  </span>
                </div>
              </div>

              <div className="space-y-2.5">
                {turf.reviews.map((r, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900">
                        {r.profiles?.full_name || "Verified Player"}
                      </span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: r.rating }).map((_, j) => (
                          <Star
                            key={j}
                            size={11}
                            className="text-amber-400 fill-amber-400"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                      {r.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Desktop Booking Checkout Panel & Mobile Drawer */}
          <div>
            <BookingPanel
              turf={turf}
              selectedDate={selectedDateObject.fullDate}
              selectedSlot={selectedSlot}
              onSlotChange={setSelectedSlot}
              isOpenMobile={isMobileCheckoutOpen}
              onCloseMobile={() => setIsMobileCheckoutOpen(false)}
            />
          </div>
        </div>
      </main>

      {/* ── Mobile Sticky Bottom Bar (Matching Screen 3) ── */}
      {!isMobileCheckoutOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-4 py-2.5 lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
            <div>
              <p className="text-[9px] uppercase font-bold text-slate-400">Total Price</p>
              <p className="text-base font-black text-[#042618]">
                {formatINR(turf.hourly_price)}
                <span className="text-[11px] font-normal text-slate-500"> / hr</span>
              </p>
            </div>

            <button
              onClick={() => setIsMobileCheckoutOpen(true)}
              className="flex-1 rounded-2xl bg-[#00D066] py-2.5 px-5 font-black text-slate-950 text-xs sm:text-sm shadow-glow hover:bg-[#02b85a] transition text-center"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
