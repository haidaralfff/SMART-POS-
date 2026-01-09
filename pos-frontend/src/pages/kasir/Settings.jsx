import { Check, Pencil } from "lucide-react";

export default function Settings() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {/* Card */}
      <div className="bg-white rounded-xl border max-w-xl">
        {/* Header */}
        <div className="border-b p-4 text-center font-semibold text-lg">
          Notifikasi Stock
        </div>

        {/* Alarm Stok Habis */}
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-gray-700">Alarm stok habis</span>

          <div className="w-8 h-8 border-2 border-gray-800 flex items-center justify-center">
            <Check className="text-red-600" size={22} strokeWidth={3} />
          </div>
        </div>

        {/* Minimal Stock */}
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-gray-700">Minimal stock</span>

          <div className="flex items-center gap-3">
            <input
              type="number"
              defaultValue={10}
              className="w-20 text-center border rounded-md py-1"
            />

            <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              <Pencil size={16} />
              Edit
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="p-4">
          <button className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700 shadow">
            SIMPAN
          </button>
        </div>
      </div>
    </div>
  );
}
