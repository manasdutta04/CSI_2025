import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  songs: [],
  topCharts: [],
  genres: [],
  searchResults: [],
  currentGenre: 'All',
  isLoading: false,
  error: null,
  featured: [],
  recentlyPlayed: [],
  userPlaylists: [],
  albums: [],
  artists: [],
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setSongs: (state, action) => {
      state.songs = action.payload;
    },
    setTopCharts: (state, action) => {
      state.topCharts = action.payload;
    },
    setGenres: (state, action) => {
      state.genres = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setCurrentGenre: (state, action) => {
      state.currentGenre = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFeatured: (state, action) => {
      state.featured = action.payload;
    },
    setRecentlyPlayed: (state, action) => {
      state.recentlyPlayed = action.payload;
    },
    setUserPlaylists: (state, action) => {
      state.userPlaylists = action.payload;
    },
    setAlbums: (state, action) => {
      state.albums = action.payload;
    },
    setArtists: (state, action) => {
      state.artists = action.payload;
    },
    addToRecentlyPlayed: (state, action) => {
      const song = action.payload;
      const exists = state.recentlyPlayed.find(item => item.id === song.id);
      if (!exists) {
        state.recentlyPlayed.unshift(song);
        if (state.recentlyPlayed.length > 10) {
          state.recentlyPlayed.pop();
        }
      }
    },
    createPlaylist: (state, action) => {
      const { name, description } = action.payload;
      const newPlaylist = {
        id: Date.now().toString(),
        name,
        description,
        songs: [],
        createdAt: new Date().toISOString(),
        cover: null,
      };
      state.userPlaylists.push(newPlaylist);
    },
    addToPlaylist: (state, action) => {
      const { playlistId, song } = action.payload;
      const playlist = state.userPlaylists.find(p => p.id === playlistId);
      if (playlist) {
        const exists = playlist.songs.find(s => s.id === song.id);
        if (!exists) {
          playlist.songs.push(song);
        }
      }
    },
    removeFromPlaylist: (state, action) => {
      const { playlistId, songId } = action.payload;
      const playlist = state.userPlaylists.find(p => p.id === playlistId);
      if (playlist) {
        playlist.songs = playlist.songs.filter(s => s.id !== songId);
      }
    },
  },
});

export const {
  setSongs,
  setTopCharts,
  setGenres,
  setSearchResults,
  setCurrentGenre,
  setIsLoading,
  setError,
  setFeatured,
  setRecentlyPlayed,
  setUserPlaylists,
  setAlbums,
  setArtists,
  addToRecentlyPlayed,
  createPlaylist,
  addToPlaylist,
  removeFromPlaylist,
} = musicSlice.actions;

export default musicSlice.reducer;
