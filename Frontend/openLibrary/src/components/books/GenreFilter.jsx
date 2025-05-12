import React from 'react';
import { GENRES } from '../../config/config';

const GenreFilter = ({ selectedGenre, setSelectedGenre }) => {
  const getGenreStyles = (genre) => {
    if (genre === selectedGenre) {
      return 'bg-blue-900 text-white';
    }

    switch (genre) {
      case 'All':
        return 'bg-gray-100 hover:bg-gray-200 text-gray-800';
      case 'Religious':
        return 'bg-purple-100 hover:bg-purple-200 text-purple-800';
      case 'Fantasy':
        return 'bg-blue-100 hover:bg-blue-200 text-blue-800';
      case 'Adventure':
        return 'bg-green-100 hover:bg-green-200 text-green-800';
      case 'Sci-Fi':
        return 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800';
      case 'Mystery':
        return 'bg-red-100 hover:bg-red-200 text-red-800';
      case 'Romance':
        return 'bg-pink-100 hover:bg-pink-200 text-pink-800';
      case 'Biography':
        return 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800';
      case 'History':
        return 'bg-orange-100 hover:bg-orange-200 text-orange-800';
        case 'Motivational':
        return 'bg-orange-100 hover:bg-orange-200 text-orange-800';
      default:
        return 'bg-gray-100 hover:bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium text-gray-800 mb-3">Filter by Genre</h2>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedGenre('All')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${getGenreStyles('All')}`}
        >
          All
        </button>

        {GENRES.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${getGenreStyles(genre)}`}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;
