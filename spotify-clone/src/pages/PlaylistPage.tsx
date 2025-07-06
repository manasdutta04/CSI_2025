import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaPlay, FaPause, FaHeart, FaRegHeart, FaEllipsisH, FaClock, FaUserAlt, FaMusic } from 'react-icons/fa';
import { IconType } from 'react-icons';
import SongItem from '../components/main/SongItem';
import { mockPlaylists, mockSongs } from '../utils/mockData';
import { usePlayer } from '../context/PlayerContext';
import { useUser } from '../context/UserContext';
import { formatTime } from '../utils/formatTime';
import { Song } from '../types';

const PlaylistPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { playerState, playSong, pauseSong, addToQueue } = usePlayer();
  const { userState, toggleLikeSong, addToPlaylist, removeFromPlaylist } = useUser();
  
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
  const [showAddSongs, setShowAddSongs] = useState(false);
  
  // Helper function to render icons with proper type assertion
  const renderIcon = (Icon: IconType, className?: string) => {
    return React.createElement(Icon as React.ComponentType<{ className?: string }>, { className });
  };
  
  const playlist = mockPlaylists.find((p) => p.id === id);
  
  if (!playlist) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-white mb-4">Playlist not found</h2>
        <p className="text-spotify-gray">The playlist you're looking for doesn't exist.</p>
      </div>
    );
  }
  
  const totalDuration = playlist.songs.reduce((total, song) => total + song.duration, 0);
  const formattedDuration = formatTime(totalDuration);
  
  const isPlaylistPlaying = 
    playerState.isPlaying && 
    playerState.currentSong && 
    playlist.songs.some(song => song.id === playerState.currentSong?.id);
  
  const handlePlayPause = () => {
    if (isPlaylistPlaying) {
      pauseSong();
    } else if (playlist.songs.length > 0) {
      playSong(playlist.songs[0]);
    }
  };
  
  const handleAddToQueue = () => {
    playlist.songs.forEach(song => {
      addToQueue(song);
    });
    setShowMoreOptions(false);
  };
  
  const handleEditDescription = () => {
    setEditedDescription(playlist.description || '');
    setIsEditing(true);
  };
  
  const handleSaveDescription = () => {
    // In a real app, we would update the playlist description in the backend
    setIsEditing(false);
  };
  
  const handleSearchSongs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim()) {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = mockSongs.filter(
        song => 
          song.title.toLowerCase().includes(lowerCaseQuery) ||
          song.artist.toLowerCase().includes(lowerCaseQuery) ||
          song.album.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs([]);
    }
  };
  
  const handleAddSongToPlaylist = (song: Song) => {
    // In a real app, we would update the playlist in the backend
    addToPlaylist(playlist.id, song);
  };
  
  const handleRemoveSongFromPlaylist = (songId: string) => {
    // In a real app, we would update the playlist in the backend
    removeFromPlaylist(playlist.id, songId);
  };
  
  const isSongInPlaylist = (songId: string) => {
    return playlist.songs.some(song => song.id === songId);
  };
  
  const isSongLiked = (songId: string) => {
    return userState.user?.likedSongs.some(song => song.id === songId) || false;
  };
  
  const handleLikeSong = (song: Song) => {
    toggleLikeSong(song);
  };
  
  const getRandomGradient = () => {
    const gradients = [
      'from-pink-500 to-purple-500',
      'from-blue-500 to-teal-500',
      'from-green-500 to-yellow-500',
      'from-yellow-500 to-red-500',
      'from-purple-500 to-indigo-500'
    ];
    
    return gradients[Math.floor(Math.random() * gradients.length)];
  };
  
  return (
    <div className="pb-20">
      {/* Playlist header with gradient background */}
      <div className="relative mb-6">
        <div 
          className={`absolute inset-0 bg-gradient-to-b ${getRandomGradient()} opacity-70`}
          style={{
            filter: 'blur(40px)',
            transform: 'scale(1.1)',
            zIndex: -1,
          }}
        ></div>
        <div className="relative z-10 flex items-end space-x-6 p-6">
          <div className="flex-shrink-0">
            <img 
              src={playlist.coverUrl} 
              alt={playlist.name} 
              className="w-60 h-60 shadow-lg"
            />
          </div>
          <div>
            <p className="text-sm font-bold text-white uppercase mb-2">Playlist</p>
            <h1 className="text-5xl font-bold text-white mb-4">{playlist.name}</h1>
            {isEditing ? (
              <div className="mb-4">
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="w-full bg-gray-800 text-white p-2 rounded-md"
                  rows={3}
                  placeholder="Add a description..."
                />
                <div className="flex space-x-2 mt-2">
                  <button 
                    onClick={handleSaveDescription}
                    className="px-4 py-1 bg-spotify-green text-black rounded-full text-sm font-medium"
                  >
                    Save
                  </button>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-1 bg-gray-700 text-white rounded-full text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-spotify-gray mb-2 group relative">
                {playlist.description || 'No description'}
                <button 
                  onClick={handleEditDescription}
                  className="ml-2 text-xs text-spotify-gray opacity-0 group-hover:opacity-100 hover:text-white"
                >
                  Edit
                </button>
              </p>
            )}
            <div className="flex items-center text-spotify-gray text-sm">
              <span className="font-bold text-white">{playlist.createdBy}</span>
              <span className="mx-1">•</span>
              <span>{playlist.songs.length} songs,</span>
              <span className="ml-1">{formattedDuration}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex items-center space-x-4 mb-8 px-6">
        <button 
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isPlaylistPlaying ? 'bg-spotify-green text-black' : 'bg-spotify-green hover:scale-105 text-black'
          } transition`}
          onClick={handlePlayPause}
        >
          {isPlaylistPlaying 
            ? renderIcon(FaPause, "text-lg")
            : renderIcon(FaPlay, "text-lg ml-1")
          }
        </button>
        <button 
          className="text-spotify-gray hover:text-white"
          onClick={() => setShowAddSongs(!showAddSongs)}
        >
          {renderIcon(FaMusic, "text-2xl")}
        </button>
        <div className="relative">
          <button 
            className="text-spotify-gray hover:text-white"
            onClick={() => setShowMoreOptions(!showMoreOptions)}
          >
            {renderIcon(FaEllipsisH, "text-2xl")}
          </button>
          
          {/* More options dropdown */}
          {showMoreOptions && (
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-spotify-dark-gray z-10">
              <div className="py-1">
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                  onClick={handleAddToQueue}
                >
                  Add to queue
                </button>
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                  onClick={handleEditDescription}
                >
                  Edit details
                </button>
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                  onClick={() => setShowMoreOptions(false)}
                >
                  Share
                </button>
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                  onClick={() => setShowMoreOptions(false)}
                >
                  Delete playlist
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Add songs panel */}
      {showAddSongs && (
        <div className="mb-8 px-6 py-4 bg-spotify-dark-gray rounded-md">
          <h3 className="text-white font-bold mb-4">Add songs to playlist</h3>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchSongs}
            placeholder="Search for songs"
            className="w-full py-2 px-4 bg-white bg-opacity-10 rounded-full text-white placeholder-spotify-gray focus:outline-none focus:ring-2 focus:ring-spotify-green mb-4"
          />
          
          {searchQuery && (
            <div className="max-h-80 overflow-y-auto">
              {filteredSongs.length === 0 ? (
                <p className="text-spotify-gray text-center py-4">No songs found</p>
              ) : (
                filteredSongs.map((song, index) => (
                  <div 
                    key={song.id}
                    className="flex items-center justify-between py-2 px-4 hover:bg-gray-800 rounded-md"
                  >
                    <div className="flex items-center">
                      <img 
                        src={song.coverUrl} 
                        alt={song.title} 
                        className="h-10 w-10 mr-3"
                      />
                      <div>
                        <p className="text-white">{song.title}</p>
                        <p className="text-spotify-gray text-sm">{song.artist}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleAddSongToPlaylist(song)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        isSongInPlaylist(song.id) 
                          ? 'bg-gray-700 text-spotify-gray cursor-not-allowed' 
                          : 'bg-spotify-green text-black'
                      }`}
                      disabled={isSongInPlaylist(song.id)}
                    >
                      {isSongInPlaylist(song.id) ? 'Added' : 'Add'}
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Song list header */}
      <div className="grid grid-cols-12 border-b border-gray-800 pb-2 px-6 text-xs text-spotify-gray uppercase font-medium tracking-wider">
        <div className="col-span-1">#</div>
        <div className="col-span-4">Title</div>
        <div className="col-span-3">Album</div>
        <div className="col-span-2">Date added</div>
        <div className="col-span-2 text-right flex items-center justify-end">
          {renderIcon(FaClock)}
        </div>
      </div>
      
      {/* Song list */}
      <div className="mt-4 px-2">
        {playlist.songs.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-spotify-gray">This playlist is empty.</p>
            <button 
              onClick={() => setShowAddSongs(true)}
              className="mt-4 px-6 py-2 bg-white text-black rounded-full font-bold text-sm"
            >
              Add songs
            </button>
          </div>
        ) : (
          playlist.songs.map((song, index) => (
            <div 
              key={song.id}
              className="grid grid-cols-12 items-center py-2 px-4 rounded-md hover:bg-spotify-dark-gray group"
            >
              <div className="flex items-center col-span-1">
                <span className="text-spotify-gray group-hover:hidden">{index + 1}</span>
                <button 
                  className="text-white hidden group-hover:block"
                  onClick={() => playSong(song)}
                >
                  {playerState.currentSong?.id === song.id && playerState.isPlaying 
                    ? renderIcon(FaPause) 
                    : renderIcon(FaPlay)}
                </button>
              </div>
              
              <div className="flex items-center col-span-4">
                <img 
                  src={song.coverUrl} 
                  alt={song.title} 
                  className="h-10 w-10 mr-3"
                />
                <div>
                  <p className={`font-medium ${playerState.currentSong?.id === song.id ? 'text-spotify-green' : 'text-white'}`}>
                    {song.title}
                  </p>
                  <p className="text-spotify-gray text-sm">{song.artist}</p>
                </div>
              </div>
              
              <div className="col-span-3 text-spotify-gray text-sm">
                {song.album}
              </div>
              
              <div className="col-span-2 text-spotify-gray text-sm">
                {new Date().toLocaleDateString()}
              </div>
              
              <div className="col-span-2 flex items-center justify-end space-x-4">
                <button 
                  className="text-spotify-gray hover:text-white hidden group-hover:block"
                  onClick={() => handleLikeSong(song)}
                >
                  {isSongLiked(song.id) 
                    ? renderIcon(FaHeart, "text-spotify-green") 
                    : renderIcon(FaRegHeart)}
                </button>
                <span className="text-spotify-gray text-sm">
                  {formatTime(song.duration)}
                </span>
                <button 
                  className="text-spotify-gray hover:text-white hidden group-hover:block"
                  onClick={() => handleRemoveSongFromPlaylist(song.id)}
                >
                  &times;
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Playlist information */}
      <div className="mt-8 px-6">
        <div className="flex items-center text-spotify-gray text-sm">
          <div className="flex items-center">
            {renderIcon(FaUserAlt, "mr-2")}
            <span>Created by {playlist.createdBy}</span>
          </div>
          <span className="mx-2">•</span>
          <span>{playlist.songs.length} songs, {formattedDuration}</span>
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage; 