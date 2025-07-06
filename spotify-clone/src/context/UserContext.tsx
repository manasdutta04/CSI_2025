import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { UserProfile, Playlist, Song } from '../types';
import { mockUser } from '../utils/mockData';

interface UserContextProps {
  userState: UserState;
  login: (email: string, password: string) => void;
  logout: () => void;
  createPlaylist: (name: string, description?: string) => void;
  addToPlaylist: (playlistId: string, song: Song) => void;
  removeFromPlaylist: (playlistId: string, songId: string) => void;
  toggleLikeSong: (song: Song) => void;
  followArtist: (artistId: string) => void;
  unfollowArtist: (artistId: string) => void;
}

interface UserState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  followedArtistIds: string[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: mockUser, // For demo purposes, we'll start with a mock user
  isAuthenticated: true, // For demo purposes, we'll start authenticated
  followedArtistIds: ['1', '2'], // Mock followed artists
  loading: false,
  error: null,
};

type UserAction =
  | { type: 'LOGIN_SUCCESS'; payload: UserProfile }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CREATE_PLAYLIST'; payload: Playlist }
  | { type: 'ADD_TO_PLAYLIST'; payload: { playlistId: string; song: Song } }
  | { type: 'REMOVE_FROM_PLAYLIST'; payload: { playlistId: string; songId: string } }
  | { type: 'TOGGLE_LIKE_SONG'; payload: Song }
  | { type: 'FOLLOW_ARTIST'; payload: string }
  | { type: 'UNFOLLOW_ARTIST'; payload: string };

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null,
      };
    case 'CREATE_PLAYLIST':
      if (!state.user) return state;
      return {
        ...state,
        user: {
          ...state.user,
          playlists: [...state.user.playlists, action.payload],
        },
      };
    case 'ADD_TO_PLAYLIST':
      if (!state.user) return state;
      return {
        ...state,
        user: {
          ...state.user,
          playlists: state.user.playlists.map((playlist) =>
            playlist.id === action.payload.playlistId
              ? {
                  ...playlist,
                  songs: [...playlist.songs, action.payload.song],
                }
              : playlist
          ),
        },
      };
    case 'REMOVE_FROM_PLAYLIST':
      if (!state.user) return state;
      return {
        ...state,
        user: {
          ...state.user,
          playlists: state.user.playlists.map((playlist) =>
            playlist.id === action.payload.playlistId
              ? {
                  ...playlist,
                  songs: playlist.songs.filter((song) => song.id !== action.payload.songId),
                }
              : playlist
          ),
        },
      };
    case 'TOGGLE_LIKE_SONG':
      if (!state.user) return state;
      
      const isLiked = state.user.likedSongs.some((song) => song.id === action.payload.id);
      
      return {
        ...state,
        user: {
          ...state.user,
          likedSongs: isLiked
            ? state.user.likedSongs.filter((song) => song.id !== action.payload.id)
            : [...state.user.likedSongs, action.payload],
        },
      };
    case 'FOLLOW_ARTIST':
      return {
        ...state,
        followedArtistIds: [...state.followedArtistIds, action.payload],
      };
    case 'UNFOLLOW_ARTIST':
      return {
        ...state,
        followedArtistIds: state.followedArtistIds.filter((id) => id !== action.payload),
      };
    default:
      return state;
  }
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, initialState);

  const login = (email: string, password: string) => {
    try {
      // In a real app, you would make an API call here
      // For now, we'll just use the mock user
      dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid email or password' });
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const createPlaylist = (name: string, description?: string) => {
    const newPlaylist: Playlist = {
      id: `playlist-${Date.now()}`,
      name,
      description,
      coverUrl: 'https://via.placeholder.com/300',
      songs: [],
      createdBy: userState.user?.name || 'Unknown User',
    };
    
    dispatch({ type: 'CREATE_PLAYLIST', payload: newPlaylist });
  };

  const addToPlaylist = (playlistId: string, song: Song) => {
    dispatch({ type: 'ADD_TO_PLAYLIST', payload: { playlistId, song } });
  };

  const removeFromPlaylist = (playlistId: string, songId: string) => {
    dispatch({ type: 'REMOVE_FROM_PLAYLIST', payload: { playlistId, songId } });
  };

  const toggleLikeSong = (song: Song) => {
    dispatch({ type: 'TOGGLE_LIKE_SONG', payload: song });
  };

  const followArtist = (artistId: string) => {
    dispatch({ type: 'FOLLOW_ARTIST', payload: artistId });
  };

  const unfollowArtist = (artistId: string) => {
    dispatch({ type: 'UNFOLLOW_ARTIST', payload: artistId });
  };

  return (
    <UserContext.Provider
      value={{
        userState,
        login,
        logout,
        createPlaylist,
        addToPlaylist,
        removeFromPlaylist,
        toggleLikeSong,
        followArtist,
        unfollowArtist,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 