import { Search, Bell } from "lucide-react";

const TopNavbar = () => {
  return (
    <div className="h-14 bg-white flex items-center justify-between px-6 sticky top-0 z-10 w-full">
      <div className="flex items-center gap-1.5 text-[12px] whitespace-nowrap">
        <span className="text-slate-400">Admin</span>
        <span className="text-slate-300 font-light">›</span>
        <span className="text-slate-900 font-bold">Dashboard</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={13}
          />
          <input
            type="text"
            placeholder="Search companies, users."
            className="px-5 py-1.3 bg-[#f8fafc] border border-slate-100 text-[13px] w-52 rounded-md placeholder:text-slate-450"
          />
        </div>

        <div className="bg-linear-to-r from-[#0a1a16] via-[#142e29] to-[#0a1a16] rounded-full flex items-center justify-center border border-white/5 shadow-inner">
          <span className="text-[10px] px-2 py-0.8 font-black  text-[#ff9800] uppercase ">
            Super Admin
          </span>
        </div>

        <div className="relative cursor-pointer px-1">
          <Bell size={18} className="text-slate-500" />
          <span className="absolute top-0 right-0.5 w-1.5 h-1.5 bg-[#ef4444] rounded-full border border-white"></span>
        </div>

        <div className="w-8 h-8 bg-[#0b9181] rounded-full flex items-center justify-center text-white text-[11px] font-bold cursor-pointer">
          SA
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
