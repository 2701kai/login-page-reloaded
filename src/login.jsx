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

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (helloAudio.current) {
      helloAudio.current.play().catch((e) => {
        console.warn("Autoplay prevented:", e);
      });
    }
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
      <audio ref={helloAudio} src="/audio/helloDave.mp3" preload="auto" />
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
          href="https://github.com/2701kai/login-page/blob/main/README.md"
          target="_blank"
          aria-label="GitHub repository of the project"
        ></a>
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8 text-center z-10">
        <img
          src="/hal.webp"
          alt="HAL 9000"
          className="absolute top-12 md:top-20 w-32 md:w-40 h-32 md:h-40 rounded-full ring-1 ring-red-500 bg-black shadow-[0_0_30px_#ff0000] animate-fade-in-slow opacity-50 animate-pulse-slow"
        />

        <form
          onSubmit={handleSubmit}
          className="group flex flex-col items-center justify-center text-center space-y-4 z-10 mt-8 w-full max-w-xs sm:max-w-sm md:max-w-md"
        >
          <h1 className="text-xl sm:text-2xl animate-bounce-alt animate-duration-2s pause-on-hover">
            Hi!
          </h1>
          <h2 className="opacity-80 text-sm sm:text-md">Oder Tach.</h2>

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
