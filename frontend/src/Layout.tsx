import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
import Navbar from "./components/Navbar";

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-slate-50">
      <SideBar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
