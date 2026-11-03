"use client";

import { useState } from "react";
import Image from "next/image";
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
    // Step 1: Simulate slot reservation
    await new Promise((r) => setTimeout(r, 700));
    setStatus("paying");

    // Step 2: Simulate Razorpay payment modal / transaction
    await new Promise((r) => setTimeout(r, 1200));
    const randomId = "BK-" + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(randomId);
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-card border border-slate-100 text-center space-y-4">
        <div className="mx-auto w-16 h-16 rounded-full bg-[#00D066]/15 flex items-center justify-center text-[#00D066]">
          <CheckCircle size={36} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900">Booking Confirmed!</h2>
          <p className="text-xs text-slate-500 mt-1">Ref ID: {bookingRef}</p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4 text-left space-y-2 text-xs sm:text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Turf</span>
            <span className="font-bold text-slate-900">{turf.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Date</span>
            <span className="font-bold text-slate-900">{selectedDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Slot</span>
            <span className="font-bold text-slate-900">{selectedSlot}</span>
          </div>
          <div className="flex justify-between border-t border-slate-200/60 pt-2 font-bold">
            <span className="text-slate-700">Amount Paid</span>
            <span className="text-[#00D066]">{formatINR(totalAmount)}</span>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <a
            href="/bookings"
            className="flex items-center justify-center gap-2 w-full rounded-2xl bg-[#042618] py-3 text-sm font-bold text-white hover:bg-[#0A3F26] transition"
          >
            View in My Bookings <ArrowRight size={16} />
          </a>
          <button
            onClick={() => {
              setStatus("idle");
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full py-2.5 text-xs font-bold text-slate-500 hover:text-slate-900"
          >
            Book Another Slot
          </button>
        </div>
      </div>
    );
  }

  const content = (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h2 className="text-lg font-black text-slate-900">Confirm Booking</h2>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 md:hidden"
          >
            <X size={20} />
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
      <div className="rounded-2xl border border-slate-100 bg-white p-3.5 space-y-2.5 text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-slate-700">
          <Calendar size={16} className="text-[#00D066] shrink-0" />
          <span className="font-semibold">{selectedDate}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-700">
          <Clock size={16} className="text-[#00D066] shrink-0" />
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
              <Tag size={14} /> Coupon {appliedCoupon} applied
            </span>
            <div className="flex items-center gap-2">
              <span className="font-black text-emerald-700">−{formatINR(discount)}</span>
              <button
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
              onClick={handleApplyCoupon}
              className="rounded-xl bg-[#00D066] px-3 py-1.5 text-xs font-bold text-slate-950"
            >
              Apply
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowCouponInput(true)}
            className="flex w-full items-center justify-between text-xs font-bold text-slate-700 hover:text-[#00D066]"
          >
            <span className="flex items-center gap-1.5">
              <Tag size={14} className="text-[#00D066]" /> Apply Coupon
            </span>
            <ChevronRight size={14} />
          </button>
        )}
      </div>

      {/* Payment Method Selector */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-slate-600">Payment Method</p>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setPaymentMethod("upi")}
            className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border text-xs font-bold transition ${
              paymentMethod === "upi"
                ? "border-[#00D066] bg-[#00D066]/10 text-slate-900"
                : "border-slate-200 hover:bg-slate-50 text-slate-600"
            }`}
          >
            <Smartphone size={18} />
            <span>UPI</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod("card")}
            className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border text-xs font-bold transition ${
              paymentMethod === "card"
                ? "border-[#00D066] bg-[#00D066]/10 text-slate-900"
                : "border-slate-200 hover:bg-slate-50 text-slate-600"
            }`}
          >
            <CreditCard size={18} />
            <span>Card</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod("razorpay")}
            className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border text-xs font-bold transition ${
              paymentMethod === "razorpay"
                ? "border-[#00D066] bg-[#00D066]/10 text-slate-900"
                : "border-slate-200 hover:bg-slate-50 text-slate-600"
            }`}
          >
            <ShieldCheck size={18} className="text-[#00D066]" />
            <span>Razorpay</span>
          </button>
        </div>
      </div>

      {/* Total Amount Breakdown */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs sm:text-sm">
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
        <div className="flex items-center justify-between text-base sm:text-lg font-black text-slate-900 pt-1 border-t border-slate-100">
          <span>Total Amount</span>
          <span className="text-[#042618] text-xl font-extrabold">{formatINR(totalAmount)}</span>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleProceedToPay}
        disabled={status !== "idle"}
        className="w-full rounded-2xl bg-[#00D066] py-3.5 px-4 font-black text-slate-950 text-sm sm:text-base shadow-glow hover:bg-[#02b85a] transition disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {status === "idle" && "Proceed to Pay"}
        {status === "reserving" && (
          <>
            <Clock size={16} className="animate-spin" /> Reserving Slot...
          </>
        )}
        {status === "paying" && (
          <>
            <Clock size={16} className="animate-spin" /> Opening Payment...
          </>
        )}
      </button>

      <p className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-400">
        <ShieldCheck size={13} className="text-[#00D066]" />
        Secured by Razorpay • Instant Confirmation
      </p>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Panel */}
      <aside className="hidden lg:block sticky top-24 rounded-3xl bg-white p-6 shadow-card border border-slate-100">
        {content}
      </aside>

      {/* Mobile Drawer Backdrop & Modal */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm lg:hidden p-0 animate-in fade-in">
          <div className="w-full max-h-[90vh] overflow-y-auto rounded-t-[2.5rem] bg-white p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
