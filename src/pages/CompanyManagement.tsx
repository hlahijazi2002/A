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

const CompanyManagement = () => {
  return (
    <div className=" bg-slate-50/30 min-h-screen font-sans">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Company Management
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            148 companies registered · 128 active
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-[12px] font-bold text-slate-600 transition-colors">
            <Download size={16} /> Export CSV
          </button>
          <Link
            to="/addCompany"
            className="bg-[#0d9488] hover:bg-[#0c8379] text-white px-4 py-2 rounded-lg text-[11px] font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <Plus size={16} /> Add Company
          </Link>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        {["All Companies", "Active", "Trial", "Suspended", "Churned"].map(
          (tab, i) => (
            <button
              key={i}
              className={`px-5 py-2 rounded-full text-xs font-bold border transition-all ${
                i === 0
                  ? "bg-teal-50 border-teal-100 text-teal-600"
                  : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
              }`}
            >
              {tab}
            </button>
          ),
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 flex justify-between items-center border-b border-slate-50 bg-white">
          <h2 className="font-bold text-slate-800 text-sm">All Companies</h2>
          <div className="flex gap-3">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
                size={16}
              />
              <input
                type="text"
                placeholder="Search company name..."
                className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-xs w-64 focus:ring-1 focus:ring-teal-500 outline-none"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg text-xs font-bold text-slate-500">
              <Filter size={14} /> Filters
            </button>
            <button className="flex items-center justify-between gap-4 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 min-w-30">
              Logistics <ChevronDown size={14} className="text-slate-400" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[11px] text-slate-500 font-bold  tracking-wider">
                <th className="px-6 py-4">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-teal-600"
                  />
                </th>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Industry</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4 text-center">Users</th>
                <th className="px-6 py-4">Emissions(tCO₂e)</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {companies.map((row, i) => (
                <tr
                  key={i}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300 text-teal-600"
                    />
                  </td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div
                      className={`w-9 h-9 ${row.color} rounded-xl flex items-center justify-center font-bold text-sm shrink-0`}
                    >
                      {row.initial}
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-800 leading-none mb-1">
                        {row.name}
                      </p>
                      <p className="text-[10px] text-slate-300 font-medium uppercase tracking-tighter">
                        ID: {row.id}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 font-medium">
                    {row.ind}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-[9px] px-2.5 py-1 rounded-md font-bold uppercase tracking-tight ${
                        row.plan === "Enterprise"
                          ? "bg-linear-to-r from-[rgb(10,26,22)] via-[#142e29] to-[#1a5546] text-[#ff9800]"
                          : row.plan === "Pro"
                            ? "bg-teal-50 text-teal-600"
                            : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {row.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-xs font-bold text-slate-700">
                    {row.users}
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-700">
                    {row.emissions}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-full ${
                        row.status === "Active"
                          ? "bg-emerald-50 text-emerald-600"
                          : row.status === "Trial"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-rose-50 text-rose-600"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          row.status === "Active"
                            ? "bg-emerald-500"
                            : row.status === "Trial"
                              ? "bg-amber-500"
                              : "bg-rose-500"
                        }`}
                      ></span>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[11px] text-slate-400 font-medium">
                    {row.joined}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3 text-slate-400">
                      <Eye
                        size={14}
                        className="cursor-pointer hover:bg-teal-50 hover:text-teal-600 transition-colors"
                      />
                      <Edit2
                        size={14}
                        className="cursor-pointer hover:bg-teal-50 hover:text-teal-600 transition-colors"
                      />
                      <Ban
                        size={14}
                        className="cursor-pointer hover:bg-teal-50 hover:text-teal-600 transition-colors"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-5 flex justify-between items-center bg-white border-t border-slate-50">
          <p className="text-xs text-slate-400 font-medium">
            Showing 1–8 of 148 companies
          </p>
          <div className="flex items-center gap-1">
            <button className="p-2 text-slate-300 hover:text-slate-600">
              <ChevronLeft size={16} />
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#2D9A8F] text-white text-[11px] font-bold">
              1
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 text-[11px] font-bold">
              2
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 text-[11px] font-bold">
              3
            </button>
            <span className="text-slate-300 mx-1">...</span>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 text-[11px] font-bold">
              19
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyManagement;
