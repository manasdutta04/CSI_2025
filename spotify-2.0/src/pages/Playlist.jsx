import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PlayIcon, PauseIcon, HeartIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { playSong } from '../redux/playerSlice';
import { mockPlaylists, mockSongs, formatTime } from '../utils/mockData';

const Playlist = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentSong, isPlaying } = useSelector((state) => state.player);
  
  const playlist = mockPlaylists.find(p => p.id === id);
  const playlistSongs = mockSongs.filter(song => playlist?.songs.includes(song.id));

  const handlePlaySong = (song, index) => {
    dispatch(playSong({
      song,
      playlist: playlistSongs,
      index,
    }));
  };

  const handlePlayPlaylist = () => {
    if (playlistSongs.length > 0) {
      handlePlaySong(playlistSongs[0], 0);
    }
  };

  if (!playlist) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-spotify-gray to-spotify-black p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-spotify-white">Playlist not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-spotify-gray to-spotify-black">
      {/* Header */}
      <div className="bg-gradient-to-b from-purple-900 to-spotify-gray p-8">
        <div className="flex items-end space-x-6">
          <img
            src={playlist.cover}
            alt={playlist.name}
            className="w-48 h-48 rounded-lg shadow-2xl"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-spotify-white mb-2">PLAYLIST</p>
            <h1 className="text-4xl md:text-6xl font-bold text-spotify-white mb-4">
              {playlist.name}
            </h1>
            <p className="text-spotify-light-gray mb-2">{playlist.description}</p>
            <div className="flex items-center space-x-1 text-sm text-spotify-light-gray">
              <span>Spotify</span>
              <span>•</span>
              <span>{playlist.followers?.toLocaleString()} followers</span>
              <span>•</span>
              <span>{playlistSongs.length} songs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-spotify-black bg-opacity-30 p-8">
        <div className="flex items-center space-x-6">
          <button
            onClick={handlePlayPlaylist}
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

      {/* Song List */}
      <div className="p-8">
        <div className="text-spotify-light-gray text-sm mb-4">
          <div className="grid grid-cols-12 gap-4 px-4 pb-2 border-b border-spotify-light-gray">
            <div className="col-span-1">#</div>
            <div className="col-span-6">TITLE</div>
            <div className="col-span-3">ALBUM</div>
            <div className="col-span-2 text-right">DURATION</div>
          </div>
        </div>

        <div className="space-y-1">
          {playlistSongs.map((song, index) => (
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
                  <p className="text-sm text-spotify-light-gray">{song.artist}</p>
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
      </div>
    </div>
  );
};

export default Playlist;
