"use client";
import Link from "next/link";
import { MOCK_CUSTOMER_BOOKINGS } from "@/lib/mock-data";
import { formatINR } from "@/lib/utils";
import { CalendarDays, MapPin, CheckCircle, Clock, XCircle } from "lucide-react";

const STATUS_STYLES: Record<string, { cls: string; icon: React.ReactNode; label: string }> = {
  confirmed: { cls: "bg-green-100 text-green-700", icon: <CheckCircle size={13} />, label: "Confirmed" },
  completed: { cls: "bg-slate-100 text-slate-600", icon: <CheckCircle size={13} />, label: "Completed" },
  payment_pending: { cls: "bg-amber-100 text-amber-700", icon: <Clock size={13} />, label: "Pending payment" },
  cancelled: { cls: "bg-red-100 text-red-600", icon: <XCircle size={13} />, label: "Cancelled" },
  expired: { cls: "bg-red-100 text-red-600", icon: <XCircle size={13} />, label: "Expired" },
};

export default function Bookings() {
  const items = MOCK_CUSTOMER_BOOKINGS;

  return (
    <main className="min-h-screen bg-[#f8f9f5]">
      <div className="bg-amber-400 px-5 py-2 text-center text-sm font-bold text-amber-900">
        🎮 DEMO MODE — Showing mock bookings for &quot;Demo Player&quot;
      </div>
      <div className="mx-auto max-w-3xl p-5">
        <Link href="/" className="font-black text-pitch">
          ← TURFBOOK
        </Link>
        <div className="mt-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black">My bookings</h1>
            <p className="mt-1 text-slate-500">Signed in as demo@turfbook.com</p>
          </div>
          <Link
            href="/turfs"
            className="rounded-xl bg-pitch px-4 py-2.5 text-sm font-bold text-white"
          >
            Book a turf
          </Link>
        </div>

        <div className="mt-6 space-y-3">
          {items.map((b) => {
            const s = STATUS_STYLES[b.status] ?? STATUS_STYLES.confirmed;
            const start = new Date(b.starts_at);
            const end = new Date(b.ends_at);
            return (
              <article key={b.id} className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="font-extrabold text-lg">{b.turfs?.name}</h2>
                    <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                      <MapPin size={13} /> {b.turfs?.city}
                    </p>
                    <p className="mt-2 flex items-center gap-1 text-sm text-slate-600">
                      <CalendarDays size={13} />
                      {start.toLocaleDateString("en-IN", {
                        weekday: "short", day: "numeric", month: "short", year: "numeric",
                      })}
                      {" · "}
                      {start.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                      {" → "}
                      {end.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <span className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${s.cls}`}>
                    {s.icon} {s.label}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t pt-4">
                  <p className="font-bold text-pitch text-lg">{formatINR(Number(b.amount))}</p>
                  {b.status === "confirmed" && (
                    <button className="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-bold text-red-500 hover:bg-red-50">
                      Cancel booking
                    </button>
                  )}
                  {b.status === "completed" && (
                    <button className="rounded-lg border border-amber-300 px-3 py-1.5 text-xs font-bold text-amber-600 hover:bg-amber-50">
                      Leave a review
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
