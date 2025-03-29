import { useEffect, useRef } from "react";
import "./UndJetzt.css";

export default function UndJetzt() {
  const plexicoRef = useRef(null);

  useEffect(() => {
    // Clean up
    const cleanup = () => {
      const canvases = document.querySelectorAll("canvas");
      canvases.forEach((canvas) => canvas.remove());
      document.body.classList.remove("shake-it", "confetti-container");
      const chaosMinions = document.querySelectorAll(".chaos-minion");
      chaosMinions.forEach((minion) => minion.remove());
      const highestIntervalId = window.setInterval(() => {}, 0);

      for (let i = 0; i < highestIntervalId; i++) window.clearInterval(i);
      document.body.style.transform = "";
      document.body.style.filter = "";
      document.body.style.overflow = "";
    };

    cleanup();
    document.body.offsetHeight;
    const audio = new Audio("/assets/sounds/plexico.mp3");
    audio.loop = true;
    audio.volume = 1;
    audio.play();
    plexicoRef.current = audio;

    return () => {
      audio.pause();
    };
  }, []);

  // neu im Sortiment:
  const fadeOutAudio = (audio, duration = 4000) => {
    const steps = 40;
    const stepTime = duration / steps;
    let volume = audio.volume;

    const fade = setInterval(() => {
      volume -= 1 / steps;
      if (volume <= 0) {
        audio.pause();
        audio.currentTime = 0;
        clearInterval(fade);
      } else {
        audio.volume = volume;
      }
    }, stepTime);
  };

  return (
    <div className="und-jetzt-container">
      <h1>Und jetzt?</h1>
      <div className="content">
        <h2>
          <div className="typewriter">
            <span>Willst Du mal sehen, wie man es RICHTIG macht?</span>
          </div>
        </h2>
        <div className="flex">
          <a
            href="https://github.com/CagatayWT"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-kai"
            // neu im Sortiment
            onClick={(e) => {
              e.preventDefault(); // delayed nav for fade effect...
              fadeOutAudio(plexicoRef.current, 4000);
              setTimeout(() => {
                window.location.href = "https://github.com/CagatayWT";
              }, 4000);
            }}
          >
            Dann los!
          </a>
        </div>
      </div>
    </div>
  );
}
