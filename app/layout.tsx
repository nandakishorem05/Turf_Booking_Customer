import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { BottomNav } from "@/components/bottom-nav";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "TurfBook — Find • Book • Play Your Favourite Turf",
  description: "Book verified sports turfs in Kochi, Mumbai, Bangalore, and across India anytime, anywhere. Real-time availability, instant slot booking, secure payments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontSans.variable}>
      <body className="min-h-screen bg-[#F6F8F6] text-slate-900 antialiased font-sans pb-16 md:pb-0">
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
