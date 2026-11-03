"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarDays, Heart, User } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

  // Hide bottom navigation bar on turf detail pages so it doesn't overlap the "Book Now" sticky bar
  if (pathname.startsWith("/turfs/")) {
    return null;
  }

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Bookings", href: "/bookings", icon: CalendarDays },
    { label: "Favourites", href: "/turfs", icon: Heart },
    { label: "Profile", href: "/login", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-slate-200/80 bg-white/95 px-2 py-2 backdrop-blur-md md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all ${
              isActive ? "text-[#00D066]" : "text-slate-400 hover:text-slate-700"
            }`}
          >
            <div className={`p-1 rounded-lg transition-colors ${isActive ? "bg-[#00D066]/10" : ""}`}>
              <Icon size={19} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className={`text-[10px] tracking-tight leading-tight ${isActive ? "font-bold" : "font-medium"}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
