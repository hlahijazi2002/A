import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail]       = useState("admin@urimpact.com");
  const [password, setPassword] = useState("");
  const navigate                = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl border border-slate-100">

        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          <img src="/logo.png" alt="logo" className="w-8 h-8" />
          <span className="font-bold text-sm text-slate-800 tracking-widest">URIMPACT</span>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-slate-900 text-amber-400 text-[10px] font-bold px-3 py-1 rounded-full mb-5 uppercase tracking-wider">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Super Admin Portal
        </div>

        <h1 className="text-2xl font-extrabold text-slate-800 mb-1">Welcome back</h1>
        <p className="text-sm text-slate-500 mb-6">Log in to your administrator account</p>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-teal-500 outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-teal-500 outline-none transition-colors" />
          </div>
        </div>

        {/* Remember + Forgot */}
        <div className="flex justify-between items-center mt-4 mb-5">
          <label className="flex items-center gap-1.5 text-[13px] text-slate-500 cursor-pointer">
            <input type="checkbox" defaultChecked className="accent-teal-600" /> Remember me
          </label>
          <a href="#" className="text-[13px] text-teal-600 font-semibold">Forgot password?</a>
        </div>

        {/* Login button */}
        <button onClick={handleLogin}
          className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold text-sm transition-all shadow-md">
          Log In to Admin Panel
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-slate-100" />
          <span className="text-[13px] text-slate-400">or continue with</span>
          <div className="flex-1 h-px bg-slate-100" />
        </div>

        {/* SSO */}
        <button className="w-full py-2.5 border border-slate-200 bg-white hover:border-teal-500 rounded-xl text-sm font-medium text-slate-700 flex items-center justify-center gap-2 transition-all">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          SSO / SAML Log In
        </button>

        <footer className="text-center mt-5 text-[12px] text-slate-400">
          Protected by 2FA · Secured with TLS 1.3
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;