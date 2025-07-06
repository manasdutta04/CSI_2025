import React, { useState } from 'react';
import { FaUser, FaEdit, FaSignOutAlt, FaHeart, FaMusic } from 'react-icons/fa';
import { IconType } from 'react-icons';
import PlaylistCard from '../components/main/PlaylistCard';
import SongItem from '../components/main/SongItem';
import { useUser } from '../context/UserContext';

const ProfilePage: React.FC = () => {
  const { userState, logout } = useUser();
  const [activeTab, setActiveTab] = useState<'playlists' | 'liked'>('playlists');
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  
  // Helper function to render icons with proper type assertion
  const renderIcon = (Icon: IconType, className?: string) => {
    return React.createElement(Icon as React.ComponentType<{ className?: string }>, { className });
  };
  
  if (!userState.user) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-white mb-4">User not found</h2>
        <p className="text-spotify-gray">Please log in to view your profile.</p>
      </div>
    );
  }
  
  const handleEditProfile = () => {
    setEditedName(userState.user?.name || '');
    setIsEditing(true);
  };
  
  const handleSaveProfile = () => {
    // In a real app, we would update the user profile in the backend
    setIsEditing(false);
  };
  
  const handleLogout = () => {
    logout();
  };
  
  return (
    <div className="pb-20">
      {/* Profile header */}
      <div className="relative mb-8">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-spotify-green to-spotify-black opacity-50"
          style={{
            filter: 'blur(40px)',
            transform: 'scale(1.1)',
            zIndex: -1,
          }}
        ></div>
        <div className="relative z-10 flex items-center p-6">
          <div className="flex-shrink-0 mr-6">
            {userState.user.imageUrl ? (
              <img 
                src={userState.user.imageUrl} 
                alt={userState.user.name} 
                className="w-40 h-40 rounded-full object-cover"
              />
            ) : (
              <div className="w-40 h-40 rounded-full bg-spotify-dark-gray flex items-center justify-center">
                {renderIcon(FaUser, "text-6xl text-spotify-gray")}
              </div>
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-white uppercase mb-2">Profile</p>
            {isEditing ? (
              <div className="mb-4">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="text-3xl font-bold bg-transparent text-white border-b border-white focus:outline-none mb-4"
                />
                <div className="flex space-x-2">
                  <button 
                    onClick={handleSaveProfile}
                    className="px-4 py-1 bg-spotify-green text-black rounded-full text-sm font-medium"
                  >
                    Save
                  </button>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-1 bg-gray-700 text-white rounded-full text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <h1 className="text-5xl font-bold text-white mb-4">{userState.user.name}</h1>
            )}
            <div className="flex items-center text-spotify-gray text-sm">
              <span>{userState.user.email}</span>
              <span className="mx-2">•</span>
              <span>{userState.user.playlists.length} Playlists</span>
              <span className="mx-2">•</span>
              <span>{userState.user.likedSongs.length} Liked Songs</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex items-center space-x-4 mb-8 px-6">
        <button 
          className="px-6 py-2 bg-white text-black rounded-full font-bold text-sm hover:bg-opacity-80"
          onClick={handleEditProfile}
        >
          {renderIcon(FaEdit, "mr-2")}
          Edit Profile
        </button>
        <button 
          className="px-6 py-2 bg-transparent border border-white text-white rounded-full font-bold text-sm hover:bg-white hover:bg-opacity-10"
          onClick={handleLogout}
        >
          {renderIcon(FaSignOutAlt, "mr-2")}
          Log Out
        </button>
      </div>
      
      {/* Content tabs */}
      <div className="px-6">
        <div className="flex space-x-4 border-b border-gray-800 mb-6">
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'playlists' 
                ? 'text-white border-b-2 border-spotify-green' 
                : 'text-spotify-gray hover:text-white'
            }`}
            onClick={() => setActiveTab('playlists')}
          >
            <div className="flex items-center">
              {renderIcon(FaMusic, "mr-2")}
              Playlists
            </div>
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'liked' 
                ? 'text-white border-b-2 border-spotify-green' 
                : 'text-spotify-gray hover:text-white'
            }`}
            onClick={() => setActiveTab('liked')}
          >
            <div className="flex items-center">
              {renderIcon(FaHeart, "mr-2")}
              Liked Songs
            </div>
          </button>
        </div>
        
        {/* Tab content */}
        <div>
          {activeTab === 'playlists' ? (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Your Playlists</h2>
              {userState.user.playlists.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-spotify-gray">You haven't created any playlists yet.</p>
                  <button 
                    className="mt-4 px-6 py-2 bg-spotify-green text-black rounded-full font-bold text-sm"
                  >
                    Create Playlist
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {userState.user.playlists.map(playlist => (
                    <PlaylistCard key={playlist.id} playlist={playlist} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Liked Songs</h2>
              {userState.user.likedSongs.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-spotify-gray">You haven't liked any songs yet.</p>
                  <p className="text-spotify-gray mt-2">Start liking songs to add them to your collection.</p>
                </div>
              ) : (
                <div className="bg-black bg-opacity-20 rounded-md overflow-hidden">
                  {userState.user.likedSongs.map((song, index) => (
                    <SongItem key={song.id} song={song} index={index} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Account settings */}
      <div className="mt-12 px-6">
        <h2 className="text-xl font-bold text-white mb-4">Account Settings</h2>
        <div className="bg-spotify-dark-gray rounded-md p-6">
          <div className="mb-6">
            <h3 className="text-white font-bold mb-2">Email</h3>
            <p className="text-spotify-gray">{userState.user.email}</p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-2">Account Type</h3>
            <p className="text-spotify-gray">Free</p>
            <button className="mt-2 px-6 py-2 bg-spotify-green text-black rounded-full font-bold text-sm">
              Upgrade to Premium
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 