import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AlertCircle, User, Lock } from "lucide-react";
import logo from "../../assets/SmartPOS-logo.svg";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ VALIDASI INPUT
    if (!email || !password) {
      setError("Email dan password harus diisi");
      return;
    }

    try {
      // 🔧 CALL BACKEND LOGIN API
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4001";
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Email atau password salah");
        return;
      }

      // ✅ SIMPAN KE LOCALSTORAGE
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("email", email);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("userId", data.user.id);

      // ✅ REDIRECT SESUAI ROLE
      if (data.user.role === "kasir") {
        navigate("/kasir/dashboard", { replace: true });
      } else if (data.user.role === "owner") {
        navigate("/owner/dashboard", { replace: true });
      }
    } catch (err) {
      setError("Terjadi kesalahan koneksi ke server");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">

        <div className="flex justify-center mb-6">
          <img src={logo} alt="SmartPOS Logo" className="h-16" />
        </div>
        <h1 className="text-4xl font-bold text-center mb-6">Login</h1>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-600 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-red-600" />
            <div>
              <p className="font-semibold text-sm">Error Login</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-2">
              <User className="h-4 w-4" />
              Email
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring ${
                  error ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-red-300"
                }`}
                placeholder="Username or email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring ${
                  error ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-red-300"
                }`}
                placeholder="Password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 font-medium transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
