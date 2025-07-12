import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import { setSongs, setTopCharts, setFeatured } from '../redux/musicSlice';
import { playSong } from '../redux/playerSlice';
import { mockSongs, mockPlaylists } from '../utils/mockData';
import SongCard from '../components/SongCard';
import PlaylistCard from '../components/PlaylistCard';

const Home = () => {
  const dispatch = useDispatch();
  const { songs, topCharts, featured } = useSelector((state) => state.music);
  const { currentSong, isPlaying } = useSelector((state) => state.player);

  useEffect(() => {
    // Load mock data
    dispatch(setSongs(mockSongs));
    dispatch(setTopCharts(mockSongs.slice(0, 5)));
    dispatch(setFeatured(mockPlaylists));
  }, [dispatch]);

  const handlePlaySong = (song, index) => {
    dispatch(playSong({
      song,
      playlist: songs,
      index,
    }));
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-spotify-gray to-spotify-black p-8">
      <div className="max-w-7xl mx-auto">
        {/* Greeting */}
        <h1 className="text-4xl font-bold text-spotify-white mb-8">
          {getGreeting()}
        </h1>

        {/* Quick Access */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {mockPlaylists.slice(0, 6).map((playlist) => (
            <div
              key={playlist.id}
              className="bg-spotify-light-gray rounded-lg p-4 flex items-center space-x-4 hover:bg-opacity-80 transition-colors cursor-pointer group"
            >
              <img
                src={playlist.cover}
                alt={playlist.name}
                className="w-16 h-16 rounded object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-spotify-white text-lg">
                  {playlist.name}
                </h3>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity bg-spotify-green text-spotify-black rounded-full p-3 hover:scale-105 transform">
                <PlayIcon className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Featured Playlists */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-spotify-white">
              Featured Playlists
            </h2>
            <button className="text-spotify-light-gray hover:text-spotify-white text-sm font-medium">
              See all
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {featured.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </section>

        {/* Top Charts */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-spotify-white">
              Top Charts
            </h2>
            <button className="text-spotify-light-gray hover:text-spotify-white text-sm font-medium">
              See all
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {topCharts.map((song, index) => (
              <SongCard
                key={song.id}
                song={song}
                index={index}
                onPlay={() => handlePlaySong(song, index)}
                isPlaying={currentSong?.id === song.id && isPlaying}
              />
            ))}
          </div>
        </section>

        {/* Recently Played */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-spotify-white">
              Recently Played
            </h2>
            <button className="text-spotify-light-gray hover:text-spotify-white text-sm font-medium">
              See all
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {songs.slice(0, 5).map((song, index) => (
              <SongCard
                key={song.id}
                song={song}
                index={index}
                onPlay={() => handlePlaySong(song, index)}
                isPlaying={currentSong?.id === song.id && isPlaying}
              />
            ))}
          </div>
        </section>

        {/* Made for You */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-spotify-white">
              Made for You
            </h2>
            <button className="text-spotify-light-gray hover:text-spotify-white text-sm font-medium">
              See all
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {mockPlaylists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
