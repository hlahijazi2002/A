import { Plus } from "lucide-react";
import { partnerStats, type Partner } from "../../data/data";
import useFetch from "../hooks/useFetch";
import LoadingSpinner from "../components/LoadingSpinner";

const tierColors = {
  Gold: "bg-orange-100 text-orange-600",
  Silver: "bg-slate-100 text-slate-600",
  Bronze: "bg-rose-100 text-rose-600",
};

const PartnerCard = ({ partner }: { partner: Partner }) => (
  <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-5">
      <div className="flex gap-3">
        <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-lg shrink-0">
          {partner.initial}
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-sm">{partner.name}</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {partner.type} · {partner.location}
          </p>
        </div>
      </div>
      <span
        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${tierColors[partner.tier]}`}
      >
        ● {partner.tier}
      </span>
    </div>

    <div className="grid grid-cols-2 gap-2 mb-4">
      <div className="bg-slate-50 p-3 rounded-xl">
        <p className="text-lg font-bold text-slate-800">
          {partner.companiesCount}
        </p>
        <p className="text-[10px] text-slate-500 uppercase tracking-wide">
          Companies
        </p>
      </div>
      <div className="bg-slate-50 p-3 rounded-xl">
        <p className="text-lg font-bold text-slate-800">{partner.revenue}</p>
        <p className="text-[10px] text-slate-500">Revenue Generated</p>
      </div>
    </div>

    <div className="flex gap-2">
      <button className="flex-1 py-1.5 text-xs font-bold border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
        View Details
      </button>
      <button className="flex-1 py-1.5 text-xs font-bold border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
        Contact
      </button>
    </div>
  </div>
);

const PartnerManagement = () => {
  const { data, loading } = useFetch<{ data: Partner[] }>("/partners", {
    data: [],
  });
  const partnersList = data?.data || [];

  return (
    <div className="min-h-screen bg-slate-50/30 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            Partner Management
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Resellers, consultants, and integration partners
          </p>
        </div>
        <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-[12px] font-bold shadow-sm transition-colors">
          <Plus size={14} /> Add Partner
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {partnerStats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm"
          >
            <p className="text-xs text-slate-500 mb-2">{stat.label}</p>
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold text-slate-800">{stat.val}</p>
              <div
                className={`w-9 h-9 rounded-lg ${stat.iconBg} flex items-center justify-center`}
              >
                <div className="w-4 h-4 border-2 border-current opacity-40 rounded-sm" />
              </div>
            </div>
            <p className="text-xs mt-1.5 text-slate-400">
              {stat.trend && (
                <span className="text-emerald-500 mr-1">{stat.trend}</span>
              )}
              {stat.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Cards */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {partnersList.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PartnerManagement;
