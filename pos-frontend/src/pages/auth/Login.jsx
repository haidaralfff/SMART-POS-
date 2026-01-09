import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";

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
          SmartPos
        </p>

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
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${
                error ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-red-300"
              }`}
              placeholder="Username or email"
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
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${
                error ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-red-300"
              }`}
              placeholder="Password"
            />
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
