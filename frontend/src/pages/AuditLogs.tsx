import { useState } from "react";
import { Calendar, Download, Search } from "lucide-react";
import { auditStats, type AuditEvent } from "../../data/data";
import useFetch from "../hooks/useFetch";
import LoadingSpinner from "../components/LoadingSpinner";

const FILTERS = [
  "All Events",
  "Authentication",
  "User Actions",
  "Company Changes",
  "Subscription",
  "System",
  "Security Alerts",
];

const SeverityBadge = ({ type }: { type: AuditEvent["severity"] }) => {
  const styles = {
    Info: "bg-blue-50 text-blue-600 border-blue-100",
    Warning: "bg-orange-50 text-orange-600 border-orange-100",
    Critical: "bg-rose-50 text-rose-600 border-rose-100",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border w-fit ${styles[type]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {type}
    </span>
  );
};

const AuditLogs = () => {
  const [activeFilter, setActiveFilter] = useState("All Events");
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("All Severity");

  const { data, loading } = useFetch<{ data: any[] }>("/audit-logs?limit=20", {
    data: [],
  });

  const events = (data?.data || []).filter((e) => {
    const matchSearch =
      e.user?.toLowerCase().includes(search.toLowerCase()) ||
      e.action?.toLowerCase().includes(search.toLowerCase());
    const matchSeverity =
      severity === "All Severity" || e.severity === severity;
    return matchSearch && matchSeverity;
  });

  return (
    <div className="min-h-screen bg-slate-50/30 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-start gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Audit Logs</h1>
          <p className="text-sm text-slate-400 mt-1">
            Complete trail of all platform actions and events
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600">
            <Calendar size={13} className="text-slate-400" /> Last 30 Days
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600">
            <Download size={13} /> Export Logs
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              activeFilter === f
                ? "bg-teal-50 text-teal-700 border-teal-200"
                : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {auditStats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm"
          >
            <p className="text-xs text-slate-500 mb-1">{stat.label}</p>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">{stat.count}</h2>
              <div
                className={`w-10 h-10 ${stat.bgColor} rounded-xl flex items-center justify-center`}
              >
                <stat.icon
                  size={18}
                  className={`${stat.iconColor} opacity-80`}
                  strokeWidth={2.5}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-50 flex flex-wrap justify-between items-center gap-3">
          <h3 className="font-bold text-slate-800">Event Log</h3>
          <div className="flex gap-2">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={13}
              />
              <input
                type="text"
                placeholder="Search logs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 bg-slate-50 rounded-lg text-xs w-52 focus:ring-1 focus:ring-teal-500 outline-none"
              />
            </div>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="bg-slate-50 rounded-lg text-xs px-3 py-2 text-slate-600 outline-none border-none"
            >
              <option>All Severity</option>
              <option>Critical</option>
              <option>Warning</option>
              <option>Info</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-[10px] text-slate-400 font-semibold tracking-wide">
              <tr>
                {[
                  "Timestamp",
                  "User",
                  "Action",
                  "Resource",
                  "Company",
                  "IP Address",
                  "Severity",
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
                  <td colSpan={7}>
                    <LoadingSpinner />
                  </td>
                </tr>
              ) : (
                events.map((event, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">
                      {event.timestamp}
                    </td>
                    <td className="px-4 py-3 text-xs font-bold text-slate-700">
                      {event.user}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600">
                      {event.action}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {event.resource}
                    </td>
                    <td className="px-4 py-3 text-xs font-medium text-slate-700">
                      {event.company}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-400 font-mono">
                      {event.ipAddress}
                    </td>
                    <td className="px-4 py-3">
                      <SeverityBadge type={event.severity} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-50 flex flex-wrap justify-between items-center gap-3">
          <span className="text-xs text-slate-400">
            Showing {events.length} of {data?.total || 0} events
          </span>
          <div className="flex gap-1">
            {[1, 2, 3, "...", 1561].map((p, i) => (
              <button
                key={i}
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-medium ${
                  p === 1
                    ? "bg-teal-600 text-white"
                    : "text-slate-400 hover:bg-slate-50"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
