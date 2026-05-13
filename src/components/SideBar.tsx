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
} from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      section: "OVERVIEW",
      active: true,
    },
    {
      title: "Emissions Analytics",
      icon: <BarChart3 size={18} />,
      section: "OVERVIEW",
    },
    {
      title: "Company Management",
      icon: <Building2 size={18} />,
      section: "MANAGEMENT",
    },
    {
      title: "User & Access",
      icon: <Users size={18} />,
      section: "MANAGEMENT",
    },
    {
      title: "Subscriptions",
      icon: <CreditCard size={18} />,
      section: "MANAGEMENT",
      badge: 3,
    },
    {
      title: "Partner Management",
      icon: <Handshake size={18} />,
      section: "MANAGEMENT",
    },
    { title: "Audit Logs", icon: <FileText size={18} />, section: "SYSTEM" },
    {
      title: "Notifications",
      icon: <Bell size={18} />,
      section: "SYSTEM",
      badge: 7,
    },
    { title: "Settings", icon: <Settings size={18} />, section: "SYSTEM" },
  ];

  return (
    <aside className="w-60 h-screen bg-slate-50 border-r border-slate-200 flex flex-col font-sans">
      <div className="p-4 flex items-center justify-between border-b border-slate-200/60">
        <div className=" flex items-center gap-1">
          <img className="w-8 h-8" src="/logo.png" alt="logo" />
          <span className="font-bold text-slate-800 text-sm tracking-tight">
            URIMPACT
          </span>
        </div>
        <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-bold ml-1">
          ADMIN
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        {["OVERVIEW", "MANAGEMENT", "SYSTEM"].map((section) => (
          <div key={section} className="mb-4">
            <h3 className="text-[10px] font-semibold text-slate-400 mb-2 px-3 tracking-widest uppercase">
              {section}
            </h3>
            {menuItems
              .filter((item) => item.section === section)
              .map((item) => (
                <button
                  key={item.title}
                  className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-md transition-all mb-0.5 ${
                    item.active
                      ? "bg-[#008080] text-white shadow-sm"
                      : "text-slate-500 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  <span
                    className={item.active ? "text-white" : "text-slate-400"}
                  >
                    {item.icon}
                  </span>
                  <span className="text-xs font-medium">{item.title}</span>
                  {item.badge && (
                    <span className="ml-auto bg-amber-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-200 bg-white">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold text-xs">
            SA
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold text-slate-900 truncate leading-none">
              Super Admin
            </p>
            <p className="text-[9px] text-slate-500 truncate mt-1">
              Platform Admin
            </p>
          </div>
          <LogOut
            size={14}
            className="text-slate-400 cursor-pointer hover:text-red-500"
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
