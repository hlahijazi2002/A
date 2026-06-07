import { useState } from "react";
import {
  Download,
  UserPlus,
  Search,
  ChevronDown,
  Edit2,
  Lock,
  Ban,
  ChevronLeft,
  ChevronRight,
  User,
  ShieldCheck,
  Award,
  Check,
} from "lucide-react";
import { userStats } from "../../data/data";
import useFetch from "../hooks/useFetch";
import LoadingSpinner from "../components/LoadingSpinner";
import { api } from "../api/client";

const statIcons = [
  <User size={17} className="text-teal-500" />,
  <ShieldCheck size={17} className="text-teal-100" />,
  <Award size={17} className="text-teal-500" />,
  <Ban size={17} className="text-rose-400" />,
];

const statIconBg = ["bg-teal-50", "bg-slate-800", "bg-teal-50", "bg-rose-50"];

const ROLES = [
  "SUPER_ADMIN",
  "ADMINISTRATOR",
  "DATA_CONTRIBUTOR",
  "ANALYST",
  "VIEWER",
];

const roleStyles: Record<string, string> = {
  "Super Admin":
    "bg-linear-to-r from-[#0a1a16] via-[#142e29] to-[#1a5546] text-amber-400 font-black",
  SUPER_ADMIN:
    "bg-linear-to-r from-[#0a1a16] via-[#142e29] to-[#1a5546] text-amber-400 font-black",
  Admin: "bg-teal-50 text-teal-700 font-bold",
  ADMINISTRATOR: "bg-teal-50 text-teal-700 font-bold",
  Analyst: "bg-blue-50 text-blue-600 font-bold",
  ANALYST: "bg-blue-50 text-blue-600 font-bold",
  DATA_CONTRIBUTOR: "bg-purple-50 text-purple-600 font-bold",
  Viewer: "bg-slate-100 text-slate-500 font-bold",
  VIEWER: "bg-slate-100 text-slate-500 font-bold",
};

const statusStyles: Record<string, { dot: string; badge: string }> = {
  Active: { dot: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-600" },
  Trial: { dot: "bg-amber-400", badge: "bg-amber-50 text-amber-600" },
  Suspended: { dot: "bg-rose-500", badge: "bg-rose-50 text-rose-600" },
};

const UserManagement = () => {
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [localUsers, setLocalUsers] = useState<any[] | null>(null);
  const [roleModal, setRoleModal] = useState<{
    userId: string;
    currentRole: string;
  } | null>(null);
  const [roleFilter, setRoleFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [orgFilter, setOrgFilter] = useState("");

  const orgParam = orgFilter ? `&orgId=${orgFilter}` : "";
  const roleParam = roleFilter ? `&role=${roleFilter}` : "";

  const { data, loading } = useFetch<{ data: any[] }>(
    `/users?limit=20&page=${currentPage}${roleParam}${orgParam}`,
    { data: [] },
  );
  const { data: superAdminsData } = useFetch(
    "/users?role=SUPER_ADMIN&limit=1",
    { data: [] },
  );
  const { data: suspendedData } = useFetch(
    "/users?isActive=false&limit=1&page=1",
    { data: [] },
  );
  const { data: companyAdminsData } = useFetch(
    "/users?role=ADMINISTRATOR&limit=1",
    { data: [] },
  );
  const { data: orgsData } = useFetch("/orgs?limit=100", { data: [] });

  const total = data?.data?.total || data?.total || 0;
  const totalPages = Math.ceil(total / 20);

  const liveValues = [
    data?.data?.total ?? data?.total,
    superAdminsData?.data?.total ?? superAdminsData?.total,
    companyAdminsData?.data?.total ?? companyAdminsData?.total,
    suspendedData?.data?.total ?? suspendedData?.total,
  ];

  const orgs = Array.isArray(orgsData?.data?.data)
    ? orgsData.data.data
    : Array.isArray(orgsData?.data)
      ? orgsData.data
      : [];

  const rawData =
    localUsers ??
    (Array.isArray(data?.data?.data)
      ? data.data.data
      : Array.isArray(data?.data)
        ? data.data
        : []);

  const users = rawData.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      `${u.firstName} ${u.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  const handleToggleStatus = async (user: any) => {
    const isActive = user.isActive ?? user.status === "Active";
    const action = isActive ? "suspend" : "reactivate";
    if (
      !confirm(
        `Are you sure you want to ${action} ${user.name || user.firstName}?`,
      )
    )
      return;

    setActionLoading(user.id);
    try {
      await api.patch(`/users/${user.id}/status`, {
        isActive: !isActive,
        reason: `${action}d via admin dashboard`,
      });
      setLocalUsers(
        rawData.map((u: any) =>
          u.id === user.id
            ? {
                ...u,
                isActive: !isActive,
                status: !isActive ? "Active" : "Suspended",
              }
            : u,
        ),
      );
    } catch {
      alert("Failed to update user status. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleChangeRole = async (userId: string, newRole: string) => {
    setActionLoading(userId);
    try {
      await api.patch(`/users/${userId}/role`, { role: newRole });
      setLocalUsers(
        rawData.map((u: any) =>
          u.id === userId ? { ...u, role: newRole } : u,
        ),
      );
      setRoleModal(null);
    } catch {
      alert("Failed to update user role. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/30 space-y-6">
      {/* Role Modal */}
      {roleModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-80 shadow-xl">
            <h3 className="font-bold text-slate-800 mb-4">Change Role</h3>
            <div className="space-y-2">
              {ROLES.map((role) => (
                <button
                  key={role}
                  onClick={() => handleChangeRole(roleModal.userId, role)}
                  disabled={actionLoading === roleModal.userId}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-[12px] font-bold transition-colors ${
                    role === roleModal.currentRole
                      ? "bg-teal-50 text-teal-600 border border-teal-200"
                      : "hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
            <button
              onClick={() => setRoleModal(null)}
              className="mt-4 w-full py-2 border border-slate-200 rounded-lg text-[12px] font-bold text-slate-500 hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap justify-between items-start gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            User & Access Management
          </h1>
          <p className="text-[13px] text-slate-400 mt-1">
            {data?.data?.total || data?.total || 0} users across all companies
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {userStats.map((stat, i) => (
          <div
            key={stat.label}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm"
          >
            <div className="flex justify-between items-center mb-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                {stat.label}
              </p>
              <div className={`p-2 ${statIconBg[i]} rounded-xl`}>
                {statIcons[i]}
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900 mb-1">
              {liveValues[i] !== undefined && liveValues[i] !== null
                ? liveValues[i]
                : stat.value}
            </p>
            {stat.sub && (
              <p className="text-[11px] text-slate-400">{stat.sub}</p>
            )}
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 flex flex-wrap justify-between items-center gap-3 border-b border-slate-50">
          <h2 className="font-bold text-slate-800 text-sm">All Users</h2>
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
                size={14}
              />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 bg-slate-50 rounded-lg text-xs w-52 focus:ring-1 focus:ring-teal-500 outline-none"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 outline-none"
            >
              <option value="">All Roles</option>
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <select
              value={orgFilter}
              onChange={(e) => setOrgFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 outline-none"
            >
              <option value="">All Companies</option>
              {orgs.map((org: any) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-[11px] text-slate-500 font-bold tracking-wide border-b border-slate-100">
              <tr>
                <th className="px-5 py-4">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-teal-600"
                  />
                </th>
                {[
                  "User",
                  "Company",
                  "Role",
                  "Last Active",
                  "Status",
                  "2FA",
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
                  <td colSpan={8}>
                    <LoadingSpinner />
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  const isActive = user.isActive ?? user.status === "Active";
                  const st = isActive
                    ? statusStyles.Active
                    : statusStyles.Suspended;
                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-50/40 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <input
                          type="checkbox"
                          className="rounded border-slate-300 text-teal-600"
                        />
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 ${user.avatarColor || "bg-teal-500"} rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0`}
                          >
                            {user.initials || user.firstName?.[0] || "?"}
                          </div>
                          <div>
                            <p className="text-[12px] font-bold text-slate-800">
                              {user.name ||
                                `${user.firstName} ${user.lastName}`}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-500">
                        {user.company ||
                          user.organization?.name ||
                          user.organizationId ||
                          "—"}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`text-[10px] px-2.5 py-1 rounded-md uppercase tracking-tight ${roleStyles[user.role] ?? roleStyles.VIEWER}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-[11px] text-slate-400">
                        {user.lastActive || user.lastLoginAt || "—"}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-full ${st.badge}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${st.dot}`}
                          />
                          {isActive ? "Active" : "Suspended"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {user.twoFA ? (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                            <Check size={12} strokeWidth={3} /> On
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-300">
                            Off
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          {/* Change Role */}
                          <button
                            onClick={() =>
                              setRoleModal({
                                userId: user.id,
                                currentRole: user.role,
                              })
                            }
                            title="Change Role"
                            disabled={actionLoading === user.id}
                            className="text-slate-300 hover:text-teal-600 transition-colors"
                          >
                            <Edit2 size={14} />
                          </button>
                          {/* Lock — coming soon */}
                          <button
                            disabled
                            title="Coming soon"
                            className="text-slate-200 cursor-not-allowed"
                          >
                            <Lock size={14} />
                          </button>
                          {/* Suspend/Reactivate */}
                          <button
                            onClick={() => handleToggleStatus(user)}
                            disabled={actionLoading === user.id}
                            title={
                              isActive ? "Suspend user" : "Reactivate user"
                            }
                            className={`transition-colors ${
                              actionLoading === user.id
                                ? "text-slate-200"
                                : isActive
                                  ? "text-slate-300 hover:text-rose-500"
                                  : "text-rose-300 hover:text-emerald-500"
                            }`}
                          >
                            <Ban size={14} />
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

        <div className="p-4 flex flex-wrap justify-between items-center gap-3 border-t border-slate-50">
          <p className="text-xs text-slate-400">
            Showing {users.length} of {data?.data?.total || data?.total || 0}{" "}
            users
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
                className={`w-7 h-7 flex items-center justify-center rounded-lg text-[11px] font-bold ${
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

export default UserManagement;
