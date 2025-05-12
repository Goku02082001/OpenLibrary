import React from 'react';
import { Book, Github as GitHub, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Book className="h-8 w-8 text-amber-500" />
              <span className="font-serif text-2xl font-bold text-white">BookVerse</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Digital library with a vast collection of books across various genres.
              Dive into a world of knowledge and imagination.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <GitHub className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/books" className="hover:text-amber-500 transition-colors">Books</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-amber-500 transition-colors">Sign In</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Genres</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/books?genre=Religious" className="hover:text-amber-500 transition-colors">
                  Religious
                </Link>
              </li>
              <li>
                <Link to="/books?genre=Fantasy" className="hover:text-amber-500 transition-colors">
                  Fantasy
                </Link>
              </li>
              <li>
                <Link to="/books?genre=Adventure" className="hover:text-amber-500 transition-colors">
                  Adventure
                </Link>
              </li>
              <li>
                <Link to="/books?genre=Sci-Fi" className="hover:text-amber-500 transition-colors">
                  Sci-Fi
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-gray-400 text-center">
          <p>&copy; {new Date().getFullYear()} BookVerse Digital Library. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
