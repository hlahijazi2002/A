import { Search, Bell, X, Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const getPageName = (pathname: string): string => {
  const parts = pathname.split("/").filter(Boolean);
  if (!parts.length) return "Dashboard";
  return parts[parts.length - 1]
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

interface AdminInfo {
  name: string;
  role: string;
  initials: string;
}

const getAdminFromToken = (): AdminInfo => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return { name: "Admin", role: "ADMIN", initials: "A" };
    const payload = JSON.parse(atob(token.split(".")[1]));
    const name = payload.name || payload.email?.split("@")[0] || "Admin";
    const initials = name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    return { name, role: payload.role || "ADMIN", initials };
  } catch {
    return { name: "Admin", role: "ADMIN", initials: "A" };
  }
};

const Navbar = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  const { pathname } = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [admin] = useState<AdminInfo>(getAdminFromToken());

  return (
    <header className="h-14 bg-white border-b border-slate-100 sticky top-0 z-10 w-full">
      <div className="h-full flex items-center justify-between px-4 md:px-6">
        {/* Left side */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="md:hidden p-1.5 rounded-md text-slate-500 hover:bg-slate-100 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          {!searchOpen && (
            <div className="flex items-center gap-1.5 text-xs text-slate-400 whitespace-nowrap">
              <span className="shrink-0">Admin</span>
              <span className="font-light shrink-0">›</span>
              <span className="text-slate-900 font-bold truncate max-w-30 sm:max-w-none">
                {getPageName(pathname)}
              </span>
            </div>
          )}
        </div>

        {/* Mobile search input */}
        {searchOpen && (
          <div className="flex-1 flex items-center gap-2 md:hidden mx-3">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={13}
              />
              <input
                type="text"
                placeholder="Search companies, users..."
                autoFocus
                className="w-full pl-8 pr-4 py-1.5 bg-slate-50 border border-slate-100 text-xs rounded-md outline-none focus:border-teal-400 transition-colors"
              />
            </div>
            <button
              onClick={() => setSearchOpen(false)}
              className="p-1 text-slate-500"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Right side */}
        <div
          className={`flex items-center gap-2 md:gap-3 ${searchOpen ? "md:flex hidden" : "flex"}`}
        >
          {/* Desktop search */}
          <div className="relative hidden md:block">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={13}
            />
            <input
              type="text"
              placeholder="Search companies, users..."
              className="pl-8 pr-4 py-1.5 bg-slate-50 border border-slate-100 text-xs w-48 rounded-md outline-none focus:border-teal-400 transition-colors"
            />
          </div>

          {/* Mobile search toggle */}
          <button
            className="md:hidden p-1 text-slate-500"
            onClick={() => setSearchOpen(true)}
          >
            <Search size={17} />
          </button>

          {/* Role badge */}
          <div className="hidden sm:flex bg-linear-to-r from-[#0a1a16] via-[#142e29] to-[#1a5546] rounded-full border border-white/5">
            <span className="text-[10px] px-2.5 py-1 font-black text-amber-400 uppercase tracking-wide">
              {admin.role.replace(/_/g, " ")}
            </span>
          </div>

          {/* Notifications */}
          <Link to="/notifications" className="relative p-1">
            <Bell size={17} className="text-slate-500" />
            <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
          </Link>

          {/* Avatar */}
          <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-[11px] font-bold cursor-pointer select-none shrink-0">
            {admin.initials}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
