import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone, Star, Clock } from "lucide-react";
import { MOCK_TURFS } from "@/lib/mock-data";
import { BookingPanel } from "@/components/booking-panel";
import { formatINR } from "@/lib/utils";

const sportEmoji: Record<string, string> = {
  Football: "⚽", Cricket: "🏏", Badminton: "🏸", Tennis: "🎾", Basketball: "🏀",
};

export async function generateStaticParams() {
  return MOCK_TURFS.map((t) => ({ slug: t.slug }));
}

export default async function TurfPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const turf = MOCK_TURFS.find((t) => t.slug === slug && t.status === "approved");
  if (!turf) notFound();

  const avgRating =
    turf.reviews.length > 0
      ? (turf.reviews.reduce((s, r) => s + r.rating, 0) / turf.reviews.length).toFixed(1)
      : turf.rating.toFixed(1);

  return (
    <main className="min-h-screen bg-[#f8f9f5]">
      <div className="bg-amber-400 px-5 py-2 text-center text-sm font-bold text-amber-900">
        🎮 DEMO MODE — Payment will be simulated
      </div>
      <div className="mx-auto max-w-6xl p-5">
        <Link href="/turfs" className="font-bold text-pitch">
          ← All turfs
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.5fr_.8fr]">
          {/* Left column */}
          <div>
            {/* Hero image */}
            <div className="flex h-80 items-center justify-center rounded-3xl bg-gradient-to-br from-[#699e58] to-pitch text-8xl shadow-soft">
              {sportEmoji[turf.turf_sports[0]?.sports.name] ?? "🏟️"}
            </div>

            <p className="mt-6 font-bold text-pitch">{turf.city.toUpperCase()}</p>
            <h1 className="text-4xl font-black">{turf.name}</h1>
            <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
              <MapPin size={14} /> {turf.address}
            </p>
            {turf.phone && (
              <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                <Phone size={14} /> {turf.phone}
              </p>
            )}
            <p className="mt-4 leading-relaxed text-slate-600">{turf.description}</p>

            {/* Sports */}
            <div className="mt-6 flex flex-wrap gap-2">
              {turf.turf_sports.map((x) => (
                <span
                  key={x.sports.name}
                  className="rounded-full bg-lime px-4 py-2 text-sm font-bold"
                >
                  {sportEmoji[x.sports.name]} {x.sports.name}
                </span>
              ))}
            </div>

            {/* Facilities */}
            {turf.turf_facilities.length > 0 && (
              <>
                <h2 className="mt-9 text-2xl font-black">Facilities</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {turf.turf_facilities.map((x) => (
                    <span
                      key={x.facilities.name}
                      className="rounded-lg bg-white px-3 py-2 text-sm shadow-sm"
                    >
                      {x.facilities.name}
                    </span>
                  ))}
                </div>
              </>
            )}

            {/* Pricing info */}
            <div className="mt-9 rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-pitch" />
                <h2 className="text-lg font-black">Pricing</h2>
              </div>
              <p className="mt-3 text-3xl font-black text-pitch">
                {formatINR(turf.hourly_price)}
                <span className="text-base font-normal text-slate-500"> / hour</span>
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Free cancellation up to {turf.cancellation_hours} hours before slot
              </p>
            </div>

            {/* Reviews */}
            <h2 className="mt-9 text-2xl font-black">
              Reviews · ★ {avgRating} ({turf.reviews.length})
            </h2>
            {turf.reviews.slice(0, 3).map((r, i) => (
              <article
                key={i}
                className="mt-3 rounded-xl bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <b>{r.profiles?.full_name ?? "Player"}</b>
                  <span className="flex items-center gap-1 text-sm font-bold">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} size={13} fill="#C9F363" className="text-lime" />
                    ))}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{r.comment}</p>
                <p className="mt-1 text-xs text-slate-400">
                  {new Date(r.created_at).toLocaleDateString("en-IN")}
                </p>
              </article>
            ))}
          </div>

          {/* Right column — Booking panel */}
          <BookingPanel turf={turf} />
        </div>
      </div>
    </main>
  );
}
