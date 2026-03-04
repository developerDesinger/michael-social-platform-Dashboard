import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Logo } from "../components/Logo";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("admin@social.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (
        email === "admin@social.com" &&
        password === "admin123"
      ) {
        login(email);
        navigate("/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
      setIsLoading(false);
    }, 500);
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex h-screen bg-white">
      {/* Left Panel - Image */}
      <div 
        className="hidden md:flex md:w-3/5 flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-gray-50 to-white border-r border-gray-200"
        style={{
          backgroundImage: 'url(/Loginleft.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundOrigin: 'padding-box',
        }}
      >
      </div>

      {/* Right Panel - Form */}
      <div className="w-full md:w-2/5 flex flex-col items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="md:hidden flex items-center justify-center mb-8">
            <Logo size={48} />
          </div>

          <div className="mb-10">
            <h2 className="text-gray-700 mb-3" style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '-0.02em' }}>
              Admin Sign In
            </h2>
            <p className="text-gray-500" style={{ fontSize: '14px', fontWeight: 400 }}>
              Access the management dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-primary focus:border-transparent transition"
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-primary focus:border-transparent transition pr-11"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-danger text-sm">{error}</p>
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-teal-accent hover:bg-teal-primary text-white font-semibold rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ marginTop: '28px', fontSize: '16px', fontWeight: 600 }}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-400" style={{ fontSize: '12px', fontWeight: 400 }}>
              Today, {today}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
