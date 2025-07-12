import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
  PlusIcon,
  HeartIcon,
  MusicalNoteIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  BookOpenIcon as BookOpenIconSolid,
  HeartIcon as HeartIconSolid,
} from '@heroicons/react/24/solid';

const Sidebar = () => {
  const location = useLocation();
  const { userPlaylists } = useSelector((state) => state.music);

  const navigationItems = [
    {
      name: 'Home',
      path: '/',
      icon: HomeIcon,
      activeIcon: HomeIconSolid,
    },
    {
      name: 'Search',
      path: '/search',
      icon: MagnifyingGlassIcon,
      activeIcon: MagnifyingGlassIconSolid,
    },
    {
      name: 'Your Library',
      path: '/library',
      icon: BookOpenIcon,
      activeIcon: BookOpenIconSolid,
    },
  ];

  const libraryItems = [
    {
      name: 'Create Playlist',
      path: '/create-playlist',
      icon: PlusIcon,
    },
    {
      name: 'Liked Songs',
      path: '/liked-songs',
      icon: HeartIcon,
      activeIcon: HeartIconSolid,
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-spotify-black flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <MusicalNoteIcon className="w-8 h-8 text-spotify-green" />
          <h1 className="text-2xl font-bold text-spotify-white">Spotify</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-6 space-y-2">
        {navigationItems.map((item) => {
          const Icon = isActive(item.path) ? item.activeIcon : item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
            >
              <Icon className="w-6 h-6" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Separator */}
      <div className="mx-6 my-4 h-px bg-spotify-gray"></div>

      {/* Library Actions */}
      <div className="px-6 space-y-2">
        {libraryItems.map((item) => {
          const Icon = isActive(item.path) ? item.activeIcon || item.icon : item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
            >
              <Icon className="w-6 h-6" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Separator */}
      <div className="mx-6 my-4 h-px bg-spotify-gray"></div>

      {/* User Playlists */}
      <div className="flex-1 px-6 pb-4 overflow-y-auto">
        <div className="space-y-2">
          {userPlaylists.length > 0 ? (
            userPlaylists.map((playlist) => (
              <Link
                key={playlist.id}
                to={`/playlist/${playlist.id}`}
                className="sidebar-item"
              >
                <div className="w-6 h-6 bg-spotify-gray rounded flex items-center justify-center">
                  <MusicalNoteIcon className="w-4 h-4" />
                </div>
                <span className="font-medium truncate">{playlist.name}</span>
              </Link>
            ))
          ) : (
            <p className="text-spotify-light-gray text-sm">
              No playlists yet. Create your first playlist!
            </p>
          )}
        </div>
      </div>

      {/* Install App */}
      <div className="px-6 py-4 border-t border-spotify-gray">
        <button className="flex items-center space-x-3 text-spotify-light-gray hover:text-spotify-white transition-colors">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 10.93 5.16-1.19 9-5.38 9-10.93V7l-10-5z" />
          </svg>
          <span className="font-medium">Install App</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
