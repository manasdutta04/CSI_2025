import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaPlay, FaPause, FaMusic } from 'react-icons/fa';
import { IconType } from 'react-icons';
import SongItem from '../components/main/SongItem';
import AlbumCard from '../components/main/AlbumCard';
import { mockGenres, mockSongs, mockAlbums } from '../utils/mockData';
import { usePlayer } from '../context/PlayerContext';
import { formatTime } from '../utils/formatTime';
import { Album } from '../types';

const GenrePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { playerState, playSong, pauseSong } = usePlayer();
  
  // Helper function to render icons with proper type assertion
  const renderIcon = (Icon: IconType, className?: string) => {
    return React.createElement(Icon as React.ComponentType<{ className?: string }>, { className });
  };
  
  const genre = mockGenres.find((g) => g.id === id);
  
  if (!genre) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-white mb-4">Genre not found</h2>
        <p className="text-spotify-gray">The genre you're looking for doesn't exist.</p>
      </div>
    );
  }
  
  // Get albums related to this genre
  const relatedAlbums: Album[] = mockAlbums.filter(album => 
    album.songs.some(song => song.genre === genre.name)
  );
  
  const isGenrePlaying = 
    playerState.isPlaying && 
    playerState.currentSong && 
    genre.songs.some(song => song.id === playerState.currentSong?.id);
  
  const handlePlayPause = () => {
    if (isGenrePlaying) {
      pauseSong();
    } else if (genre.songs.length > 0) {
      playSong(genre.songs[0]);
    }
  };
  
  // Get a gradient color based on genre name
  const getGenreGradient = (genreName: string) => {
    const gradients = {
      'Pop': 'from-pink-500 to-purple-500',
      'Rock': 'from-blue-500 to-teal-500',
      'Hip Hop': 'from-yellow-500 to-red-500',
      'default': 'from-green-500 to-blue-500'
    };
    
    return gradients[genreName as keyof typeof gradients] || gradients.default;
  };
  
  return (
    <div className="pb-20">
      {/* Genre header with gradient background */}
      <div className="relative mb-6">
        <div 
          className={`absolute inset-0 bg-gradient-to-b ${getGenreGradient(genre.name)} opacity-70`}
          style={{
            filter: 'blur(40px)',
            transform: 'scale(1.1)',
            zIndex: -1,
          }}
        ></div>
        <div className="relative z-10 flex items-end p-6">
          <div>
            <p className="text-sm font-bold text-white uppercase mb-2">Genre</p>
            <h1 className="text-5xl font-bold text-white mb-4">{genre.name}</h1>
            <div className="flex items-center text-spotify-gray text-sm">
              <span>{genre.songs.length} songs</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex items-center space-x-4 mb-8 px-6">
        <button 
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isGenrePlaying ? 'bg-spotify-green text-black' : 'bg-spotify-green hover:scale-105 text-black'
          } transition`}
          onClick={handlePlayPause}
        >
          {isGenrePlaying 
            ? renderIcon(FaPause, "text-lg")
            : renderIcon(FaPlay, "text-lg ml-1")
          }
        </button>
        <div className="flex items-center">
          {renderIcon(FaMusic, "text-spotify-gray mr-2")}
          <span className="text-spotify-gray">{genre.songs.length} songs</span>
        </div>
      </div>
      
      {/* Popular songs section */}
      <section className="mb-8 px-6">
        <h2 className="text-2xl font-bold text-white mb-4">Popular songs</h2>
        <div className="bg-black bg-opacity-20 rounded-md overflow-hidden">
          {genre.songs.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-spotify-gray">No songs in this genre.</p>
            </div>
          ) : (
            genre.songs.map((song, index) => (
              <SongItem key={song.id} song={song} index={index} />
            ))
          )}
        </div>
      </section>
      
      {/* Albums section */}
      {relatedAlbums.length > 0 && (
        <section className="mb-8 px-6">
          <h2 className="text-2xl font-bold text-white mb-4">Albums</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {relatedAlbums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </section>
      )}
      
      {/* Similar genres section */}
      <section className="px-6">
        <h2 className="text-2xl font-bold text-white mb-4">Similar genres</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockGenres
            .filter(g => g.id !== genre.id)
            .map((similarGenre) => (
              <Link 
                key={similarGenre.id}
                to={`/genre/${similarGenre.id}`}
                className={`bg-gradient-to-br ${getGenreGradient(similarGenre.name)} rounded-lg p-6 h-40 flex items-end overflow-hidden relative`}
              >
                <h3 className="text-2xl font-bold text-white z-10">{similarGenre.name}</h3>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-black bg-opacity-30 rounded-full"></div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
};

export default GenrePage; 