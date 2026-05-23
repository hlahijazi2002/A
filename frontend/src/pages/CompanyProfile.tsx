import { useState } from "react";
import { MapPin, Briefcase, Mail, Calendar, Edit2 } from "lucide-react";
import { companyProfile } from "../../data/data";
import type { CompanyProfileModule } from "../../data/data";
import { Link } from "react-router-dom";

const Toggle = ({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: () => void;
}) => (
  <button
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${enabled ? "bg-teal-600" : "bg-slate-200"}`}
  >
    <span
      className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-6" : "translate-x-1"}`}
    />
  </button>
);

type TabName =
  | "Overview"
  | "Users"
  | "Emissions"
  | "Subscription"
  | "Activity Log";
const TABS: TabName[] = [
  "Overview",
  "Users",
  "Emissions",
  "Subscription",
  "Activity Log",
];
const SCOPE_COLORS = ["bg-teal-600", "bg-teal-400", "bg-teal-200"];

const CompanyProfile = () => {
  const p = companyProfile;
  const [activeTab, setActiveTab] = useState<TabName>("Overview");
  const [modules, setModules] = useState<CompanyProfileModule[]>(p.modules);

  const toggleModule = (id: string) =>
    setModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m)),
    );

  return (
    <div className="min-h-screen bg-slate-50/30 space-y-4">
      {/* Breadcrumb + Actions */}
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-2 text-[12px] font-medium">
          <Link to="/companies" className="text-teal-600 hover:underline">
            Companies
          </Link>
          <span className="text-slate-300">›</span>
          <span className="text-slate-700 font-bold">{p.name}</span>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-[12px] font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <Edit2 size={13} /> Edit
          </button>
          <button className="px-4 py-2 bg-white border border-amber-300 text-amber-600 rounded-lg text-[12px] font-bold hover:bg-amber-50 transition-colors">
            Suspend
          </button>
          <button className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-[12px] font-bold shadow-sm transition-colors">
            Delete
          </button>
        </div>
      </div>

      {/* Profile header */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex items-start gap-4 flex-wrap">
          <div
            className={`w-14 h-14 rounded-2xl ${p.avatarBg} ${p.avatarText} flex items-center justify-center text-2xl font-black shrink-0`}
          >
            {p.initial}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <h2 className="text-lg font-black text-slate-900">{p.name}</h2>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {p.status}
              </span>
              <span className="text-[10px] px-2.5 py-1 rounded-md font-black uppercase bg-linear-to-r from-[#0a1a16] via-[#142e29] to-[#1a5546] text-amber-400">
                {p.plan}
              </span>
            </div>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: <MapPin size={12} />, text: p.location },
                { icon: <Briefcase size={12} />, text: p.industry },
                { icon: <Mail size={12} />, text: p.adminEmail },
                { icon: <Calendar size={12} />, text: p.joinedDate },
              ].map((item, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 text-[11px] text-slate-400"
                >
                  <span className="text-slate-300">{item.icon}</span>
                  {item.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-slate-100">
        {[
          { label: "Total Users", value: String(p.stats.totalUsers) },
          { label: "tCO₂e Emissions", value: p.stats.emissions },
          { label: "Monthly Revenue", value: p.stats.monthlyRevenue },
          { label: "Data Completeness", value: p.stats.dataCompleteness },
          { label: "Modules Active", value: p.stats.modulesActive },
        ].map((stat, i) => (
          <div key={i} className="px-4 py-4 text-center">
            <p className="text-xl font-black text-slate-900 mb-1">
              {stat.value}
            </p>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex border-b border-slate-100 px-2 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-4 text-[12px] font-bold transition-all relative whitespace-nowrap ${
                activeTab === tab
                  ? "text-teal-600"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {activeTab === "Overview" && (
          <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Company Details */}
            <div className="bg-slate-50/50 rounded-xl border border-slate-100 p-5">
              <h3 className="text-[13px] font-bold text-slate-800 mb-4">
                Company Details
              </h3>
              <div className="divide-y divide-slate-100">
                {Object.entries(p.details).map(([key, val]) => (
                  <div
                    key={key}
                    className="flex items-start justify-between py-2.5 first:pt-0 last:pb-0"
                  >
                    <span className="text-[11px] text-slate-400 w-36 shrink-0">
                      {key}
                    </span>
                    <span className="text-[12px] font-bold text-slate-800 text-right">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              {/* Scope Summary */}
              <div className="bg-slate-50/50 rounded-xl border border-slate-100 p-5">
                <h3 className="text-[13px] font-bold text-slate-800 mb-4">
                  Scope Summary (2024)
                </h3>
                <div className="space-y-4">
                  {p.scopeSummary.map((scope, i) => (
                    <div key={scope.label}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-[12px] font-bold text-slate-700">
                          {scope.label}
                        </span>
                        <span className="text-[12px] font-bold text-slate-700">
                          {scope.display}
                        </span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${SCOPE_COLORS[i]} rounded-full transition-all duration-700`}
                          style={{ width: `${scope.widthPct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modules */}
              <div className="bg-slate-50/50 rounded-xl border border-slate-100 p-5">
                <h3 className="text-[13px] font-bold text-slate-800 mb-4">
                  Active Modules
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {modules.map((mod) => (
                    <div
                      key={mod.id}
                      className="flex items-center justify-between px-3 py-2.5 bg-white rounded-xl border border-slate-100"
                    >
                      <span className="text-[12px] font-bold text-slate-700">
                        {mod.label}
                      </span>
                      <Toggle
                        enabled={mod.enabled}
                        onChange={() => toggleModule(mod.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab !== "Overview" && (
          <div className="p-16 text-center">
            <p className="text-slate-400 text-sm">{activeTab} content</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;
