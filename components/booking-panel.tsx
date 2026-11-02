"use client";
import { useState } from "react";
import { formatINR } from "@/lib/utils";
import { CheckCircle, Clock, CreditCard } from "lucide-react";

type TurfMin = { id: string; hourly_price: number; name: string };

export function BookingPanel({ turf }: { turf: TurfMin }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [start, setStart] = useState("18:00");
  const [hours, setHours] = useState(1);
  const [coupon, setCoupon] = useState("");
  const [step, setStep] = useState<"idle" | "reserving" | "paying" | "success">("idle");
  const [message, setMessage] = useState("");

  const amount = turf.hourly_price * hours;
  const discount = coupon.toUpperCase() === "DEMO10" ? Math.round(amount * 0.1) : 0;
  const total = amount - discount;

  async function pay() {
    setMessage("");
    setStep("reserving");
    // Simulate reserve_booking RPC
    await new Promise((r) => setTimeout(r, 900));
    setStep("paying");
    // Simulate Razorpay checkout
    await new Promise((r) => setTimeout(r, 1400));
    setStep("success");
    setMessage(
      `✅ Booking confirmed for ${turf.name} on ${date} at ${start} for ${hours} hour${hours > 1 ? "s" : ""}. (Demo — no real payment was charged)`
    );
  }

  if (step === "success") {
    return (
      <aside className="sticky top-5 rounded-3xl bg-white p-6 shadow-soft">
        <div className="flex flex-col items-center gap-3 text-center">
          <CheckCircle size={56} className="text-green-500" />
          <h2 className="text-xl font-black">Booking Confirmed!</h2>
          <p className="text-sm text-slate-600">{message}</p>
          <a
            href="/bookings"
            className="mt-3 w-full rounded-xl bg-pitch px-4 py-3 text-center font-bold text-white"
          >
            View My Bookings
          </a>
          <button
            onClick={() => { setStep("idle"); setMessage(""); }}
            className="w-full rounded-xl border px-4 py-3 font-bold text-slate-600"
          >
            Book another slot
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className="sticky top-5 rounded-3xl bg-white p-6 shadow-soft">
      <p className="text-sm text-slate-500">Starts from</p>
      <p className="text-3xl font-black text-pitch">
        {formatINR(turf.hourly_price)}{" "}
        <span className="text-sm font-normal text-slate-500">/ hour</span>
      </p>

      <label className="mt-5 block text-sm font-bold">
        Date
        <input
          min={new Date().toISOString().slice(0, 10)}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
          className="mt-1 w-full rounded-xl border p-3 outline-none focus:border-pitch"
          disabled={step !== "idle"}
        />
      </label>

      <label className="mt-3 block text-sm font-bold">
        Start time
        <select
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="mt-1 w-full rounded-xl border p-3 outline-none focus:border-pitch"
          disabled={step !== "idle"}
        >
          {Array.from({ length: 15 }, (_, i) => `${String(i + 7).padStart(2, "0")}:00`).map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </label>

      <label className="mt-3 block text-sm font-bold">
        Duration
        <select
          value={hours}
          onChange={(e) => setHours(+e.target.value)}
          className="mt-1 w-full rounded-xl border p-3 outline-none focus:border-pitch"
          disabled={step !== "idle"}
        >
          {[1, 2, 3, 4].map((x) => (
            <option value={x} key={x}>
              {x} hour{x > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </label>

      <div className="relative mt-4">
        <input
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="w-full rounded-xl border p-3 uppercase tracking-wide outline-none focus:border-pitch"
          placeholder="Coupon code — try DEMO10"
          disabled={step !== "idle"}
        />
        {discount > 0 && (
          <span className="absolute right-3 top-3 text-xs font-bold text-green-600">
            −{formatINR(discount)} ✓
          </span>
        )}
      </div>

      <div className="mt-5 space-y-1 border-t pt-4 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-500">{hours} hr × {formatINR(turf.hourly_price)}</span>
          <span>{formatINR(amount)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Coupon DEMO10</span>
            <span>−{formatINR(discount)}</span>
          </div>
        )}
        <div className="flex justify-between font-black text-base pt-1">
          <span>Total</span>
          <span className="text-pitch">{formatINR(total)}</span>
        </div>
      </div>

      <button
        onClick={pay}
        disabled={step !== "idle"}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-pitch px-4 py-3 font-bold text-white transition disabled:opacity-60"
      >
        {step === "idle" && <><CreditCard size={18} /> Reserve &amp; Pay</>}
        {step === "reserving" && <><Clock size={18} className="animate-spin" /> Reserving slot…</>}
        {step === "paying" && <><Clock size={18} className="animate-spin" /> Processing payment…</>}
      </button>

      <p className="mt-3 text-center text-xs text-slate-400">
        🎮 Demo mode — no real payment
      </p>
    </aside>
  );
}
