import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  Building2,
  Users,
  CreditCard,
  Handshake,
  FileText,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const SECTIONS = ["OVERVIEW", "MANAGEMENT", "SYSTEM"] as const;

const menuItems = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard size={16} />,
    section: "OVERVIEW",
    path: "/dashboard",
  },
  {
    title: "Emissions Analytics",
    icon: <BarChart3 size={16} />,
    section: "OVERVIEW",
    path: "/analytics",
  },
  {
    title: "Company Management",
    icon: <Building2 size={16} />,
    section: "MANAGEMENT",
    path: "/companies",
  },
  {
    title: "User & Access",
    icon: <Users size={16} />,
    section: "MANAGEMENT",
    path: "/users",
  },
  {
    title: "Subscriptions",
    icon: <CreditCard size={16} />,
    section: "MANAGEMENT",
    path: "/subscription",
    badge: 3,
  },
  {
    title: "Partner Management",
    icon: <Handshake size={16} />,
    section: "MANAGEMENT",
    path: "/partners",
  },
  {
    title: "Audit Logs",
    icon: <FileText size={16} />,
    section: "SYSTEM",
    path: "/logs",
  },
  {
    title: "Notifications",
    icon: <Bell size={16} />,
    section: "SYSTEM",
    path: "/notifications",
    badge: 7,
  },
  {
    title: "Settings",
    icon: <Settings size={16} />,
    section: "SYSTEM",
    path: "/settings",
  },
];

// Exported so Navbar or Layout can use it too
export const HamburgerButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="md:hidden p-1.5 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
    aria-label="Open menu"
  >
    <Menu size={20} />
  </button>
);

const SidebarContent = ({ onClose }: { onClose?: () => void }) => (
  <>
    {/* Logo */}
    <div className="h-14 flex items-center justify-between px-4 border-b border-slate-200/60 shrink-0">
      <div className="flex items-center gap-2">
        <img className="w-7 h-7" src="/logo.png" alt="logo" />
        <span className="font-bold text-slate-800 text-sm tracking-tight">
          URIMPACT
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-bold">
          ADMIN
        </span>
        {/* Close button — only visible on mobile */}
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1 rounded-md text-slate-400 hover:text-slate-700 transition-colors"
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>

    {/* Nav */}
    <nav className="flex-1 overflow-y-auto p-3">
      {SECTIONS.map((section) => (
        <div key={section} className="mb-4">
          <p className="text-[10px] font-semibold text-slate-400 mb-1.5 px-2 tracking-widest">
            {section}
          </p>
          {menuItems
            .filter((item) => item.section === section)
            .map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all mb-0.5 ${
                    isActive
                      ? "bg-teal-600 text-white shadow-sm"
                      : "text-slate-500 hover:bg-slate-200 hover:text-slate-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={isActive ? "text-white" : "text-slate-400"}
                    >
                      {item.icon}
                    </span>
                    <span>{item.title}</span>
                    {item.badge && (
                      <span className="ml-auto bg-amber-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
        </div>
      ))}
    </nav>

    {/* User */}
    <div className="p-3 border-t border-slate-200 bg-white shrink-0">
      <div className="flex items-center gap-2 px-2 py-1.5">
        <div className="w-7 h-7 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold text-xs shrink-0">
          SA
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-bold text-slate-900 truncate">
            Super Admin
          </p>
          <p className="text-[9px] text-slate-500 truncate">Platform Admin</p>
        </div>
        <Link to="/login">
          <LogOut
            size={14}
            className="text-slate-400 hover:text-red-500 transition-colors"
          />
        </Link>
      </div>
    </div>
  </>
);

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close on resize to md+
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/*  Desktop sidebar  */}
      <aside className="hidden md:flex w-56 lg:w-60 h-screen bg-slate-50 border-r border-slate-200 flex-col shrink-0">
        <SidebarContent />
      </aside>

      {/* ── Mobile: hamburger button */}
      <div className="md:hidden fixed top-0 left-0 z-30 h-14 flex items-center px-4">
        <HamburgerButton onClick={() => setMobileOpen(true)} />
      </div>

      {/* ── Mobile: backdrop ── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile: drawer ── */}
      <aside
        className={`md:hidden fixed top-0 left-0 z-50 h-screen w-64 bg-slate-50 border-r border-slate-200 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <SidebarContent onClose={() => setMobileOpen(false)} />
      </aside>
    </>
  );
};

export default Sidebar;
