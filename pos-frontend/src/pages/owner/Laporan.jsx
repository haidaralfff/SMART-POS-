import { useEffect, useState } from "react";

export default function Laporan() {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProduk, setFilteredProduk] = useState([]);
  const [kategoriFilter, setKategoriFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4001";

  useEffect(() => {
    fetchProduk();
  }, []);

  useEffect(() => {
    filterProduk();
  }, [produk, kategoriFilter, statusFilter]);

  const fetchProduk = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/laporan/stock`);
      const data = await response.json();
      setProduk(data || []);
    } catch (err) {
      console.error("Error fetching laporan:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStock = (stok) => {
    if (stok === 0) return "Habis";
    if (stok <= 5) return "Menipis";
    return "Aman";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Habis":
        return "bg-red-600";
      case "Menipis":
        return "bg-orange-400";
      default:
        return "bg-green-600";
    }
  };

  const filterProduk = () => {
    let filtered = produk;

    if (kategoriFilter) {
      filtered = filtered.filter((p) => p.kategori === kategoriFilter);
    }

    if (statusFilter) {
      filtered = filtered.filter((p) => getStatusStock(p.stok) === statusFilter);
    }

    setFilteredProduk(filtered);
  };

  const handleFilter = () => {
    filterProduk();
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Laporan Stock Barang</h1>
        <span className="text-sm text-gray-500">
          Tanggal Cetak : {new Date().toLocaleDateString("id-ID")}
        </span>
      </div>

      <hr className="mb-4" />

      {/* Filter */}
      <div className="flex flex-wrap gap-4 items-end mb-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Kategori</label>
          <select
            value={kategoriFilter}
            onChange={(e) => setKategoriFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 w-48"
          >
            <option value="">Semua Kategori</option>
            <option value="Makanan">Makanan</option>
            <option value="Minuman">Minuman</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Status Stock</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 w-48"
          >
            <option value="">Semua</option>
            <option value="Menipis">Menipis</option>
            <option value="Aman">Aman</option>
            <option value="Habis">Habis</option>
          </select>
        </div>

        <button
          onClick={handleFilter}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center">Loading...</div>
        ) : (
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="p-3 text-left">ID Barang</th>
                <th className="p-3 text-left">Nama Barang</th>
                <th className="p-3 text-left">Kategori</th>
                <th className="p-3 text-center">Stock Tersedia</th>
                <th className="p-3 text-center">Status Stock</th>
              </tr>
            </thead>

            <tbody>
              {filteredProduk.length > 0 ? (
                filteredProduk.map((item) => {
                  const status = getStatusStock(item.stok);
                  return (
                    <tr key={item.id} className="border-t">
                      <td className="p-3">{item.id?.substring(0, 8)}</td>
                      <td className="p-3 text-gray-500">{item.nama}</td>
                      <td className="p-3">{item.kategori || "-"}</td>
                      <td className="p-3 text-center">{item.stok}</td>
                      <td className="p-3 text-center">
                        <span
                          className={`${getStatusColor(
                            status
                          )} text-white px-3 py-1 rounded-md text-xs font-semibold`}
                        >
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    Tidak ada data produk
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-end mt-6">
        <button
          onClick={() => window.print()}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Cetak Laporan
        </button>
      </div>
    </div>
  );
}
