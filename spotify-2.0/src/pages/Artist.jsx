import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PlayIcon, PauseIcon, HeartIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { playSong } from '../redux/playerSlice';
import { mockArtists, mockSongs, formatTime } from '../utils/mockData';

const Artist = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentSong, isPlaying } = useSelector((state) => state.player);
  
  const artist = mockArtists.find(a => a.id === id);
  const artistSongs = mockSongs.filter(song => song.artist === artist?.name);

  const handlePlaySong = (song, index) => {
    dispatch(playSong({
      song,
      playlist: artistSongs,
      index,
    }));
  };

  const handlePlayArtist = () => {
    if (artistSongs.length > 0) {
      handlePlaySong(artistSongs[0], 0);
    }
  };

  if (!artist) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-spotify-gray to-spotify-black p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-spotify-white">Artist not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-spotify-gray to-spotify-black">
      {/* Header */}
      <div className="bg-gradient-to-b from-blue-900 to-spotify-gray p-8">
        <div className="flex items-end space-x-6">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-48 h-48 rounded-full shadow-2xl"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              {artist.verified && (
                <div className="bg-blue-500 rounded-full p-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              <p className="text-sm font-medium text-spotify-white">VERIFIED ARTIST</p>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-spotify-white mb-4">
              {artist.name}
            </h1>
            <p className="text-spotify-light-gray">
              {artist.followers?.toLocaleString()} monthly listeners
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-spotify-black bg-opacity-30 p-8">
        <div className="flex items-center space-x-6">
          <button
            onClick={handlePlayArtist}
            className="bg-spotify-green text-spotify-black rounded-full p-4 hover:scale-105 transition-transform"
          >
            <PlayIcon className="w-6 h-6" />
          </button>
          <button className="text-spotify-light-gray hover:text-spotify-white transition-colors">
            <HeartIcon className="w-8 h-8" />
          </button>
          <button className="text-spotify-light-gray hover:text-spotify-white transition-colors">
            <EllipsisHorizontalIcon className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Popular Songs */}
      <div className="p-8">
        <h2 className="text-2xl font-bold text-spotify-white mb-6">Popular</h2>
        
        <div className="space-y-1">
          {artistSongs.slice(0, 5).map((song, index) => (
            <div
              key={song.id}
              className="grid grid-cols-12 gap-4 px-4 py-3 rounded-lg hover:bg-spotify-light-gray cursor-pointer group"
              onClick={() => handlePlaySong(song, index)}
            >
              <div className="col-span-1 flex items-center">
                <span className="text-spotify-light-gray group-hover:hidden">
                  {index + 1}
                </span>
                <button className="hidden group-hover:block text-spotify-white">
                  {currentSong?.id === song.id && isPlaying ? (
                    <PauseIcon className="w-5 h-5" />
                  ) : (
                    <PlayIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div className="col-span-6 flex items-center space-x-3">
                <img
                  src={song.cover}
                  alt={song.title}
                  className="w-10 h-10 rounded"
                />
                <div>
                  <h3 className={`font-medium ${
                    currentSong?.id === song.id ? 'text-spotify-green' : 'text-spotify-white'
                  }`}>
                    {song.title}
                  </h3>
                </div>
              </div>
              <div className="col-span-3 flex items-center">
                <p className="text-sm text-spotify-light-gray">{song.album}</p>
              </div>
              <div className="col-span-2 flex items-center justify-end">
                <p className="text-sm text-spotify-light-gray">
                  {formatTime(song.duration)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {artistSongs.length > 5 && (
          <button className="text-spotify-light-gray hover:text-spotify-white mt-4 text-sm font-medium">
            Show all
          </button>
        )}
      </div>

      {/* Albums */}
      <div className="p-8">
        <h2 className="text-2xl font-bold text-spotify-white mb-6">Albums</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {/* Albums would be rendered here */}
          <div className="text-spotify-light-gray">
            No albums available
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artist;
