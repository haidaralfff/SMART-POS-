import { Pencil, Trash2, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function ManajemenBarang() {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ nama: "", harga: "", stok: "" });
  const [editingId, setEditingId] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4001";

  // Fetch produk dari backend
  useEffect(() => {
    fetchProduk();
  }, []);

  const fetchProduk = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/produk`);
      const data = await response.json();
      setProduk(data);
      setError("");
    } catch (err) {
      console.error("Error fetching produk:", err);
      setError("Gagal memuat data produk");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduk = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/produk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: formData.nama,
          harga: parseFloat(formData.harga),
          stok: parseInt(formData.stok),
        }),
      });

      if (response.ok) {
        setFormData({ nama: "", harga: "", stok: "" });
        setShowModal(false);
        fetchProduk();
      }
    } catch (err) {
      console.error("Error adding produk:", err);
    }
  };

  const handleDeleteProduk = async (id) => {
    if (confirm("Yakin ingin hapus produk ini?")) {
      try {
        await fetch(`${apiUrl}/api/produk/${id}`, { method: "DELETE" });
        fetchProduk();
      } catch (err) {
        console.error("Error deleting produk:", err);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Barang</h1>
          <p className="text-gray-500 text-sm">Kelola data barang</p>
        </div>

        <button
          onClick={() => {
            setEditingId(null);
            setFormData({ nama: "", harga: "", stok: "" });
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold"
        >
          <Plus size={18} />
          Tambah Barang
        </button>
      </div>

      {/* Modal Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Tambah Barang</h2>
            <form onSubmit={handleAddProduk} className="space-y-4">
              <input
                type="text"
                placeholder="Nama Barang"
                value={formData.nama}
                onChange={(e) =>
                  setFormData({ ...formData, nama: e.target.value })
                }
                required
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="number"
                placeholder="Harga"
                value={formData.harga}
                onChange={(e) =>
                  setFormData({ ...formData, harga: e.target.value })
                }
                required
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="number"
                placeholder="Stok"
                value={formData.stok}
                onChange={(e) =>
                  setFormData({ ...formData, stok: e.target.value })
                }
                required
                className="w-full border rounded px-3 py-2"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 rounded"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-400 text-white py-2 rounded"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="text-center py-6">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-600 py-6">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-gray-200 text-gray-600">
                <th className="p-3 text-left rounded-l-lg">ID</th>
                <th className="p-3 text-left">Nama Barang</th>
                <th className="p-3 text-left">Harga</th>
                <th className="p-3 text-left">Stok</th>
                <th className="p-3 text-center rounded-r-lg">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {produk.length > 0 ? (
                produk.map((item) => (
                  <tr key={item.id} className="bg-white shadow-sm">
                    <td className="p-3 rounded-l-lg">{item.id?.substring(0, 8)}</td>
                    <td className="p-3">{item.nama}</td>
                    <td className="p-3">Rp {item.harga?.toLocaleString()}</td>
                    <td className="p-3">{item.stok}</td>
                    <td className="p-3 rounded-r-lg">
                      <div className="flex justify-center gap-2">
                        <button className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md text-xs">
                          <Pencil size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduk(item.id)}
                          className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-xs"
                        >
                          <Trash2 size={14} />
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-3 text-center text-gray-500">
                    Tidak ada data produk
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
