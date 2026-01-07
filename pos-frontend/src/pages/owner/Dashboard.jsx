function Dashboard() {
  return (
    <div className="flex-1 p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard Owner</h1>
        <p className="text-gray-500">
          Ringkasan bisnis Anda hari ini
        </p>
      </div>

      {/* Statistik Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Transaksi" value="0" />
        <StatCard title="Pendapatan Hari Ini" value="Rp 0" highlight />
        <StatCard title="Produk Terjual" value="0" />
        <StatCard title="Total Pelanggan" value="0" />
      </div>

      {/* Info Boxes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informasi Tambahan */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-3">
            Status Bisnis
          </h2>
          <ul className="text-gray-600 space-y-2 text-sm">
            <li>• Sistem sedang berjalan dengan normal</li>
            <li>• Tidak ada peringatan atau masalah</li>
            <li>• Semua kasir aktif dan online</li>
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-3">
            Akses Cepat
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-red-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-700">
              Lihat Laporan
            </button>
            <button className="bg-red-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-700">
              Kelola Produk
            </button>
            <button className="bg-red-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-700">
              Cek Stok
            </button>
            <button className="bg-red-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-700">
              User Management
            </button>
          </div>
        </div>
      </div>
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

export default Dashboard;
