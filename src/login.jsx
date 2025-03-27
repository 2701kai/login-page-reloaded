import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="portal-effect" />
      <div className="group flex flex-col items-center justify-center min-h-screen text-center space-y-4 z-10 relative">
        {/* <h1 className="mt-2em animate-bounce-alt animation-duration-2s fw-400 op30"> */}
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
        {/* <button className="btn animate-bounce-alt animate-count-infinite"> */}
        <button className="btn-kai hover:animate-none shake-it hover:shake-it-none op30 hover:op100">
          3, 2, 1..
        </button>
      </div>
    </>
  );
}
