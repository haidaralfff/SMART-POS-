import { Outlet } from "react-router-dom";
import SidebarKasir from "../components/common/SidebarKasir";

export default function KasirLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarKasir />

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
