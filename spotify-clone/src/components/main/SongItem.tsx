import React from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { Song } from '../../types';
import { usePlayer } from '../../context/PlayerContext';
import { formatTime } from '../../utils/formatTime';

interface SongItemProps {
  song: Song;
  index: number;
  showAlbum?: boolean;
}

const SongItem: React.FC<SongItemProps> = ({ song, index, showAlbum = true }) => {
  const { playerState, playSong, pauseSong } = usePlayer();
  
  // Helper function to render icons with proper type assertion
  const renderIcon = (Icon: IconType, className?: string) => {
    return React.createElement(Icon as React.ComponentType<{ className?: string }>, { className });
  };
  
  const isPlaying = playerState.currentSong?.id === song.id && playerState.isPlaying;
  
  const handlePlayPause = () => {
    if (isPlaying) {
      pauseSong();
    } else {
      playSong(song);
    }
  };
  
  return (
    <div 
      className={`grid ${showAlbum ? 'grid-cols-12' : 'grid-cols-10'} items-center py-2 px-4 rounded-md hover:bg-spotify-dark-gray group`}
    >
      <div className="flex items-center col-span-1">
        <span className="text-spotify-gray group-hover:hidden">{index + 1}</span>
        <button 
          className="text-white hidden group-hover:block"
          onClick={handlePlayPause}
        >
          {isPlaying ? renderIcon(FaPause) : renderIcon(FaPlay)}
        </button>
      </div>
      
      <div className="flex items-center col-span-5">
        <img 
          src={song.coverUrl} 
          alt={song.title} 
          className="h-10 w-10 mr-3"
        />
        <div>
          <p className={`font-medium ${isPlaying ? 'text-spotify-green' : 'text-white'}`}>
            {song.title}
          </p>
          <p className="text-spotify-gray text-sm">{song.artist}</p>
        </div>
      </div>
      
      {showAlbum && (
        <div className="col-span-3 text-spotify-gray text-sm">
          {song.album}
        </div>
      )}
      
      <div className={`${showAlbum ? 'col-span-3' : 'col-span-4'} text-spotify-gray text-sm text-right`}>
        {formatTime(song.duration)}
      </div>
    </div>
  );
};

export default SongItem; 