import type { Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    safelist: ["font-serif", "font-sans-serif", "font-mono"],
    theme: {
        extend: {
            colors: {
                "vampire-black": "#050505",
                "eerie-black": "#1F1F1F",
                "mine-shaft": { 0: "#2D2D2D", 1: "#3A3A3A" },
                "sonic-silver": "#757575",
                mercury: "#E9E9E9",
                "wild-sand": "#F4F4F4",
                "medium-purple": "#A445ED",
                rose: "#FF5252",
            },
            fontFamily: {
                serif: ["Lora", "serif"],
                mono: ["Iconsolata", "monospace"],
                "sans-serif": ["Inter", "sans-serif"],
            },
            boxShadow: {
                nav: "0 3px 30px rgba(0, 0, 0, 0.3)",
            },
        },
    },
    plugins: [],
} satisfies Config;
