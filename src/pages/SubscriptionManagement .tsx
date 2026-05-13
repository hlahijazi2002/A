import { Download, Plus, Search, Check, AlertTriangle } from "lucide-react";
import {
  subscriptionPlans,
  subscriptionRecords,
  type PlanName,
  type SubscriptionPlan,
  type SubscriptionRecord,
  type SubscriptionStatus,
} from "../../data/data";

const planBadgeStyles: Record<PlanName, string> = {
  Enterprise:
    "bg-gradient-to-r from-[#0a1a16] via-[#142e29] to-[#1a5546] text-[#ff9800] font-black",
  Professional: "bg-teal-50 text-teal-600 font-bold",
  Pro: "bg-teal-50 text-teal-600 font-bold",
  Starter: "bg-slate-100 text-slate-500 font-bold",
};

const statusStyles: Record<
  SubscriptionStatus,
  { dot: string; badge: string; dateColor: string }
> = {
  Active: {
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-600",
    dateColor: "text-slate-700",
  },
  Expiring: {
    dot: "bg-amber-400",
    badge: "bg-amber-50 text-amber-600",
    dateColor: "text-rose-500",
  },
  "Renewal Due": {
    dot: "bg-orange-400",
    badge: "bg-orange-50 text-orange-600",
    dateColor: "text-rose-500",
  },
  Suspended: {
    dot: "bg-rose-500",
    badge: "bg-rose-50 text-rose-600",
    dateColor: "text-rose-500",
  },
};

const PlanCard = ({ plan }: { plan: SubscriptionPlan }) => (
  <div
    className={`relative bg-white rounded-2xl border shadow-sm flex flex-col p-7 transition-all ${
      plan.highlight
        ? "border-teal-400 shadow-teal-100 shadow-md"
        : "border-slate-100"
    }`}
  >
    {plan.highlight && (
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
        <span className="bg-[#0d9488] text-white text-[10px] font-black px-4 py-1.5 rounded-full tracking-wide shadow-sm">
          Most Popular
        </span>
      </div>
    )}

    <p className="text-[15px] font-bold text-slate-800 mb-2">{plan.name}</p>

    <div className="flex items-end gap-1 mb-1">
      <span
        className={`font-black tracking-tight leading-none ${
          plan.price === "Custom"
            ? "text-4xl text-slate-800"
            : "text-3xl text-[#0d9488]"
        }`}
      >
        {plan.price}
      </span>
      {plan.period && (
        <span className="text-slate-400 text-sm font-medium mb-0.5">
          /{plan.period}
        </span>
      )}
    </div>

    <p className="text-[11px] text-slate-400 font-medium mb-6 leading-relaxed">
      {plan.description}
    </p>

    <div className="border-t border-slate-100 mb-5" />

    <ul className="space-y-2.5 mb-6 flex-1">
      {plan.features.map((f, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <Check
            size={13}
            className="text-[#0d9488] shrink-0 mt-0.5"
            strokeWidth={3}
          />
          <span className="text-[12px] text-slate-600 font-medium">{f}</span>
        </li>
      ))}
    </ul>

    <div className="border-t border-slate-100 mb-4" />

    <p className="text-[11px] text-slate-400 font-medium mb-4">
      Active subscribers:{" "}
      <span className="font-black text-slate-700">
        {plan.activeSubscribers}
      </span>
    </p>

    <button className="w-full py-2 border border-slate-200 rounded-lg text-[12px] font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all">
      Edit Plan
    </button>
  </div>
);

const RecordRow = ({ record }: { record: SubscriptionRecord }) => {
  const st = statusStyles[record.status];
  return (
    <tr className="hover:bg-slate-50/40 transition-colors">
      <td className="px-6 py-4 text-[12px] font-bold text-slate-800">
        {record.company}
      </td>

      <td className="px-6 py-4">
        <span
          className={`text-[10px] px-2.5 py-1 rounded-md uppercase tracking-tight ${
            planBadgeStyles[record.plan] ?? planBadgeStyles.Starter
          }`}
        >
          {record.plan}
        </span>
      </td>

      <td className="px-6 py-4 text-[11px] text-slate-500 font-medium">
        {record.startDate}
      </td>
      <td className={`px-6 py-4 text-[11px] font-bold ${st.dateColor}`}>
        {record.renewalDate}
      </td>
      <td className="px-6 py-4 text-[12px] font-bold text-slate-700">
        {record.amount}
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full ${st.badge}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
          {record.status}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            Renew
          </button>
          <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            Change Plan
          </button>
        </div>
      </td>
    </tr>
  );
};

const SubscriptionManagement = () => {
  return (
    <div className="bg-slate-50/30 min-h-screen font-sans text-slate-900">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Subscription Management
          </h1>
          <p className="text-[13px] text-slate-400 font-medium mt-1">
            Manage plans, billing cycles, and renewals
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-[12px] font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <Download size={15} /> Billing History
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0d9488] hover:bg-[#0c8379] text-white rounded-lg text-[12px] font-bold shadow-sm transition-all">
            <Plus size={15} /> Create Plan
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {subscriptionPlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 flex justify-between items-center border-b border-slate-50">
          <h2 className="font-bold text-slate-800 text-sm">
            Subscription Records
          </h2>
          <div className="flex gap-3">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
                size={15}
              />
              <input
                type="text"
                placeholder="Search company..."
                className="pl-9 pr-4 py-2 bg-slate-50 border-none rounded-lg text-xs w-52 focus:ring-1 focus:ring-teal-500 outline-none"
              />
            </div>

            <button className="flex items-center gap-2 px-3 py-2 border border-amber-200 bg-amber-50 rounded-lg text-[11px] font-bold text-amber-600 hover:bg-amber-100 transition-colors">
              <AlertTriangle size={13} /> Expiring Soon
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[11px] text-slate-500 font-bold tracking-wider border-b border-slate-100">
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Start Date</th>
                <th className="px-6 py-4">Renewal Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {subscriptionRecords.map((record) => (
                <RecordRow key={record.id} record={record} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManagement;
