import { Calendar, Download, Search } from "lucide-react";
import { auditStats, auditEvents, type AuditEvent } from "../../data/data";

const AuditLogs = () => {
  const filters = [
    "All Events",
    "Authentication",
    "User Actions",
    "Company Changes",
    "Subscription",
    "System",
    "Security Alerts",
  ];

  return (
    <div className="bg-[#F8FAFB] min-h-screen">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-lg font-bold text-slate-800">Audit Logs</h1>
          <p className="text-slate-500 text-sm">
            Complete trail of all platform actions and events
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 flex items-center gap-2">
            <Calendar size={14} className="text-slate-400" /> Last 30 Days
          </button>
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 flex items-center gap-2">
            <Download size={16} /> Export Logs
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((filter, idx) => (
          <button
            key={idx}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
              idx === 0
                ? "bg-teal-50 text-teal-700 border border-teal-200"
                : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {auditStats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm"
          >
            <p className="text-slate-500 text-xs font-medium mb-1">
              {stat.label}
            </p>
            <div className=" flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">{stat.count}</h2>

              <div
                className={`w-10 h-10 ${stat.bgColor} rounded-xl flex items-center justify-center`}
              >
                <stat.icon
                  size={20}
                  className={`${stat.iconColor} opacity-80`}
                  strokeWidth={2.5}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-white">
          <h3 className="font-bold text-slate-800">Event Log</h3>
          <div className="flex gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search logs..."
                className="pl-9 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm w-64 focus:ring-2 focus:ring-teal-500/20"
              />

              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={13}
              />
            </div>
            <select className="bg-slate-50 border-none rounded-lg text-sm px-4 py-2 text-slate-600 outline-none">
              <option>All Severity</option>
              <option>Critical</option>
              <option>Warning</option>
              <option>Info</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px]  tracking-wider">
                <th className="px-4 py-2  font-semibold">Timestamp</th>
                <th className="px-4 py-2  font-semibold">User</th>
                <th className="px-4 py-2  font-semibold">Action</th>
                <th className="px-4 py-2 font-semibold">Resource</th>
                <th className="px-4 py-2 font-semibold">Company</th>
                <th className="px-4 py-2  font-semibold">IP Address</th>
                <th className="px-4 py-2  font-semibold">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {auditEvents.map((event) => (
                <tr
                  key={event.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-4 py-2 text-xs text-slate-500 whitespace-nowrap">
                    {event.timestamp}
                  </td>
                  <td className="px-4 py-2 text-xs font-bold text-slate-700">
                    {event.user}
                  </td>
                  <td className="px-4 py-2 text-xs text-slate-600">
                    {event.action}
                  </td>
                  <td className="px-4 py-2 text-xs text-slate-500">
                    {event.resource}
                  </td>
                  <td className="px-4 py-2 text-xs text-slate-700 font-medium">
                    {event.company}
                  </td>
                  <td className="px-4 py-2 text-xs text-slate-400 font-mono">
                    {event.ipAddress}
                  </td>
                  <td className="px-4 py-2 ">
                    <SeverityBadge type={event.severity} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-5 border-t border-slate-50 flex justify-between items-center">
          <span className="text-xs text-slate-400">
            Showing 1-8 of 12,483 events
          </span>
          <div className="flex gap-1">
            {[1, 2, 3, "...", 1561].map((page, i) => (
              <button
                key={i}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium ${
                  page === 1
                    ? "bg-teal-600 text-white"
                    : "text-slate-400 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SeverityBadge = ({ type }: { type: AuditEvent["severity"] }) => {
  const styles = {
    Info: "bg-blue-50 text-blue-600 border-blue-100",
    Warning: "bg-orange-50 text-orange-600 border-orange-100",
    Critical: "bg-rose-50 text-rose-600 border-rose-100",
  };

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border flex items-center gap-1.5 w-fit ${styles[type]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {type}
    </span>
  );
};

export default AuditLogs;
