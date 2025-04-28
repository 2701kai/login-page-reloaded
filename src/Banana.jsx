import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Banana.css";
import "./scripts/script";
import confetti from "canvas-confetti";

export default function Banana() {
  const [showMinions, setShowMinions] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Check for ESC key
      if (e.key === "Escape") {
        stopTheMadness();
      }
      // Check for Ctrl+C
      if (e.ctrlKey && e.key === "c") {
        e.preventDefault(); // Prevent the default copy action
        stopTheMadness();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const stopTheMadness = () => {
    // Stop all audio
    const audioElements = document.querySelectorAll("audio");
    audioElements.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });

    // Remove matrix effect
    const canvas = document.getElementById("matrixCanvas");
    if (canvas) canvas.remove();

    // Remove all chaos minions
    document.querySelectorAll(".chaos-minion").forEach((el) => el.remove());

    // Reset all element styles
    document
      .querySelectorAll("h1, h2, p, a, button, span, img")
      .forEach((el) => {
        el.style.transform = "";
        el.style.filter = "";
      });

    // Remove any animation classes
    const minion = document.querySelector(".src");
    if (minion) {
      minion.classList.remove("floating", "shaking", "spinning");
      minion.style.transform = "rotate(0deg)";
    }

    // Hide hint
    setShowHint(false);
  };

  const handleClick = async () => {
    if (clickCount >= 4) {
      return; // Only block after fourth click
    }

    setClickCount((prev) => prev + 1);
    const sound = new Audio("/assets/unbelievable_jingle.mp3");
    const sound2 = new Audio("/assets/plexico-1-shorter.mp3");

    if (clickCount === 0) {
      // First click: one sound + exaggerated confetti
      sound.play();
      setShowMinions(true);
      setShowHint(true);

      // Exaggerated confetti effects
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // Multiple confetti bursts from different angles
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: [
            "#ff0000",
            "#00ff00",
            "#0000ff",
            "#ffff00",
            "#ff00ff",
            "#00ffff",
          ],
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: [
            "#ff0000",
            "#00ff00",
            "#0000ff",
            "#ffff00",
            "#ff00ff",
            "#00ffff",
          ],
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.4, 0.6), y: Math.random() - 0.2 },
          colors: [
            "#ff0000",
            "#00ff00",
            "#0000ff",
            "#ffff00",
            "#ff00ff",
            "#00ffff",
          ],
        });
      }, 250);

      // Start fade out timer
      setTimeout(() => {
        const hintElement = document.querySelector(".hint");
        if (hintElement) {
          hintElement.style.opacity = "0";
          hintElement.style.transition = "opacity 1s ease-out";
          setTimeout(() => {
            setShowHint(false);
          }, 1000);
        }
      }, 5000);
    } else if (clickCount === 1) {
      // Second click: play sound twice + rotation animation + reduced confetti + emojis
      let playCount = 0;
      const playLoop = () => {
        if (playCount < 2) {
          sound.currentTime = 0;
          sound.play();
          playCount++;
          sound.onended = playLoop;
        }
      };
      playLoop();

      // Reduced confetti effects
      const duration = 8 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 270, ticks: 50, zIndex: 0 }; // Reduced values

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration); // Reduced from 75

        // Multiple confetti bursts from all angles (reduced to 3)
        for (let i = 0; i < 3; i++) {
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
            colors: [
              "#ff0000",
              "#00ff00",
              "#0000ff",
              "#ffff00",
              "#ff00ff",
              "#00ffff",
            ],
          });
        }
      }, 150); // Increased interval from 100 to 150

      // Add party emojis
      const emojiPositions = [
        {
          left: "13.4133vw",
          top: "94.8656vh",
          rotate: "71.0517deg",
          fontSize: "2.90797rem",
        },
        { left: "45vw", top: "85vh", rotate: "-45deg", fontSize: "3.5rem" },
        { left: "75vw", top: "90vh", rotate: "120deg", fontSize: "2.5rem" },
        { left: "25vw", top: "80vh", rotate: "-90deg", fontSize: "3rem" },
        { left: "60vw", top: "88vh", rotate: "30deg", fontSize: "2.8rem" },
      ];

      emojiPositions.forEach((pos, index) => {
        const emoji = document.createElement("span");
        emoji.textContent = "🎉";
        emoji.style.position = "fixed";
        emoji.style.fontSize = pos.fontSize;
        emoji.style.left = pos.left;
        emoji.style.top = pos.top;
        emoji.style.transition = "5s ease-out";
        emoji.style.zIndex = "9999";
        emoji.style.opacity = "1";

        document.body.appendChild(emoji);

        // Animate up and fade out
        setTimeout(() => {
          emoji.style.transform = `translateY(-150px) rotate(${pos.rotate})`;
          emoji.style.opacity = "0";

          // Remove after animation
          setTimeout(() => emoji.remove(), 5000);
        }, index * 200);
      });

      // Rotation animation
      const minion = document.querySelector(".src");
      if (minion) {
        // One rotation right - faster to match sound
        minion.style.transition = "transform 1s ease-in-out";
        minion.style.transform = "rotate(360deg)"; // 1 full rotation clockwise

        // After rotation completes, return to start position
        setTimeout(() => {
          minion.style.transform = "rotate(0deg)";

          // Start floating
          minion.classList.add("floating");

          // After 3 seconds of floating, start shaking
          setTimeout(() => {
            minion.classList.remove("floating");
            minion.classList.add("shaking");

            // After 2 seconds of shaking, do one final spin
            setTimeout(() => {
              minion.classList.remove("shaking");
              minion.style.transform = "rotate(360deg)";

              // Return to start position after spin
              setTimeout(() => {
                minion.style.transform = "rotate(0deg)";
              }, 1000);
            }, 2000);
          }, 3000);
        }, 1000); // Wait for rotation to complete
      }
    } else if (clickCount === 2) {
      // Third click: play sound 3x + matrix effect
      let playCount = 0;
      const playLoop = () => {
        if (playCount < 3) {
          sound.currentTime = 0;
          sound2.play();
          playCount++;
          sound.onended = playLoop;
        }
      };
      playLoop();

      // Matrix effect
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
    } else if (clickCount === 3) {
      // Fourth and final click
      setShowMinions(false);
      setShowHint(false);

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      // Create 8 random minions
      for (let i = 0; i < 8; i++) {
        const minion = document.createElement("img");
        minion.src = "/assets/tenor_1.webp";
        minion.className = "chaos-minion";

        // Set styles directly
        Object.assign(minion.style, {
          transition: "transform 4s ease-in-out",
          transform: `scale(${randomInRange(0.9, 1.2)}) rotate(${randomInRange(
            -20,
            20
          )}deg)`,
          position: "fixed",
          left: `${randomInRange(20, 80)}vw`,
          top: `${randomInRange(20, 70)}vh`,
          opacity: "0.8",
          zIndex: "9999",
          filter: `hue-rotate(${randomInRange(
            30,
            120
          )}deg) contrast(${randomInRange(1.3, 1.6)})`,
          width: "150px",
          height: "150px",
        });

        document.body.appendChild(minion);
      }

      // Navigate to /und-jetzt after 10 seconds
      setTimeout(() => {
        navigate("/und-jetzt");
      }, 4000);
    }
  };

  useEffect(() => {
    // Stop any playing audio when component mounts
    const stopAllAudio = () => {
      const audioElements = document.querySelectorAll("audio");
      audioElements.forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    };

    stopAllAudio();

    // Cleanup on unmount
    return () => {
      stopAllAudio();
      const canvas = document.getElementById("matrixCanvas");
      if (canvas) canvas.remove();
      document.querySelectorAll(".chaos-minion").forEach((el) => el.remove());
      document
        .querySelectorAll("h1, h2, p, a, button, span, img")
        .forEach((el) => {
          el.style.transform = "";
          el.style.filter = "";
        });
    };
  }, []);

  return (
    <>
      <h1>Moin, Mischa!</h1>
      <div className="aenne">
        <h2>Schön, dass Du hier bist.</h2>
        {showHint && (
          <div
            className="hint"
            style={{
              top: "25%",
              opacity: "1",
              transition: "opacity 1s ease-out",
            }}
          >
            <small>
              Press <kbd>ESC</kbd> or <kbd>Ctrl</kbd> + <kbd>C</kbd>
            </small>
            <br />
            <small>to stop the madness.</small>
          </div>
        )}
        <div className="flex">
          <button className="btn" onClick={handleClick}>
            Don´t push!
          </button>
        </div>
        <br />
        <div className="minions">
          {showMinions && (
            <img src="/assets/tenor_1.webp" alt="" className="src" />
          )}
        </div>
      </div>
    </>
  );
}
