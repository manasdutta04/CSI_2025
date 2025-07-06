import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { Album } from '../../types';
import { usePlayer } from '../../context/PlayerContext';
import './AlbumCard.css';

interface AlbumCardProps {
  album: Album;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  const { playSong } = usePlayer();
  
  // Helper function to render icons with proper type assertion
  const renderIcon = (Icon: IconType, className?: string) => {
    return React.createElement(Icon as React.ComponentType<{ className?: string }>, { className });
  };
  
  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    if (album.songs.length > 0) {
      playSong(album.songs[0]);
    }
  };
  
  return (
    <Link to={`/album/${album.id}`} className="album-card">
      <div className="album-container">
        <div className="album-image-container">
          <img 
            src={album.coverUrl} 
            alt={album.title} 
            className="album-cover"
          />
          <div 
            className="album-play-button"
            onClick={handlePlay}
          >
            {renderIcon(FaPlay, "play-icon")}
          </div>
        </div>
        <h3 className="album-title">{album.title}</h3>
        <p className="album-info">
          {album.releaseYear} • {album.artist}
        </p>
      </div>
    </Link>
  );
};

export default AlbumCard; 