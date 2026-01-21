import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

const chartData = [
  { day: "Sen", value: 1600000 },
  { day: "Sel", value: 1900000 },
  { day: "Rab", value: 2200000 },
  { day: "Kam", value: 1800000 },
  { day: "Jum", value: 2400000 },
  { day: "Sab", value: 2600000 },
  { day: "Min", value: 2000000 },
];

export default function Dashboard() {
  const [stats, setStats] = useState({
    transaksiHariIni: 0,
    pendapatan: 0,
    produkTerjual: 0,
  });
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4001";
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Fetch kasir's transactions
      const transaksiRes = await fetch(`${apiUrl}/api/transaksi`);
      const transaksiData = await transaksiRes.json();

      // Filter transaksi for this kasir and today
      const today = new Date().toISOString().split("T")[0];
      const kasirTransaksi = transaksiData.filter(
        (t) =>
          t.kasir_id === userId &&
          t.created_at?.startsWith(today)
      );

      const totalTransaksiHariIni = kasirTransaksi.length;
      const totalPendapatan = kasirTransaksi.reduce(
        (sum, t) => sum + (t.total || 0),
        0
      );

      // Estimate produk terjual (assuming items is stored)
      const produkTerjual = kasirTransaksi.reduce(
        (sum, t) => sum + (t.items?.length || 0),
        0
      );

      setStats({
        transaksiHariIni: totalTransaksiHariIni,
        pendapatan: totalPendapatan,
        produkTerjual: produkTerjual,
      });
    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Welcome Kasir 👋</h1>
          <p className="text-gray-500">
            Ringkasan transaksi hari ini
          </p>
        </div>

        {/* Statistik */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Transaksi Hari Ini"
            value={loading ? "-" : stats.transaksiHariIni}
          />
          <StatCard
            title="Pendapatan"
            value={
              loading
                ? "-"
                : `Rp ${stats.pendapatan.toLocaleString()}`
            }
            highlight
          />
          <StatCard
            title="Produk Terjual"
            value={loading ? "-" : stats.produkTerjual}
          />
          <StatCard title="Shift Aktif" value="08:00 - 16:00" />
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold mb-4">
            Grafik Pendapatan Mingguan
          </h2>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="day" />
                <YAxis
                  tickFormatter={(v) =>
                    `${v / 1000000} jt`
                  }
                />
                <Tooltip
                  formatter={(value) =>
                    `Rp ${value.toLocaleString("id-ID")}`
                  }
                />
                <Bar
                  dataKey="value"
                  radius={[8, 8, 0, 0]}
                  fill="#3b82f6"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ===== Card Statistik ===== */
function StatCard({ title, value, highlight }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 text-center">
      <p className="text-sm text-gray-500">{title}</p>
      <p
        className={`text-3xl font-bold mt-2 ${
          highlight ? "text-red-600" : "text-gray-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
