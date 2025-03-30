import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const helloAudio = useRef(null);
  const errorAudio = useRef(null);

  const halEyeRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL;

  // useEffect(() => {
  //   const onFirstInteraction = () => {
  //     helloAudio.current?.play().catch((e) => {
  //       console.warn("Autoplay failed:", e);
  //     });
  //     window.removeEventListener("click", onFirstInteraction);
  //     window.removeEventListener("keydown", onFirstInteraction);
  //   };

  useEffect(() => {
    const onFirstInteraction = () => {
      const audio = helloAudio.current;
      const eye = halEyeRef.current;

      if (audio && eye) {
        // Activate glow
        eye.classList.remove("hal-muted");
        eye.classList.add("hal-glow");

        audio.play().catch((e) => console.warn("Autoplay failed:", e));

        audio.onended = () => {
          // Revert to muted glow
          eye.classList.remove("hal-glow");
          eye.classList.add("hal-muted");
        };
      }

      window.removeEventListener("click", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
    };

    window.addEventListener("click", onFirstInteraction);
    window.addEventListener("keydown", onFirstInteraction);

    return () => {
      window.removeEventListener("click", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const contentType = response.headers.get("content-type");
      const isJson = contentType && contentType.includes("application/json");
      const data = isJson ? await response.json() : null;

      if (!response.ok) {
        throw new Error(
          data?.message || `Login failed (status ${response.status})`
        );
      }

      if (data?.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        throw new Error("No token received from server.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Something went wrong");

      if (errorAudio.current) {
        errorAudio.current
          .play()
          .catch((e) => console.warn("Error audio failed to play:", e));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* AUDIO ELEMENTS */}
      <audio ref={helloAudio} src="/audio/helloDaveLeiser.mp3" preload="auto" />
      <audio
        ref={errorAudio}
        src="/audio/hal9000CantDoShort.mp3"
        preload="auto"
      />

      <div className="portal-effect" />
      <div m2="" flex="" justify-center="" text-2xl="" op30="" hover="op80">
        <a
          i-carbon-logo-github=""
          text-inherit=""
          href="https://github.com/2701kai/login-page-reloaded/blob/main/README.md"
          target="_blank"
          aria-label="GitHub repository of the project"
        ></a>
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8 text-center z-10">
        <img
          src="/hal.webp"
          alt="HAL 9000"
          //   className="absolute top-12 md:top-20 w-32 md:w-40 h-32 md:h-40 rounded-full ring-1 ring-red-500 bg-black shadow-[0_0_30px_#ff0000] animate-fade-in-slow opacity-50 animate-pulse-slow"
          // />

          //   className="absolute top-12 md:top-20 w-32 md:w-40 h-32 md:h-40 rounded-full
          // ring-2 ring-red-600 bg-black
          // shadow-[0_0_40px_#ff0000,0_0_60px_#ff0000]
          // animate-pulse opacity-0 transition-all duration-1000"
          // />

          //   className="hal-glow absolute top-12 md:top-20 w-32 md:w-40 h-32 md:h-40 rounded-full ring-2 ring-red-700 bg-black"
          // />

          ref={halEyeRef}
          // className="hal-glow absolute top-12 md:top-20 w-32 md:w-40 h-32 md:h-40 rounded-full ring-2 ring-red-700 bg-black"
          className="hal-muted absolute top-36 md:top-20 w-64 md:w-40 h-64 md:h-40 rounded-full ring-2 ring-red-700 bg-black transition-all duration-300"
        />

        <form
          onSubmit={handleSubmit}
          className="group flex flex-col items-center justify-center text-center space-y-4 z-10 mt-8 w-full max-w-xs sm:max-w-sm md:max-w-md"
        >
          <h1 className="text-5xl sm:text-2xl animate-bounce-alt animate-duration-2s pause-on-hover">
            Hi!
          </h1>
          <h2 className="text-2xl opacity-80 text-sm sm:text-md">Oder Tach.</h2>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <input
            type="text"
            placeholder="Dings, äh, sag schnell.."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 m-2 w-full border border-white bg-black text-white rounded"
            required
          />
          <input
            type="password"
            placeholder="..und Passwort."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 m-2 w-full border border-white bg-black text-white rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-kai hover:animate-none shake-it hover:shake-it-none opacity-30 hover:opacity-100 disabled:opacity-50"
          >
            {loading ? "Loading..." : "3, 2, 1.."}
          </button>
        </form>
      </div>
    </>
  );
}
