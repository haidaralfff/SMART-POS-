import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Layers,
  Package,
  FileText,
  Wallet,
} from "lucide-react";

const chartData = [
  { day: "Senin", value: 700 },
  { day: "Selasa", value: 850 },
  { day: "Rabu", value: 1000 },
  { day: "Kamis", value: 1200 },
  { day: "Jum'at", value: 1450 },
  { day: "Sabtu", value: 1800 },
  { day: "Minggu", value: 1200 },
];

export default function DashboardOwner() {
  return (
    <div className="flex-1 p-6 lg:p-8 space-y-6 bg-gray-100">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          Welcome Owner <span>👋</span>
        </h1>
        <p className="text-gray-500">Manajemen Stok</p>
      </div>

      {/* Statistik Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Produk"
          value="125"
          color="blue"
          icon={Layers}
        />
        <StatCard
          title="Total Stok"
          value="2.250"
          color="green"
          icon={Package}
        />
        <StatCard
          title="Total Transaksi"
          value="1.250"
          color="yellow"
          icon={FileText}
        />
        <StatCard
          title="Total Pendapatan"
          value="Rp 200.250.000"
          color="red"
          icon={Wallet}
        />
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold mb-4">Grafik Penjualan</h2>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/* ===== Statistik Card ===== */
function StatCard({ title, value, color, icon: Icon }) {
  const styles = {
    blue: {
      card: "bg-blue-50 border-blue-400",
      icon: "bg-blue-500 text-white",
    },
    green: {
      card: "bg-green-50 border-green-400",
      icon: "bg-green-500 text-white",
    },
    yellow: {
      card: "bg-yellow-50 border-yellow-400",
      icon: "bg-yellow-500 text-white",
    },
    red: {
      card: "bg-red-50 border-red-400",
      icon: "bg-red-500 text-white",
    },
  };

  return (
    <div
      className={`border rounded-xl p-5 flex items-center gap-4 ${styles[color].card}`}
    >
      {/* Icon */}
      {Icon && (
        <div className={`p-3 rounded-lg ${styles[color].icon}`}>
          <Icon size={28} strokeWidth={2} />
        </div>
      )}

      {/* Content */}
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-xl font-bold text-gray-900">
          {value}
        </p>
      </div>
    </div>
  );
}
