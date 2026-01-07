import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Package,
  Boxes,
  Users,
  LogOut,
  Briefcase
} from "lucide-react";

export default function SidebarOwner() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition
     ${
       isActive
         ? "bg-red-600 text-white"
         : "text-gray-700 hover:bg-red-100"
     }`;

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4">
      <h2 className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-600 uppercase tracking-wide">
        <Briefcase className="h-4 w-4" />
        <span>Owner</span>
      </h2>

      <nav className="space-y-1">
        {/* Dashboard */}
        <NavLink to="/owner/dashboard" className={linkClass}>
          <LayoutDashboard className="h-5 w-5 shrink-0" />
          <span>Dashboard</span>
        </NavLink>

        {/* Laporan */}
        <NavLink to="/owner/laporan" className={linkClass}>
          <FileText className="h-5 w-5 shrink-0" />
          <span>Laporan</span>
        </NavLink>

        {/* Produk */}
        <NavLink to="/owner/produk" className={linkClass}>
          <Package className="h-5 w-5 shrink-0" />
          <span>Produk</span>
        </NavLink>

        {/* Stok */}
        <NavLink to="/owner/stok" className={linkClass}>
          <Boxes className="h-5 w-5 shrink-0" />
          <span>Stok</span>
        </NavLink>

        {/* User Management */}
        <NavLink to="/owner/users" className={linkClass}>
          <Users className="h-5 w-5 shrink-0" />
          <span>User Management</span>
        </NavLink>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-4 w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium
                     text-red-600 hover:bg-red-50 cursor-pointer transition"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}
