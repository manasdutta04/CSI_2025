import React from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

const SongCard = ({ song, index, onPlay, isPlaying }) => {
  return (
    <div className="card group cursor-pointer">
      <div className="relative">
        <img
          src={song.cover}
          alt={song.title}
          className="w-full aspect-square object-cover rounded-lg mb-4"
        />
        <button
          onClick={onPlay}
          className="absolute bottom-2 right-2 bg-spotify-green text-spotify-black rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105 transform"
        >
          {isPlaying ? (
            <PauseIcon className="w-5 h-5" />
          ) : (
            <PlayIcon className="w-5 h-5" />
          )}
        </button>
      </div>
      <div>
        <h3 className="font-semibold text-spotify-white text-sm mb-1 line-clamp-1">
          {song.title}
        </h3>
        <p className="text-spotify-light-gray text-xs line-clamp-2">
          {song.artist}
        </p>
      </div>
    </div>
  );
};

export default SongCard;
