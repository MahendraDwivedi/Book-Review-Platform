import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BookOpen, User, LogOut, Menu, X, Plus } from 'lucide-react';

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  const doLogout = () => {
    logout();
    setMobileMenuOpen(false);
    nav('/login');
  };

  const doLogin = () => {
    nav('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12"> {/* reduced from h-16 to h-12 */}
          {/* Logo/Brand */}
          <button className="flex items-center space-x-1 text-white font-bold text-lg hover:text-indigo-100 transition-colors duration-200">
            <BookOpen className="w-5 h-5" />
            <span className="hidden sm:inline">Book Reviews</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 text-sm">
            {user ? (
              <>
                <button onClick={()=> nav('/books/add')} className="flex items-center space-x-1 px-2 py-1 rounded-lg text-white hover:bg-white/10 transition-all duration-200">
                  <Plus className="w-4 h-4" />
                  <span>Add Book</span>
                </button>
                <button onClick={()=>nav('/profile')} className="flex items-center space-x-1 px-2 py-1 rounded-lg text-white hover:bg-white/10 transition-all duration-200">
                  <User className="w-4 h-4" />
                  <span>{user.name}</span>
                </button>
                <button
                  onClick={doLogout}
                  className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all duration-200 ml-1"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={doLogin}
                  className="px-2 py-1 rounded-lg text-white hover:bg-white/10 transition-all duration-200"
                >
                  Login
                </button>
                <button onClick={()=> nav('/signup')} className="px-2 py-1 rounded-lg bg-white text-indigo-600 hover:bg-indigo-50 transition-all duration-200 font-medium ml-1">
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-indigo-700 border-t border-indigo-500">
          <div className="px-4 py-2 space-y-1">
            {user ? (
              <>
                <button
                onClick={() => {
  setMobileMenuOpen(false);
  nav('/books/add');
}}

                  className="w-full flex items-center space-x-2 px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-all duration-200 text-left"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Book</span>
                </button>
                <button
                  onClick={() => {
  setMobileMenuOpen(false);
  nav('/profile');
}}

                  className="w-full flex items-center space-x-2 px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-all duration-200 text-left"
                >
                  <User className="w-5 h-5" />
                  <span>{user.name}</span>
                </button>
                <button
                  onClick={doLogout}
                  className="w-full flex items-center space-x-2 px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-all duration-200 text-left"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={doLogin}
                  className="w-full px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-all duration-200 text-left"
                >
                  Login
                </button>
                <button onClick={()=> nav('/signup')}  className="w-full px-4 py-2 rounded-lg bg-white text-indigo-600 hover:bg-indigo-50 transition-all duration-200 font-medium text-center">
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
