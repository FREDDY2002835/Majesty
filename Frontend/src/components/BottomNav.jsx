import { Link, useLocation } from "react-router-dom";

const icon = (d) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);

const items = [
  { label: "Translate", to: "/dashboard", icon: icon(<><path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></>) },
  { label: "History", to: "/dashboard/history", icon: icon(<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>) },
  { label: "Saved", to: "/dashboard/saved", icon: icon(<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>) },
  { label: "Languages", to: "/dashboard/languages", icon: icon(<><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>) },
  { label: "Profile", to: "/dashboard/profile", icon: icon(<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>) },
];

export default function BottomNav() {
  const { pathname } = useLocation();
  if (!pathname.startsWith("/dashboard")) return null;
  const current = pathname.toLowerCase().replace(/\/$/, "");
  return (
    <nav className="bottom-nav">
      {items.map((i) => (
        <Link key={i.to} to={i.to} className={current === i.to ? "active" : ""}>
          {i.icon}
          {i.label}
        </Link>
      ))}
    </nav>
  );
}
