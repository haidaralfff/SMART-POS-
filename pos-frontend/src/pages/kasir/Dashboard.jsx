

export default function Dashboard() {
  return (
    
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">
          Dashboard Kasir
        </h1>
        <p className="text-gray-500">
          Ringkasan transaksi hari ini
        </p>
      </div>

      {/* Statistik Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-white rounded-xl shadow p-5 text-center">
          <p className="text-sm text-gray-500">
            Transaksi Hari Ini
          </p>
          <p className="text-3xl font-bold mt-2">
            0
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow p-5 text-center">
          <p className="text-sm text-gray-500">
            Pendapatan
          </p>
          <p className="text-3xl font-bold mt-2 text-green-600">
            Rp 0
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl shadow p-5 text-center">
          <p className="text-sm text-gray-500">
            Produk Terjual
          </p>
          <p className="text-3xl font-bold mt-2">
            0
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-xl shadow p-5 text-center">
          <p className="text-sm text-gray-500">
            Shift Aktif
          </p>
          <p className="text-3xl font-bold mt-2">
            08:00 - 16:00
          </p>
        </div>
      </div>

      {/* Informasi Tambahan */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-3">
          Informasi Hari Ini
        </h2>
        <ul className="text-gray-600 space-y-2">
          <li>• Total transaksi meningkat dibanding kemarin</li>
          <li>• Tidak ada transaksi bermasalah</li>
          <li>• Sistem berjalan normal</li>
        </ul>
      </div>
    </div>
  );
}
