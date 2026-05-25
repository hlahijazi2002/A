import {
  Plus,
  Download,
  Search,
  Filter,
  ChevronDown,
  Eye,
  Edit2,
  Ban,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { companies } from "../../data/data";
import { Link } from "react-router-dom";
import { planClass } from "../utils/helpers";

const statusClass = (status: string) => {
  if (status === "Active")
    return { dot: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-600" };
  if (status === "Trial")
    return { dot: "bg-amber-500", badge: "bg-amber-50 text-amber-600" };
  return { dot: "bg-rose-500", badge: "bg-rose-50 text-rose-600" };
};

const TABS = ["All Companies", "Active", "Trial", "Suspended", "Churned"];

const CompanyManagement = () => (
  <div className="min-h-screen bg-slate-50/30 space-y-6">
    {/* Header */}
    <div className="flex flex-wrap justify-between items-start gap-3">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Company Management</h1>
        <p className="text-sm text-slate-400 mt-1">
          148 companies registered · 128 active
        </p>
      </div>
      <div className="flex gap-2">
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-[12px] font-bold text-slate-600">
          <Download size={14} /> Export CSV
        </button>
        <Link
          to="/addCompany"
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-[11px] font-bold shadow-sm transition-all"
        >
          <Plus size={14} /> Add Company
        </Link>
      </div>
    </div>

    {/* Tabs */}
    <div className="flex gap-2 flex-wrap">
      {TABS.map((tab, i) => (
        <button
          key={i}
          className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${
            i === 0
              ? "bg-teal-50 border-teal-100 text-teal-600"
              : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>

    {/* Table card */}
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Table header */}
      <div className="p-4 flex flex-wrap justify-between items-center gap-3 border-b border-slate-50">
        <h2 className="font-bold text-slate-800 text-sm">All Companies</h2>
        <div className="flex gap-2 flex-wrap">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
              size={14}
            />
            <input
              type="text"
              placeholder="Search company name..."
              className="pl-9 pr-4 py-2 bg-slate-50 rounded-lg text-xs w-52 focus:ring-1 focus:ring-teal-500 outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg text-xs font-bold text-slate-500">
            <Filter size={13} /> Filters
          </button>
          <button className="flex items-center gap-3 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-700">
            Logistics <ChevronDown size={13} className="text-slate-400" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 text-[11px] text-slate-500 font-bold tracking-wide">
            <tr>
              <th className="px-5 py-3">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 text-teal-600"
                />
              </th>
              {[
                "Company",
                "Industry",
                "Plan",
                "Users",
                "Emissions (tCO₂e)",
                "Status",
                "Joined",
                "Actions",
              ].map((h) => (
                <th key={h} className="px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {companies.map((row, i) => {
              const s = statusClass(row.status);
              return (
                <tr
                  key={i}
                  className="hover:bg-slate-50/50 transition-colors relative"
                >
                  <td className="px-5 py-4">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300 text-teal-600"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <Link
                      to="/companyProfile"
                      className="absolute inset-0 z-10"
                    />
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 ${row.color} rounded-xl flex items-center justify-center font-bold text-sm shrink-0`}
                      >
                        {row.initial}
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-800">
                          {row.name}
                        </p>
                        <p className="text-[10px] text-slate-300 uppercase tracking-tight">
                          ID: {row.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-xs text-slate-500">
                    {row.ind}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`text-[9px] px-2.5 py-1 rounded-md font-bold uppercase ${planClass(row.plan)}`}
                    >
                      {row.plan}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center text-xs font-bold text-slate-700">
                    {row.users}
                  </td>
                  <td className="px-4 py-4 text-xs font-bold text-slate-700">
                    {row.emissions}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-full ${s.badge}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[11px] text-slate-400">
                    {row.joined}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2.5 text-slate-400 relative z-20">
                      <Eye
                        size={14}
                        className="cursor-pointer hover:text-teal-600 transition-colors"
                      />
                      <Edit2
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

      {/* Pagination */}
      <div className="p-4 flex flex-wrap justify-between items-center gap-3 border-t border-slate-50">
        <p className="text-xs text-slate-400">Showing 1–8 of 148 companies</p>
        <div className="flex items-center gap-1">
          <button className="p-1.5 text-slate-300 hover:text-slate-600">
            <ChevronLeft size={15} />
          </button>
          {[1, 2, 3, "...", 19].map((p, i) => (
            <button
              key={i}
              className={`w-7 h-7 flex items-center justify-center rounded-lg text-[11px] font-bold transition-all ${
                p === 1
                  ? "bg-teal-600 text-white"
                  : "text-slate-400 hover:bg-slate-50"
              }`}
            >
              {p}
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

export default CompanyManagement;
