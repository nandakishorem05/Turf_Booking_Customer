import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  showTagline?: boolean;
}

export function TurfBookLogo({
  size = "md",
  variant = "dark",
  showTagline = true,
}: LogoProps) {
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  const titleSizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };

  const taglineSizes = {
    sm: "text-[10px]",
    md: "text-xs",
    lg: "text-sm",
  };

  const isLight = variant === "light";

  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Dynamic Soccer Player & Ball Badge */}
      <div
        className={`relative ${iconSizes[size]} shrink-0 rounded-full flex items-center justify-center p-1.5 shadow-glow bg-gradient-to-tr from-[#00A852] to-[#00D066]`}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-white"
        >
          {/* Dynamic energy arc */}
          <path
            d="M8 36C5 28 8 16 18 10C26 5 38 7 42 16"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="4 2"
            opacity="0.85"
          />
          {/* Kicking player silhouette */}
          <circle cx="28" cy="11" r="3.5" fill="white" />
          <path
            d="M26 16L22 24L14 26M22 24L28 32L36 38M25 21L34 22L40 26"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Soccer Ball */}
          <circle cx="39" cy="37" r="3.5" fill="#C9F363" stroke="#042618" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <span
          className={`font-black tracking-tight leading-none ${titleSizes[size]} ${
            isLight ? "text-white" : "text-slate-900"
          }`}
        >
          Turf<span className="text-[#00D066]">Book</span>
        </span>
        {showTagline && (
          <span
            className={`font-semibold tracking-[0.18em] uppercase ${taglineSizes[size]} ${
              isLight ? "text-white/80" : "text-slate-600"
            }`}
          >
            Find • Book • Play
          </span>
        )}
      </div>
    </div>
  );
}
