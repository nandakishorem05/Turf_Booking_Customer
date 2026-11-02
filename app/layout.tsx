import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = { title:"TurfBook | Find your game", description:"Book verified sports turfs near you" };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
