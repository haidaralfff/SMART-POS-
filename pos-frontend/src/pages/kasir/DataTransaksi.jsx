import { useEffect, useState } from "react";

export default function DataTransaksi() {
  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4001";
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchTransaksi();
  }, []);

  const fetchTransaksi = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/api/transaksi`);
      const data = await res.json();

      // Filter untuk transaksi kasir saja
      const kasirTransaksi = data.filter((t) => t.kasir_id === userId);
      setTransaksi(kasirTransaksi);
    } catch (err) {
      console.error("Error fetching transaksi:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransaksi = transaksi.filter(
    (item) =>
      item.tanggal?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.total?.toString().includes(searchTerm)
  );

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-bold">Data Transaksi</h1>
      <p className="text-gray-500 mb-6">Riwayat transaksi penjualan Anda</p>

      {/* Card */}
      <div className="bg-white rounded-xl shadow p-4">
        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Cari transaksi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-red-300"
          />
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-center text-gray-500 py-4">Loading...</p>
        ) : filteredTransaksi.length === 0 ? (
          <p className="text-center text-gray-500 py-4">
            Tidak ada transaksi
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-3 text-left rounded-l-lg">Tanggal</th>
                  <th className="p-3 text-left">Total Harga</th>
                  <th className="p-3 text-left">Bayar</th>
                  <th className="p-3 text-left rounded-r-lg">Kembalian</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransaksi.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b last:border-none"
                  >
                    <td className="p-3">
                      {new Date(item.created_at).toLocaleDateString("id-ID")}
                    </td>
                    <td className="p-3 font-medium">
                      {formatRupiah(item.total || 0)}
                    </td>
                    <td className="p-3">
                      {formatRupiah(item.bayar || 0)}
                    </td>
                    <td className="p-3 font-medium">
                      {formatRupiah(item.kembalian || 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
