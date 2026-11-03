import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",
        pitch: "#0A3F26",
        pitchDark: "#042618",
        lime: "#00D066",
        limeSoft: "#E6FBF0",
        limeNeon: "#C9F363",
        mist: "#F5F8F6",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(10,63,38,0.08)",
        glow: "0 0 25px rgba(0,208,102,0.35)",
        card: "0 4px 20px rgba(0,0,0,0.06)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
