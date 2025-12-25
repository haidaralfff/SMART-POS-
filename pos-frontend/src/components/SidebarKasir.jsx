import { NavLink } from "react-router-dom";
import { LayoutDashboard, WalletMinimal, NotepadText, Cog,User ,LogOut} from "lucide-react";

export default function SidebarKasir() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition
     ${
       isActive
         ? "bg-red-600 text-white"
         : "text-gray-700 hover:bg-blue-100"
     }`;

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4">
<h2 className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-600 uppercase tracking-wide">
  <User className="h-4 w-4" />
  <span>Kasir</span>
</h2>


      <nav className="space-y-1">
        <NavLink to="/kasir/dashboard" className={linkClass}>
          <LayoutDashboard className="h-5 w-5 shrink-0" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/kasir/transaksi" className={linkClass}>
          <WalletMinimal className="h-5 w-5 shrink-0" />
          <span>Transaksi</span>
        </NavLink>

        <NavLink to="/kasir/riwayat" className={linkClass}>
          <NotepadText className="h-5 w-5 shrink-0" />
          <span>Data Transaksi</span>
        </NavLink>

        <NavLink to="/kasir/Settings" className={linkClass}>
          <Cog className="h-5 w-5 shrink-0" />
          <span>Settings</span>
        </NavLink>

              <div
        className="mt-4 flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium
                   text-red-600 hover:bg-red-50 cursor-pointer transition"
      >
        <LogOut className="h-5 w-5 shrink-0" />
        <span>Logout</span>
      </div>
        
      </nav>
    </aside>

  );
}
