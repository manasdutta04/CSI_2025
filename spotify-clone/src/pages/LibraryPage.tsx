import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMusic, FaHeart, FaSearch, FaPlus, FaList, FaCompactDisc, FaMicrophone, FaPlay, FaPause, FaEllipsisH } from 'react-icons/fa';
import { IconType } from 'react-icons';
import PlaylistCard from '../components/main/PlaylistCard';
import AlbumCard from '../components/main/AlbumCard';
import { useUser } from '../context/UserContext';
import { usePlayer } from '../context/PlayerContext';
import { mockArtists, mockAlbums, mockPlaylists } from '../utils/mockData';

const LibraryPage: React.FC = () => {
  const { userState, createPlaylist } = useUser();
  const { playerState, playSong, pauseSong } = usePlayer();
  const [activeTab, setActiveTab] = useState<'playlists' | 'albums' | 'artists' | 'liked'>('playlists');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDescription, setNewPlaylistDescription] = useState('');
  
  // Helper function to render icons with proper type assertion
  const renderIcon = (Icon: IconType, className?: string) => {
    return React.createElement(Icon as React.ComponentType<{ className?: string }>, { className });
  };
  
  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName.trim(), newPlaylistDescription.trim() || undefined);
      setNewPlaylistName('');
      setNewPlaylistDescription('');
      setShowCreatePlaylist(false);
    }
  };
  
  const filterContent = <T extends Record<string, any>>(items: T[], searchFields: (keyof T)[]) => {
    if (!searchQuery.trim()) return items;
    
    return items.filter(item => 
      searchFields.some(field => 
        String(item[field]).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };
  
  const filteredPlaylists = filterContent(
    userState.user?.playlists || [], 
    ['name', 'description']
  );
  
  const filteredAlbums = filterContent(mockAlbums, ['title', 'artist']);
  const filteredArtists = filterContent(mockArtists, ['name']);
  const filteredLikedSongs = filterContent(userState.user?.likedSongs || [], ['title', 'artist', 'album']);
  
  const handlePlay = (songId: string) => {
    const song = mockPlaylists.flatMap(p => p.songs).find(s => s.id === songId);
    if (song) {
      if (playerState.currentSong?.id === songId && playerState.isPlaying) {
        pauseSong();
      } else {
        playSong(song);
      }
    }
  };
  
  const renderContent = () => {
    switch (activeTab) {
      case 'playlists':
        return (
          <div className="playlists-grid">
            {/* Create Playlist Card */}
            <div 
              className="create-playlist-card"
              onClick={() => setShowCreatePlaylist(true)}
            >
              <div className="create-playlist-icon-container">
                {renderIcon(FaPlus, "create-playlist-icon")}
              </div>
              <h3 className="create-playlist-title">Create Playlist</h3>
              <p className="create-playlist-description">Create a new playlist</p>
            </div>
            
            {/* User Playlists */}
            {filteredPlaylists.map(playlist => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        );
      case 'albums':
        return (
          <div className="albums-grid">
            {filteredAlbums.map(album => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        );
      case 'artists':
        return (
          <div className="artists-grid">
            {filteredArtists.map(artist => (
              <Link to={`/artist/${artist.id}`} key={artist.id} className="artist-card">
                <div className="artist-container">
                  <img 
                    src={artist.imageUrl} 
                    alt={artist.name} 
                    className="artist-image"
                  />
                  <div className="artist-play-button">
                    {renderIcon(FaPlay, "play-icon")}
                  </div>
                  <h3 className="artist-name">{artist.name}</h3>
                  <p className="artist-type">Artist</p>
                </div>
              </Link>
            ))}
          </div>
        );
      case 'liked':
        return (
          <div className="liked-songs-container">
            <div className="liked-songs-header">
              <h2 className="liked-songs-title">Liked Songs</h2>
              <p className="liked-songs-count">{filteredLikedSongs.length} songs</p>
            </div>
            <div className="liked-songs-content">
              {filteredLikedSongs.length > 0 ? (
                <table className="liked-songs-table">
                  <thead className="liked-songs-table-header">
                    <tr>
                      <th className="song-number-header">#</th>
                      <th className="song-info-header">Title</th>
                      <th className="song-album-header">Album</th>
                      <th className="song-date-header">Date Added</th>
                      <th className="song-duration-header">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLikedSongs.map((song, index) => (
                      <tr 
                        key={song.id} 
                        className="liked-songs-row"
                        onClick={() => handlePlay(song.id)}
                      >
                        <td className="song-number">
                          <div className="song-number-container">
                            <span className="song-index">{index + 1}</span>
                            <button className="song-play-button">
                              {playerState.currentSong?.id === song.id && playerState.isPlaying 
                                ? renderIcon(FaPause, "song-play-icon")
                                : renderIcon(FaPlay, "song-play-icon")}
                            </button>
                          </div>
                        </td>
                        <td className="song-info">
                          <img 
                            src={song.coverUrl} 
                            alt={song.title} 
                            className="song-cover"
                          />
                          <div className="song-details">
                            <p className="song-title">{song.title}</p>
                            <p className="song-artist">{song.artist}</p>
                          </div>
                        </td>
                        <td className="song-album">{song.album}</td>
                        <td className="song-date-added">2 days ago</td>
                        <td className="song-duration">
                          {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="empty-state">
                  <div className="empty-state-icon">
                    {renderIcon(FaHeart)}
                  </div>
                  <h3 className="empty-state-title">Songs you like will appear here</h3>
                  <p className="empty-state-text">Save songs by tapping the heart icon.</p>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="library-page">
      <div className="library-header">
        <h1 className="library-title">Your Library</h1>
        <div className="library-search">
          <span className="library-search-icon">
            {renderIcon(FaSearch)}
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search in your library"
            className="library-search-input"
          />
        </div>
      </div>
      
      <div className="library-tabs">
        <button
          className={`library-tab ${activeTab === 'playlists' ? 'active' : ''}`}
          onClick={() => setActiveTab('playlists')}
        >
          {renderIcon(FaList, "library-tab-icon")} Playlists
        </button>
        <button
          className={`library-tab ${activeTab === 'albums' ? 'active' : ''}`}
          onClick={() => setActiveTab('albums')}
        >
          {renderIcon(FaCompactDisc, "library-tab-icon")} Albums
        </button>
        <button
          className={`library-tab ${activeTab === 'artists' ? 'active' : ''}`}
          onClick={() => setActiveTab('artists')}
        >
          {renderIcon(FaMicrophone, "library-tab-icon")} Artists
        </button>
        <button
          className={`library-tab ${activeTab === 'liked' ? 'active' : ''}`}
          onClick={() => setActiveTab('liked')}
        >
          {renderIcon(FaHeart, "library-tab-icon")} Liked Songs
        </button>
      </div>
      
      <div className="library-content">
        {renderContent()}
      </div>
      
      {/* Create Playlist Modal */}
      {showCreatePlaylist && (
        <div className="create-playlist-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Create Playlist</h2>
            </div>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input 
                type="text" 
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                placeholder="My Playlist"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Description (optional)</label>
              <textarea 
                value={newPlaylistDescription}
                onChange={(e) => setNewPlaylistDescription(e.target.value)}
                placeholder="Add an optional description"
                className="form-textarea"
                rows={3}
              />
            </div>
            <div className="modal-actions">
              <button 
                className="cancel-button"
                onClick={() => setShowCreatePlaylist(false)}
              >
                Cancel
              </button>
              <button 
                className="create-button"
                onClick={handleCreatePlaylist}
                disabled={!newPlaylistName.trim()}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryPage; 