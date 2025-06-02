import React from 'react';
import { FileText, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookCard = ({id,book }) => {
    // console.log(id)
    const navigate = useNavigate()
  const getGenreStyles = (genre) => {
    switch (genre) {
      case 'Religious':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Fantasy':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Adventure':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Sci-Fi':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Mystery':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Romance':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'Biography':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'History':
        return 'bg-orange-100 text-orange-800 border-orange-200';
         case 'Motivational':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative pb-[140%]">
        {book.coverImage ? (
          <img
            src={book.coverImage}
            alt={book.title}
             className="absolute top-0 left-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex items-center justify-center">
            <FileText className="h-16 w-16 text-gray-400" />
          </div>
        )}
        <div
          className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getGenreStyles(
            book.genre
          )}`}
        >
          {book.genre}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-serif font-bold text-lg text-gray-900 mb-1 line-clamp-2">
          {book.title}
        </h3>
        {book.author && (
          <p className="text-gray-600 text-sm mb-2">{book.author}</p>
        )}

        {book.description && (
          <p className="text-gray-700 text-sm mb-3 line-clamp-2">
            {book.description}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{formatDate(book.createdAt)}</span>
          </div>

          <button
            onClick={()=>navigate(`/uploads/books/${id}`)}
            className="inline-flex items-center justify-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-blue-900 hover:bg-blue-800 transition-colors"
          >
            Read
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
