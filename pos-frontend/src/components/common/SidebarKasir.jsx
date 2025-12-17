import { NavLink } from "react-router-dom";

export default function SidebarKasir() {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded ${
      isActive ? "bg-blue-600 text-white" : "hover:bg-blue-100"
    }`;

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Kasir</h2>
      <nav className="space-y-2">
        <NavLink to="/kasir/dashboard" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/kasir/transaksi" className={linkClass}>
          Transaksi
        </NavLink>
        <NavLink to="/kasir/riwayat" className={linkClass}>
          Data Transaksi
        </NavLink>

        <NavLink to="/kasir/Settings" className={linkClass}>
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}
