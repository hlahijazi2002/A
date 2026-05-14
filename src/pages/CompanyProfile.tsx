import { useState } from "react";
import { MapPin, Briefcase, Mail, Calendar, Edit2 } from "lucide-react";
import { companyProfile } from "../../data/data";
import type { CompanyProfileModule } from "../../data/data";

const Toggle = ({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: () => void;
}) => (
  <button
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none shrink-0 ${
      enabled ? "bg-[#0d9488]" : "bg-slate-200"
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
        enabled ? "translate-x-6" : "translate-x-1"
      }`}
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

const CompanyProfile = () => {
  const p = companyProfile;
  const [activeTab, setActiveTab] = useState<TabName>("Overview");
  const [modules, setModules] = useState<CompanyProfileModule[]>(p.modules);

  const toggleModule = (id: string) =>
    setModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m)),
    );

  const scopeColors = ["bg-[#0d9488]", "bg-teal-400", "bg-teal-200"];

  return (
    <div className="bg-slate-50/30 min-h-screen font-sans text-slate-900">
      <div className="flex items-center gap-2 mb-5 text-[12px] font-medium">
        <span className="text-teal-600 cursor-pointer hover:underline">
          Companies
        </span>
        <span className="text-slate-300">›</span>
        <span className="text-slate-600 font-bold">{p.name}</span>
      </div>

      <div className="flex justify-end items-center gap-3 mb-5">
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-[12px] font-bold text-slate-600 hover:bg-slate-50 transition-colors">
          <Edit2 size={13} /> Edit
        </button>
        <button className="px-4 py-2 bg-white border border-amber-300 text-amber-600 rounded-lg text-[12px] font-bold hover:bg-amber-50 transition-colors">
          Suspend
        </button>
        <button className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-[12px] font-bold transition-colors shadow-sm">
          Delete
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-5">
        <div className="flex items-start gap-5">
          <div
            className={`w-14 h-14 rounded-2xl ${p.avatarBg} ${p.avatarText} flex items-center justify-center text-2xl font-black shrink-0`}
          >
            {p.initial}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h2 className="text-[18px] font-black text-slate-900 tracking-tight">
                {p.name}
              </h2>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {p.status}
              </span>
              <span className="text-[10px] px-2.5 py-1 rounded-md font-black uppercase tracking-tight bg-linear-to-r from-[#0a1a16] via-[#142e29] to-[#1a5546] text-[#ff9800]">
                {p.plan}
              </span>
            </div>

            <div className="flex items-center gap-5 flex-wrap">
              <span className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                <MapPin size={12} className="text-slate-300" />
                {p.location}
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                <Briefcase size={12} className="text-slate-300" />
                {p.industry}
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                <Mail size={12} className="text-slate-300" />
                {p.adminEmail}
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                <Calendar size={12} className="text-slate-300" />
                {p.joinedDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-5 grid grid-cols-5 divide-x divide-slate-100">
        {[
          { label: "Total Users", value: String(p.stats.totalUsers) },
          { label: "tCO₂e Emissions", value: p.stats.emissions },
          { label: "Monthly Revenue", value: p.stats.monthlyRevenue },
          { label: "Data Completeness", value: p.stats.dataCompleteness },
          { label: "Modules Active", value: p.stats.modulesActive },
        ].map((stat, i) => (
          <div key={i} className="px-6 py-5 text-center">
            <p className="text-[22px] font-black text-slate-900 mb-1">
              {stat.value}
            </p>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-5">
        <div className="flex border-b border-slate-100 px-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-4 text-[12px] font-bold transition-all relative ${
                activeTab === tab
                  ? "text-[#0d9488]"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0d9488] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {activeTab === "Overview" && (
          <div className="p-6 grid grid-cols-2 gap-5">
            <div className="bg-white rounded-xl border border-slate-100 p-5">
              <h3 className="text-[13px] font-bold text-slate-800 mb-5">
                Company Details
              </h3>
              <div className="divide-y divide-slate-50">
                {Object.entries(p.details).map(([key, val]) => (
                  <div
                    key={key}
                    className="flex items-start justify-between py-3 first:pt-0 last:pb-0"
                  >
                    <span className="text-[11px] text-slate-400 font-medium w-36 shrink-0">
                      {key}
                    </span>
                    <span className="text-[12px] font-bold text-slate-800 text-right">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="bg-white rounded-xl border border-slate-100 p-5">
                <h3 className="text-[13px] font-bold text-slate-800 mb-5">
                  Scope Summary (2024)
                </h3>
                <div className="space-y-5">
                  {p.scopeSummary.map((scope, i) => (
                    <div key={scope.label}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[12px] font-bold text-slate-700">
                          {scope.label}
                        </span>
                        <span className="text-[12px] font-bold text-slate-700">
                          {scope.display}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${scopeColors[i]} rounded-full transition-all duration-700`}
                          style={{ width: `${scope.widthPct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-100 p-5">
                <h3 className="text-[13px] font-bold text-slate-800 mb-5">
                  Active Modules
                </h3>
                <div className="grid grid-cols-2 gap-x-5 gap-y-3">
                  {modules.map((mod) => (
                    <div
                      key={mod.id}
                      className="flex items-center justify-between py-2.5 px-3 bg-slate-50/50 rounded-xl"
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
            <p className="text-slate-400 text-sm font-medium">
              {activeTab} content
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;
