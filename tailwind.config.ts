import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // الخط اللي اعتمدناه للمشروع
      },
      colors: {
        brand: {
          primary: "#008080", // اللون الأخضر الخاص بـ URIMPACT
          light: "#slate-50", // اللون الفاتح للنافبار اللي طلبتيه
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
