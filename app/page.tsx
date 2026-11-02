import Link from "next/link";
import { MapPin, Search, Star, ArrowRight, ShieldCheck } from "lucide-react";
import { MOCK_TURFS } from "@/lib/mock-data";
import { formatINR } from "@/lib/utils";

const DEMO = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

export default async function Home() {
  const turfs = DEMO ? MOCK_TURFS.slice(0, 6) : [];

  return (
    <main className="min-h-screen bg-[#f8f9f5]">
      {DEMO && (
        <div className="bg-amber-400 px-5 py-2 text-center text-sm font-bold text-amber-900">
          🎮 DEMO MODE — No real database or payments connected
        </div>
      )}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <Link href="/" className="text-2xl font-black tracking-tight text-pitch">
          TURF<span className="text-lime">BOOK</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm font-semibold">
          <Link href="/bookings">My bookings</Link>
          <a className="rounded-full bg-pitch px-5 py-2.5 text-white" href="/login">
            Sign in
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-10">
        <div className="overflow-hidden rounded-[2.5rem] bg-pitch px-7 py-12 text-white shadow-soft md:px-14">
          <p className="mb-3 text-sm font-bold uppercase tracking-[.24em] text-lime">
            Play more. Plan less.
          </p>
          <h1 className="max-w-2xl text-4xl font-black leading-tight md:text-6xl">
            Your next game is just a slot away.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/75">
            Discover quality pitches, check live availability, and book in minutes.
          </p>
          <form action="/turfs" className="mt-8 grid gap-3 rounded-2xl bg-white p-3 md:grid-cols-[1fr_1fr_auto]">
            <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 text-ink">
              <MapPin size={18} />
              <input name="city" className="w-full py-3 outline-none" placeholder="City or locality" />
            </label>
            <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 text-ink">
              <Search size={18} />
              <select name="sport" className="w-full bg-transparent py-3 outline-none">
                <option value="">Any sport</option>
                <option>Football</option>
                <option>Cricket</option>
                <option>Badminton</option>
                <option>Tennis</option>
                <option>Basketball</option>
              </select>
            </label>
            <button className="rounded-xl bg-lime px-6 py-3 font-bold text-ink">Find turfs</button>
          </form>
        </div>
      </section>

      {/* Featured Turfs */}
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="font-bold text-pitch">CURATED FOR YOU</p>
            <h2 className="text-3xl font-black">Featured playgrounds</h2>
          </div>
          <Link href="/turfs" className="hidden items-center gap-1 font-bold text-pitch md:flex">
            See all <ArrowRight size={17} />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {turfs.map((t) => (
            <Link
              href={`/turfs/${t.slug}`}
              key={t.id}
              className="group overflow-hidden rounded-3xl bg-white shadow-soft transition hover:-translate-y-1"
            >
              <div
                className="flex h-44 items-center justify-center bg-gradient-to-br from-[#699e58] to-pitch text-4xl"
              >
                {t.turf_sports[0]?.sports.name === "Football" ? "⚽" :
                 t.turf_sports[0]?.sports.name === "Cricket" ? "🏏" :
                 t.turf_sports[0]?.sports.name === "Badminton" ? "🏸" :
                 t.turf_sports[0]?.sports.name === "Tennis" ? "🎾" :
                 t.turf_sports[0]?.sports.name === "Basketball" ? "🏀" : "🏟️"}
              </div>
              <div className="p-5">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-extrabold">{t.name}</h3>
                  <span className="flex items-center gap-1 text-sm font-bold">
                    <Star size={15} fill="#C9F363" className="text-lime" />
                    {t.rating}
                  </span>
                </div>
                <p className="flex items-center gap-1 text-sm text-slate-500">
                  <MapPin size={14} />
                  {t.city}
                </p>
                <p className="mt-4 font-bold text-pitch">
                  {formatINR(Number(t.hourly_price))}
                  <span className="font-normal text-slate-500"> / hour</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust signals */}
      <section className="border-y border-pitch/10 bg-white py-10">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 md:grid-cols-3">
          {[
            ["Verified venues", "Every listing is reviewed before going live."],
            ["Safe checkout", "Payments are verified before confirmation."],
            ["Live availability", "No double booking, even at peak time."],
          ].map(([a, b]) => (
            <div key={a} className="flex gap-3">
              <ShieldCheck className="mt-1 text-pitch" />
              <div>
                <h3 className="font-extrabold">{a}</h3>
                <p className="text-sm text-slate-500">{b}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
