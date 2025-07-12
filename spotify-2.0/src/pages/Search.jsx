import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { setSearchResults } from '../redux/musicSlice';
import { playSong } from '../redux/playerSlice';
import { mockSongs, mockGenres } from '../utils/mockData';
import SongCard from '../components/SongCard';

const Search = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const { searchResults } = useSelector((state) => state.music);
  const { currentSong, isPlaying } = useSelector((state) => state.player);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      dispatch(setSearchResults([]));
      return;
    }

    const filteredSongs = mockSongs.filter(
      (song) =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.album.toLowerCase().includes(searchTerm.toLowerCase())
    );

    dispatch(setSearchResults(filteredSongs));
  }, [searchTerm, dispatch]);

  const handlePlaySong = (song, index) => {
    dispatch(playSong({
      song,
      playlist: searchResults,
      index,
    }));
  };

  const genreColors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-orange-500',
    'bg-teal-500',
    'bg-cyan-500',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-spotify-gray to-spotify-black p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-spotify-white mb-8">Search</h1>

        {/* Search Bar */}
        <div className="relative mb-8">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-spotify-light-gray" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md pl-10 pr-4 py-3 bg-spotify-white text-spotify-black rounded-full focus:outline-none focus:ring-2 focus:ring-spotify-green"
          />
        </div>

        {/* Search Results */}
        {searchTerm && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-spotify-white mb-4">
              Search Results
            </h2>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {searchResults.map((song, index) => (
                  <SongCard
                    key={song.id}
                    song={song}
                    index={index}
                    onPlay={() => handlePlaySong(song, index)}
                    isPlaying={currentSong?.id === song.id && isPlaying}
                  />
                ))}
              </div>
            ) : (
              <p className="text-spotify-light-gray">
                No results found for "{searchTerm}"
              </p>
            )}
          </section>
        )}

        {/* Browse Categories */}
        {!searchTerm && (
          <section>
            <h2 className="text-2xl font-bold text-spotify-white mb-4">
              Browse all
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {mockGenres.map((genre, index) => (
                <div
                  key={genre.id}
                  className={`${
                    genreColors[index % genreColors.length]
                  } rounded-lg p-4 h-32 relative cursor-pointer hover:brightness-110 transition-all`}
                >
                  <h3 className="text-white font-bold text-lg">{genre.name}</h3>
                  <div className="absolute bottom-0 right-0 transform rotate-25 translate-x-2 translate-y-2">
                    <div className="w-16 h-16 bg-black bg-opacity-20 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recently Searched */}
        {!searchTerm && (
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-spotify-white mb-4">
              Recently searched
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {mockSongs.slice(0, 5).map((song, index) => (
                <SongCard
                  key={song.id}
                  song={song}
                  index={index}
                  onPlay={() => handlePlaySong(song, index)}
                  isPlaying={currentSong?.id === song.id && isPlaying}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Search;
