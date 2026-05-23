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
  Clock,
  ShieldCheck,
  UserPlus,
  FileText,
  Leaf,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  dashboardStats,
  companies,
  platformHealth,
  recentActivity,
  companiesByPlan,
  subscriptionStatus,
} from "../../data/data";

const statIcons = [
  <Building2 size={18} />,
  <Users size={18} />,
  <DollarSign size={18} />,
  <Smile size={18} className="text-orange-400" />,
];

const planClass = (plan: string) => {
  if (plan === "Enterprise")
    return "bg-linear-to-r from-[#0a1a16] via-[#142e29] to-[#1a5546] text-amber-400";
  if (plan === "Pro") return "bg-teal-50 text-teal-600";
  return "bg-slate-100 text-slate-500";
};

const Dashboard = () => {
  const recentCompanies = companies.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#f8fafc] space-y-6">
      {/*  Header  */}
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">
            Platform Overview
          </h1>
          <p className="text-[13px] text-slate-400 mt-1">
            Real-time insights across all companies and users
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 border border-slate-200 px-4 py-2 rounded-lg text-[11px] font-bold text-slate-600">
            <Calendar size={14} /> Jan 2024 - Dec 2024
          </button>
          <Link
            to="/addCompany"
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-[11px] font-bold shadow-sm transition-all"
          >
            <Plus size={14} /> Add Company
          </Link>
        </div>
      </div>

      {/*  KPI Cards  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {dashboardStats.map((s, i) => (
          <Link
            key={i}
            to={s.path}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm block"
          >
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {s.label}
            </p>
            <p className="text-[9px] text-slate-400 mt-0.5 mb-3">{s.sub}</p>
            <div className="flex justify-between items-center">
              <p className="text-2xl font-black text-slate-900">{s.val}</p>
              <div className={`p-2.5 ${s.bg} rounded-xl text-slate-600`}>
                {statIcons[i]}
              </div>
            </div>
            <p className="text-[10px] font-bold flex items-center gap-1 text-emerald-600 mt-3">
              {s.trend.startsWith("+") ? (
                <ArrowUpRight size={12} />
              ) : (
                <ArrowDownRight size={12} />
              )}
              {s.trend}
            </p>
          </Link>
        ))}
      </div>

      {/*  Recent Companies + Side cards  */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex justify-between items-center px-5 py-4 border-b border-slate-50">
            <h3 className="font-bold text-slate-900 text-sm">
              Recent Companies
            </h3>
            <Link
              to="/companies"
              className="text-[11px] font-bold px-4 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-[11px] text-slate-500 font-bold">
                <tr>
                  {["Company", "Industry", "Plan", "Status", "Users"].map(
                    (h) => (
                      <th key={h} className="px-4 py-3">
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentCompanies.map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50/30 transition-colors cursor-pointer relative"
                  >
                    <td className="px-4 py-3">
                      <Link
                        to="/companyProfile"
                        className="absolute inset-0 z-10"
                      />
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 ${row.color} rounded-xl flex items-center justify-center font-bold text-sm shadow-sm`}
                        >
                          {row.initial}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">
                            {row.name}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {row.ind}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {row.ind}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-[9px] px-2.5 py-1 rounded-md font-bold uppercase ${planClass(row.plan)}`}
                      >
                        {row.plan}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-full ${row.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${row.status === "Active" ? "bg-emerald-500" : "bg-amber-500"}`}
                        />
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs font-bold text-slate-700">
                      {row.users}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm mb-4">
              Platform Health
            </h3>
            <div className="space-y-4">
              {platformHealth.map((h, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[11px] mb-1.5">
                    <span className="text-slate-700">{h.label}</span>
                    <span className="font-bold text-slate-800">{h.val}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${h.color} transition-all duration-700`}
                      style={{ width: h.w }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentActivity.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0"
                >
                  <div
                    className={`w-8 h-8 ${item.bg} rounded-full flex items-center justify-center shrink-0`}
                  >
                    <Clock size={13} className={item.color} />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-slate-800">
                      {item.t}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {item.s}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/*  Bottom row  */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Donut */}
        <Link
          to="/companies"
          className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm block"
        >
          <h3 className="font-bold text-slate-900 text-sm mb-6">
            Companies by Plan
          </h3>
          <div className="flex items-center gap-6">
            <svg className="w-24 h-24 shrink-0 -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="15.9"
                fill="transparent"
                stroke="#f1f5f9"
                strokeWidth="4"
              />
              <circle
                cx="18"
                cy="18"
                r="15.9"
                fill="transparent"
                stroke="#B2E2D5"
                strokeWidth="4"
                strokeDasharray="15 100"
                strokeDashoffset="0"
              />
              <circle
                cx="18"
                cy="18"
                r="15.9"
                fill="transparent"
                stroke="#4FD1C5"
                strokeWidth="4"
                strokeDasharray="35 100"
                strokeDashoffset="-15"
              />
              <circle
                cx="18"
                cy="18"
                r="15.9"
                fill="transparent"
                stroke="#2D9A8F"
                strokeWidth="4"
                strokeDasharray="50 100"
                strokeDashoffset="-50"
              />
            </svg>
            <div className="space-y-3 flex-1">
              {companiesByPlan.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 ${item.color} rounded-sm`} />
                    <span className="text-xs font-semibold text-slate-600">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-500">
                    {item.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Link>

        {/* Subscription Status */}
        <Link
          to="/companies"
          className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm block"
        >
          <h3 className="font-bold text-slate-900 text-sm mb-4">
            Subscription Status
          </h3>
          <div className="space-y-2">
            {subscriptionStatus.map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0"
              >
                <span className="text-xs font-semibold text-slate-600 w-20 shrink-0">
                  {s.label}
                </span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${s.color} rounded-full`}
                    style={{ width: s.w }}
                  />
                </div>
                <span className="text-xs font-bold text-slate-900 w-6 text-right">
                  {s.count}
                </span>
              </div>
            ))}
          </div>
        </Link>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
          <h3 className="font-bold text-slate-900 text-sm mb-3">
            Quick Actions
          </h3>
          <div className="space-y-1">
            {[
              {
                label: "Add New Company",
                icon: <ShieldCheck size={16} />,
                path: "/addCompany",
              },
              {
                label: "Invite Admin User",
                icon: <UserPlus size={16} />,
                path: "/users",
              },
              {
                label: "View Audit Logs",
                icon: <FileText size={16} />,
                path: "/logs",
              },
              {
                label: "Emissions Report",
                icon: <Leaf size={16} />,
                path: "/analytics",
              },
            ].map((a, i) => (
              <Link
                key={i}
                to={a.path}
                className="group flex items-center justify-between px-2 py-2 rounded-xl hover:bg-slate-50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-50 text-teal-600 rounded-lg group-hover:bg-teal-100 transition-colors">
                    {a.icon}
                  </div>
                  <span className="text-xs font-bold text-slate-700">
                    {a.label}
                  </span>
                </div>
                <ChevronRight
                  size={13}
                  className="text-slate-300 group-hover:text-teal-500 transition-all"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
