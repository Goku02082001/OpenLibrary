import  { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Loader } from 'lucide-react';
import { API_URL } from '../config/config';

const BookReaderPage = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${API_URL}/books/${bookId}`);
        setBook(data);
      } catch (err) {
        setError('Failed to load book. Please try again later.');
        console.error('Error fetching book:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex items-center space-x-2">
          <Loader className="animate-spin h-6 w-6 text-blue-900" />
          <span className="text-gray-600">Loading book...</span>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Book not found'}</p>
          <Link
            to="/books"
            className="inline-flex items-center text-blue-900 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            to="/books"
            className="inline-flex items-center text-blue-900 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Books
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                  {book.title}
                </h1>
                {book.author && (
                  <p className="text-gray-600 mb-4">by {book.author}</p>
                )}
              </div>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {book.genre}
              </span>
            </div>

            {book.description && (
              <p className="text-gray-700 mt-4 mb-6">{book.description}</p>
            )}
          </div>

          <div className="w-full h-[calc(100vh-300px)] bg-gray-100">
            <iframe
              src={`http://localhost:5000${book.fileUrl}`}
              title={book.title}
              className="w-full h-full"
              style={{ border: 'none' }}
               allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookReaderPage;
