export function goAbsolutelyBonkers() {
  // Font scramble
  const scramble = () => {
    document.querySelectorAll("h1, h2, p, a, button, span").forEach((el) => {
      const original = el.textContent;
      const scrambled = original
        .split("")
        .map((c) =>
          Math.random() > 0.5
            ? String.fromCharCode(33 + Math.floor(Math.random() * 94))
            : c
        )
        .join("");
      el.textContent = scrambled;
    });
  };

  setInterval(scramble, 1000);

  // Chaos unlock icon
  let typed = "";
  document.addEventListener("keydown", (e) => {
    typed += e.key.toLowerCase();
    if (typed.includes("chaos")) {
      const shrink = import("./contactYourShrink.js");
      shrink.goMultiverseMadness();
      typed = "";
    }
  });
}
