import { defineConfig, presetUno } from "unocss";

export default defineConfig({
  presets: [presetUno()],
});
// adding custom shortcut to stop all animations, like <h1>, while .anylass:hover
shortcuts: [
  "static-hover",
  "hover:animate-none hover:transition-none hover:duration-0 hover:scale-120 hover:opacity-100",
];
