import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";
import WelcomeJohanna from "./WelcomeJohanna";
import GirlsDay from "./GirlsDay";
import Dashboard from "./Dashboard";
import Banana from "./Banana";
import UndJetzt from "./UndJetzt";
import AboutPage from "./components/AboutPage";

import MarkdownWithAudioAndImage from "./components/MarkdownWithAudioAndImage";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/welcome" element={<WelcomeJohanna />} />
        <Route path="/girls-day" element={<GirlsDay />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/banana" element={<Banana />} />
        <Route path="/und-jetzt" element={<UndJetzt />} />
        <Route path="/credits" element={<MarkdownWithAudioAndImage />} />;
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
