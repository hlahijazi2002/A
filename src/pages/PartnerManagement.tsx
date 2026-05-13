import { partnerStats, partners, type Partner } from "../../data/data";

const PartnerManagement = () => {
  return (
    <div className=" bg-gray-50 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Partner Management
          </h1>
          <p className="text-slate-500">
            Resellers, consultants, and integration partners
          </p>
        </div>
        <button className="bg-[#2D9A8F] text-sm font-bold text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-[#248277] transition-colors">
          <span className="">+</span> Add Partner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
        {partnerStats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm"
          >
            <span className="text-slate-500 text-xs font-medium">
              {stat.label}
            </span>

            <div className="flex justify-between items-start mb-2">
              <div className="text-xl font-bold text-slate-800">{stat.val}</div>
              <div
                className={`w-8 h-8 rounded-lg ${stat.iconBg} flex items-center justify-center`}
              >
                <div className="w-4 h-4 border-2 border-current opacity-40 rounded-sm"></div>
              </div>
            </div>
            <div className="text-xs mt-1 text-slate-400">
              {stat.trend && (
                <span className="text-emerald-500 mr-1">{stat.trend}</span>
              )}
              {stat.sub}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {partners.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}
      </div>
    </div>
  );
};

const PartnerCard = ({ partner }: { partner: Partner }) => {
  const tierColors = {
    Gold: "bg-orange-100 text-orange-600",
    Silver: "bg-slate-100 text-slate-600",
    Bronze: "bg-rose-100 text-rose-600",
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-2">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-lg">
            {partner.initial}
          </div>
          <div>
            <h3 className="font-bold text-slate-800">{partner.name}</h3>
            <p className="text-xs text-slate-400">
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
          <div className="text-lg font-bold text-slate-800">
            {partner.companiesCount}
          </div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">
            Companies
          </div>
        </div>
        <div className="bg-slate-50 p-2 rounded-lg">
          <div className="text-lg font-bold text-slate-800">
            {partner.revenue}
          </div>
          <div className="text-[10px] text-slate-500 tracking-wider">
            Revenue Generated
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 py-1 text-sm font-medium border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
          View Details
        </button>
        <button className="flex-1 py-1 text-sm font-medium border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
          Contact
        </button>
      </div>
    </div>
  );
};

export default PartnerManagement;
