
export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      

      {/* Content */}
      <main className="flex-1 p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Dashboard Kasir</h1>

          <p className="text-gray-500">
            Ringkasan transaksi hari ini
          </p>
        </div>

        {/* Statistik Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Transaksi Hari Ini" value="0" />
          <StatCard title="Pendapatan" value="Rp 0" highlight />
          <StatCard title="Produk Terjual" value="0" />
          <StatCard title="Shift Aktif" value="08:00 - 16:00" />
        </div>

        {/* Informasi Tambahan */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-3">
            Informasi Hari Ini
          </h2>
          <ul className="text-gray-600 space-y-2 text-sm">
            <li>• Total transaksi meningkat dibanding kemarin</li>
            <li>• Tidak ada transaksi bermasalah</li>
            <li>• Sistem berjalan normal</li>
          </ul>
        </div>
      </main>
    </div>
  );
}




/* ===== Reusable Card ===== */
function StatCard({ title, value, highlight }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 text-center">
      <p className="text-sm text-gray-500">{title}</p>
      <p
        className={`text-3xl font-bold mt-2 ${
          highlight ? "text-red-600" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}
