import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
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

      {/*Logo Container*/}
      <div className="logo relative flex flex-col items-center justify-center justify-start text-center z-10 pt-48">
        {/* HAL 9000 */}
        <img
          src="/hal.webp"
          alt="HAL 9000"
          className="absolute top-50 w-40 h-40 object-contain rounded-full ring-8 ring-red-500 shadow-xl shadow-red-900 bg-black animate-pulse-slow opacity-50 animate-fade-in-slow animate-pulse-slow"
        ></img>

        {/* Login form */}
        <div className="group flex flex-col items-center justify-center min-h-screen text-center space-y-4 z-10 mt-8 relative">
          <h1 className="mt-2em text animate-bounce-alt animate-duration-2s pause-on-hover">
            Hi!
          </h1>
          <h2 className="op80 text-md">Oder Tach.</h2>
          <input
            type="text"
            placeholder="Dings, äh, sag schnell.."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 m-2 border border-white bg-black text-white rounded"
          />
          <input
            type="password"
            placeholder="..und Passwort."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 m-2 border border-white bg-black text-white rounded"
          />
          <button className="btn-kai hover:animate-none shake-it hover:shake-it-none op30 hover:op100">
            3, 2, 1..
          </button>
        </div>
      </div>
    </>
  );
}
