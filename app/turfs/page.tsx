import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, ArrowLeft } from "lucide-react";
import { MOCK_TURFS } from "@/lib/mock-data";
import { formatINR } from "@/lib/utils";

export default async function TurfsPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string; sport?: string }>;
}) {
  const q = await searchParams;

  let filtered = MOCK_TURFS.filter((t) => t.status === "approved");
  if (q.city && q.city !== "All") {
    filtered = filtered.filter(
      (t) =>
        t.city.toLowerCase().includes(q.city!.toLowerCase()) ||
        t.address.toLowerCase().includes(q.city!.toLowerCase())
    );
  }
  if (q.sport && q.sport !== "all") {
    filtered = filtered.filter((t) =>
      t.turf_sports.some(
        (x) => x.sports.name.toLowerCase() === q.sport!.toLowerCase()
      )
    );
  }

  const sportsList = [
    { name: "Football", emoji: "⚽" },
    { name: "Cricket", emoji: "🏏" },
    { name: "Badminton", emoji: "🏸" },
    { name: "Basketball", emoji: "🏀" },
    { name: "Tennis", emoji: "🎾" },
  ];

  return (
    <div className="min-h-screen bg-[#F6F8F6] pb-24">
      {/* ── Top Header ── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-1.5 font-bold text-slate-800 hover:text-[#00D066] transition text-sm"
          >
            <ArrowLeft size={18} />
            <span>Home</span>
          </Link>
          <span className="font-extrabold text-base text-slate-900">
            Available Turfs
          </span>
          <div className="w-8" />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-5 space-y-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Explore Sports Venues
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Showing {filtered.length} verified arenas
            {q.city ? ` in ${q.city}` : ""}
            {q.sport ? ` for ${q.sport}` : ""}
          </p>
        </div>

        {/* ── Filter Chips ── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Link
            href="/turfs"
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition whitespace-nowrap ${
              !q.sport
                ? "bg-[#042618] text-white shadow-sm"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            All Sports
          </Link>
          {sportsList.map((sport) => (
            <Link
              key={sport.name}
              href={`/turfs?sport=${encodeURIComponent(sport.name)}${
                q.city ? `&city=${q.city}` : ""
              }`}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition whitespace-nowrap ${
                q.sport?.toLowerCase() === sport.name.toLowerCase()
                  ? "bg-[#00D066] text-slate-950 shadow-glow"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {sport.emoji} {sport.name}
            </Link>
          ))}
          {(q.sport || q.city) && (
            <Link
              href="/turfs"
              className="rounded-full bg-red-100 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-200 transition whitespace-nowrap"
            >
              ✕ Reset
            </Link>
          )}
        </div>

        {/* ── Turfs Grid ── */}
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
            <p className="text-base font-bold text-slate-700">No matching turfs</p>
            <p className="mt-1 text-xs text-slate-400">
              Try choosing different sport or area filters.
            </p>
            <Link
              href="/turfs"
              className="mt-4 inline-block rounded-full bg-[#00D066] px-5 py-2 text-xs font-bold text-slate-950"
            >
              View All Turfs
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t) => {
              const imageSrc =
                t.turf_images[0]?.public_url || "/images/turfs/greenleaf.jpg";

              return (
                <Link
                  key={t.id}
                  href={`/turfs/${t.slug}`}
                  className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-slate-100"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={imageSrc}
                      alt={t.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                      <Star size={13} className="text-amber-400 fill-amber-400" />
                      <span>{t.rating.toFixed(1)}</span>
                    </div>

                    <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-slate-800 shadow-sm">
                      <MapPin size={12} className="text-[#00D066]" />
                      <span>{t.distance}</span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                    <div>
                      <h2 className="font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-[#00D066] transition">
                        {t.name}
                      </h2>
                      <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                        <MapPin size={13} className="shrink-0 text-slate-400" />
                        <span className="truncate">{t.address}</span>
                      </p>

                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {t.turf_facilities.slice(0, 3).map((f) => (
                          <span
                            key={f.facilities.name}
                            className="rounded-lg bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600"
                          >
                            {f.facilities.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400">
                          Starting at
                        </p>
                        <p className="text-base sm:text-lg font-black text-[#042618]">
                          {formatINR(t.hourly_price)}
                          <span className="text-xs font-normal text-slate-400">
                            /hr
                          </span>
                        </p>
                      </div>

                      <span className="rounded-xl bg-[#00D066]/10 px-3.5 py-1.5 text-xs font-bold text-[#042618] group-hover:bg-[#00D066] group-hover:text-slate-950 transition">
                        Book Slot
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
