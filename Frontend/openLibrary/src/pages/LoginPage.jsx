import React, { useState } from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { Book, Library } from 'lucide-react';
import GoogleSignIn from '../components/auth/GoogleSignIn';
import EmailAuth from '../components/auth/EmailAuth';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const [authMode, setAuthMode] = useState('login');

  const from = location.state?.from?.pathname || '/';

  if (isAuthenticated && !isLoading) {
    return <Navigate to={from} replace />;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Book className="mx-auto h-14 w-14 text-amber-500" />
          <h1 className="mt-4 text-3xl font-serif font-bold text-gray-900">Welcome to BookVerse</h1>
          <p className="mt-2 text-sm text-gray-600">
            {authMode === 'login' ? 'Sign in to access our digital library' : 'Create your account'}
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-md rounded-lg">
          <div className="flex justify-center mb-6">
            <div className="flex rounded-md shadow-sm">
              <button
                onClick={() => setAuthMode('login')}
                className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                  authMode === 'login'
                    ? 'bg-blue-900 text-white'
                    : 'bg-white text-gray-700 hover:text-blue-900'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setAuthMode('register')}
                className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                  authMode === 'register'
                    ? 'bg-blue-900 text-white'
                    : 'bg-white text-gray-700 hover:text-blue-900'
                }`}
              >
                Register
              </button>
            </div>
          </div>

          <EmailAuth mode={authMode} />

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <GoogleSignIn />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg mt-6">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Library className="h-8 w-8 text-blue-900" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Library Benefits</h3>
              <p className="text-xs text-gray-500">
                Access to thousands of books, personalized recommendations, and more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
