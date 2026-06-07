import { useState } from "react";
import {
  Shield,
  Clock,
  Building2,
  RefreshCw,
  AlertTriangle,
  Users,
  CheckCircle2,
  Settings,
} from "lucide-react";
import { notificationChannels, alertSummary } from "../../data/data";
import type {
  Notification,
  NotificationCategory,
  NotificationChannel,
  NotificationIcon,
  AlertSummaryItem,
} from "../../data/data";
import Toggle from "../components/Toggle";
import useFetch from "../hooks/useFetch";
import LoadingSpinner from "../components/LoadingSpinner";

const iconMap: Record<NotificationIcon, React.ReactNode> = {
  shield: <Shield size={16} />,
  trial: <Clock size={16} />,
  company: <Building2 size={16} />,
  renewal: <RefreshCw size={16} />,
  warning: <AlertTriangle size={16} />,
  partner: <Users size={16} />,
  maintenance: <CheckCircle2 size={16} />,
};

const TABS: Array<"All" | NotificationCategory> = [
  "All",
  "Alerts",
  "System",
  "Companies",
  "Subscriptions",
  "Users",
];

const NotificationRow = ({ item }: { item: Notification }) => (
  <div className="flex items-start gap-4 px-5 py-4 hover:bg-slate-50/50 transition-colors">
    <div className="mt-1.5 w-2 shrink-0">
      {item.unread && (
        <span className="block w-2 h-2 rounded-full bg-teal-600" />
      )}
    </div>
    <div
      className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center ${item.iconBg} ${item.iconColor}`}
    >
      {iconMap[item.icon]}
    </div>
    <div className="flex-1 min-w-0">
      <p
        className={`text-[12px] leading-snug ${item.unread ? "font-bold text-slate-800" : "font-semibold text-slate-600"}`}
      >
        {item.title}
      </p>
      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
        {item.description}
      </p>
    </div>
    <span className="text-[10px] text-slate-400 shrink-0 mt-0.5 whitespace-nowrap">
      {item.time}
    </span>
  </div>
);

const Notifications = () => {
  const [activeTab, setActiveTab] = useState<"All" | NotificationCategory>(
    "All",
  );
  const [channels, setChannels] =
    useState<NotificationChannel[]>(notificationChannels);

  const { data, loading } = useFetch<{ data: Notification[] }>(
    "/notifications",
    { data: [] },
  );

  const items = Array.isArray(data?.data?.data)
    ? data.data.data
    : Array.isArray(data?.data)
      ? data.data
      : [];
  const unreadCount = items.filter((n) => n.unread).length;
  const filtered =
    activeTab === "All" ? items : items.filter((n) => n.category === activeTab);

  const toggleChannel = (id: string) =>
    setChannels((prev) =>
      prev.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c)),
    );

  return (
    <div className="min-h-screen bg-slate-50/30 space-y-5">
      <div className="flex flex-wrap justify-between items-start gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Notifications
          </h1>
          <p className="text-[13px] text-slate-400 mt-1">
            {unreadCount} unread notifications
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-[12px] font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            Mark all read
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-[12px] font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <Settings size={13} /> Settings
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 items-start">
        <div className="flex-1 min-w-0 space-y-4">
          <div className="flex gap-2 flex-wrap">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  activeTab === tab
                    ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                    : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {loading ? (
              <LoadingSpinner />
            ) : filtered.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-sm">
                No notifications in this category
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {filtered.map((item) => (
                  <NotificationRow key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:w-72 shrink-0 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="font-bold text-slate-800 text-sm mb-4">
              Notification Channels
            </h3>
            <div className="space-y-4">
              {channels.map((ch) => (
                <div
                  key={ch.id}
                  className="flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="text-[12px] font-bold text-slate-700">
                      {ch.label}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {ch.description}
                    </p>
                  </div>
                  <Toggle
                    enabled={ch.enabled}
                    onChange={() => toggleChannel(ch.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="font-bold text-slate-800 text-sm mb-4">
              Alert Summary
            </h3>
            <div className="space-y-2">
              {alertSummary.map((item: AlertSummaryItem) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0"
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-[12px] text-slate-600">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-[12px] font-black text-slate-800">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
