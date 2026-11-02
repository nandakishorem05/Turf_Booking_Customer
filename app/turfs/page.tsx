import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { MOCK_TURFS } from "@/lib/mock-data";
import { formatINR } from "@/lib/utils";

export default async function Turfs({
  searchParams,
}: {
  searchParams: Promise<{ city?: string; sport?: string }>;
}) {
  const q = await searchParams;

  let filtered = MOCK_TURFS.filter((t) => t.status === "approved");
  if (q.city) filtered = filtered.filter((t) => t.city.toLowerCase().includes(q.city!.toLowerCase()));
  if (q.sport)
    filtered = filtered.filter((t) =>
      t.turf_sports.some((x) => x.sports.name === q.sport)
    );

  const sportEmoji: Record<string, string> = {
    Football: "⚽", Cricket: "🏏", Badminton: "🏸", Tennis: "🎾", Basketball: "🏀",
  };

  return (
    <main className="min-h-screen bg-[#f8f9f5]">
      <div className="bg-amber-400 px-5 py-2 text-center text-sm font-bold text-amber-900">
        🎮 DEMO MODE — No real database connected
      </div>
      <div className="mx-auto max-w-6xl p-5">
        <Link className="font-black text-pitch" href="/">
          ← TURFBOOK
        </Link>
        <h1 className="mt-8 text-4xl font-black">Available turfs</h1>
        <p className="mt-2 text-slate-500">{filtered.length} venues match your search.</p>

        {/* Filter chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          {["Football", "Cricket", "Badminton", "Tennis", "Basketball"].map((sport) => (
            <Link
              key={sport}
              href={`/turfs?sport=${encodeURIComponent(sport)}${q.city ? `&city=${q.city}` : ""}`}
              className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
                q.sport === sport
                  ? "bg-pitch text-white"
                  : "bg-white text-slate-600 shadow-sm hover:bg-pitch/10"
              }`}
            >
              {sportEmoji[sport]} {sport}
            </Link>
          ))}
          {(q.sport || q.city) && (
            <Link href="/turfs" className="rounded-full bg-red-100 px-4 py-1.5 text-sm font-bold text-red-600">
              ✕ Clear filters
            </Link>
          )}
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {filtered.map((t) => (
            <Link
              key={t.id}
              href={`/turfs/${t.slug}`}
              className="flex overflow-hidden rounded-2xl bg-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex w-36 shrink-0 items-center justify-center bg-gradient-to-br from-[#699e58] to-pitch text-4xl">
                {sportEmoji[t.turf_sports[0]?.sports.name] ?? "🏟️"}
              </div>
              <div className="p-5">
                <h2 className="text-xl font-extrabold">{t.name}</h2>
                <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                  <MapPin size={13} />
                  {t.address}, {t.city}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {t.turf_sports.map((x) => (
                    <span key={x.sports.name} className="rounded-full bg-lime/30 px-2 py-0.5 text-xs font-bold text-pitch">
                      {x.sports.name}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm font-bold text-pitch">
                  {formatINR(Number(t.hourly_price))} / hr ·{" "}
                  <Star size={12} className="inline text-amber-400" fill="#fbbf24" /> {t.rating}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
            No turfs match your filters. <Link href="/turfs" className="font-bold text-pitch">Clear filters</Link>
          </p>
        )}
      </div>
    </main>
  );
}
