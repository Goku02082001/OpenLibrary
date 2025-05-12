import React from 'react';
import { Link } from 'react-router-dom';
import BookUploadForm from '../components/admin/BookUploadForm';
import { ArrowLeft } from 'lucide-react';

const BookUploadPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link to="/admin" className="inline-flex items-center text-blue-900 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Admin Dashboard
        </Link>
      </div>
      
      <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Upload New Book</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <BookUploadForm />
      </div>
    </div>
  );
};

export default BookUploadPage;
