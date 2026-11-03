"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, CalendarDays, CheckCircle, Clock, XCircle, ArrowRight } from "lucide-react";
import { MOCK_CUSTOMER_BOOKINGS } from "@/lib/mock-data";
import { formatINR } from "@/lib/utils";

type BookingTab = "upcoming" | "past" | "cancelled";

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<BookingTab>("upcoming");
  const [bookingsList, setBookingsList] = useState(MOCK_CUSTOMER_BOOKINGS);

  const filteredBookings = bookingsList.filter((b) => {
    if (activeTab === "upcoming") {
      return b.status === "confirmed" || b.status === "upcoming";
    }
    if (activeTab === "past") {
      return b.status === "completed";
    }
    if (activeTab === "cancelled") {
      return b.status === "cancelled";
    }
    return true;
  });

  const handleCancel = (id: string) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      setBookingsList((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b))
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8F6] pb-20">
      {/* ── Top Header ── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3.5">
          <Link
            href="/"
            className="flex items-center gap-1.5 font-bold text-slate-800 hover:text-[#00D066] transition text-sm"
          >
            <ArrowLeft size={18} />
            <span>Home</span>
          </Link>
          <h1 className="text-base font-black text-slate-900">My Bookings</h1>
          <div className="w-8" />
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 pt-5 space-y-4">
        {/* ── Tab Switcher Pills (Matching Screen 5) ── */}
        <div className="grid grid-cols-3 gap-2 bg-slate-200/60 p-1.5 rounded-2xl">
          <button
            type="button"
            onClick={() => setActiveTab("upcoming")}
            className={`py-2 text-xs sm:text-sm font-bold rounded-xl transition ${
              activeTab === "upcoming"
                ? "bg-[#00D066] text-slate-950 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Upcoming
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("past")}
            className={`py-2 text-xs sm:text-sm font-bold rounded-xl transition ${
              activeTab === "past"
                ? "bg-[#00D066] text-slate-950 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Past
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("cancelled")}
            className={`py-2 text-xs sm:text-sm font-bold rounded-xl transition ${
              activeTab === "cancelled"
                ? "bg-[#00D066] text-slate-950 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Cancelled
          </button>
        </div>

        {/* ── Bookings List ── */}
        {filteredBookings.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center mt-6">
            <p className="text-sm font-bold text-slate-700">No {activeTab} bookings</p>
            <p className="mt-1 text-xs text-slate-400">
              Explore nearby turfs and reserve a slot in seconds.
            </p>
            <Link
              href="/turfs"
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#00D066] px-5 py-2 text-xs font-bold text-slate-950 shadow-sm"
            >
              Explore Turfs <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredBookings.map((b) => {
              const turfImage = b.turfs?.image || "/images/turfs/greenleaf.jpg";

              return (
                <div
                  key={b.id}
                  className="overflow-hidden rounded-3xl bg-white p-4 shadow-sm border border-slate-100 transition hover:shadow-md"
                >
                  <div className="flex gap-3.5">
                    {/* Turf Image Thumbnail */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                      <Image
                        src={turfImage}
                        alt={b.turfs?.name || "Turf"}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Booking Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h2 className="font-extrabold text-sm sm:text-base text-slate-900 truncate">
                            {b.turfs?.name}
                          </h2>

                          {/* Status Pill matching Screen 5 */}
                          {b.status === "confirmed" && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                              <CheckCircle size={11} /> Confirmed
                            </span>
                          )}
                          {b.status === "upcoming" && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-bold text-blue-800">
                              <Clock size={11} /> Upcoming
                            </span>
                          )}
                          {b.status === "completed" && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-700">
                              Completed
                            </span>
                          )}
                          {b.status === "cancelled" && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2.5 py-0.5 text-[11px] font-bold text-orange-800">
                              <XCircle size={11} /> Cancelled
                            </span>
                          )}
                        </div>

                        <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                          <MapPin size={12} className="text-slate-400 shrink-0" />
                          <span className="truncate">{b.turfs?.city}</span>
                        </p>

                        <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-slate-700">
                          <CalendarDays size={12} className="text-[#00D066] shrink-0" />
                          <span>{b.date_display || b.starts_at.slice(0, 10)}</span>
                          <span className="text-slate-400">•</span>
                          <span>{b.time_display || "Evening Slot"}</span>
                        </p>
                      </div>

                      {/* Footer: Price & Actions */}
                      <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2 text-xs">
                        <span className="font-black text-[#042618]">
                          {formatINR(Number(b.amount))}
                        </span>

                        <div className="flex items-center gap-2">
                          {(b.status === "confirmed" || b.status === "upcoming") && (
                            <button
                              onClick={() => handleCancel(b.id)}
                              className="text-red-500 hover:text-red-700 font-bold hover:underline"
                            >
                              Cancel Slot
                            </button>
                          )}
                          {b.status === "completed" && (
                            <span className="text-slate-400 font-semibold">
                              Receipt Available
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
