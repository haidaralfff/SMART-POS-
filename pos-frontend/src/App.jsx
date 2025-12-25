import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth
import Login from "./pages/auth/Login";

// Kasir
import KasirLayout from "./layout/KasirLayout";
import KasirDashboard from "./pages/kasir/Dashboard";
import KasirTransaksi from "./pages/kasir/Transaksi";
import KasirRiwayat from "./pages/kasir/DataTransaksi";
import KasirSettings from "./pages/kasir/Settings";

// Owner
import OwnerLayout from "./layout/OwnerLayout";
import OwnerDashboard from "./pages/owner/Dashboard";
import Produk from "./pages/owner/Produk";
import Stok from "./pages/owner/Stok";
import Laporan from "./pages/owner/Laporan";
import UserManagement from "./pages/owner/UserManagement";

// Protected
import ProtectedRole from "./pages/protected role/ProtectedRole";

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
        <Route
          path="/kasir"
          element={
            <ProtectedRole role="kasir">
              <KasirLayout />
            </ProtectedRole>
          }
        >
          <Route path="dashboard" element={<KasirDashboard />} />
          <Route path="transaksi" element={<KasirTransaksi />} />
          <Route path="riwayat" element={<KasirRiwayat />} />
          <Route path="settings" element={<KasirSettings />} />
        </Route>

        {/* OWNER */}
        <Route
          path="/owner"
          element={
            <ProtectedRole role="owner">
              <OwnerLayout />
            </ProtectedRole>
          }
        >
          <Route path="dashboard" element={<OwnerDashboard />} />
          <Route path="produk" element={<Produk />} />
          <Route path="stok" element={<Stok />} />
          <Route path="laporan" element={<Laporan />} />
          <Route path="users" element={<UserManagement />} />
        </Route>

        {/* NOT FOUND */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}
