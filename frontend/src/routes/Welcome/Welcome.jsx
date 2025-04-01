import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import confetti from "canvas-confetti";
import "./Welcome.css";

export default function WelcomePage() {
  const navigate = useNavigate();
  const [showMinions, setShowMinions] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const scrambleIntervalRef = useRef(null);
  const glitchIntervalRef = useRef(null);

  const handleTrauDich = () => {
    navigate("/girls-day-rocks");
  };

  const playUnbelievable = (times) => {
    const sound = new Audio("/unbelievable_jingle.mp3");
    let count = 0;
    const play = () => {
      if (count < times) {
        sound.currentTime = 0;
        sound.play();
        count++;
        sound.onended = play;
      }
    };
    play();
  };

  const playPlexico = (times) => {
    const sound = new Audio("/plexico-1-shorter.mp3");
    let count = 0;
    const play = () => {
      if (count < times) {
        sound.currentTime = 0;
        sound.play();
        count++;
        sound.onended = play;
      }
    };
    play();
  };

  const triggerConfetti = () => {
    setClickCount((prev) => prev + 1);

    switch (clickCount) {
      case 0:
        // First click: one sound + mild confetti
        playUnbelievable(1);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        setShowMinions(true);
        setShowHint(true);
        break;

      case 1:
        // Second click: play unbelievable sound twice + matrix effect
        playUnbelievable(2);
        createMatrixEffect();
        break;

      case 2:
        // Third click: play plexico sound + ADHD mode
        playPlexico(3);
        triggerADHD();
        break;

      case 3:
        // Fourth click: multiverse madness
        goMultiverseMadness();
        break;

      default:
        // Reset after max craziness
        setClickCount(0);
        cleanupEffects();
        break;
    }
  };

  // Matrix effect
  const createMatrixEffect = () => {
    const canvas = document.createElement("canvas");
    canvas.id = "matrixCanvas";
    canvas.style.position = "fixed";
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.zIndex = "9998";
    canvas.style.pointerEvents = "none";
    canvas.style.backgroundColor = "transparent";
    canvas.style.mixBlendMode = "screen";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars =
      "アァイゥエオカキクケコサシスセソABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split(
        ""
      );
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0F0";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    setInterval(draw, 33);
  };

  // ADHD mode
  const triggerADHD = () => {
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

    scrambleIntervalRef.current = setInterval(scramble, 1000);

    // Chaos unlock icon
    let typed = "";
    document.addEventListener("keydown", (e) => {
      typed += e.key.toLowerCase();
      if (typed.includes("chaos")) {
        goMultiverseMadness();
        typed = "";
      }
    });
  };

  // Multiverse madness
  const goMultiverseMadness = () => {
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
    glitchIntervalRef.current = setInterval(() => {
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
  };

  // Cleanup function
  const cleanupEffects = () => {
    // Remove matrix canvas
    const canvas = document.getElementById("matrixCanvas");
    if (canvas) canvas.remove();

    // Clear intervals
    if (scrambleIntervalRef.current) {
      clearInterval(scrambleIntervalRef.current);
    }
    if (glitchIntervalRef.current) {
      clearInterval(glitchIntervalRef.current);
    }

    // Remove chaos minions
    document.querySelectorAll(".chaos-minion").forEach((el) => el.remove());

    // Reset styles
    document
      .querySelectorAll("h1, h2, p, a, button, span, img")
      .forEach((el) => {
        el.style.transform = "";
        el.style.filter = "";
      });
  };

  useEffect(() => {
    // Cleanup on unmount
    return cleanupEffects;
  }, []);

  return (
    <div className="welcome-container">
      <div className="portal-effect" />
      <div className="content">
        <h1 className="greeting">Moin, Johanna!</h1>
        <div className="message">
          <h2>Schön, dass Du hier bist!</h2>
          <div className="flex">
            <button className="btn-kai btn-kai-large" onClick={handleTrauDich}>
              Trau Dich!
            </button>
            <button
              className="btn-kai hover:animate-none shake-it hover:shake-it-none op30 hover:op100"
              onClick={triggerConfetti}
            >
              Don't push!
            </button>
          </div>
          {showMinions && (
            <div className="minions">
              <img
                src="/minion.webp"
                alt="Minion"
                className="minion-image animate-bounce-alt animate-duration-2s"
              />
              {showHint && (
                <div className="hint">
                  <small>
                    Press <kbd>ESC</kbd> or <kbd>Ctrl</kbd> + <kbd>C</kbd>
                  </small>
                  <br />
                  <small>to stop the madness at any time.</small>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="girls-day-link">
          <button className="btn" onClick={() => navigate("/girls-day-rocks")}>
            Girls Day Rocks!
          </button>
        </div>
      </div>
    </div>
  );
}
