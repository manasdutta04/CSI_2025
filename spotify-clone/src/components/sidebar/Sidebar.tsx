import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaSearch, FaBook, FaPlus, FaHeart, FaUser } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { mockPlaylists, mockGenres } from '../../utils/mockData';
import { useUser } from '../../context/UserContext';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { userState, createPlaylist } = useUser();
  
  // Helper function to render icons with proper type assertion
  const renderIcon = (Icon: IconType, className?: string) => {
    return React.createElement(Icon as React.ComponentType<{ className?: string }>, { className });
  };
  
  // Check if a route is active
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleCreatePlaylist = () => {
    createPlaylist(`New Playlist #${userState.user?.playlists.length || 0 + 1}`);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <h1 className="sidebar-logo">Spotify 2.0</h1>
        
        <nav className="sidebar-nav">
          <ul className="nav-list">
            <li>
              <Link 
                to="/" 
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
              >
                {renderIcon(FaHome, "nav-icon")}
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/search" 
                className={`nav-link ${isActive('/search') ? 'active' : ''}`}
              >
                {renderIcon(FaSearch, "nav-icon")}
                <span>Search</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/library" 
                className={`nav-link ${isActive('/library') ? 'active' : ''}`}
              >
                {renderIcon(FaBook, "nav-icon")}
                <span>Your Library</span>
              </Link>
            </li>
            <li className="profile-link">
              <Link 
                to="/profile" 
                className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
              >
                {renderIcon(FaUser, "nav-icon")}
                <span>Profile</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="sidebar-actions">
          <div 
            className="create-playlist"
            onClick={handleCreatePlaylist}
          >
            <div className="icon-container">
              {renderIcon(FaPlus, "plus-icon")}
            </div>
            <span>Create Playlist</span>
          </div>
          <Link 
            to={userState.user?.likedSongs.length ? '/library?tab=liked' : '/library'} 
            className="liked-songs"
          >
            <div className="heart-container">
              {renderIcon(FaHeart, "heart-icon")}
            </div>
            <span>Liked Songs</span>
          </Link>
        </div>
        
        <hr className="sidebar-divider" />
        
        {/* Playlists */}
        <div className="sidebar-section">
          <h3 className="section-title">Playlists</h3>
          <ul className="playlist-list">
            {userState.user?.playlists.map((playlist) => (
              <li key={playlist.id}>
                <Link 
                  to={`/playlist/${playlist.id}`} 
                  className={`playlist-link ${isActive(`/playlist/${playlist.id}`) ? 'active' : ''}`}
                >
                  {playlist.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Genres */}
        <div className="sidebar-section genres">
          <h3 className="section-title">Genres</h3>
          <ul className="genre-list">
            {mockGenres.map((genre) => (
              <li key={genre.id}>
                <Link 
                  to={`/genre/${genre.id}`} 
                  className={`genre-link ${isActive(`/genre/${genre.id}`) ? 'active' : ''}`}
                >
                  {genre.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;