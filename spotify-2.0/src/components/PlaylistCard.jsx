import React from 'react';
import { Link } from 'react-router-dom';
import { PlayIcon } from '@heroicons/react/24/solid';

const PlaylistCard = ({ playlist }) => {
  return (
    <Link to={`/playlist/${playlist.id}`} className="card group cursor-pointer">
      <div className="relative">
        <img
          src={playlist.cover}
          alt={playlist.name}
          className="w-full aspect-square object-cover rounded-lg mb-4"
        />
        <button
          className="absolute bottom-2 right-2 bg-spotify-green text-spotify-black rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105 transform"
          onClick={(e) => {
            e.preventDefault();
            // Handle playlist play
          }}
        >
          <PlayIcon className="w-5 h-5" />
        </button>
      </div>
      <div>
        <h3 className="font-semibold text-spotify-white text-sm mb-1 line-clamp-1">
          {playlist.name}
        </h3>
        <p className="text-spotify-light-gray text-xs line-clamp-2">
          {playlist.description}
        </p>
      </div>
    </Link>
  );
};

export default PlaylistCard;
