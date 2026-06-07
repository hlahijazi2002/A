import { useState } from "react";
import {
  Plus,
  Download,
  Search,
  Eye,
  Edit2,
  Ban,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { planClass } from "../utils/helpers";
import LoadingSpinner from "../components/LoadingSpinner";
import useFetch from "../hooks/useFetch";
import type { Company } from "../../data/data";

const statusClass = (status: string) => {
  if (status === "Active")
    return { dot: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-600" };
  if (status === "Trial")
    return { dot: "bg-amber-500", badge: "bg-amber-50 text-amber-600" };
  return { dot: "bg-rose-500", badge: "bg-rose-50 text-rose-600" };
};

const TABS = ["All Companies", "Active", "Trial", "Suspended", "Churned"];

const CompanyManagement = () => {
  const [activeTab, setActiveTab] = useState("All Companies");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [planFilter, setPlanFilter] = useState("");

  const tabParam =
    activeTab === "Active"
      ? "&isActive=true"
      : activeTab === "Suspended"
        ? "&isActive=false"
        : "";

  const planParam = planFilter ? `&subscriptionPlan=${planFilter}` : "";
  const { data, loading } = useFetch<{ data: Company[] }>(
    `/orgs?limit=20&page=${currentPage}${tabParam}${planParam}&search=${search}`,
    {
      data: [],
    },
  );
  const total = data?.data?.total || data?.total || 0;
  const totalPages = Math.ceil(total / 20);

  const rawData = Array.isArray(data?.data?.data)
    ? data.data.data
    : Array.isArray(data?.data)
      ? data.data
      : [];
  const companies = rawData
    .map((org: any) => ({
      ...org,
      status: org.isActive ? "Active" : "Suspended",
      ind: org.sector || "N/A",
      plan: org.subscriptionPlan || "Starter",
      initial: org.name?.charAt(0).toUpperCase(),
      color: "bg-teal-50 text-teal-600",
      users: org.employeesCount || 0,
      emissions: "—",
      joined: org.createdAt
        ? new Date(org.createdAt).toLocaleDateString()
        : "—",
    }))
    .filter((row: any) => {
      const matchTab =
        activeTab === "All Companies" || row.status === activeTab;
      const matchSearch = row.name.toLowerCase().includes(search.toLowerCase());
      return matchTab && matchSearch;
    });
  return (
    <div className="min-h-screen bg-slate-50/30 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-start gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Company Management
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {data?.data?.total || data?.total || 0} companies registered
          </p>
        </div>

        <Link
          to="/addCompany"
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-[11px] font-bold shadow-sm transition-all"
        >
          <Plus size={14} /> Add Company
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${
              activeTab === tab
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 bg-slate-50 rounded-lg text-xs w-52 focus:ring-1 focus:ring-teal-500 outline-none"
              />
            </div>
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 outline-none"
            >
              <option value="">All Plans</option>
              <option value="STARTER">Starter</option>
              <option value="PROFESSIONAL">Professional</option>
              <option value="ENTERPRISE">Enterprise</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-[11px] text-slate-500 font-bold tracking-wide">
              <tr>
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
              {loading ? (
                <tr>
                  <td colSpan={9}>
                    <LoadingSpinner />
                  </td>
                </tr>
              ) : (
                companies.map((row) => {
                  const status = row.isActive ? "Active" : "Suspended";
                  const s = statusClass(status);
                  return (
                    <tr
                      key={row.id}
                      className="hover:bg-slate-50/50 transition-colors relative"
                    >
                      <td className="px-4 py-4">
                        <Link
                          to={`/companyProfile/${row.id}`}
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
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${s.dot}`}
                          />
                          {status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-[11px] text-slate-400">
                        {row.joined}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2.5 text-slate-400 relative z-20">
                          <Link to={`/companyProfile/${row.id}`}>
                            <Eye
                              size={14}
                              className="cursor-pointer hover:text-teal-600 transition-colors"
                            />
                          </Link>
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
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 flex flex-wrap justify-between items-center gap-3 border-t border-slate-50">
          <p className="text-xs text-slate-400">
            Showing {companies.length} of{" "}
            {data?.data?.total || data?.total || 0} companies
          </p>
          <div className="flex items-center gap-1">
            <button className="p-1.5 text-slate-300 hover:text-slate-600">
              <ChevronLeft size={15} />
            </button>
            {Array.from(
              { length: Math.min(totalPages, 3) },
              (_, i) => i + 1,
            ).map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-7 h-7 flex items-center justify-center rounded-lg text-[11px] font-bold transition-all ${
                  p === currentPage
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
};

export default CompanyManagement;
