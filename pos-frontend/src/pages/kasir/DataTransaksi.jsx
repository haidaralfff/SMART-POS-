

export default function DataTransaksi() {
  const transaksi = [
    {
      id: "TRX001",
      tanggal: "18-12-2025",
      kasir: "Haidar",
      total: 45000,
      metode: "Cash",
      status: "Selesai",
    },
    {
      id: "TRX002",
      tanggal: "18-12-2025",
      kasir: "Haidar",
      total: 120000,
      metode: "QRIS",
      status: "Selesai",
    },
    {
      id: "TRX003",
      tanggal: "18-12-2025",
      kasir: "Haidar",
      total: 30000,
      metode: "Cash",
      status: "Pending",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">


      <main className="flex-1 p-6 lg:p-8 space-y-6 ">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Data Transaksi</h1>
          <p className="text-gray-500 text-sm">
            Daftar seluruh transaksi kasir
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <Th>ID Transaksi</Th>
                <Th>Tanggal</Th>
                <Th>Kasir</Th>
                <Th>Total</Th>
                <Th>Metode</Th>
                <Th>Status</Th>
                <Th>Aksi</Th>
              </tr>
            </thead>
            <tbody>
              {transaksi.map((item) => (
                <tr
                  key={item.id}
                  className="border-b last:border-none hover:bg-gray-50"
                >
                  <Td>{item.id}</Td>
                  <Td>{item.tanggal}</Td>
                  <Td>{item.kasir}</Td>
                  <Td>Rp {item.total.toLocaleString()}</Td>
                  <Td>{item.metode}</Td>
                  <Td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "Selesai"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </Td>
                  <Td>
                    <button className="text-red-600 hover:underline">
                      Detail
                    </button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

/* ===== Helper Components ===== */
function Th({ children }) {
  return (
    <th className="px-4 py-2 text-left font-semibold">{children}</th>
  );
}

function Td({ children }) {
  return <td className="px-4 py-3">{children}</td>;
}
