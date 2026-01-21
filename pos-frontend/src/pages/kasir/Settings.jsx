import { Check, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

export default function Settings() {
  const [settings, setSettings] = useState({
    minimal_stock: 10,
    alarm_stok_habis: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(10);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4001";

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/api/settings/stock`);
      const data = await res.json();
      
      if (data && data.minimal_stock !== undefined) {
        setSettings(data);
        setTempValue(data.minimal_stock);
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${apiUrl}/api/settings/stock`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          minimal_stock: tempValue,
          alarm_stok_habis: settings.alarm_stok_habis,
        }),
      });

      if (res.ok) {
        setSettings({
          ...settings,
          minimal_stock: tempValue,
        });
        setIsEditing(false);
        alert("Pengaturan berhasil disimpan!");
      }
    } catch (err) {
      console.error("Error saving settings:", err);
      alert("Gagal menyimpan pengaturan");
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

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
            {settings.alarm_stok_habis && (
              <Check className="text-red-600" size={22} strokeWidth={3} />
            )}
          </div>
        </div>

        {/* Minimal Stock */}
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-gray-700">Minimal stock</span>

          <div className="flex items-center gap-3">
            <input
              type="number"
              value={isEditing ? tempValue : settings.minimal_stock}
              onChange={(e) => setTempValue(parseInt(e.target.value))}
              disabled={!isEditing}
              className="w-20 text-center border rounded-md py-1 disabled:bg-gray-100"
            />

            <button
              onClick={() => {
                if (isEditing) {
                  handleSave();
                } else {
                  setIsEditing(true);
                  setTempValue(settings.minimal_stock);
                }
              }}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              <Pencil size={16} />
              {isEditing ? "Simpan" : "Edit"}
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="p-4">
          <button
            onClick={() => {
              if (!isEditing) {
                handleSave();
              }
            }}
            className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700 shadow"
          >
            SIMPAN SEMUA
          </button>
        </div>
      </div>
    </div>
  );
}
