import React from 'react';
import { Link } from 'react-router-dom';
import PlaylistCard from '../components/main/PlaylistCard';
import AlbumCard from '../components/main/AlbumCard';
import { mockPlaylists, mockAlbums, mockGenres } from '../utils/mockData';

const HomePage: React.FC = () => {
  // Get current time to display appropriate greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="home-page">
      <h1 className="home-greeting">{getGreeting()}</h1>
      
      {/* Recently played section */}
      <section className="content-section recently-played">
        <div className="section-header">
          <h2 className="section-title">Recently played</h2>
          <Link to="/playlists" className="see-all-link">
            See all
          </Link>
        </div>
        <div className="recently-played-grid">
          {mockPlaylists.slice(0, 6).map((playlist) => (
            <div key={playlist.id} className="recently-played-item">
              <img 
                src={playlist.coverUrl} 
                alt={playlist.name} 
                className="recently-played-cover"
              />
              <div className="recently-played-info">
                <div className="recently-played-title">{playlist.name}</div>
                <div className="recently-played-artist">{playlist.songs.length} songs</div>
              </div>
              <div className="play-button-container">
                <button className="button-hover">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 2.5V13.5L13 8L3 2.5Z" fill="white"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Featured section */}
      <section className="content-section featured-section">
        <div className="section-header">
          <h2 className="section-title">Featured playlists</h2>
          <Link to="/featured" className="see-all-link">
            See all
          </Link>
        </div>
        <div className="featured-grid">
          {mockPlaylists.slice(0, 5).map((playlist) => (
            <Link to={`/playlist/${playlist.id}`} key={playlist.id} className="featured-card">
              <img 
                src={playlist.coverUrl} 
                alt={playlist.name} 
                className="featured-image"
              />
              <div className="featured-overlay">
                <div className="featured-title">{playlist.name}</div>
                <div className="featured-description">
                  {playlist.description || `${playlist.songs.length} songs`}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Popular albums section */}
      <section className="content-section">
        <div className="section-header">
          <h2 className="section-title">Popular albums</h2>
          <Link to="/albums" className="see-all-link">
            See all
          </Link>
        </div>
        <div className="cards-grid">
          {mockAlbums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>
      
      {/* Browse by genre section */}
      <section className="content-section">
        <div className="section-header">
          <h2 className="section-title">Browse by genre</h2>
        </div>
        <div className="cards-grid">
          {mockGenres.map((genre) => (
            <Link 
              to={`/genre/${genre.id}`}
              key={genre.id}
              className="genre-card"
              style={{
                background: `linear-gradient(to bottom right, ${genre.color1}, ${genre.color2})`
              }}
            >
              <h3 className="genre-name">{genre.name}</h3>
              <div className="genre-decoration"></div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage; 