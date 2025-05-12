import React from 'react';
import BookList from '../components/books/BookList';

const BooksPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Browse Our Collection</h1>
      <BookList />
    </div>
  );
};

export default BooksPage;
