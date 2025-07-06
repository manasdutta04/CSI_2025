import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface SearchBarProps {
  onSearch: (query: string, filter?: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = 'Search for songs, artists, or albums...' 
}) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const searchRef = useRef<HTMLDivElement>(null);
  
  const filters = ['All', 'Songs', 'Artists', 'Albums', 'Playlists'];
  
  // Helper function to render icons with proper type assertion
  const renderIcon = (Icon: IconType, className?: string) => {
    return React.createElement(Icon as React.ComponentType<{ className?: string }>, { className });
  };
  
  // Load search history from localStorage on component mount
  useEffect(() => {
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);
  
  // Save search history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);
  
  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Add to search history (avoid duplicates and keep max 5 items)
      setSearchHistory(prevHistory => {
        const newHistory = [query, ...prevHistory.filter(item => item !== query)].slice(0, 5);
        return newHistory;
      });
      
      onSearch(query.trim(), selectedFilter !== 'All' ? selectedFilter : undefined);
      setShowSuggestions(false);
    }
  };
  
  const handleClearQuery = () => {
    setQuery('');
    setShowSuggestions(false);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion, selectedFilter !== 'All' ? selectedFilter : undefined);
    setShowSuggestions(false);
  };
  
  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
    if (query.trim()) {
      onSearch(query.trim(), filter !== 'All' ? filter : undefined);
    }
  };
  
  const handleRemoveHistoryItem = (itemToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchHistory(prevHistory => prevHistory.filter(item => item !== itemToRemove));
  };
  
  const handleClearHistory = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchHistory([]);
  };
  
  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <form 
        onSubmit={handleSubmit}
        className="relative"
      >
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          {renderIcon(FaSearch, "text-spotify-gray")}
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="w-full py-2 pl-10 pr-10 bg-white bg-opacity-10 rounded-full text-white placeholder-spotify-gray focus:outline-none focus:ring-2 focus:ring-spotify-green"
        />
        {query && (
          <button
            type="button"
            onClick={handleClearQuery}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-spotify-gray hover:text-white"
          >
            {renderIcon(FaTimes)}
          </button>
        )}
      </form>
      
      {/* Filters */}
      <div className="flex space-x-2 mt-2">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => handleFilterClick(filter)}
            className={`px-3 py-1 text-sm rounded-full ${
              selectedFilter === filter 
                ? 'bg-white text-black' 
                : 'bg-spotify-dark-gray text-white hover:bg-opacity-80'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      
      {/* Search suggestions */}
      {showSuggestions && searchHistory.length > 0 && (
        <div className="absolute mt-2 w-full bg-spotify-dark-gray rounded-md shadow-lg z-10">
          <div className="p-2 border-b border-gray-700 flex justify-between items-center">
            <span className="text-sm font-medium text-spotify-gray">Recent searches</span>
            <button 
              className="text-xs text-spotify-gray hover:text-white"
              onClick={handleClearHistory}
            >
              Clear all
            </button>
          </div>
          <div>
            {searchHistory.map((item, index) => (
              <div 
                key={index}
                className="flex items-center justify-between px-3 py-2 hover:bg-gray-800 cursor-pointer"
                onClick={() => handleSuggestionClick(item)}
              >
                <div className="flex items-center">
                  <span className="bg-gray-700 rounded-full p-1 mr-3">
                    {renderIcon(FaSearch, "text-sm text-spotify-gray")}
                  </span>
                  <span className="text-white">{item}</span>
                </div>
                <button 
                  className="text-spotify-gray hover:text-white"
                  onClick={(e) => handleRemoveHistoryItem(item, e)}
                >
                  {renderIcon(FaTimes, "text-sm")}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar; 