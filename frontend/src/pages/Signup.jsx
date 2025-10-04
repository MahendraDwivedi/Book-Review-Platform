// import React, { useState, useContext } from 'react';
// import api from '../api/axios';
// import { AuthContext } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// export default function Signup(){
//   const [form,setForm] = useState({name:'',email:'',password:''});
//   const { login } = useContext(AuthContext);
//   const nav = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post('/auth/signup', form);
//       login(res.data);
//       nav('/');
//     } catch (err) {
//       alert(err.response?.data?.message || 'Signup failed');
//     }
//   };

//   return (
//     <form onSubmit={submit} className="p-4 max-w-md mx-auto">
//       <h2>Signup</h2>
//       <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" />
//       <input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" />
//       <input required type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Password" />
//       <button type="submit">Create account</button>
//     </form>
//   );
// }


import React, { useState, useContext } from "react";
import { Mail, Lock, User, UserPlus, BookOpen } from "lucide-react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/signup", form);
      login(res.data);
      nav("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-4 shadow-lg">
            <BookOpen size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">Join our book community today</p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <form onSubmit={submit} className="p-8 space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <User size={18} className="text-purple-600" />
                Full Name
              </label>
              <div className="relative">
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Mail size={18} className="text-purple-600" />
                Email Address
              </label>
              <div className="relative">
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Lock size={18} className="text-purple-600" />
                Password
              </label>
              <div className="relative">
                <input
                  required
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="Create a strong password"
                  className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
              <p className="text-xs text-gray-500">
                Must be at least 8 characters long
              </p>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-2 focus:ring-purple-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <span className="text-purple-600 hover:text-purple-700 font-semibold cursor-pointer">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-purple-600 hover:text-purple-700 font-semibold cursor-pointer">
                  Privacy Policy
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 focus:ring-4 focus:ring-purple-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <UserPlus size={20} />
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Login Link */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
