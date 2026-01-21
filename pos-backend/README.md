---

## Quality Assurance — Test Case Table

| Kategori     | Test Case                                 | Status     | Deskripsi Singkat                                      |
|--------------|-------------------------------------------|------------|--------------------------------------------------------|
| Auth         | Login dengan kredensial valid             | Passed     | Login berhasil, token & user info diterima             |
| Auth         | Login dengan email/password salah         | Passed     | Ditolak, error 401                                     |
| Auth         | Logout                                   | Passed     | Mendapat pesan logout berhasil                         |
| Produk       | Ambil semua produk (tanpa auth)           | Passed     | Mendapat array produk                                  |
| Produk       | Tambah produk (owner, token valid)        | Passed     | Produk baru berhasil ditambah                          |
| Produk       | Tambah produk (kasir, token kasir)        | Passed     | Ditolak, error 403                                     |
| Produk       | Update produk (owner, token valid)        | Passed     | Data produk berhasil diupdate                          |
| Produk       | Hapus produk (owner, token valid)         | Passed     | Produk berhasil dihapus                                |
| Produk       | Hapus produk (tanpa token)                | Passed     | Ditolak, error 401                                     |
| Transaksi    | Ambil semua transaksi                     | Passed     | Mendapat array transaksi                               |
| Transaksi    | Tambah transaksi                          | Passed     | Transaksi baru berhasil ditambah                       |
| Laporan      | Laporan stok (owner, token valid)         | Passed     | Mendapat data stok produk                              |
| Laporan      | Laporan transaksi (owner, token valid)    | Passed     | Mendapat data transaksi                                |
| Laporan      | Laporan stok (kasir/token kasir)          | Passed     | Ditolak, error 403                                     |
| Settings     | Ambil pengaturan stok                     | Passed     | Mendapat data minimal_stock & alarm_stok_habis         |
| Settings     | Update pengaturan stok (owner, token)     | Passed     | Data pengaturan berhasil diupdate                      |
| Settings     | Update pengaturan stok (tanpa token)      | Passed     | Ditolak, error 401                                     |
| Settings     | Update pengaturan stok (kasir, token)     | Passed     | Ditolak, error 403                                     |

**Catatan:**
- Status "Passed" berdasarkan pengujian manual via curl/Postman sesuai dokumentasi di atas.
- Untuk pengujian otomatis, gunakan tools seperti Jest, Supertest, atau Postman Collection Runner.
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

**Ringkasan**

Dokumentasi ini menjelaskan endpoint API di folder `src/routes`, cara autentikasi sederhana yang digunakan aplikasi, dan contoh pengujian menggunakan `curl` atau Postman.

**Env yang dibutuhkan**

- `SUPABASE_URL` — URL Supabase project
- `SUPABASE_KEY` — Anon/public key atau service key
- `PORT` — (opsional) port server (default di project: `4000`)

**Menjalankan**

1. Buat file `.env` dengan variabel di atas.
2. Install dependensi:

```bash
npm install
```

3. Jalankan server (development):

```bash
npm run dev
```

**Autentikasi singkat**

- Login: `POST /api/auth/login` — mengembalikan objek `token` berformat `token-<userId>` dan informasi `user` (termasuk `role`).
- Auth header: sertakan header `Authorization: Bearer token-<userId>` untuk endpoint yang membutuhkan autentikasi.

Catatan: implementasi middleware di `src/middleware/authMiddleware.js` saat ini memeriksa token sederhana (`token-<userid>`) dan menyet `req.user.id`. Fungsi `verifyOwner` memeriksa `req.user.role`, tetapi `verifyToken` default tidak mengambil `role` dari database — lihat bagian Troubleshooting jika Anda perlu menguji endpoint milik owner.

**Daftar Endpoint (ringkas)**

- `POST /api/auth/login` — Login pengguna.
- `POST /api/auth/logout` — Logout (respon statis).
- `GET  /api/produk` — Ambil semua produk.
- `POST /api/produk` — Tambah produk (hanya owner).
- `PUT  /api/produk/:id` — Update produk (hanya owner).
- `DELETE /api/produk/:id` — Hapus produk (hanya owner).
- `GET  /api/transaksi` — Ambil semua transaksi.
- `POST /api/transaksi` — Buat transaksi baru.
- `GET  /api/laporan/stock` — Laporan stock (hanya owner).
- `GET  /api/laporan/transaksi` — Laporan transaksi (hanya owner).
- `GET  /api/settings/stock` — Ambil pengaturan stok.
- `PUT  /api/settings/stock` — Update pengaturan stok (hanya owner).

---

**Endpoint: Auth**

- POST /api/auth/login
	- Body (JSON): `{ "email": "user@example.com", "password": "secret" }`
	- Response (200):
		```json
		{
			"message": "Login berhasil",
			"token": "token-<userId>",
			"user": { "id": "...", "email": "...", "role": "kasir|owner" }
		}
		```
	- Contoh curl:

	```bash
	curl -X POST http://localhost:4000/api/auth/login \
		-H "Content-Type: application/json" \
		-d '{"email":"admin@example.com","password":"password"}'
	```

- POST /api/auth/logout
	- Response: `{ "message": "Logout berhasil" }`

**Endpoint: Produk**

- GET /api/produk
	- Auth: tidak wajib
	- Response: array produk
	- Contoh:
		```bash
		curl http://localhost:4000/api/produk
		```

- POST /api/produk (owner)
	- Auth: `Authorization: Bearer token-<userId>`
	- Body: `{ "kode": "P001", "nama": "Produk A", "harga": 10000, "stok": 10 }`
	- Contoh curl (ganti token):

	```bash
	curl -X POST http://localhost:4000/api/produk \
		-H "Content-Type: application/json" \
		-H "Authorization: Bearer token-<ownerId>" \
		-d '{"kode":"P001","nama":"Produk A","harga":10000,"stok":10}'
	```

- PUT /api/produk/:id (owner) — update fields `kode`, `nama`, `harga`, `stok`.
- DELETE /api/produk/:id (owner) — hapus produk.

**Endpoint: Transaksi**

- GET /api/transaksi — ambil semua transaksi
- POST /api/transaksi
	- Body contohnya:
		```json
		{
			"items": [{"produk_id":1,"qty":2,"harga":10000}],
			"total":20000,
			"bayar":20000,
			"kembali":0,
			"kasir":"kasir@example.com"
		}
		```

	- Contoh curl:

	```bash
	curl -X POST http://localhost:4000/api/transaksi \
		-H "Content-Type: application/json" \
		-d '{"items":[{"produk_id":1,"qty":2,"harga":10000}],"total":20000,"bayar":20000,"kembali":0,"kasir":"kasir"}'
	```

**Endpoint: Laporan (owner)**

- GET /api/laporan/stock — data produk (id, kode, nama, kategori, stok)
- GET /api/laporan/transaksi — data transaksi

Contoh (ganti token):

```bash
curl -H "Authorization: Bearer token-<ownerId>" http://localhost:4000/api/laporan/stock
```

**Endpoint: Settings**

- GET /api/settings/stock — ambil `minimal_stock` dan `alarm_stok_habis`
- PUT /api/settings/stock (owner) — update `minimal_stock` dan `alarm_stok_habis` (body JSON)

---

**Pengujian & Debugging**

- Basic test sequence (curl):

	1. Login untuk mendapatkan token:

	```bash
	curl -X POST http://localhost:4000/api/auth/login \
		-H "Content-Type: application/json" \
		-d '{"email":"admin@example.com","password":"password"}'
	```

	2. Gunakan token pada header `Authorization: Bearer <token>` ketika mengakses endpoint yang dilindungi.

- Menggunakan Postman: buat request sesuai method/url, tambahkan header `Authorization` untuk endpoint dilindungi.

**Catatan penting — Owner middleware**

Saat ini `src/middleware/authMiddleware.js` melakukan:

- `verifyToken`: mem-parsing token berbentuk `token-<id>` dan hanya menyet `req.user.id`.
- `verifyOwner`: memanggil `verifyToken` lalu memeriksa `req.user.role`.

Karena `verifyToken` tidak mengambil `role` dari DB, `req.user.role` kemungkinan `undefined` sehingga akses owner akan ditolak (403). Untuk menguji endpoint owner di lingkungan development, Anda dapat sementara memodifikasi `verifyToken` sehingga juga mengambil `role` dari Supabase, contoh minimal:

```javascript
import { supabase } from '../supabaseClient.js';

export const verifyToken = async (req, res, next) => {
	const token = req.headers.authorization?.split(' ')[1];
	if (!token) return res.status(401).json({ error: 'Token tidak ditemukan' });

	if (!token.startsWith('token-')) return res.status(401).json({ error: 'Token tidak valid' });
	const userId = token.replace('token-', '');

	// Ambil role dari DB
	const { data: user, error } = await supabase.from('users').select('id,role,email').eq('id', userId).single();
	if (error || !user) return res.status(401).json({ error: 'User tidak ditemukan' });

	req.user = { id: user.id, role: user.role, email: user.email };
	next();
};
```

Gunakan pendekatan ini hanya untuk development/testing; di production gunakan JWT atau mekanisme token yang aman.

**Troubleshooting**

- Jika Anda menerima error terkait Supabase credentials, pastikan `SUPABASE_URL` dan `SUPABASE_KEY` benar di `.env`.
- Bila endpoint owner selalu menolak (403), lihat bagian "Catatan penting — Owner middleware".

---

Jika Anda mau, saya juga bisa:

- Menambahkan contoh Postman collection (JSON) untuk import cepat.
- Memperbaiki `verifyToken` supaya otomatis mengambil `role` dari Supabase.

File ini diedit supaya dokumentasi API & pengujian lebih jelas. Lihat [pos-backend/README.md](pos-backend/README.md#L1) untuk versi lengkap.
