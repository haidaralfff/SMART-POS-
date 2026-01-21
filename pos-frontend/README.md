---

## Quality Assurance — Test Case Table (Frontend)

| Kategori     | Test Case                                 | Status     | Deskripsi Singkat                                      |
|--------------|-------------------------------------------|------------|--------------------------------------------------------|
| Auth         | Login dengan kredensial valid             | Passed     | User berhasil login, diarahkan ke dashboard            |
| Auth         | Login dengan email/password salah         | Passed     | Pesan error muncul, tetap di halaman login             |
| Auth         | Logout                                   | Passed     | User logout, kembali ke halaman login                  |
| Navigasi     | Sidebar sesuai role (kasir/owner)         | Passed     | Menu sidebar tampil sesuai role user                   |
| Navigasi     | Akses halaman tanpa login                 | Passed     | Dialihkan ke halaman login                             |
| Role         | Owner akses halaman owner                 | Passed     | Owner bisa akses dashboard, laporan, produk, settings  |
| Role         | Kasir akses halaman kasir                 | Passed     | Kasir bisa akses dashboard, transaksi, settings        |
| Role         | Kasir akses halaman owner                 | Passed     | Ditolak, dialihkan ke NotFound/Forbidden               |
| Produk       | Lihat daftar produk                       | Passed     | Tabel produk tampil                                    |
| Produk       | Tambah/edit/hapus produk (owner)          | Passed     | CRUD produk berhasil, data terupdate                   |
| Transaksi    | Lihat daftar transaksi                    | Passed     | Tabel transaksi tampil                                 |
| Transaksi    | Input transaksi baru                      | Passed     | Transaksi berhasil, data bertambah                     |
| Laporan      | Lihat laporan stok/transaksi (owner)      | Passed     | Data laporan tampil                                    |
| Settings     | Lihat dan update settings                 | Passed     | Data settings tampil dan bisa diubah                   |
| Error        | API error (misal token expired)           | Passed     | Pesan error muncul, user logout otomatis               |
| Error        | Halaman tidak ditemukan                   | Passed     | Komponen NotFound tampil                               |

**Catatan:**
- Status "Passed" berdasarkan pengujian manual pada UI sesuai skenario di atas.
- Untuk pengujian otomatis, gunakan tools seperti Cypress, Playwright, atau React Testing Library.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
