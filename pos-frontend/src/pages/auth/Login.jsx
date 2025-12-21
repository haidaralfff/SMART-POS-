import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();

  // 🔐 AUTO REDIRECT JIKA SUDAH LOGIN
  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    const role = localStorage.getItem("role");

    if (isLogin) {
      if (role === "kasir") {
        navigate("/kasir/dashboard", { replace: true });
      } else if (role === "owner") {
        navigate("/owner/dashboard", { replace: true });
      }
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔧 SIMULASI LOGIN (NANTI GANTI API)
    const role = "kasir"; // ganti "owner" untuk test

    localStorage.setItem("isLogin", "true");
    localStorage.setItem("role", role);

    // 🚀 REDIRECT KE DASHBOARD
    if (role === "kasir") {
      navigate("/kasir/dashboard");
    } else {
      navigate("/owner/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">

        <h1 className="text-2xl font-bold text-center mb-2">Login</h1>
        <p className="text-center text-gray-500 mb-6">
          Masuk ke aplikasi
        </p>

        {/* 🔥 PENTING: onSubmit */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Belum punya akun?{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            Daftar
          </span>
        </p>
      </div>
    </div>
  );
}
