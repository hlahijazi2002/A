import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
  X,
} from "lucide-react";
import { api } from "../api/client";

const SECTIONS = ["OVERVIEW", "MANAGEMENT", "SYSTEM"] as const;

const getAdminInfo = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return { name: "Super Admin", initials: "SA" };
    const payload = JSON.parse(atob(token.split(".")[1]));
    const name = payload.name || payload.email?.split("@")[0] || "Super Admin";
    const initials = name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);
    return { name, initials };
  } catch {
    return { name: "Super Admin", initials: "SA" };
  }
};

const SidebarContent = ({ onClose }: { onClose?: () => void }) => {
  const [badges, setBadges] = useState({ subscriptions: 0, notifications: 0 });
  const navigate = useNavigate();
  const admin = getAdminInfo();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  useEffect(() => {
    api
      .get("/analytics/summary")
      .then((res) => {
        const data = res.data || res;
        setBadges({
          subscriptions: data.newOrgs30d || 0,
          notifications: 0,
        });
      })
      .catch(() => {});
  }, []);

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
      badge: badges.subscriptions || undefined,
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
      badge: badges.notifications || undefined,
    },
    {
      title: "Settings",
      icon: <Settings size={16} />,
      section: "SYSTEM",
      path: "/settings",
    },
  ];

  return (
    <>
      <div className="h-14 flex items-center justify-between px-4 border-b border-slate-200/60 shrink-0">
        <img className="w-30 h-30" src="/logo.png" alt="logo" />
        <div className="flex items-center gap-2">
          <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-bold">
            ADMIN
          </span>
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-1 rounded-md text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

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
                      <span className={isActive ? "text-white" : "text-slate-400"}>
                        {item.icon}
                      </span>
                      <span>{item.title}</span>
                      {item.badge ? (
                        <span className="ml-auto bg-amber-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full">
                          {item.badge}
                        </span>
                      ) : null}
                    </>
                  )}
                </NavLink>
              ))}
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-200 bg-white shrink-0">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div className="w-7 h-7 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold text-xs shrink-0">
            {admin.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold text-slate-900 truncate">{admin.name}</p>
            <p className="text-[9px] text-slate-500 truncate">Platform Admin</p>
          </div>
          <button onClick={handleLogout}>
            <LogOut size={14} className="text-slate-400 hover:text-red-500 transition-colors" />
          </button>
        </div>
      </div>
    </>
  );
};

const Sidebar = ({
  mobileOpen,
  onClose,
}: {
  mobileOpen: boolean;
  onClose: () => void;
}) => {
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <aside className="hidden md:flex w-56 lg:w-60 h-screen bg-slate-50 border-r border-slate-200 flex-col shrink-0">
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside
        className={`md:hidden fixed top-0 left-0 z-50 h-screen w-64 bg-slate-50 border-r border-slate-200 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <SidebarContent onClose={onClose} />
      </aside>
    </>
  );
};

export default Sidebar;