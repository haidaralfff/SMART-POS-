import { Navigate } from "react-router-dom";

export default function ProtectedRole({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // belum login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // role tidak sesuai
  if (role && userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
