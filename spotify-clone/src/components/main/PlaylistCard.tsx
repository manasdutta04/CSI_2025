import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { Playlist } from '../../types';
import { usePlayer } from '../../context/PlayerContext';
import './PlaylistCard.css';

interface PlaylistCardProps {
  playlist: Playlist;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
  const { playSong } = usePlayer();
  
  // Helper function to render icons with proper type assertion
  const renderIcon = (Icon: IconType, className?: string) => {
    return React.createElement(Icon as React.ComponentType<{ className?: string }>, { className });
  };
  
  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    if (playlist.songs.length > 0) {
      playSong(playlist.songs[0]);
    }
  };
  
  return (
    <Link to={`/playlist/${playlist.id}`} className="playlist-card">
      <div className="playlist-container">
        <div className="playlist-image-container">
          <img 
            src={playlist.coverUrl} 
            alt={playlist.name} 
            className="playlist-cover"
          />
          <div 
            className="playlist-play-button"
            onClick={handlePlay}
          >
            {renderIcon(FaPlay, "play-icon")}
          </div>
        </div>
        <h3 className="playlist-title">{playlist.name}</h3>
        <p className="playlist-description">
          {playlist.description || `${playlist.songs.length} songs`}
        </p>
      </div>
    </Link>
  );
};

export default PlaylistCard; 