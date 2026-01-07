import { Search } from "lucide-react";

export default function Transaksi() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">Transaksi</h1>

      {/* Search */}
      <div className="mb-4 flex items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Cari Barang..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-red-300"
          />
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 rounded-l-lg text-left">Kode Barang</th>
                <th className="p-3 text-left">Nama Barang</th>
                <th className="p-3 text-left">Harga</th>
                <th className="p-3 text-left">Jumlah</th>
                <th className="p-3 rounded-r-lg text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {[
                { kode: "BRG001", nama: "Indomie Goreng", harga: "Rp 3.500" },
                { kode: "BRG002", nama: "Mie Goreng", harga: "Rp 3.500" },
                { kode: "BRG003", nama: "Aqua", harga: "Rp 4.000" },
                { kode: "BRG004", nama: "Chitato Sapi", harga: "Rp 10.000" },
              ].map((item) => (
                <tr key={item.kode} className="border-b">
                  <td className="p-3">{item.kode}</td>
                  <td className="p-3">{item.nama}</td>
                  <td className="p-3">{item.harga}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <button className="w-6 h-6 bg-red-600 text-white rounded">
                        -
                      </button>
                      <span>0</span>
                      <button className="w-6 h-6 bg-red-600 text-white rounded">
                        +
                      </button>
                    </div>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button className="text-red-600">✏️</button>
                    <button className="text-red-600">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cart */}
        <div className="bg-gray-100 rounded-xl shadow p-4 flex flex-col justify-between">
          <div>
            <h2 className="font-bold mb-3">Keranjang</h2>

            <div className="space-y-3 text-sm">
              {[
                { nama: "Indomie Goreng", harga: "Rp 3.500", qty: 3 },
                { nama: "Mie Goreng", harga: "Rp 3.500", qty: 1 },
                { nama: "Aqua", harga: "Rp 4.000", qty: 2 },
                { nama: "Chitato Sapi", harga: "Rp 10.000", qty: 2 },
              ].map((item, index) => (
                <div key={index} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.nama}</p>
                    <p className="text-gray-500">{item.harga}</p>
                  </div>
                  <span>x{item.qty}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment */}
          <div className="mt-6">
            <div className="flex justify-between font-semibold mb-4">
              <span>Total Harga</span>
              <span>Rp 42.000</span>
            </div>

            <label className="text-sm font-medium">
              Metode Pembayaran
            </label>
            <select className="w-full mt-1 mb-4 px-3 py-2 border rounded-lg">
              <option>Cash</option>
              <option>QRIS</option>
              <option>Transfer</option>
            </select>

            <button className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700">
              Bayar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
