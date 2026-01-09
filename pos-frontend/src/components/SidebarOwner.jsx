import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Briefcase,
  X,
} from "lucide-react";
import { useState } from "react";
import logoUrl from "../assets/SmartPOS-logo.svg";

export default function SidebarOwner() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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
    <>
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r min-h-screen p-4">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <img src={logoUrl} alt="POSFY Logo" className="h-50 w-50" />
        </div>
        <nav className="space-y-1">
          {/* Dashboard */}
          <NavLink to="/owner/dashboard" className={linkClass}>
            <LayoutDashboard className="h-5 w-5 shrink-0" />
            <span>Dashboard</span>
          </NavLink>

          {/* Manajemen Barang */}
          <NavLink to="/owner/barang" className={linkClass}>
            <ShoppingCart className="h-5 w-5 shrink-0" />
            <span>Manajemen Barang</span>
          </NavLink>

          {/* Data Transaksi */}
          <NavLink to="/owner/transaksi" className={linkClass}>
            <FileText className="h-5 w-5 shrink-0" />
            <span>Data Transaksi</span>
          </NavLink>

          {/* Laporan */}
          <NavLink to="/owner/laporan" className={linkClass}>
            <BarChart3 className="h-5 w-5 shrink-0" />
            <span>Laporan</span>
          </NavLink>

          {/* Settings */}
          <NavLink to="/owner/settings" className={linkClass}>
            <Settings className="h-5 w-5 shrink-0" />
            <span>Settings</span>
          </NavLink>

          {/* Logout Button */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="mt-4 w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium
                     text-red-600 hover:bg-red-50 transition"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* ===== MODAL LOGOUT ===== */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg relative">
            {/* Header */}
            <div className="px-6 py-4 border-b text-center font-bold text-xl text-blue-900">
              Konfirmasi Log Out
              <button
                onClick={() => setShowLogoutModal(false)}
                className="absolute right-4 top-4 text-gray-500 hover:text-black"
              >
                <X size={22} />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-8 text-center text-lg">
              Apakah Anda yakin ingin keluar dari sistem?
            </div>

            {/* Actions */}
            <div className="px-6 pb-6 flex justify-center gap-6">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-300 text-gray-800 px-8 py-2 rounded-lg font-semibold hover:bg-gray-400"
              >
                Batal
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-red-700"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
