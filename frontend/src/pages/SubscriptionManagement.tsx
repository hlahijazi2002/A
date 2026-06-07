import { useState } from "react";
import { Download, Plus, Search, Check, AlertTriangle } from "lucide-react";
import { subscriptionPlans, type SubscriptionPlan } from "../../data/data";
import useFetch from "../hooks/useFetch";
import LoadingSpinner from "../components/LoadingSpinner";
import { api } from "../api/client";

const PLANS = ["STARTER", "PROFESSIONAL", "ENTERPRISE"];

const planBadgeStyles: Record<string, string> = {
  ENTERPRISE:
    "bg-linear-to-r from-[#0a1a16] via-[#142e29] to-[#1a5546] text-amber-400 font-black",
  PROFESSIONAL: "bg-teal-50 text-teal-600 font-bold",
  STARTER: "bg-slate-100 text-slate-500 font-bold",
};

const statusStyles: Record<string, { dot: string; badge: string }> = {
  ACTIVE: { dot: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-600" },
  TRIAL: { dot: "bg-amber-400", badge: "bg-amber-50 text-amber-600" },
  SUSPENDED: { dot: "bg-rose-500", badge: "bg-rose-50 text-rose-600" },
  CANCELLED: { dot: "bg-slate-400", badge: "bg-slate-50 text-slate-500" },
  EXPIRED: { dot: "bg-rose-300", badge: "bg-rose-50 text-rose-400" },
};

const PlanCard = ({
  plan,
  count,
}: {
  plan: SubscriptionPlan;
  count?: number;
}) => (
  <div
    className={`relative bg-white rounded-2xl border shadow-sm flex flex-col p-6 transition-all ${
      plan.highlight
        ? "border-teal-400 shadow-teal-100 shadow-md"
        : "border-slate-100"
    }`}
  >
    {plan.highlight && (
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
        <span className="bg-teal-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full tracking-wide shadow-sm">
          Most Popular
        </span>
      </div>
    )}
    <p className="text-[15px] font-bold text-slate-800 mb-2">{plan.name}</p>
    <div className="flex items-end gap-1 mb-1">
      <span className="font-black tracking-tight leading-none">
        {plan.price}
      </span>
      {plan.period && (
        <span className="text-slate-400 text-sm mb-0.5">/{plan.period}</span>
      )}
    </div>
    <p className="text-[11px] text-slate-400 mb-5 leading-relaxed">
      {plan.description}
    </p>
    <div className="border-t border-slate-100 mb-4" />
    <ul className="space-y-2.5 mb-5 flex-1">
      {plan.features.map((f, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <Check
            size={13}
            className="text-teal-600 shrink-0 mt-0.5"
            strokeWidth={3}
          />
          <span className="text-[12px] text-slate-600">{f}</span>
        </li>
      ))}
    </ul>
    <div className="border-t border-slate-100 mb-4" />
    <p className="text-[11px] text-slate-400 mb-4">
      Active subscribers:{" "}
      <span className="font-black text-slate-700">
        {count ?? plan.activeSubscribers}
      </span>
    </p>
    <button
      disabled
      className="w-full py-2 border border-slate-200 rounded-lg text-[12px] font-bold text-slate-300 cursor-not-allowed"
    >
      Edit Plan
    </button>
  </div>
);

const SubscriptionManagement = () => {
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [localOrgs, setLocalOrgs] = useState<any[] | null>(null);
  const [planModal, setPlanModal] = useState<{
    orgId: string;
    currentPlan: string;
  } | null>(null);
  const [showExpiring, setShowExpiring] = useState(false);

  const { data, loading } = useFetch<any>("/orgs?limit=100", { data: [] });

  const rawOrgs =
    localOrgs ??
    (Array.isArray(data?.data?.data)
      ? data.data.data
      : Array.isArray(data?.data)
        ? data.data
        : []);

  const starterCount = rawOrgs.filter(
    (o: any) => o.subscriptionPlan === "STARTER",
  ).length;
  const professionalCount = rawOrgs.filter(
    (o: any) => o.subscriptionPlan === "PROFESSIONAL",
  ).length;
  const enterpriseCount = rawOrgs.filter(
    (o: any) => o.subscriptionPlan === "ENTERPRISE",
  ).length;

  const planCounts: Record<string, number> = {
    Starter: starterCount,
    Professional: professionalCount,
    Enterprise: enterpriseCount,
  };

  const records = rawOrgs.filter((o: any) => {
    const matchSearch = o.name?.toLowerCase().includes(search.toLowerCase());
    const matchExpiring = !showExpiring || o.subscriptionStatus === "TRIAL";
    return matchSearch && matchExpiring;
  });

  const handleChangePlan = async (orgId: string, newPlan: string) => {
    setActionLoading(orgId);
    try {
      await api.patch(`/orgs/${orgId}/subscription`, {
        subscriptionPlan: newPlan,
      });
      setLocalOrgs(
        rawOrgs.map((o: any) =>
          o.id === orgId ? { ...o, subscriptionPlan: newPlan } : o,
        ),
      );
      setPlanModal(null);
    } catch {
      alert("Failed to update subscription. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleStatus = async (org: any) => {
    const newStatus =
      org.subscriptionStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    if (
      !confirm(
        `Are you sure you want to set this subscription to ${newStatus}?`,
      )
    )
      return;

    setActionLoading(org.id);
    try {
      await api.patch(`/orgs/${org.id}/subscription`, {
        subscriptionStatus: newStatus,
      });
      setLocalOrgs(
        rawOrgs.map((o: any) =>
          o.id === org.id ? { ...o, subscriptionStatus: newStatus } : o,
        ),
      );
    } catch {
      alert("Failed to update subscription status. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/30 space-y-6">
      {/* Plan Modal */}
      {planModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-80 shadow-xl">
            <h3 className="font-bold text-slate-800 mb-4">Change Plan</h3>
            <div className="space-y-2">
              {PLANS.map((plan) => (
                <button
                  key={plan}
                  onClick={() => handleChangePlan(planModal.orgId, plan)}
                  disabled={actionLoading === planModal.orgId}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-[12px] font-bold transition-colors ${
                    plan === planModal.currentPlan
                      ? "bg-teal-50 text-teal-600 border border-teal-200"
                      : "hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  {plan}
                </button>
              ))}
            </div>
            <button
              onClick={() => setPlanModal(null)}
              className="mt-4 w-full py-2 border border-slate-200 rounded-lg text-[12px] font-bold text-slate-500 hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-between items-start gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Subscription Management
          </h1>
          <p className="text-[13px] text-slate-400 mt-1">
            Manage plans, billing cycles, and renewals
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {subscriptionPlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} count={planCounts[plan.name]} />
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 flex flex-wrap justify-between items-center gap-3 border-b border-slate-50">
          <h2 className="font-bold text-slate-800 text-sm">
            Subscription Records
          </h2>
          <div className="flex gap-2">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
                size={14}
              />
              <input
                type="text"
                placeholder="Search company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 bg-slate-50 rounded-lg text-xs w-48 focus:ring-1 focus:ring-teal-500 outline-none"
              />
            </div>
            <button
              onClick={() => setShowExpiring(!showExpiring)}
              className={`flex items-center gap-2 px-3 py-2 border rounded-lg text-[11px] font-bold transition-colors ${
                showExpiring
                  ? "border-amber-400 bg-amber-100 text-amber-700"
                  : "border-amber-200 bg-amber-50 text-amber-600 hover:bg-amber-100"
              }`}
            >
              <AlertTriangle size={13} /> Expiring Soon
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-[11px] text-slate-500 font-bold tracking-wide border-b border-slate-100">
              <tr>
                {[
                  "Company",
                  "Plan",
                  "Status",
                  "Trial Ends",
                  "Employees",
                  "Actions",
                ].map((h) => (
                  <th key={h} className="px-5 py-4">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={6}>
                    <LoadingSpinner />
                  </td>
                </tr>
              ) : records.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-slate-400 text-sm"
                  >
                    No records found
                  </td>
                </tr>
              ) : (
                records.map((org: any) => {
                  const st =
                    statusStyles[org.subscriptionStatus] ?? statusStyles.TRIAL;
                  return (
                    <tr
                      key={org.id}
                      className="hover:bg-slate-50/40 transition-colors"
                    >
                      <td className="px-5 py-4 text-[12px] font-bold text-slate-800">
                        {org.name}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`text-[10px] px-2.5 py-1 rounded-md uppercase tracking-tight ${planBadgeStyles[org.subscriptionPlan] ?? planBadgeStyles.STARTER}`}
                        >
                          {org.subscriptionPlan}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full ${st.badge}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${st.dot}`}
                          />
                          {org.subscriptionStatus}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-[11px] text-slate-400">
                        {org.trialEndsAt
                          ? new Date(org.trialEndsAt).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="px-5 py-4 text-[11px] text-slate-500">
                        {org.employeeCount || "—"}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              setPlanModal({
                                orgId: org.id,
                                currentPlan: org.subscriptionPlan,
                              })
                            }
                            disabled={actionLoading === org.id}
                            className="px-3 py-1.5 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
                          >
                            Change Plan
                          </button>
                          <button
                            onClick={() => handleToggleStatus(org)}
                            disabled={actionLoading === org.id}
                            className={`px-3 py-1.5 border rounded-lg text-[11px] font-bold transition-colors disabled:opacity-50 ${
                              org.subscriptionStatus === "ACTIVE"
                                ? "border-rose-200 text-rose-600 hover:bg-rose-50"
                                : "border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                            }`}
                          >
                            {actionLoading === org.id
                              ? "..."
                              : org.subscriptionStatus === "ACTIVE"
                                ? "Suspend"
                                : "Activate"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManagement;
