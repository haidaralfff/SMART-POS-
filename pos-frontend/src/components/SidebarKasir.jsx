import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  WalletMinimal,
  NotepadText,
  Cog,
  User,
  LogOut,
  X,
} from "lucide-react";
import { useState } from "react";
import logoUrl from "../assets/SmartPOS-logo.svg";

export default function SidebarKasir() {
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
          <img
            src={logoUrl}
            alt="POSFY Logo"
            className="h-50 w-50"
          />
        </div>
        <nav className="space-y-1">
          <NavLink to="/kasir/dashboard" className={linkClass}>
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/kasir/transaksi" className={linkClass}>
            <WalletMinimal className="h-5 w-5" />
            <span>Transaksi</span>
          </NavLink>

          <NavLink to="/kasir/riwayat" className={linkClass}>
            <NotepadText className="h-5 w-5" />
            <span>Data Transaksi</span>
          </NavLink>

          <NavLink to="/kasir/settings" className={linkClass}>
            <Cog className="h-5 w-5" />
            <span>Settings</span>
          </NavLink>

          {/* Logout Button */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="mt-4 w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium
                     text-red-600 hover:bg-red-50 transition"
          >
            <LogOut className="h-5 w-5" />
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
