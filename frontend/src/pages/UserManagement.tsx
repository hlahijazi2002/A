import {
  Download,
  UserPlus,
  Search,
  ChevronDown,
  Edit2,
  Lock,
  Ban,
  ChevronLeft,
  ChevronRight,
  User,
  ShieldCheck,
  Award,
  Check,
} from "lucide-react";
import { users, userStats } from "../../data/data";

const statIcons = [
  <User size={17} className="text-teal-500" />,
  <ShieldCheck size={17} className="text-teal-100" />,
  <Award size={17} className="text-teal-500" />,
  <Ban size={17} className="text-rose-400" />,
];

const statIconBg = ["bg-teal-50", "bg-slate-800", "bg-teal-50", "bg-rose-50"];

const roleStyles: Record<string, string> = {
  "Super Admin":
    "bg-linear-to-r from-[#0a1a16] via-[#142e29] to-[#1a5546] text-amber-400 font-black",
  Admin: "bg-teal-50 text-teal-700 font-bold",
  Analyst: "bg-blue-50 text-blue-600 font-bold",
  Viewer: "bg-slate-100 text-slate-500 font-bold",
};

const statusStyles: Record<string, { dot: string; badge: string }> = {
  Active: { dot: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-600" },
  Trial: { dot: "bg-amber-400", badge: "bg-amber-50 text-amber-600" },
  Suspended: { dot: "bg-rose-500", badge: "bg-rose-50 text-rose-600" },
};

const UserManagement = () => (
  <div className="min-h-screen bg-slate-50/30 space-y-6">
    {/* Header */}
    <div className="flex flex-wrap justify-between items-start gap-3">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          User & Access Management
        </h1>
        <p className="text-[13px] text-slate-400 mt-1">
          2,341 users across 148 companies
        </p>
      </div>
      <div className="flex gap-2">
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-[12px] font-bold text-slate-600 hover:bg-slate-50 transition-colors">
          <Download size={14} /> Export
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-[12px] font-bold shadow-sm transition-all">
          <UserPlus size={14} /> Invite User
        </button>
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {userStats.map((stat, i) => (
        <div
          key={i}
          className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm"
        >
          <div className="flex justify-between items-start mb-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
              {stat.label}
            </p>
            <div className={`p-2 ${statIconBg[i]} rounded-xl`}>
              {statIcons[i]}
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mb-1">
            {stat.value}
          </p>
          {stat.sub && <p className="text-[11px] text-slate-400">{stat.sub}</p>}
          {stat.trend && (
            <p
              className={`text-[10px] font-bold flex items-center gap-1 mt-1 ${stat.trendUp ? "text-emerald-500" : "text-rose-500"}`}
            >
              <span>{stat.trendUp ? "▲" : "▼"}</span>
              {stat.trend}
            </p>
          )}
        </div>
      ))}
    </div>

    {/* Table */}
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-4 flex flex-wrap justify-between items-center gap-3 border-b border-slate-50">
        <h2 className="font-bold text-slate-800 text-sm">All Users</h2>
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
              size={14}
            />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="pl-9 pr-4 py-2 bg-slate-50 rounded-lg text-xs w-52 focus:ring-1 focus:ring-teal-500 outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 font-bold">
            All Roles <ChevronDown size={13} className="text-slate-400" />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 font-bold">
            All Companies <ChevronDown size={13} className="text-slate-400" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 text-[11px] text-slate-500 font-bold tracking-wide border-b border-slate-100">
            <tr>
              <th className="px-5 py-4">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 text-teal-600"
                />
              </th>
              {[
                "User",
                "Company",
                "Role",
                "Last Active",
                "Status",
                "2FA",
                "Actions",
              ].map((h) => (
                <th key={h} className="px-5 py-4">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map((user, i) => {
              const st = statusStyles[user.status] ?? statusStyles.Active;
              return (
                <tr key={i} className="hover:bg-slate-50/40 transition-colors">
                  <td className="px-5 py-4">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300 text-teal-600"
                    />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 ${user.avatarColor} rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0`}
                      >
                        {user.initials}
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-slate-800">
                          {user.name}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-500">
                    {user.company}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`text-[10px] px-2.5 py-1 rounded-md uppercase tracking-tight ${roleStyles[user.role] ?? roleStyles.Viewer}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[11px] text-slate-400">
                    {user.lastActive}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-full ${st.badge}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {user.twoFA ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                        <Check size={12} strokeWidth={3} /> On
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-300">Off</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5 text-slate-300">
                      <Edit2
                        size={14}
                        className="cursor-pointer hover:text-teal-600 transition-colors"
                      />
                      <Lock
                        size={14}
                        className="cursor-pointer hover:text-teal-600 transition-colors"
                      />
                      <Ban
                        size={14}
                        className="cursor-pointer hover:text-rose-500 transition-colors"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-4 flex flex-wrap justify-between items-center gap-3 border-t border-slate-50">
        <p className="text-xs text-slate-400">Showing 1–8 of 2,341 users</p>
        <div className="flex items-center gap-1">
          <button className="p-1.5 text-slate-300 hover:text-slate-600">
            <ChevronLeft size={15} />
          </button>
          {[1, 2, 3, "...", 293].map((n, i) => (
            <button
              key={i}
              className={`w-7 h-7 flex items-center justify-center rounded-lg text-[11px] font-bold ${
                n === 1
                  ? "bg-teal-600 text-white"
                  : "text-slate-400 hover:bg-slate-50"
              }`}
            >
              {n}
            </button>
          ))}
          <button className="p-1.5 text-slate-400 hover:text-slate-600">
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default UserManagement;
