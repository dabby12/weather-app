import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 border border-gray-300 p-2 rounded-l"
        placeholder="Search for a city..."
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-r"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
