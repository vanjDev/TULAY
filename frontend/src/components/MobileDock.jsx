import { NavLink } from "react-router-dom";
import { BookOpen, Home, MessageCircle, Scale, Sparkles } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/learn", label: "Learn", icon: BookOpen },
  { to: "/kapwa", label: "Stories", icon: MessageCircle },
  { to: "/quiz", label: "Quiz", icon: Sparkles },
  { to: "/pledge", label: "Pledge", icon: Scale },
];

export default function MobileDock() {
  return (
    <nav className="mobile-dock" aria-label="Quick navigation">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => (isActive ? "dock-item active" : "dock-item")}
          >
            <span className="dock-icon" aria-hidden="true">
              <Icon size={20} strokeWidth={2} />
            </span>
            <span className="dock-label">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
