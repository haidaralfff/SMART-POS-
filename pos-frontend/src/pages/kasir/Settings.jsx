import { User, Shield, Sliders } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6">

      {/* PROFIL */}
      <section className="flex items-start gap-3">
        <User className="w-5 h-5 text-blue-600 mt-1" />
        <div>
          <h2 className="text-lg font-semibold">Profil</h2>
          <p className="text-sm text-gray-500">
            Atur informasi akun Anda
          </p>
        </div>
      </section>

      {/* KEAMANAN */}
      <section className="flex items-start gap-3">
        <Shield className="w-5 h-5 text-red-600 mt-1" />
        <div>
          <h2 className="text-lg font-semibold">Keamanan</h2>
          <p className="text-sm text-gray-500">
            Ubah password dan keamanan akun
          </p>
        </div>
      </section>

      {/* PREFERENSI */}
      <section className="flex items-start gap-3">
        <Sliders className="w-5 h-5 text-green-600 mt-1" />
        <div>
          <h2 className="text-lg font-semibold">Preferensi</h2>
          <p className="text-sm text-gray-500">
            Pengaturan tampilan dan notifikasi
          </p>
        </div>
      </section>

    </div>
  );
}
