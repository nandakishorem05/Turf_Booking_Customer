"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function AuthForm() {
  const [email, setEmail] = useState("demo@turfbook.com");
  const [password, setPassword] = useState("demo1234");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function run(mode: "login" | "signup") {
    setBusy(true);
    setNotice("");
    // Simulate auth delay
    await new Promise((r) => setTimeout(r, 800));
    setBusy(false);
    if (mode === "login") {
      setNotice("✅ Signed in as Demo Player (demo@turfbook.com). Redirecting…");
      setTimeout(() => router.push("/bookings"), 1200);
    } else {
      setNotice("✅ Demo account created! You can now explore the app.");
    }
  }

  async function otp() {
    await new Promise((r) => setTimeout(r, 600));
    setNotice("📧 Magic link sent to " + email + " (demo — no real email sent).");
  }

  return (
    <div className="space-y-3">
      <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800">
        🎮 <strong>Demo mode</strong> — use any email/password to explore
      </div>
      <label className="block text-sm font-bold">
        Email
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="mt-1 w-full rounded-xl border p-3 outline-none focus:border-pitch"
          placeholder="you@example.com"
        />
      </label>
      <label className="block text-sm font-bold">
        Password
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="mt-1 w-full rounded-xl border p-3 outline-none focus:border-pitch"
          placeholder="At least 6 characters"
        />
      </label>
      <button
        disabled={busy}
        onClick={() => run("login")}
        className="w-full rounded-xl bg-pitch p-3 font-bold text-white disabled:opacity-60"
      >
        {busy ? "Signing in…" : "Sign in"}
      </button>
      <button
        disabled={busy}
        onClick={() => run("signup")}
        className="w-full rounded-xl border border-pitch p-3 font-bold text-pitch disabled:opacity-60"
      >
        Create account
      </button>
      <button
        disabled={busy}
        onClick={otp}
        className="w-full text-sm font-bold text-slate-500"
      >
        Email me a magic link
      </button>
      {notice && (
        <p className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
          {notice}
        </p>
      )}
    </div>
  );
}
