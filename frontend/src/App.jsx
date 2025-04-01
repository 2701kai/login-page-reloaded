import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./routes/Login/Login";
import WelcomePage from "./routes/Welcome/Welcome";
import GirlsDayPage from "./routes/GirlsDay/GirlsDay";
import DashboardPage from "./routes/Dashboard/Dashboard";
import BananaPage from "./routes/Banana/Banana";
import UndJetztPage from "./routes/UndJetzt/UndJetzt";
import AboutPage from "./routes/About/About";

import CreditsPage from "./routes/Credits/Credits";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route element={<LoginPage />} index />
          <Route element={<LoginPage />} path="login" />
          <Route element={<LoginPage />} path="home" />
          <Route element={<LoginPage />} path="start" />
        </Route>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/girls-day" element={<GirlsDayPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/banana" element={<BananaPage />} />
        <Route path="/und-jetzt" element={<UndJetztPage />} />
        <Route path="/credits" element={<CreditsPage />} />;
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<h1>404 not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
