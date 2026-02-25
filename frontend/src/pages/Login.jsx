import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  UserPlus,
  LogIn,
  Mail,
  Lock,
  User as UserIcon,
  ArrowRight,
} from "lucide-react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Calls the specific Auth routes you built in the backend
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";

    try {
      const { data } = await axios.post(
        `http://localhost:5000${endpoint}`,
        formData,
      );
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-70px)] flex items-center justify-center p-4 bg-slate-50">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Top Branding Section */}
        <div className="bg-health-green p-8 text-white text-center">
          <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            {isLogin ? <LogIn size={32} /> : <UserPlus size={32} />}
          </div>
          <h2 className="text-2xl font-bold">
            {isLogin ? "Welcome Back" : "Join SNAP2EAT"}
          </h2>
          <p className="text-green-50 sm:text-sm">
            HealthTech Innovations Group 14
          </p>
        </div>

        <div className="p-6 sm:p-10">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-6 text-sm border border-red-100 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Show Name Field only during Registration */}
            {!isLogin && (
              <>
                <div className="relative">
                  <UserIcon
                    className="absolute left-4 top-3.5 text-slate-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:border-health-green focus:ring-4 focus:ring-green-50 outline-none transition-all"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-slate-400 font-bold text-sm">
                    +91
                  </span>
                  <input
                    type="tel"
                    placeholder="WhatsApp Number"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:border-health-green outline-none"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: `+91${e.target.value}`,
                      })
                    }
                    required
                  />
                </div>
              </>
            )}

            <div className="relative">
              <Mail
                className="absolute left-4 top-3.5 text-slate-400"
                size={18}
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:border-health-green focus:ring-4 focus:ring-green-50 outline-none transition-all"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="relative">
              <Lock
                className="absolute left-4 top-3.5 text-slate-400"
                size={18}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:border-health-green focus:ring-4 focus:ring-green-50 outline-none transition-all"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              {loading
                ? "Processing..."
                : isLogin
                  ? "Sign In"
                  : "Create Account"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 mb-2">
              {isLogin ? "New to the platform?" : "Already have an account?"}
            </p>
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({ name: "", email: "", password: "", phone: "" }); // Reset form to keep state clean
                setError(""); // Clear any old errors
              }}
              className="text-health-green font-bold hover:underline decoration-2 underline-offset-4"
            >
              {isLogin ? "Register Now" : "Back to Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
