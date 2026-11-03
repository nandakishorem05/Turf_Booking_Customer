"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Search,
  Star,
  ArrowRight,
  Bell,
  Heart,
  ChevronDown,
  Sparkles,
  Zap,
  ShieldCheck,
  Trophy,
  Smartphone,
  Calendar,
  Lock,
} from "lucide-react";
import { MOCK_TURFS, MockTurf } from "@/lib/mock-data";
import { TurfBookLogo } from "@/components/turfbook-logo";
import { formatINR } from "@/lib/utils";

const CITIES = ["Kochi", "Mumbai", "Bangalore", "Hyderabad", "Pune"];

const SPORTS_CATEGORIES = [
  { id: "all", name: "All Sports", icon: "🏟️" },
  { id: "Football", name: "Football", icon: "⚽" },
  { id: "Cricket", name: "Cricket", icon: "🏏" },
  { id: "Badminton", name: "Badminton", icon: "🏸" },
  { id: "Basketball", name: "Basketball", icon: "🏀" },
  { id: "Tennis", name: "Tennis", icon: "🎾" },
];

export default function HomePage() {
  const [selectedCity, setSelectedCity] = useState("Kochi");
  const [selectedSport, setSelectedSport] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    "turf-001": true,
  });

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredTurfs = useMemo(() => {
    return MOCK_TURFS.filter((turf) => {
      // Filter by City
      const matchesCity =
        selectedCity === "All" ||
        turf.city.toLowerCase().includes(selectedCity.toLowerCase()) ||
        turf.address.toLowerCase().includes(selectedCity.toLowerCase());

      // Filter by Sport
      const matchesSport =
        selectedSport === "all" ||
        turf.turf_sports.some(
          (s) => s.sports.name.toLowerCase() === selectedSport.toLowerCase()
        );

      // Filter by Search Query
      const matchesSearch =
        !searchQuery.trim() ||
        turf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        turf.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        turf.city.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCity && matchesSport && matchesSearch;
    });
  }, [selectedCity, selectedSport, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F6F8F6]">
      {/* ── Top Header ── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <TurfBookLogo size="sm" showTagline={false} />
            </Link>

            {/* Location selector dropdown */}
            <div className="relative">
              <label htmlFor="city-select" className="sr-only">Select City</label>
              <div className="flex items-center gap-1.5 rounded-full bg-slate-100/80 px-3 py-1.5 text-xs sm:text-sm font-bold text-slate-800 hover:bg-slate-200/80 transition cursor-pointer">
                <MapPin size={14} className="text-[#00D066]" />
                <select
                  id="city-select"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-transparent border-none outline-none font-bold cursor-pointer text-xs sm:text-sm pr-1"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                  <option value="All">All Cities</option>
                </select>
                <ChevronDown size={13} className="text-slate-400" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications Bell */}
            <button
              aria-label="Notifications"
              className="relative p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#00D066] ring-2 ring-white animate-pulse" />
            </button>

            {/* Navigation links */}
            <nav className="hidden sm:flex items-center gap-4 text-sm font-semibold">
              <Link
                href="/bookings"
                className="text-slate-700 hover:text-[#00D066] transition"
              >
                My Bookings
              </Link>
              <Link
                href="/login"
                className="rounded-full bg-[#042618] px-5 py-2 text-white font-bold text-xs sm:text-sm hover:bg-[#0A3F26] transition shadow-sm"
              >
                Sign In
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-5 pb-16 space-y-6">
        {/* ── Screen 2: Hero Carousel Banner ── */}
        <section className="relative overflow-hidden rounded-3xl shadow-card">
          <div className="relative h-56 sm:h-72 md:h-80 w-full overflow-hidden">
            <Image
              src="/images/turfs/hero_stadium.jpg"
              alt="Night Football Turf Arena with stadium floodlights"
              fill
              priority
              className="object-cover object-center scale-105 hover:scale-100 transition-transform duration-700"
            />
            {/* Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#042618]/95 via-[#042618]/75 to-transparent" />

            {/* Banner Content */}
            <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 max-w-lg">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#00D066]/20 border border-[#00D066]/40 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#C9F363] mb-3 w-fit backdrop-blur-sm">
                <Sparkles size={12} />
                Special Offer • Up to 20% Off
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                Play More. <br />
                <span className="text-[#00D066]">Pay Less.</span>
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-white/80 line-clamp-2">
                Discover world-class floodlit football pitches, box cricket nets & badminton courts.
              </p>
              <div className="mt-4">
                <Link
                  href="/turfs"
                  className="inline-flex items-center gap-2 rounded-full bg-[#00D066] px-6 py-2.5 font-bold text-slate-950 text-sm shadow-glow hover:bg-[#02b85a] transition hover:translate-x-1"
                >
                  Book Now <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Search Bar ── */}
        <div className="relative">
          <div className="relative flex items-center rounded-2xl bg-white px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-slate-100 focus-within:border-[#00D066] focus-within:ring-2 focus-within:ring-[#00D066]/20 transition">
            <Search size={20} className="text-slate-400 shrink-0 mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search turfs near you by name, area or sport..."
              className="w-full bg-transparent text-sm sm:text-base outline-none text-slate-900 placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs font-bold text-slate-400 hover:text-slate-700 px-2 py-1"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* ── Sports Categories (Horizontal Scrollable Pills) ── */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              Categories
            </h2>
            <span className="text-xs font-bold text-[#00D066]">
              {selectedSport === "all" ? "All Sports" : selectedSport}
            </span>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            {SPORTS_CATEGORIES.map((sport) => {
              const isSelected = selectedSport === sport.id;
              return (
                <button
                  key={sport.id}
                  onClick={() => setSelectedSport(sport.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all shadow-sm ${
                    isSelected
                      ? "bg-[#042618] text-white shadow-md scale-105 ring-2 ring-[#00D066]"
                      : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-100"
                  }`}
                >
                  <span className="text-lg">{sport.icon}</span>
                  <span>{sport.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Popular Turfs Section ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Popular Turfs
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Verified arenas with live slot availability in {selectedCity}
              </p>
            </div>
            <Link
              href="/turfs"
              className="flex items-center gap-1 text-xs sm:text-sm font-bold text-[#00D066] hover:text-[#02b85a] transition"
            >
              See All <ArrowRight size={14} />
            </Link>
          </div>

          {filteredTurfs.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
              <p className="text-base font-bold text-slate-700">No turfs found</p>
              <p className="mt-1 text-xs text-slate-400">
                Try selecting &quot;All Cities&quot; or clearing your sport filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCity("All");
                  setSelectedSport("all");
                  setSearchQuery("");
                }}
                className="mt-4 rounded-full bg-[#00D066] px-5 py-2 text-xs font-bold text-slate-950"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTurfs.map((turf) => {
                const isFav = !!favorites[turf.id];
                const mainImage =
                  turf.turf_images[0]?.public_url || "/images/turfs/greenleaf.jpg";

                return (
                  <Link
                    key={turf.id}
                    href={`/turfs/${turf.slug}`}
                    className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-slate-100"
                  >
                    {/* Turf Image Thumbnail */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                      <Image
                        src={mainImage}
                        alt={turf.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                      {/* Rating Badge Overlay (Top Right) */}
                      <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                        <Star size={13} className="text-amber-400 fill-amber-400" />
                        <span>{turf.rating.toFixed(1)}</span>
                      </div>

                      {/* Distance Badge (Top Left) */}
                      <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-slate-800 shadow-sm">
                        <MapPin size={12} className="text-[#00D066]" />
                        <span>{turf.distance}</span>
                      </div>

                      {/* Favorite Button (Bottom Right) */}
                      <button
                        onClick={(e) => toggleFavorite(turf.id, e)}
                        aria-label="Add to favorites"
                        className="absolute bottom-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-red-500 hover:bg-white transition shadow-sm"
                      >
                        <Heart
                          size={16}
                          className={isFav ? "fill-red-500 text-red-500" : ""}
                        />
                      </button>
                    </div>

                    {/* Card Content */}
                    <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-[#00D066] transition">
                            {turf.name}
                          </h3>
                        </div>

                        <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                          <MapPin size={13} className="shrink-0 text-slate-400" />
                          <span className="truncate">{turf.address}</span>
                        </p>

                        {/* Facility tags */}
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {turf.turf_facilities.slice(0, 3).map((f) => (
                            <span
                              key={f.facilities.name}
                              className="rounded-lg bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600"
                            >
                              {f.facilities.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Price & CTA */}
                      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                        <div>
                          <p className="text-[10px] uppercase font-bold text-slate-400">
                            Starting at
                          </p>
                          <p className="text-base sm:text-lg font-black text-[#042618]">
                            {formatINR(turf.hourly_price)}
                            <span className="text-xs font-normal text-slate-400">
                              /hr
                            </span>
                          </p>
                        </div>

                        <span className="rounded-xl bg-[#00D066]/10 px-3.5 py-1.5 text-xs font-bold text-[#042618] group-hover:bg-[#00D066] group-hover:text-slate-950 transition">
                          Book Now
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* ── Showcase Trust & Value Props Strip (Matching Showcase Poster) ── */}
        <section className="rounded-3xl bg-[#042618] p-6 sm:p-8 text-white shadow-xl">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Book Your Favourite Turf <br />
              <span className="text-[#00D066]">Anytime, Anywhere!</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300">
              India&apos;s fastest sports turf discovery and reservation platform.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="p-2.5 rounded-full bg-[#00D066]/20 text-[#00D066] mb-2">
                <Search size={22} />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-white">Discover Nearby</h3>
              <p className="text-[11px] text-slate-300 mt-0.5">Top-rated local pitches</p>
            </div>

            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="p-2.5 rounded-full bg-[#00D066]/20 text-[#00D066] mb-2">
                <Calendar size={22} />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-white">Live Availability</h3>
              <p className="text-[11px] text-slate-300 mt-0.5">Instant real-time slots</p>
            </div>

            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="p-2.5 rounded-full bg-[#00D066]/20 text-[#00D066] mb-2">
                <Lock size={22} />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-white">Secure Payments</h3>
              <p className="text-[11px] text-slate-300 mt-0.5">UPI, Cards & Razorpay</p>
            </div>

            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="p-2.5 rounded-full bg-[#00D066]/20 text-[#00D066] mb-2">
                <Bell size={22} />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-white">Instant Updates</h3>
              <p className="text-[11px] text-slate-300 mt-0.5">SMS & email confirmation</p>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-around gap-3 text-xs font-semibold text-slate-300">
            <span className="inline-flex items-center gap-1.5">
              <Zap size={14} className="text-[#C9F363]" /> Instant Booking
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[#00D066]" /> 100% Secure
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Trophy size={14} className="text-amber-400" /> Top Rated Turfs
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Smartphone size={14} className="text-[#00D066]" /> Play on Web & App
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}
