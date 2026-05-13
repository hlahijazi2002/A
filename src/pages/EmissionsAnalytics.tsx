import { Calendar, ArrowDownRight, ArrowUpRight, Info } from "lucide-react";
import {
  emissionsStats,
  emissionsTrend,
  topEmitters,
  emissionsBySector,
  reductionLeaders,
  dataCompleteness,
  scope3IncompleteCount,
} from "../../data/data";

const EmissionsAnalytics = () => {
  return (
    <div className=" bg-slate-50/30 min-h-screen font-sans text-slate-900">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Emissions Analytics
          </h1>
          <p className="text-[13px] text-slate-400 mt-1 font-medium">
            Aggregated GHG data across all platform companies
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2  border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600">
            <Calendar size={14} className="text-slate-400" /> Jan – Dec 2024
          </button>
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-[11px] font-bold text-slate-800 hover:bg-slate-50 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        {emissionsStats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-teal-200 transition-all"
          >
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {stat.title}
            </p>
            <p className="text-[9px] text-slate-300 mb-4 font-medium">
              {stat.sub}
            </p>
            <h2 className="text-2xl font-black text-slate-800 mb-4">
              {stat.value}
            </h2>

            <div
              className={`flex items-center gap-1 text-[11px] font-bold ${stat.trend.startsWith("-") ? "text-emerald-500" : "text-rose-500"}`}
            >
              {stat.trend.startsWith("-") ? (
                <ArrowDownRight size={14} />
              ) : (
                <ArrowUpRight size={14} />
              )}
              {stat.trend}{" "}
              <span className="text-slate-300 font-medium ml-1 text-[10px]">
                {stat.vs || ""}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        <div className="lg:col-span-7 bg-white p-7 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h3 className="font-bold text-[14px] text-slate-800">
              Emissions Trend (2021–2024)
            </h3>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button className="px-5 py-1.5 bg-[#008080] text-white text-[11px] font-bold rounded-md shadow-md">
                Annual
              </button>
              <button className="px-5 py-1.5 text-slate-400 text-[11px] font-bold hover:text-slate-600 transition-colors">
                Quarterly
              </button>
            </div>
          </div>

          <div className="h-60 flex items-end justify-around gap-2 px-2 border-b border-slate-100 pb-2">
            {emissionsTrend.map((item) => (
              <div
                key={item.year}
                className="flex flex-col items-center gap-3 flex-1 max-w-20"
              >
                <div className="flex gap-1.5 items-end h-44 w-full justify-center">
                  <div
                    className="w-3 bg-[#008080] rounded-t-xs opacity-90 hover:opacity-100 transition-opacity"
                    style={{ height: `${item.scope1HeightPct}%` }}
                  ></div>
                  <div
                    className="w-3 bg-[#4FD1C5] rounded-t-xs opacity-80"
                    style={{ height: `${item.scope2HeightPct}%` }}
                  ></div>
                  <div
                    className="w-3 bg-[#B2F5EA] rounded-t-xs opacity-70"
                    style={{ height: `${item.scope3HeightPct}%` }}
                  ></div>
                </div>
                <span className="text-[10px] font-bold text-slate-400">
                  {item.year}
                </span>
              </div>
            ))}
          </div>
          {/* Legend */}
          <div className="flex gap-6 mt-6 justify-start px-2">
            {["Scope 1", "Scope 2", "Scope 3"].map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${i === 0 ? "bg-[#008080]" : i === 1 ? "bg-[#4FD1C5]" : "bg-[#B2F5EA]"}`}
                ></div>
                <span className="text-[10px] font-bold text-slate-500">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-white p-7 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-[14px] text-slate-800 mb-8">
            Top Emitting Companies (2024)
          </h3>
          <div className="space-y-7">
            {topEmitters.map((co, i) => (
              <div key={i}>
                <div className="flex justify-between text-[11px] font-bold mb-2">
                  <span className="text-slate-700">{co.name}</span>
                  <span className="text-slate-400">{co.val}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#008080] rounded-full transition-all duration-1000"
                    style={{ width: `${co.p}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-7 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-[14px] text-slate-800 mb-8">
            By Industry Sector
          </h3>
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full border-10 border-[#008080] border-t-teal-100 border-r-teal-300 mb-8 relative"></div>
            <div className="w-full space-y-3.5">
              {emissionsBySector.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center text-[11px] font-bold"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${item.c}`}></div>
                    <span className="text-slate-500 font-medium">{item.l}</span>
                  </div>
                  <span className="text-slate-800">{item.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-7 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-[14px] text-slate-800 mb-8">
            Reduction Leaders
          </h3>
          <div className="space-y-5">
            {reductionLeaders.map((leader, i) => (
              <div key={i} className="flex justify-between items-center py-0.5">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-[#008080] bg-teal-50 w-5 h-5 flex items-center justify-center rounded-md">
                    {i + 1}
                  </span>
                  <span className="text-[11px] font-bold text-slate-700">
                    {leader.n}
                  </span>
                </div>
                <span
                  className={`text-[11px] font-black ${leader.pos ? "text-emerald-500" : "text-rose-500"}`}
                >
                  {leader.d}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-7 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-[14px] text-slate-800 mb-8">
              Data Completeness
            </h3>
            <div className="space-y-6">
              {dataCompleteness.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[11px] font-bold mb-2">
                    <span className="text-slate-500 font-medium">{item.l}</span>
                    <span className="text-slate-800">{item.v}</span>
                  </div>
                  <div className="w-full h-1 bg-slate-50 rounded-full">
                    <div
                      className={`h-full rounded-full ${item.c}`}
                      style={{ width: item.v }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 p-3.5 bg-teal-50/50 rounded-xl flex gap-3 items-start border border-teal-100/50">
            <Info size={14} className="text-[#008080] shrink-0 mt-0.5" />
            <p className="text-[10px] text-teal-800 leading-relaxed font-medium">
              <span className="font-bold">Tip:</span> {scope3IncompleteCount}{" "}
              companies have incomplete Scope 3 data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmissionsAnalytics;
