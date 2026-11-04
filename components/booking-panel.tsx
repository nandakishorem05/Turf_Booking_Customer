"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatINR } from "@/lib/utils";
import {
  CheckCircle,
  Clock,
  Calendar,
  Tag,
  ShieldCheck,
  CreditCard,
  Smartphone,
  ChevronRight,
  ArrowRight,
  X,
  MapPin,
  Sparkles,
} from "lucide-react";
import { MockTurf } from "@/lib/mock-data";

interface BookingPanelProps {
  turf: MockTurf;
  selectedDate: string;
  selectedSlot: string;
  onSlotChange?: (slot: string) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export function BookingPanel({
  turf,
  selectedDate,
  selectedSlot,
  isOpenMobile = false,
  onCloseMobile,
}: BookingPanelProps) {
  const [durationHours, setDurationHours] = useState(1);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "razorpay">("razorpay");
  const [status, setStatus] = useState<"idle" | "reserving" | "paying" | "success">("idle");
  const [bookingRef, setBookingRef] = useState("");

  const basePrice = turf.hourly_price * durationHours;
  const discount = appliedCoupon === "WELCOME100" ? 100 : appliedCoupon === "DEMO10" ? Math.round(basePrice * 0.1) : 0;
  const totalAmount = Math.max(0, basePrice - discount);

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === "WELCOME100" || code === "DEMO10") {
      setAppliedCoupon(code);
      setShowCouponInput(false);
    } else {
      alert("Invalid coupon. Try 'WELCOME100' or 'DEMO10'");
    }
  };

  const handleProceedToPay = async () => {
    setStatus("reserving");
    await new Promise((r) => setTimeout(r, 600));
    setStatus("paying");
    await new Promise((r) => setTimeout(r, 1100));
    const randomId = "BK-" + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(randomId);
    setStatus("success");
  };

  const handleClose = () => {
    setStatus("idle");
    if (onCloseMobile) onCloseMobile();
  };

  // ── Success State Screen ──
  const successContent = (
    <div className="text-center space-y-4 py-2">
      <div className="mx-auto w-16 h-16 rounded-full bg-[#00D066]/15 flex items-center justify-center text-[#00D066] shadow-sm">
        <CheckCircle size={36} />
      </div>

      <div>
        <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#00D066] bg-[#00D066]/10 px-2.5 py-0.5 rounded-full mb-1">
          <Sparkles size={11} /> Payment Successful
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
          Booking Confirmed!
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Booking Reference: <span className="font-mono font-bold text-slate-800">{bookingRef}</span>
        </p>
      </div>

      {/* Confirmed Ticket Details Card */}
      <div className="rounded-2xl bg-slate-50 p-4 text-left space-y-2.5 border border-slate-100 text-xs sm:text-sm">
        <div className="flex items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
          <span className="text-slate-500">Turf Venue</span>
          <span className="font-extrabold text-slate-900 text-right">{turf.name}</span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-slate-500">Location</span>
          <span className="font-semibold text-slate-700 text-right truncate max-w-[180px]">
            {turf.address}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-slate-500">Date</span>
          <span className="font-bold text-slate-900 text-right">{selectedDate}</span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-slate-500">Time Slot</span>
          <span className="font-bold text-[#042618] text-right">
            {selectedSlot} ({durationHours} hr{durationHours > 1 ? "s" : ""})
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-slate-200/60 pt-2 font-black text-sm">
          <span className="text-slate-800">Amount Paid</span>
          <span className="text-[#00D066] text-base">{formatINR(totalAmount)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2 pt-2">
        <Link
          href="/bookings"
          className="flex items-center justify-center gap-2 w-full rounded-2xl bg-[#042618] py-3 text-sm font-bold text-white hover:bg-[#0A3F26] transition shadow-md"
        >
          View in My Bookings <ArrowRight size={15} />
        </Link>
        <button
          type="button"
          onClick={handleClose}
          className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-900"
        >
          Done &amp; Close
        </button>
      </div>
    </div>
  );

  // ── Active Booking Form Screen ──
  const formContent = (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h2 className="text-base sm:text-lg font-black text-slate-900">
          Confirm Booking
        </h2>
        {onCloseMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 lg:hidden"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Turf Summary Card */}
      <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 border border-slate-100">
        <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-200">
          <Image
            src={turf.turf_images[0]?.public_url || "/images/turfs/greenleaf.jpg"}
            alt={turf.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm text-slate-900 truncate">{turf.name}</h3>
          <p className="text-xs text-slate-500 truncate">{turf.address}</p>
          <p className="text-xs font-bold text-[#00D066] mt-0.5">
            {formatINR(turf.hourly_price)}/hr
          </p>
        </div>
      </div>

      {/* Selected Slot Information */}
      <div className="rounded-2xl border border-slate-100 bg-white p-3 space-y-2 text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-slate-700">
          <Calendar size={15} className="text-[#00D066] shrink-0" />
          <span className="font-semibold">{selectedDate}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-700">
          <Clock size={15} className="text-[#00D066] shrink-0" />
          <span className="font-semibold">
            {selectedSlot} ({durationHours} {durationHours > 1 ? "hours" : "hour"})
          </span>
        </div>
      </div>

      {/* Duration selector */}
      <div className="flex items-center justify-between py-1">
        <span className="text-xs font-bold text-slate-600">Duration</span>
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => setDurationHours(h)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                durationHours === h
                  ? "bg-[#042618] text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {h} hr{h > 1 ? "s" : ""}
            </button>
          ))}
        </div>
      </div>

      {/* Coupon Section */}
      <div className="rounded-2xl border border-dashed border-slate-200 p-3 bg-slate-50/50">
        {appliedCoupon ? (
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-emerald-700 flex items-center gap-1.5">
              <Tag size={13} /> Coupon {appliedCoupon} applied
            </span>
            <div className="flex items-center gap-2">
              <span className="font-black text-emerald-700">−{formatINR(discount)}</span>
              <button
                type="button"
                onClick={() => setAppliedCoupon(null)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>
          </div>
        ) : showCouponInput ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="e.g. WELCOME100"
              className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs uppercase outline-none focus:border-[#00D066]"
            />
            <button
              type="button"
              onClick={handleApplyCoupon}
              className="rounded-xl bg-[#00D066] px-3 py-1.5 text-xs font-bold text-slate-950"
            >
              Apply
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowCouponInput(true)}
            className="flex w-full items-center justify-between text-xs font-bold text-slate-700 hover:text-[#00D066]"
          >
            <span className="flex items-center gap-1.5">
              <Tag size={13} className="text-[#00D066]" /> Apply Coupon
            </span>
            <ChevronRight size={13} />
          </button>
        )}
      </div>

      {/* Payment Method Selector */}
      <div className="space-y-1.5">
        <p className="text-xs font-bold text-slate-600">Payment Method</p>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setPaymentMethod("upi")}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl border text-xs font-bold transition ${
              paymentMethod === "upi"
                ? "border-[#00D066] bg-[#00D066]/10 text-slate-900"
                : "border-slate-200 hover:bg-slate-50 text-slate-600"
            }`}
          >
            <Smartphone size={16} />
            <span>UPI</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod("card")}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl border text-xs font-bold transition ${
              paymentMethod === "card"
                ? "border-[#00D066] bg-[#00D066]/10 text-slate-900"
                : "border-slate-200 hover:bg-slate-50 text-slate-600"
            }`}
          >
            <CreditCard size={16} />
            <span>Card</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod("razorpay")}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl border text-xs font-bold transition ${
              paymentMethod === "razorpay"
                ? "border-[#00D066] bg-[#00D066]/10 text-slate-900"
                : "border-slate-200 hover:bg-slate-50 text-slate-600"
            }`}
          >
            <ShieldCheck size={16} className="text-[#00D066]" />
            <span>Razorpay</span>
          </button>
        </div>
      </div>

      {/* Total Amount Breakdown */}
      <div className="border-t border-slate-100 pt-2.5 space-y-1 text-xs">
        <div className="flex justify-between text-slate-500">
          <span>Subtotal</span>
          <span>{formatINR(basePrice)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-[#00D066] font-semibold">
            <span>Coupon Discount</span>
            <span>−{formatINR(discount)}</span>
          </div>
        )}
        <div className="flex items-center justify-between text-sm sm:text-base font-black text-slate-900 pt-1 border-t border-slate-100">
          <span>Total Amount</span>
          <span className="text-[#042618] text-lg font-extrabold">{formatINR(totalAmount)}</span>
        </div>
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={handleProceedToPay}
        disabled={status !== "idle"}
        className="w-full rounded-2xl bg-[#00D066] py-3 px-4 font-black text-slate-950 text-xs sm:text-sm shadow-glow hover:bg-[#02b85a] transition disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {status === "idle" && "Proceed to Pay"}
        {status === "reserving" && (
          <>
            <Clock size={15} className="animate-spin" /> Reserving Slot...
          </>
        )}
        {status === "paying" && (
          <>
            <Clock size={15} className="animate-spin" /> Processing Payment...
          </>
        )}
      </button>

      <p className="flex items-center justify-center gap-1 text-[10px] font-semibold text-slate-400">
        <ShieldCheck size={12} className="text-[#00D066]" />
        Secured by Razorpay • Instant Confirmation
      </p>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Panel (Only visible on lg screens) */}
      <aside className="hidden lg:block sticky top-24 rounded-3xl bg-white p-6 shadow-card border border-slate-100">
        {status === "success" ? successContent : formContent}
      </aside>

      {/* Mobile Modal Drawer (Only visible on mobile when isOpenMobile is true) */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-0 sm:p-4">
          <div className="w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-t-[2rem] sm:rounded-3xl bg-white p-5 sm:p-6 shadow-2xl">
            {status === "success" ? successContent : formContent}
          </div>
        </div>
      )}
    </>
  );
}
