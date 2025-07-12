import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PlusIcon, MusicalNoteIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { createPlaylist } from '../redux/musicSlice';
import { playSong } from '../redux/playerSlice';
import PlaylistCard from '../components/PlaylistCard';
import SongCard from '../components/SongCard';
import { mockSongs, mockAlbums } from '../utils/mockData';

const Library = () => {
  const dispatch = useDispatch();
  const { userPlaylists } = useSelector((state) => state.music);
  const { currentSong, isPlaying } = useSelector((state) => state.player);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      dispatch(createPlaylist({
        name: newPlaylistName,
        description: 'Created by me',
      }));
      setNewPlaylistName('');
      setShowCreatePlaylist(false);
    }
  };

  const handlePlaySong = (song, index) => {
    dispatch(playSong({
      song,
      playlist: mockSongs,
      index,
    }));
  };

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'playlists', label: 'Playlists' },
    { id: 'artists', label: 'Artists' },
    { id: 'albums', label: 'Albums' },
  ];

  const filteredContent = () => {
    switch (activeTab) {
      case 'playlists':
        return userPlaylists.filter(playlist =>
          playlist.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      case 'albums':
        return mockAlbums.filter(album =>
          album.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      case 'artists':
        return [];
      default:
        return [
          ...userPlaylists.filter(playlist =>
            playlist.name.toLowerCase().includes(searchTerm.toLowerCase())
          ),
          ...mockAlbums.filter(album =>
            album.title.toLowerCase().includes(searchTerm.toLowerCase())
          ),
        ];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-spotify-gray to-spotify-black p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-spotify-white">Your Library</h1>
          <button
            onClick={() => setShowCreatePlaylist(true)}
            className="flex items-center space-x-2 bg-spotify-green text-spotify-black px-4 py-2 rounded-full hover:bg-green-400 transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Create Playlist</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-spotify-light-gray" />
          <input
            type="text"
            placeholder="Search in Your Library"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md pl-10 pr-4 py-2 bg-spotify-light-gray text-spotify-white rounded-lg focus:outline-none focus:ring-2 focus:ring-spotify-green"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-spotify-white text-spotify-black'
                  : 'bg-spotify-light-gray text-spotify-white hover:bg-spotify-gray'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredContent().map((item) => (
            <div key={item.id} className="card group cursor-pointer">
              <div className="relative">
                <img
                  src={item.cover || 'https://via.placeholder.com/200x200/282828/ffffff?text=Playlist'}
                  alt={item.name || item.title}
                  className="w-full aspect-square object-cover rounded-lg mb-4"
                />
                <button className="absolute bottom-2 right-2 bg-spotify-green text-spotify-black rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105 transform">
                  <MusicalNoteIcon className="w-5 h-5" />
                </button>
              </div>
              <div>
                <h3 className="font-semibold text-spotify-white text-sm mb-1 line-clamp-1">
                  {item.name || item.title}
                </h3>
                <p className="text-spotify-light-gray text-xs line-clamp-2">
                  {item.description || `Album • ${item.artist}`}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredContent().length === 0 && (
          <div className="text-center py-12">
            <MusicalNoteIcon className="w-16 h-16 text-spotify-light-gray mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-spotify-white mb-2">
              Nothing here yet
            </h3>
            <p className="text-spotify-light-gray mb-4">
              Create your first playlist to get started.
            </p>
            <button
              onClick={() => setShowCreatePlaylist(true)}
              className="bg-spotify-green text-spotify-black px-6 py-3 rounded-full hover:bg-green-400 transition-colors"
            >
              Create Playlist
            </button>
          </div>
        )}

        {/* Create Playlist Modal */}
        {showCreatePlaylist && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-spotify-gray p-6 rounded-lg max-w-md w-full mx-4">
              <h2 className="text-xl font-bold text-spotify-white mb-4">
                Create new playlist
              </h2>
              <input
                type="text"
                placeholder="Playlist name"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                className="w-full p-3 bg-spotify-light-gray text-spotify-white rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-spotify-green"
                autoFocus
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowCreatePlaylist(false);
                    setNewPlaylistName('');
                  }}
                  className="px-4 py-2 text-spotify-white hover:text-spotify-light-gray transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePlaylist}
                  className="px-4 py-2 bg-spotify-green text-spotify-black rounded-full hover:bg-green-400 transition-colors"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
