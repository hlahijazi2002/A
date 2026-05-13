import {
  Building2,
  Users,
  DollarSign,
  Smile,
  Plus,
  Calendar,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] ">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">
            Platform Overview
          </h1>
          <p className="text-[13px] text-slate-400 font-medium mt-1">
            Real-time insights across all companies and users
          </p>
        </div>
        <div className="flex gap-3">
          <button className=" border border-slate-200 px-4 py-2 rounded-lg text-[11px] font-bold text-slate-600 flex items-center gap-2 ">
            <Calendar size={14} /> Jan 2024 - Dec 2024
          </button>
          <button className="bg-[#0d9488] hover:bg-[#0c8379] text-white px-4 py-2 rounded-lg text-[11px] font-bold flex items-center gap-2 shadow-sm transition-all">
            <Plus size={16} /> Add Company
          </button>
        </div>
      </div>

      {/* 2. Stats Cards Grid - 4 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total Companies",
            val: "148",
            sub: "Active on platform",
            trend: "+12 this month",
            color: "text-teal-600",
            bg: "bg-teal-50",
            icon: <Building2 size={18} />,
          },
          {
            label: "Total Active Users",
            val: "2,341",
            sub: "Across all companies",
            trend: "+8.4% vs last month",
            color: "text-blue-600",
            bg: "bg-blue-50",
            icon: <Users size={18} />,
          },
          {
            label: "Platform MRR",
            val: "$84,200",
            sub: "Monthly recurring revenue",
            trend: "+14.2% vs last month",
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            icon: <DollarSign size={18} />,
          },
          {
            label: "Total Emissions Tracked",
            val: "1.84M",
            sub: "tCO2e across platform",
            trend: "-6.7% reduction vs 2023",
            color: "text-teal-600",
            bg: "bg-orange-50",
            icon: <Smile size={18} className="text-orange-400" />,
          },
        ].map((s, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden"
          >
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {s.label}
              </p>
              <p className="text-[9px] text-slate-400 mt-0.5">{s.sub}</p>
            </div>

            <div className="flex justify-between items-start mb-4">
              <p className="text-2xl font-black text-slate-900 mb-2">{s.val}</p>
              <div className={`p-2.5 ${s.bg} rounded-xl text-slate-600`}>
                {s.icon}
              </div>
            </div>
            <p
              className={`text-[10px] font-bold flex items-center gap-1 text-emerald-600`}
            >
              {s.trend.startsWith("+") ? (
                <ArrowUpRight size={12} />
              ) : (
                <ArrowDownRight size={12} />
              )}
              {s.trend}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 flex justify-between items-center border-b border-slate-50">
            <h3 className="font-bold text-slate-900 text-sm">
              Recent Companies
            </h3>
            <button className="text-[10px] font-bold  px-4 py-1.5 rounded-lg border border-slate-200 text-slate-600 transition-colors">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Industry</th>
                  <th className="px-6 py-4">Plan</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Users</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  {
                    name: "Nexgen Steels",
                    ind: "Manufacturing",
                    plan: "Enterprise",
                    status: "Active",
                    users: "42",
                    initial: "N",
                    color: "bg-teal-50 text-teal-700",
                  },
                  {
                    name: "GreenFleet Co.",
                    ind: "Logistics",
                    plan: "Pro",
                    status: "Active",
                    users: "18",
                    initial: "G",
                    color: "bg-blue-50 text-blue-700",
                  },
                  {
                    name: "SolarEdge Pvt.",
                    ind: "Energy",
                    plan: "Pro",
                    status: "Active",
                    users: "11",
                    initial: "S",
                    color: "bg-orange-50 text-orange-700",
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div
                        className={`w-8 h-8 ${row.color} rounded-lg flex items-center justify-center font-bold text-xs shadow-sm`}
                      >
                        {row.initial}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">
                          {row.name}
                        </p>
                        <p className="text-[10px] text-slate-400 italic">
                          {row.ind}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500 font-medium">
                      {row.ind}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[9px] px-2 py-1 rounded-md font-black uppercase tracking-tighter ${row.plan === "Enterprise" ? "bg-slate-900 text-white" : "bg-teal-50 text-teal-600 border border-teal-100"}`}
                      >
                        {row.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-teal-600 text-[10px] font-bold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse"></span>{" "}
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-slate-700">
                      {row.users}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Platform Health - Takes 1 col */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h3 className="font-bold text-slate-900 text-sm mb-8">
            Platform Health
          </h3>
          <div className="space-y-7">
            {[
              {
                label: "API Uptime",
                val: "99.98%",
                color: "bg-teal-500",
                w: "99%",
              },
              {
                label: "Data Processing",
                val: "94%",
                color: "bg-blue-500",
                w: "94%",
              },
              {
                label: "Storage Used",
                val: "67%",
                color: "bg-orange-400",
                w: "67%",
              },
              {
                label: "Onboarding Rate",
                val: "82%",
                color: "bg-emerald-500",
                w: "82%",
              },
            ].map((h, i) => (
              <div key={i}>
                <div className="flex justify-between text-[11px] font-bold mb-2">
                  <span className="text-slate-500">{h.label}</span>
                  <span className="text-slate-900">{h.val}</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full">
                  <div
                    className={`h-full ${h.color} rounded-full transition-all duration-1000`}
                    style={{ width: h.w }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Bottom Section: Charts & Activity - مطابق لصور image_1e8e98 و image_1e8bee */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Companies by Plan (Donut Chart) */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h3 className="font-bold text-slate-900 text-sm mb-6">
            Companies by Plan
          </h3>
          <div className="flex items-center gap-8">
            <div className="relative w-28 h-28 shrink-0">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="transparent"
                  stroke="#f1f5f9"
                  strokeWidth="4"
                ></circle>
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="transparent"
                  stroke="#0f172a"
                  strokeWidth="4"
                  strokeDasharray="50 100"
                  strokeDashoffset="25"
                ></circle>
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="transparent"
                  stroke="#2dd4bf"
                  strokeWidth="4"
                  strokeDasharray="35 100"
                  strokeDashoffset="75"
                ></circle>
              </svg>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                <span className="w-2 h-2 bg-slate-900 rounded-full"></span>{" "}
                Enterprise <span className="ml-auto text-slate-400">50%</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                <span className="w-2 h-2 bg-teal-400 rounded-full"></span> Pro{" "}
                <span className="ml-auto text-slate-400">35%</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                <span className="w-2 h-2 bg-slate-200 rounded-full"></span>{" "}
                Starter <span className="ml-auto text-slate-400">15%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h3 className="font-bold text-slate-900 text-sm mb-6">
            Recent Activity
          </h3>
          <div className="space-y-6">
            {[
              {
                t: "New company onboarded",
                s: "Nexgen Steels joined Enterprise plan",
                time: "12 min ago",
                bg: "bg-teal-50",
                icon: <Plus size={14} className="text-teal-600" />,
              },
              {
                t: "User role changed",
                s: "Priya S. promoted to Admin at GreenFleet",
                time: "1h ago",
                bg: "bg-blue-50",
                icon: <Users size={14} className="text-blue-600" />,
              },
              {
                t: "Trial expiring",
                s: "RetailCore Inc. trial ends in 2 days",
                time: "3h ago",
                bg: "bg-orange-50",
                icon: <Calendar size={14} className="text-orange-600" />,
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 relative">
                {i !== 2 && (
                  <div className="absolute left-4 top-8 w-px h-6 bg-slate-100"></div>
                )}
                <div
                  className={`w-8 h-8 ${item.bg} rounded-lg flex items-center justify-center shrink-0`}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-[11px] font-black text-slate-800">
                    {item.t}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{item.s}</p>
                  <p className="text-[9px] text-slate-300 mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h3 className="font-bold text-slate-900 text-sm mb-6">
            Quick Actions
          </h3>
          <div className="space-y-3">
            {[
              { label: "Add New Company", icon: <Building2 size={16} /> },
              { label: "Invite Admin User", icon: <Users size={16} /> },
              { label: "View Audit Logs", icon: <Calendar size={16} /> },
              { label: "Emissions Report", icon: <Smile size={16} /> },
            ].map((action, i) => (
              <div
                key={i}
                className="group flex items-center justify-between p-3.5 border border-slate-50 rounded-xl hover:bg-slate-50 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 group-hover:bg-white rounded-lg text-teal-600 transition-colors shadow-sm">
                    {action.icon}
                  </div>
                  <span className="text-[11px] font-bold text-slate-700">
                    {action.label}
                  </span>
                </div>
                <ChevronRight
                  size={14}
                  className="text-slate-300 group-hover:text-teal-600 transition-colors"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
