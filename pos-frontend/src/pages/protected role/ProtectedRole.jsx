import { Navigate, useLocation } from "react-router-dom";

const ProtectedRole = ({ children, role }) => {
  const location = useLocation();

  // ✅ AMBIL DATA DARI LOCALSTORAGE
  const isLogin = localStorage.getItem("isLogin");
  const userRole = localStorage.getItem("role");

  // ❌ BELUM LOGIN - redirect ke login
  if (!isLogin || isLogin !== "true") {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // ❌ ROLE TIDAK ADA - logout dan redirect
  if (!userRole) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  // ❌ ROLE TIDAK SESUAI - redirect ke dashboard sesuai role
  if (userRole !== role) {
    if (userRole === "kasir") {
      return <Navigate to="/kasir/dashboard" replace />;
    }
    if (userRole === "owner") {
      return <Navigate to="/owner/dashboard" replace />;
    }
    // Role tidak valid - logout
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  // ✅ SEMUA VALIDASI LOLOS - render children
  return children;
};

export default ProtectedRole;
