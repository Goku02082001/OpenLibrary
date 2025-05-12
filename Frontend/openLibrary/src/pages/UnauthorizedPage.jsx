import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

const UnauthorizedPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-6">
          <AlertTriangle className="h-8 w-8" />
        </div>
        
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-lg text-gray-600 mb-8">
          You don't have permission to access this page.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800"
        >
          <Home className="h-5 w-5 mr-2" />
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
