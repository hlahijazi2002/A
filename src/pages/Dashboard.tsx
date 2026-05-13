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

const Dashboard = () => {
  const recentCompanies = companies.slice(0, 5);

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {dashboardStats.map((s, i) => (
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
                {statIcons[i]}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 items-start">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4.5 flex justify-between items-center border-b border-slate-50">
            <h3 className="font-bold text-slate-900 text-sm">
              Recent Companies
            </h3>
            <Link
              to="/companies"
              className="text-[11px] font-bold px-4 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors inline-block"
            >
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50 text-[11px] text-slate-500 font-bold tracking-wider">
                <tr>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Industry</th>
                  <th className="px-4 py-3 ">Plan</th>
                  <th className="px-4 py-3 ">Status</th>
                  <th className="px-4 py-3 ">Users</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentCompanies.map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50/30 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3 flex items-center gap-3">
                      <div
                        className={`w-9 h-9 ${row.color} rounded-xl flex items-center justify-center font-bold text-sm shadow-sm`}
                      >
                        {row.initial}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 leading-none mb-1">
                          {row.name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium">
                          {row.ind}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-xs text-slate-500 font-medium">
                      {row.ind}
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span
                        className={`text-[9px] px-2.5 py-1 rounded-md font-bold uppercase tracking-tight ${
                          row.plan === "Enterprise"
                            ? "bg-linear-to-r from-[rgb(10,26,22)] via-[#142e29] to-[#1a5546] text-[#ff9800]"
                            : row.plan === "Pro"
                              ? "bg-teal-50 text-teal-600"
                              : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {row.plan}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-full ${
                          row.status === "Active"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${row.status === "Active" ? "bg-emerald-500" : "bg-amber-500"}`}
                        ></span>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center text-xs font-bold text-slate-700">
                      {row.users}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm mb-6">
              Platform Health
            </h3>
            <div className="space-y-6">
              {platformHealth.map((h, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[11px]  mb-2">
                    <span className="text-slate-900">{h.label}</span>
                    <span className="text-slate-800 font-bold">{h.val}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${h.color} transition-all duration-1000`}
                      style={{ width: h.w }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm mb-6">
              Recent Activity
            </h3>
            <div className="space-y-5">
              {recentActivity.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 pb-3 border-b border-slate-200 last:border-0 last:pb-0"
                >
                  <div
                    className={`w-8 h-8 ${item.bg} rounded-full flex items-center justify-center shrink-0`}
                  >
                    <Clock size={14} className={item.color} />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-slate-800">
                      {item.t}
                    </p>
                    <p className="text-[12px] text-slate-700 mt-0.5 leading-tight">
                      {item.s}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
          <h3 className="font-bold text-slate-900 text-sm mb-8">
            Companies by Plan
          </h3>
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 shrink-0">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 36 36"
              >
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
                  stroke="#B2E2D5"
                  strokeWidth="4"
                  strokeDasharray="15 100"
                  strokeDashoffset="0"
                ></circle>
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="transparent"
                  stroke="#4FD1C5"
                  strokeWidth="4"
                  strokeDasharray="35 100"
                  strokeDashoffset="-15"
                ></circle>
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="transparent"
                  stroke="#2D9A8F"
                  strokeWidth="4"
                  strokeDasharray="50 100"
                  strokeDashoffset="-50"
                ></circle>
              </svg>
            </div>

            <div className="flex-1 space-y-4">
              {companiesByPlan.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2.5 h-2.5 ${item.color} rounded-md`}
                    ></span>
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
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
          <h3 className="font-bold text-slate-900 text-sm mb-4">
            Subscription Status
          </h3>
          <div className="space-y-3 ">
            {subscriptionStatus.map((status, i) => (
              <div
                key={i}
                className="flex items-center justify-between group py-2  border-b border-slate-200 last:border-0 last:pb-0  "
              >
                <span className="text-xs font-semibold text-slate-600 w-35">
                  {status.label}
                </span>
                <div className="flex-1 h-1.5 bg-slate-50 rounded-full  overflow-hidden">
                  <div
                    className={`h-full ${status.color} rounded-full`}
                    style={{ width: status.w }}
                  ></div>
                </div>
                <span className="text-xs font-bold text-slate-900 w-8 text-right">
                  {status.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
          <h3 className="font-bold text-slate-900 text-sm mb-2">
            Quick Actions
          </h3>
          <div className="space-y-2">
            {[
              { label: "Add New Company", icon: <ShieldCheck size={18} /> },
              { label: "Invite Admin User", icon: <UserPlus size={18} /> },
              { label: "View Audit Logs", icon: <FileText size={18} /> },
              { label: "Emissions Report", icon: <Leaf size={18} /> },
            ].map((action, i) => (
              <div
                key={i}
                className="group flex items-center justify-between py-1 px-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-teal-50/50 text-teal-600 rounded-xl group-hover:bg-teal-50 transition-colors">
                    {action.icon}
                  </div>
                  <span className="text-xs font-bold text-slate-700">
                    {action.label}
                  </span>
                </div>
                <ChevronRight
                  size={14}
                  className="text-slate-300 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all"
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
