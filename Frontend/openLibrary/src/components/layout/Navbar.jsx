import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Book, LogOut, Menu, User, X } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Book className="h-8 w-8 text-amber-500" />
              <span className="font-serif text-2xl font-bold text-gray-900">BookVerse</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-amber-500 transition-colors">
              Home
            </Link>
            <Link to="/books" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-amber-500 transition-colors">
              Books
            </Link>

            {isAuthenticated ? (
              <>
                {user && user.role === 'admin' && (
                  <Link to="/admin" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-amber-500 transition-colors">
                    Admin
                  </Link>
                )}

                <div className="ml-4 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {user && user.picture ? (
                      <img src={user.picture} alt={user.name} className="h-8 w-8 rounded-full" />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                        <User className="h-4 w-4 text-amber-600" />
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-700">{user && user.name}</span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-amber-500 hover:bg-amber-600"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900"
              >
                Sign In
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-amber-500 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/books"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Books
            </Link>

            {isAuthenticated ? (
              <>
                {user && user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center px-3 py-2">
                    {user && user.picture ? (
                      <img src={user.picture} alt={user.name} className="h-8 w-8 rounded-full" />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                        <User className="h-4 w-4 text-amber-600" />
                      </div>
                    )}
                    <span className="ml-3 text-base font-medium text-gray-700">{user && user.name}</span>
                  </div>

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="mt-2 w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-amber-500 hover:bg-amber-600"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="mt-2 block w-full px-4 py-2 text-center border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
