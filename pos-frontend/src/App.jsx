import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth
import Login from "./pages/auth/Login";

// Kasir
import KasirDashboard from "./pages/kasir/Dashboard";
import KasirTransaksi from "./pages/kasir/Transaksi";
import KasirRiwayat from "./pages/kasir/DataTransaksi";
import KasirSettings from "./pages/kasir/Settings";

// Owner
import OwnerDashboard from "./pages/owner/Dashboard";
import Produk from "./pages/owner/Produk";
import Stok from "./pages/owner/Stok";
import Laporan from "./pages/owner/Laporan";
import UserManagement from "./pages/owner/UserManagement";

// Misc
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ROOT */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />

        {/* KASIR */}
        <Route path="/kasir/dashboard" element={<KasirDashboard />} />
        <Route path="/kasir/transaksi" element={<KasirTransaksi />} />
        <Route path="/kasir/riwayat" element={<KasirRiwayat />} />
        <Route path="/kasir/settings" element={<KasirSettings />} />

        {/* OWNER */}
        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        <Route path="/owner/produk" element={<Produk />} />
        <Route path="/owner/stok" element={<Stok />} />
        <Route path="/owner/laporan" element={<Laporan />} />
        <Route path="/owner/users" element={<UserManagement />} />

        {/* NOT FOUND */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}
