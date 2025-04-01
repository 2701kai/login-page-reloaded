export function goMultiverseMadness() {
  // Clone minions
  const base = document.querySelector(".minion-image");
  if (base) {
    for (let i = 0; i < 10; i++) {
      const clone = base.cloneNode(true);
      clone.style.position = "absolute";
      clone.style.left = `${Math.random() * 90}vw`;
      clone.style.top = `${Math.random() * 80}vh`;
      clone.style.transform = `rotate(${Math.random() * 360}deg) scale(${
        Math.random() * 1.5 + 0.5
      })`;
      clone.style.opacity = "0.8";
      clone.style.zIndex = "9999";
      clone.classList.add("chaos-minion");
      document.body.appendChild(clone);
    }
  }

  // Camera shake
  document.body.classList.add("shake-it");
  setTimeout(() => {
    document.body.classList.remove("shake-it");
  }, 1500);

  // Glitch effect
  setInterval(() => {
    document.querySelectorAll("h1, h2, p, a, button, span").forEach((el) => {
      el.style.transform = `rotate(${Math.random() * 2 - 1}deg) scale(${
        0.95 + Math.random() * 0.1
      })`;
      el.style.filter = `blur(${Math.random() * 1.5}px) brightness(${
        0.8 + Math.random() * 0.5
      })`;
    });

    document.querySelectorAll("img").forEach((img) => {
      img.style.filter = `hue-rotate(${Math.random() * 360}deg) contrast(${
        1 + Math.random()
      })`;
      img.style.transform = `scale(${0.9 + Math.random() * 0.3}) rotate(${
        Math.random() * 4 - 2
      }deg)`;
    });
  }, 500);
}
