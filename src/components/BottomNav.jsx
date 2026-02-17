import { NavLink } from "react-router-dom";
import { Map, Heart, Swords, CalendarDays, Shield, Settings } from "lucide-react";

function Item({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `navbtn ${isActive ? "active" : ""}`}
    >
      <Icon size={18} />
      {label}
    </NavLink>
  );
}

export default function BottomNav() {
  return (
    <div className="bottom-nav">
      <div className="bottom-nav-inner">
        <Item to="/" icon={Map} label="Courts" />
        <Item to="/favorites" icon={Heart} label="Favorites" />
        <Item to="/games" icon={Swords} label="Games" />
        <Item to="/events" icon={CalendarDays} label="Events" />
        <Item to="/admin" icon={Shield} label="Admin" />
        <Item to="/settings" icon={Settings} label="Settings" />
      </div>
    </div>
  );
}
