import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Transaksi() {
  const [produk, setProduk] = useState([]);
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [uangMasuk, setUangMasuk] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState({});

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4001";
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProduk();
  }, []);

  const fetchProduk = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/api/produk`);
      const data = await res.json();
      setProduk(data);
    } catch (err) {
      console.error("Error fetching produk:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    const existingItem = cart.find((c) => c.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((c) =>
          c.id === item.id
            ? {
                ...c,
                qty: (c.qty || 1) + 1,
                subtotal: c.harga * ((c.qty || 1) + 1),
              }
            : c
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...item,
          qty: 1,
          subtotal: item.harga,
        },
      ]);
    }
    setSearchTerm("");
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter((c) => c.id !== id));
  };

  const handleChangeQty = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCart(
      cart.map((c) =>
        c.id === id
          ? {
              ...c,
              qty: newQty,
              subtotal: c.harga * newQty,
            }
          : c
      )
    );
  };

  const totalHarga = cart.reduce((sum, item) => sum + (item.subtotal || 0), 0);
  const kembalian =
    uangMasuk && uangMasuk >= totalHarga ? uangMasuk - totalHarga : 0;

  const filteredProduk = produk.filter(
    (p) =>
      p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.barcode?.includes(searchTerm)
  );

  const handleBayar = async () => {
    if (cart.length === 0) {
      alert("Keranjang kosong!");
      return;
    }

    if (paymentMethod === "Cash" && (!uangMasuk || uangMasuk < totalHarga)) {
      alert("Uang masuk tidak valid!");
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/api/transaksi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart,
          total: totalHarga,
          bayar: uangMasuk || totalHarga,
          kembalian: kembalian,
          kasir_id: userId,
          metode_pembayaran: paymentMethod,
        }),
      });

      if (res.ok) {
        alert("Transaksi berhasil!");
        setCart([]);
        setUangMasuk("");
        setShowModal(false);
      } else {
        alert("Gagal melakukan transaksi");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Terjadi kesalahan");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen relative">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">Transaksi</h1>

      {/* Search */}
      <div className="mb-4 flex items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Cari Barang..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring focus:ring-red-300"
          />
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-4">
          {loading ? (
            <p className="text-center text-gray-500 py-4">Loading...</p>
          ) : searchTerm ? (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left">Kode</th>
                  <th className="p-3 text-left">Nama</th>
                  <th className="p-3 text-left">Harga</th>
                  <th className="p-3 text-left">Stok</th>
                  <th className="p-3 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredProduk.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-3 text-center text-gray-500">
                      Produk tidak ditemukan
                    </td>
                  </tr>
                ) : (
                  filteredProduk.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-3">{item.barcode || "-"}</td>
                      <td className="p-3">{item.nama}</td>
                      <td className="p-3">
                        Rp {item.harga?.toLocaleString()}
                      </td>
                      <td className="p-3">{item.stok}</td>
                      <td className="p-3">
                        <button
                          onClick={() => handleAddToCart(item)}
                          disabled={item.stok === 0}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
                        >
                          +
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500 py-4">
              Mulai cari produk...
            </p>
          )}
        </div>

        {/* Cart */}
        <div className="bg-gray-100 rounded-xl shadow p-4 flex flex-col justify-between">
          <div>
            <h2 className="font-bold mb-3">Keranjang</h2>
            <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
              {cart.length === 0 ? (
                <p className="text-sm text-gray-500">Keranjang kosong</p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-2 rounded text-sm border"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium text-xs">
                        {item.nama}
                      </span>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="text-red-500 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleChangeQty(item.id, item.qty - 1)}
                          className="px-2 py-0.5 bg-gray-200 rounded text-xs"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) =>
                            handleChangeQty(
                              item.id,
                              parseInt(e.target.value) || 1
                            )
                          }
                          className="w-10 text-center border rounded text-xs"
                        />
                        <button
                          onClick={() => handleChangeQty(item.id, item.qty + 1)}
                          className="px-2 py-0.5 bg-gray-200 rounded text-xs"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs font-medium">
                        Rp {item.subtotal?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>Total Harga</span>
              <span>Rp {totalHarga.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">
              Metode Pembayaran
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full mt-1 mb-4 px-3 py-2 border rounded-lg"
            >
              <option>Cash</option>
              <option>QRIS</option>
              <option>Transfer</option>
            </select>

            <button
              onClick={() => setShowModal(true)}
              disabled={cart.length === 0}
              className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400"
            >
              Bayar
            </button>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4"
            >
              <X />
            </button>

            <h2 className="text-xl font-bold text-center mb-6">
              Pembayaran {paymentMethod}
            </h2>

            {/* ===== CASH ===== */}
            {paymentMethod === "Cash" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Uang Masuk</span>
                  <input
                    type="number"
                    className="border rounded px-3 py-1 w-40"
                    value={uangMasuk}
                    onChange={(e) => setUangMasuk(Number(e.target.value))}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Harga</span>
                  <input
                    value={`Rp ${totalHarga.toLocaleString()}`}
                    disabled
                    className="border rounded px-3 py-1 w-40 bg-gray-100"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Kembalian</span>
                  <input
                    value={`Rp ${kembalian.toLocaleString()}`}
                    disabled
                    className="border rounded px-3 py-1 w-40 bg-gray-100"
                  />
                </div>
              </div>
            )}

            {/* ===== QRIS / TRANSFER ===== */}
            {paymentMethod !== "Cash" && (
              <div className="text-center py-8">
                <p className="mb-2 font-medium">
                  Total Pembayaran
                </p>
                <p className="text-2xl font-bold text-red-600">
                  Rp {totalHarga.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Silakan selesaikan pembayaran melalui {paymentMethod}
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold">
                CETAK
              </button>
              <button
                onClick={handleBayar}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700"
              >
                SELESAI
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
