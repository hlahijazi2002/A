import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-slate-100">
      <SideBar />
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
