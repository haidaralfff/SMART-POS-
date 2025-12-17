import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import KasirLayout from "./components/KasirLayout";
import OwnerLayout from "./components/OwnerLayout";

// Kasir Pages
import KasirDashboard from "./pages/kasir/Dashboard";
import KasirTransaksi from "./pages/kasir/Transaksi";
import KasirRiwayat from "./pages/kasir/DataTransaksi";
import KasirSettings from "./pages/kasir/Settings";

// Owner Pages
import OwnerDashboard from "./pages/owner/Dashboard";
import Produk from "./pages/owner/Produk";
import Stok from "./pages/owner/Stok";
import Laporan from "./pages/owner/Laporan";
import UserManagement from "./pages/owner/UserManagement";

// Not Found
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= KASIR ================= */}
        <Route path="/kasir" element={<KasirLayout />}>
          <Route index element={<KasirDashboard />} />
          <Route path="dashboard" element={<KasirDashboard />} />
          <Route path="transaksi" element={<KasirTransaksi />} />
          <Route path="riwayat" element={<KasirRiwayat />} />
          <Route path="settings" element={<KasirSettings />} />
        </Route>

        {/* ================= OWNER ================= */}
        <Route path="/owner" element={<OwnerLayout />}>
          <Route index element={<OwnerDashboard />} />
          <Route path="dashboard" element={<OwnerDashboard />} />
          <Route path="produk" element={<Produk />} />
          <Route path="stok" element={<Stok />} />
          <Route path="laporan" element={<Laporan />} />
          <Route path="users" element={<UserManagement />} />
        </Route>

        {/* ================= halaman default ================= */}
        <Route path="*" element={<KasirDashboard />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
