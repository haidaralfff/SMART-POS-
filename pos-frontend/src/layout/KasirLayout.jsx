import { Outlet } from "react-router-dom";
import SidebarKasir from "../components/SidebarKasir";

export default function KasirLayout() {
    return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SidebarKasir />

      {/* Konten halaman */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
    );
}