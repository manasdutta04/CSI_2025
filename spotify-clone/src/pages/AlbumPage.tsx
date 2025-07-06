import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaPlay, FaPause, FaHeart, FaRegHeart, FaEllipsisH, FaClock, FaDownload } from 'react-icons/fa';
import { IconType } from 'react-icons';
import SongItem from '../components/main/SongItem';
import { mockAlbums, mockArtists } from '../utils/mockData';
import { usePlayer } from '../context/PlayerContext';
import { useUser } from '../context/UserContext';
import { formatTime } from '../utils/formatTime';

const AlbumPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { playerState, playSong, pauseSong, addToQueue } = usePlayer();
  const { userState, toggleLikeSong } = useUser();
  
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  
  // Helper function to render icons with proper type assertion
  const renderIcon = (Icon: IconType, className?: string) => {
    return React.createElement(Icon as React.ComponentType<{ className?: string }>, { className });
  };
  
  const album = mockAlbums.find((a) => a.id === id);
  
  if (!album) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-white mb-4">Album not found</h2>
        <p className="text-spotify-gray">The album you're looking for doesn't exist.</p>
      </div>
    );
  }
  
  // Find the artist for this album
  const artist = mockArtists.find(a => a.name === album.artist);
  
  const totalDuration = album.songs.reduce((total, song) => total + song.duration, 0);
  const formattedDuration = formatTime(totalDuration);
  const releaseYear = album.releaseYear;
  
  const isAlbumPlaying = 
    playerState.isPlaying && 
    playerState.currentSong && 
    album.songs.some(song => song.id === playerState.currentSong?.id);
  
  const handlePlayPause = () => {
    if (isAlbumPlaying) {
      pauseSong();
    } else if (album.songs.length > 0) {
      playSong(album.songs[0]);
    }
  };
  
  const handleAddToQueue = () => {
    album.songs.forEach(song => {
      addToQueue(song);
    });
    setShowMoreOptions(false);
  };
  
  const handleLikeSong = (song: any) => {
    toggleLikeSong(song);
  };
  
  const isSongLiked = (songId: string) => {
    return userState.user?.likedSongs.some(song => song.id === songId) || false;
  };
  
  return (
    <div className="pb-20">
      {/* Album header with gradient background */}
      <div className="relative mb-6">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-gray-700 to-spotify-black opacity-70"
          style={{
            backgroundImage: `url(${album.coverUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(40px)',
            transform: 'scale(1.1)',
            zIndex: -1,
          }}
        ></div>
        <div className="relative z-10 flex items-end space-x-6 p-6">
          <div className="flex-shrink-0">
            <img 
              src={album.coverUrl} 
              alt={album.title} 
              className="w-60 h-60 shadow-lg"
            />
          </div>
          <div>
            <p className="text-sm font-bold text-white uppercase mb-2">Album</p>
            <h1 className="text-5xl font-bold text-white mb-4">{album.title}</h1>
            <div className="flex items-center text-white text-sm">
              {artist && artist.imageUrl && (
                <img 
                  src={artist.imageUrl} 
                  alt={artist.name} 
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}
              <Link to={`/artist/${artist?.id}`} className="font-bold hover:underline">
                {album.artist}
              </Link>
              <span className="mx-1">•</span>
              <span>{album.releaseYear}</span>
              <span className="mx-1">•</span>
              <span>{album.songs.length} songs,</span>
              <span className="ml-1">{formattedDuration}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex items-center space-x-4 mb-8 px-6">
        <button 
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isAlbumPlaying ? 'bg-spotify-green text-black' : 'bg-spotify-green hover:scale-105 text-black'
          } transition`}
          onClick={handlePlayPause}
        >
          {isAlbumPlaying 
            ? renderIcon(FaPause, "text-lg")
            : renderIcon(FaPlay, "text-lg ml-1")
          }
        </button>
        <button className="text-spotify-gray hover:text-white">
          {renderIcon(FaRegHeart, "text-2xl")}
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
                  onClick={() => setShowMoreOptions(false)}
                >
                  Add to playlist
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
                  Download
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Album details */}
      <div className="px-6 mb-6">
        <p className="text-spotify-gray text-sm">
          Released {releaseYear} • {album.songs.length} songs
        </p>
      </div>
      
      {/* Song list header */}
      <div className="grid grid-cols-12 border-b border-gray-800 pb-2 px-6 text-xs text-spotify-gray uppercase font-medium tracking-wider">
        <div className="col-span-1">#</div>
        <div className="col-span-6">Title</div>
        <div className="col-span-3">Plays</div>
        <div className="col-span-2 text-right flex items-center justify-end">
          {renderIcon(FaClock)}
        </div>
      </div>
      
      {/* Song list */}
      <div className="mt-4 px-2">
        {album.songs.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-spotify-gray">This album is empty.</p>
          </div>
        ) : (
          album.songs.map((song, index) => (
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
              
              <div className="flex items-center col-span-6">
                <div>
                  <p className={`font-medium ${playerState.currentSong?.id === song.id ? 'text-spotify-green' : 'text-white'}`}>
                    {song.title}
                  </p>
                </div>
              </div>
              
              <div className="col-span-3 text-spotify-gray text-sm flex items-center">
                <div className="w-20 bg-gray-700 h-1 rounded-full overflow-hidden">
                  <div className="bg-spotify-gray h-full" style={{ width: `${Math.floor(Math.random() * 100)}%` }}></div>
                </div>
                <span className="ml-2">{Math.floor(Math.random() * 1000)}K</span>
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
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Album information */}
      <div className="mt-8 px-6">
        <h3 className="text-white text-lg font-bold mb-2">About</h3>
        <p className="text-spotify-gray">
          {album.title} is a {album.releaseYear} album by {album.artist} featuring {album.songs.length} tracks.
        </p>
        
        {/* Copyright info */}
        <div className="mt-6 text-xs text-spotify-gray">
          <p>℗ {album.releaseYear} {album.artist}</p>
          <p>© {album.releaseYear} Music Records</p>
        </div>
      </div>
      
      {/* More from artist section */}
      {artist && artist.albums.length > 1 && (
        <div className="mt-12 px-6">
          <h3 className="text-white text-xl font-bold mb-4">More by {artist.name}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {artist.albums
              .filter(a => a.id !== album.id)
              .slice(0, 5)
              .map(relatedAlbum => (
                <Link key={relatedAlbum.id} to={`/album/${relatedAlbum.id}`} className="group">
                  <div className="bg-spotify-dark-gray p-4 rounded-md hover:bg-gray-800 transition duration-300">
                    <div className="relative mb-4">
                      <img 
                        src={relatedAlbum.coverUrl} 
                        alt={relatedAlbum.title} 
                        className="w-full aspect-square object-cover rounded shadow-lg"
                      />
                      <div className="absolute bottom-2 right-2 bg-spotify-green rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                        <svg className="h-5 w-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="font-bold text-white mb-1 truncate">{relatedAlbum.title}</h3>
                    <p className="text-spotify-gray text-sm">
                      {relatedAlbum.releaseYear}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumPage; 