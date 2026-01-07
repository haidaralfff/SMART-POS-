import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 🔐 AUTO REDIRECT JIKA SUDAH LOGIN
  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin") === "true";
    const role = localStorage.getItem("role");

    if (!isLogin || !role) return;

    if (role === "kasir") {
      navigate("/kasir/dashboard", { replace: true });
    } else if (role === "owner") {
      navigate("/owner/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // ✅ VALIDASI INPUT
    if (!email || !password) {
      setError("Email dan password harus diisi");
      return;
    }

    // 🔧 SIMULASI LOGIN - Demo credentials
    let role = null;
    if (email === "kasir@posfy.com" && password === "123456") {
      role = "kasir";
    } else if (email === "owner@posfy.com" && password === "123456") {
      role = "owner";
    } else {
      setError("Email atau password salah");
      return;
    }

    // ✅ SIMPAN KE LOCALSTORAGE
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("role", role);
    localStorage.setItem("email", email);

    // ✅ REDIRECT SESUAI ROLE
    if (role === "kasir") {
      navigate("/kasir/dashboard", { replace: true });
    } else if (role === "owner") {
      navigate("/owner/dashboard", { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">

        <h1 className="text-2xl font-bold text-center mb-2">Login</h1>
        <p className="text-center text-gray-500 mb-6">
          Masuk ke aplikasi
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="kasir@posfy.com atau owner@posfy.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="123456"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-xs text-gray-500">
          <p className="font-semibold mb-2">Demo Credentials:</p>
          <p>👨‍💼 Kasir: kasir@posfy.com / 123456</p>
          <p>👔 Owner: owner@posfy.com / 123456</p>
        </div>
      </div>
    </div>
  );
}
