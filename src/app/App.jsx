import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import ToastHost from "../components/ToastHost";

import Home from "../pages/Home";
import Favorites from "../pages/Favorites";
import Games from "../pages/Games";
import Events from "../pages/Events";
import Admin from "../pages/Admin";
import Settings from "../pages/Settings";

import { getDarkMode } from "../store/settingsStore";

export default function App() {
  // Apply theme on first load
  const dark = getDarkMode();
  document.body.classList.toggle("dark", dark);

  return (
    <>
      <Header />
      <ToastHost />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/games" element={<Games />} />
        <Route path="/events" element={<Events />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>

      <BottomNav />
    </>
  );
}
