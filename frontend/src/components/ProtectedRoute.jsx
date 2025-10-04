import React, { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Loader2, Lock } from 'lucide-react';

export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useContext(AuthContext); // assume AuthContext provides loading + user
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Simulate async check, in real app you might validate token
    const timer = setTimeout(() => setAuthChecked(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading || !authChecked) {
    // Loading UI
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Loading...
          </h2>
          <p className="text-gray-600">
            Verifying your access
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Unauthorized UI
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <Lock className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Authentication Required
          </h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in to access this page. Please sign in to continue.
          </p>
          <a
            href="/login"
            className="w-full inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  // Role-based access check (optional)
  if (roles && !roles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <Lock className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page.
          </p>
          <a
            href="/"
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  // Authorized → render children
  return children;
}
