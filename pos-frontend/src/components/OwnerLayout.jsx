import { Outlet } from "react-router-dom";
import SidebarOwner from "../components/common/SidebarOwner";

export default function OwnerLayout() {
  return (
    <div className="flex">
      <SidebarOwner />
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
