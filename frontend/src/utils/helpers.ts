export const planClass = (plan: string): string => {
  if (plan === "Enterprise")
    return "bg-linear-to-r from-[#0a1a16] via-[#142e29] to-[#1a5546] text-amber-400";
  if (plan === "Pro" || plan === "Professional")
    return "bg-teal-50 text-teal-600";
  return "bg-slate-100 text-slate-500";
};

export const statusClass = (status: string) => {
  if (status === "Active")
    return { dot: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-600" };
  if (status === "Trial")
    return { dot: "bg-amber-400", badge: "bg-amber-50 text-amber-600" };
  return { dot: "bg-rose-500", badge: "bg-rose-50 text-rose-600" };
};
