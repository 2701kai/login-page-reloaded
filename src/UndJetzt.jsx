import { useEffect } from "react";
import "./UndJetzt.css";

export default function UndJetzt() {
  useEffect(() => {
    // Clean up any global effects
    const cleanup = () => {
      // Remove any existing canvas elements
      const canvases = document.querySelectorAll("canvas");
      canvases.forEach((canvas) => canvas.remove());

      // Remove any global classes
      document.body.classList.remove("shake-it", "confetti-container");

      // Remove any chaos minions
      const chaosMinions = document.querySelectorAll(".chaos-minion");
      chaosMinions.forEach((minion) => minion.remove());

      // Clear any existing intervals
      const highestIntervalId = window.setInterval(() => {}, 0);
      for (let i = 0; i < highestIntervalId; i++) {
        window.clearInterval(i);
      }

      // Reset body styles
      document.body.style.transform = "";
      document.body.style.filter = "";
      document.body.style.overflow = "";
    };

    cleanup();

    // Force a reflow to ensure animations start
    document.body.offsetHeight;
  }, []);

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
          >
            Dann los!
          </a>
        </div>
      </div>
    </div>
  );
}
