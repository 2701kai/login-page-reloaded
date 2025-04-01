import { defineConfig, presetUno } from "unocss";

export default defineConfig({
  presets: [presetUno()],

  // adding custom shortcut to stop all animations, like <h1>, while .anylass:hover
  shortcuts: [
    [
      "static-hover",
      "hover:animate-none hover:transition-none hover:duration-0 hover:scale-120 hover:opacity-100",
    ],
    [
      "zen-mode",
      "hover:animate-none hover:transition-none hover:scale-100 hover:opacity-100",
    ],
    ["pause-on-hover", "group-hover:animate-paused"],
  ],
  theme: {
    theme: {
      extend: {
        keyframes: {
          fadein: {
            from: { opacity: "0" },
            to: { opacity: "1" },
          },
        },
        animation: {
          "fade-in-slow": "fadein 3s ease-out forwards",
          "pulse-slow": "pulse 4s ease-in-out infinite",
          "hal-awaken":
            "fadein 3s ease-out forwards, pulse 4s ease-in-out infinite",
        },
      },
    },
  },
});
