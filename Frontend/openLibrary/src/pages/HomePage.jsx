import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Search, BookOpen, Filter } from 'lucide-react';

const HomePage = () => {
  const featuredBooks = [
    {
      id: '1',
      title: 'The Great Adventure',
      genre: 'Adventure',
      coverImage:
        'https://images.pexels.com/photos/1106468/pexels-photo-1106468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: '2',
      title: 'Spiritual Journeys',
      genre: 'Religious',
      coverImage:
        'https://images.pexels.com/photos/6373305/pexels-photo-6373305.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: '3',
      title: 'Galaxy Far Away',
      genre: 'Sci-Fi',
      coverImage:
        'https://images.pexels.com/photos/1257860/pexels-photo-1257860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: '4',
      title: 'Realm of Magic',
      genre: 'Fantasy',
      coverImage:
        'https://images.pexels.com/photos/5430772/pexels-photo-5430772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];

  return (
    <div>
      
      <section className="bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
            Discover the World Through Books
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-3xl">
            Explore our vast digital library with thousands of books across genres. Find your next great read in just a few clicks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/books"
              className="px-8 py-3 rounded-md bg-amber-500 hover:bg-amber-600 text-white font-medium transition-colors"
            >
              Browse Collection
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 rounded-md bg-white hover:bg-gray-100 text-blue-900 font-medium transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">
            Why Choose Our Digital Library?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-md text-center transform transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-900 mb-4">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">Vast Collection</h3>
              <p className="text-gray-600">
                Access thousands of books across multiple genres, from classic literature to modern bestsellers.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md text-center transform transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-600 mb-4">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">Easy Discovery</h3>
              <p className="text-gray-600">
                Find your next great read quickly with powerful search and filtering options.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md text-center transform transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <Filter className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">Genre Filtering</h3>
              <p className="text-gray-600">
                Browse books by genre to find exactly what you're looking for, from fantasy to religious texts.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900">Featured Books</h2>
            <Link to="/books" className="text-blue-900 hover:text-blue-800 font-medium">
              View All Books →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-64">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-blue-900 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {book.genre}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">{book.title}</h3>
                  <Link to="/books" className="text-blue-900 hover:text-blue-800 text-sm font-medium">
                    Explore →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <section className="py-20 bg-amber-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-4">Ready to start reading?</h2>
            <p className="text-lg mb-8">
              Sign up today to access our full collection of books across all genres.
            </p>
            <Link
              to="/login"
              className="inline-block px-8 py-3 rounded-md bg-white text-amber-600 font-medium hover:bg-gray-100 transition-colors"
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
