import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const hasFiredRef = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else if (!hasFiredRef.current) {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
      });
      hasFiredRef.current = true;
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleTrauDich = () => {
    navigate("/banana");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-6xl mb-8">Welcome to the Dashboard!</h1>
      <p className="mb-10">You've successfully logged in.</p>
      <div className="button-container">
        <button className="btn-kai btn-kai-large" onClick={handleTrauDich}>
          Trau Dich!
        </button>
        <button
          onClick={handleLogout}
          className="btn-kai hover:animate-none shake-it hover:shake-it-none op30 hover:op100"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
