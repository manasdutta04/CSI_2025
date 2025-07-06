import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { IconType } from 'react-icons';
import SearchBar from '../components/main/SearchBar';
import SongItem from '../components/main/SongItem';
import AlbumCard from '../components/main/AlbumCard';
import PlaylistCard from '../components/main/PlaylistCard';
import { mockSongs, mockAlbums, mockArtists, mockPlaylists, mockGenres } from '../utils/mockData';
import { Song, Album, Artist, Playlist } from '../types';
import { usePlayer } from '../context/PlayerContext';

const SearchPage: React.FC = () => {
  const { playSong } = usePlayer();
  
  // Helper function to render icons with proper type assertion
  const renderIcon = (Icon: IconType, className?: string) => {
    return React.createElement(Icon as React.ComponentType<{ className?: string }>, { className });
  };
  
  const [searchResults, setSearchResults] = useState<{
    songs: Song[];
    albums: Album[];
    artists: Artist[];
    playlists: Playlist[];
  }>({
    songs: [],
    albums: [],
    artists: [],
    playlists: [],
  });
  
  const [hasSearched, setHasSearched] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSearch = (query: string, filter?: string) => {
    const lowerCaseQuery = query.toLowerCase();
    setSearchQuery(query);
    setIsLoading(true);
    
    if (filter) {
      setActiveFilter(filter);
    }
    
    // Simulate a brief loading state
    setTimeout(() => {
      // Filter songs
      const filteredSongs = mockSongs.filter(
        (song) =>
          song.title.toLowerCase().includes(lowerCaseQuery) ||
          song.artist.toLowerCase().includes(lowerCaseQuery) ||
          song.album.toLowerCase().includes(lowerCaseQuery)
      );
      
      // Filter albums
      const filteredAlbums = mockAlbums.filter(
        (album) =>
          album.title.toLowerCase().includes(lowerCaseQuery) ||
          album.artist.toLowerCase().includes(lowerCaseQuery)
      );
      
      // Filter artists
      const filteredArtists = mockArtists.filter(
        (artist) => artist.name.toLowerCase().includes(lowerCaseQuery)
      );
      
      // Filter playlists
      const filteredPlaylists = mockPlaylists.filter(
        (playlist) =>
          playlist.name.toLowerCase().includes(lowerCaseQuery) ||
          playlist.description?.toLowerCase().includes(lowerCaseQuery) ||
          playlist.createdBy.toLowerCase().includes(lowerCaseQuery)
      );
      
      setSearchResults({
        songs: filteredSongs,
        albums: filteredAlbums,
        artists: filteredArtists,
        playlists: filteredPlaylists,
      });
      
      setHasSearched(true);
      setIsLoading(false);
    }, 500);
  };
  
  const playAllSongs = () => {
    if (searchResults.songs.length > 0) {
      playSong(searchResults.songs[0]);
    }
  };
  
  const renderFilteredResults = () => {
    if (activeFilter === 'Songs') {
      return renderSongs();
    } else if (activeFilter === 'Artists') {
      return renderArtists();
    } else if (activeFilter === 'Albums') {
      return renderAlbums();
    } else if (activeFilter === 'Playlists') {
      return renderPlaylists();
    } else {
      return (
        <>
          {renderSongs()}
          {renderArtists()}
          {renderAlbums()}
          {renderPlaylists()}
        </>
      );
    }
  };
  
  const renderSongs = () => {
    if (searchResults.songs.length === 0) return null;
    
    return (
      <section className="results-section">
        <div className="section-header">
          <h2 className="results-section-title">Songs</h2>
          {searchResults.songs.length > 0 && (
            <button 
              onClick={playAllSongs}
              className="see-all-link"
            >
              Play all
            </button>
          )}
        </div>
        <div className="songs-results">
          {searchResults.songs.map((song, index) => (
            <div key={song.id} className="song-item">
              <div className="song-index">{index + 1}</div>
              <div className="song-info">
                <img 
                  src={song.coverUrl} 
                  alt={song.title} 
                  className="song-cover"
                />
                <div className="song-details">
                  <div className="song-title">{song.title}</div>
                  <div className="song-artist">{song.artist}</div>
                </div>
              </div>
              <div className="song-duration">
                {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  const renderArtists = () => {
    if (searchResults.artists.length === 0) return null;
    
    return (
      <section className="results-section">
        <h2 className="results-section-title">Artists</h2>
        <div className="artists-results">
          {searchResults.artists.map((artist) => (
            <Link to={`/artist/${artist.id}`} key={artist.id} className="artist-card">
              <div className="artist-container">
                <img 
                  src={artist.imageUrl} 
                  alt={artist.name} 
                  className="artist-image"
                />
                <h3 className="artist-name">{artist.name}</h3>
                <p className="artist-type">Artist</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  };
  
  const renderAlbums = () => {
    if (searchResults.albums.length === 0) return null;
    
    return (
      <section className="results-section">
        <h2 className="results-section-title">Albums</h2>
        <div className="albums-results">
          {searchResults.albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>
    );
  };
  
  const renderPlaylists = () => {
    if (searchResults.playlists.length === 0) return null;
    
    return (
      <section className="results-section">
        <h2 className="results-section-title">Playlists</h2>
        <div className="playlists-results">
          {searchResults.playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </section>
    );
  };
  
  const renderCategories = () => {
    return (
      <section className="search-categories">
        <h2 className="section-title">Browse all</h2>
        <div className="categories-grid">
          {mockGenres.map((genre) => (
            <Link 
              to={`/genre/${genre.id}`}
              key={genre.id}
              className="category-card"
              style={{
                background: `linear-gradient(to bottom right, ${genre.color1}, ${genre.color2})`,
              }}
            >
              <div className="category-content">
                <h3 className="category-name">{genre.name}</h3>
                <div className="category-decoration"></div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  };
  
  return (
    <div className="search-page">
      <div className="search-header">
        <h1 className="search-title">Search</h1>
        <div className="search-bar-container">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        {hasSearched && !isLoading && (
          <div className="search-filters">
            <button
              className={`filter-button ${!activeFilter ? 'active' : ''}`}
              onClick={() => setActiveFilter(null)}
            >
              All
            </button>
            <button
              className={`filter-button ${activeFilter === 'Songs' ? 'active' : ''}`}
              onClick={() => setActiveFilter('Songs')}
            >
              Songs
            </button>
            <button
              className={`filter-button ${activeFilter === 'Artists' ? 'active' : ''}`}
              onClick={() => setActiveFilter('Artists')}
            >
              Artists
            </button>
            <button
              className={`filter-button ${activeFilter === 'Albums' ? 'active' : ''}`}
              onClick={() => setActiveFilter('Albums')}
            >
              Albums
            </button>
            <button
              className={`filter-button ${activeFilter === 'Playlists' ? 'active' : ''}`}
              onClick={() => setActiveFilter('Playlists')}
            >
              Playlists
            </button>
          </div>
        )}
      </div>
      
      {isLoading ? (
        <div className="search-loading">
          <div className="loading-spinner search-spinner"></div>
          <p className="search-loading-text">Searching...</p>
        </div>
      ) : hasSearched ? (
        <div className="search-results-container">
          {searchResults.songs.length === 0 && 
           searchResults.albums.length === 0 && 
           searchResults.artists.length === 0 &&
           searchResults.playlists.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">
                {renderIcon(FaSearch, "search-icon")}
              </div>
              <p className="no-results-text">No results found for "{searchQuery}"</p>
              <p className="no-results-suggestion">Please try another search or check the spelling.</p>
            </div>
          ) : (
            <div className="search-results">
              <div className="search-results-header">
                <p className="search-results-count">
                  {searchResults.songs.length + searchResults.albums.length + 
                   searchResults.artists.length + searchResults.playlists.length} results for "{searchQuery}"
                </p>
              </div>
              {renderFilteredResults()}
            </div>
          )}
        </div>
      ) : (
        renderCategories()
      )}
    </div>
  );
};

export default SearchPage; 