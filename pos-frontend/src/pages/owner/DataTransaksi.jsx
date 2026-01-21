import { Search, Download } from "lucide-react";
import { useState, useEffect } from "react";

export default function DataTransaksi() {
  const [searchTerm, setSearchTerm] = useState("");
  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4001";

  useEffect(() => {
    fetchTransaksi();
  }, []);

  const fetchTransaksi = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/transaksi`);
      const data = await response.json();
      setTransaksi(data || []);
    } catch (err) {
      console.error("Error fetching transaksi:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransaksi = transaksi.filter((t) =>
    (t.user_id?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
    (t.created_at?.includes(searchTerm) || false)
  );

  const totalPendapatan = filteredTransaksi.reduce((sum, t) => sum + (t.total || 0), 0);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Data Transaksi</h1>
        <p className="text-gray-600">Lihat riwayat semua transaksi yang telah dilakukan</p>
      </div>

      {/* Search & Export */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Cari user atau tanggal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-red-300"
          />
        </div>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 flex items-center gap-2">
          <Download className="h-5 w-5" />
          Export
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">Loading...</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-red-50 border-b">
                <th className="p-4 text-left font-semibold text-gray-700">No</th>
                <th className="p-4 text-left font-semibold text-gray-700">Tanggal</th>
                <th className="p-4 text-left font-semibold text-gray-700">Total</th>
                <th className="p-4 text-left font-semibold text-gray-700">Bayar</th>
                <th className="p-4 text-left font-semibold text-gray-700">Kembalian</th>
                <th className="p-4 text-left font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransaksi.length > 0 ? (
                filteredTransaksi.map((trans, index) => (
                  <tr key={trans.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 text-gray-700">{index + 1}</td>
                    <td className="p-4 text-gray-700">
                      {new Date(trans.created_at).toLocaleDateString("id-ID")}
                    </td>
                    <td className="p-4 text-gray-700 font-semibold">
                      Rp {trans.total?.toLocaleString()}
                    </td>
                    <td className="p-4 text-gray-700">
                      Rp {trans.bayar?.toLocaleString()}
                    </td>
                    <td className="p-4 text-gray-700">
                      Rp {trans.kembalian?.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        Selesai
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    Data transaksi tidak ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Total Transaksi</p>
          <p className="text-2xl font-bold text-red-600">{filteredTransaksi.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Total Pendapatan</p>
          <p className="text-2xl font-bold text-green-600">
            Rp {totalPendapatan.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
