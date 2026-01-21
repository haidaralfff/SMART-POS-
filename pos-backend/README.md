# POS Backend

Buat file `.env` di folder pos-backend dengan isi:

```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
PORT=4000
```

Lalu jalankan:

```
npm install
npm run dev
```

API endpoint utama:
- POST   /api/auth/login
- POST   /api/auth/logout
- GET    /api/produk
- POST   /api/produk
- PUT    /api/produk/:id
- DELETE /api/produk/:id
- GET    /api/transaksi
- POST   /api/transaksi
- GET    /api/laporan/stock
- GET    /api/laporan/transaksi
- GET    /api/settings/stock
- PUT    /api/settings/stock

Pastikan tabel di Supabase sesuai kebutuhan frontend (produk, transaksi, settings, user).
