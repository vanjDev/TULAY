import { NavLink } from "react-router-dom";

const items = [
  { to: "/", label: "Home", icon: "🏠", end: true },
  { to: "/learn", label: "Learn", icon: "📖" },
  { to: "/kapwa", label: "Stories", icon: "💬" },
  { to: "/quiz", label: "Quiz", icon: "🪞" },
  { to: "/pledge", label: "Pledge", icon: "✊" },
];

export default function MobileDock() {
  return (
    <nav className="mobile-dock" aria-label="Quick navigation">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) => (isActive ? "dock-item active" : "dock-item")}
        >
          <span className="dock-icon" aria-hidden="true">
            {item.icon}
          </span>
          <span className="dock-label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
