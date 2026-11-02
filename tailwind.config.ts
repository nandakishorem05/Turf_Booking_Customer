import type { Config } from "tailwindcss";
export default { content:["./app/**/*.{ts,tsx}","./components/**/*.{ts,tsx}"], theme:{extend:{colors:{ink:"#10201A",pitch:"#124C38",lime:"#C9F363",mist:"#F5F7F4"},boxShadow:{soft:"0 18px 45px rgba(16,32,26,.10)"}}}, plugins:[] } satisfies Config;
