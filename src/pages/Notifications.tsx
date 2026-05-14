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
import {
  notifications,
  notificationChannels,
  alertSummary,
} from "../../data/data";
import type {
  Notification,
  NotificationCategory,
  NotificationChannel,
  NotificationIcon,
  AlertSummaryItem,
} from "../../data/data";

const iconMap: Record<NotificationIcon, React.ReactNode> = {
  shield: <Shield size={16} />,
  trial: <Clock size={16} />,
  company: <Building2 size={16} />,
  renewal: <RefreshCw size={16} />,
  warning: <AlertTriangle size={16} />,
  partner: <Users size={16} />,
  maintenance: <CheckCircle2 size={16} />,
};

// ── Toggle component ─────────────────────────────────────────

const Toggle = ({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: () => void;
}) => (
  <button
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
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

// ── Tab list ─────────────────────────────────────────────────

const TABS: Array<"All" | NotificationCategory> = [
  "All",
  "Alerts",
  "System",
  "Companies",
  "Subscriptions",
  "Users",
];

// ── Main Component ───────────────────────────────────────────

const Notifications = () => {
  const [activeTab, setActiveTab] = useState<"All" | NotificationCategory>(
    "All",
  );

  const [channels, setChannels] =
    useState<NotificationChannel[]>(notificationChannels);

  const [items, setItems] = useState<Notification[]>(notifications);

  const unreadCount = items.filter((n) => n.unread).length;

  const filtered =
    activeTab === "All" ? items : items.filter((n) => n.category === activeTab);

  const toggleChannel = (id: string) => {
    setChannels((prev) =>
      prev.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c)),
    );
  };

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <div className="bg-slate-50/30 min-h-screen font-sans text-slate-900">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Notifications
          </h1>
          <p className="text-[13px] text-slate-400 font-medium mt-1">
            {unreadCount} unread notifications
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={markAllRead}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-[12px] font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Mark all read
          </button>
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-[12px] font-bold text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2">
            <Settings size={14} /> Settings
          </button>
        </div>
      </div>

      <div className="flex gap-6 items-start">
        <div className="flex-1 min-w-0">
          <div className="flex gap-2 mb-4 flex-wrap">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  activeTab === tab
                    ? "bg-[#0d9488] text-white border-[#0d9488] shadow-sm"
                    : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {filtered.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-sm font-medium">
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

        <div className="w-72 shrink-0 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="font-bold text-slate-800 text-sm mb-5">
              Notification Channels
            </h3>
            <div className="space-y-4">
              {channels.map((ch) => (
                <div key={ch.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-[12px] font-bold text-slate-700">
                      {ch.label}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">
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
            <h3 className="font-bold text-slate-800 text-sm mb-5">
              Alert Summary
            </h3>
            <div className="space-y-3">
              {alertSummary.map((item: AlertSummaryItem) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0"
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-[12px] font-medium text-slate-600">
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

const NotificationRow = ({ item }: { item: Notification }) => (
  <div className="flex items-start gap-4 px-5 py-4 hover:bg-slate-50/50 transition-colors group">
    <div className="mt-1 w-2 shrink-0 flex justify-center">
      {item.unread && (
        <span className="w-2 h-2 rounded-full bg-[#0d9488] mt-0.5" />
      )}
    </div>

    <div
      className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center ${item.iconBg} ${item.iconColor}`}
    >
      {iconMap[item.icon]}
    </div>

    <div className="flex-1 min-w-0">
      <p
        className={`text-[12px] leading-snug ${
          item.unread
            ? "font-bold text-slate-800"
            : "font-semibold text-slate-600"
        }`}
      >
        {item.title}
      </p>
      <p className="text-[11px] text-slate-400 font-medium mt-0.5 leading-relaxed">
        {item.description}
      </p>
    </div>

    <span className="text-[10px] text-slate-400 font-medium shrink-0 mt-0.5 whitespace-nowrap">
      {item.time}
    </span>
  </div>
);

export default Notifications;
