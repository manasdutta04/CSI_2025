import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSong: null,
  currentIndex: 0,
  isPlaying: false,
  isLoading: false,
  volume: 0.5,
  currentTime: 0,
  duration: 0,
  playlist: [],
  shuffle: false,
  repeat: 'off', // 'off', 'one', 'all'
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setPlaylist: (state, action) => {
      state.playlist = action.payload;
    },
    toggleShuffle: (state) => {
      state.shuffle = !state.shuffle;
    },
    setRepeat: (state, action) => {
      state.repeat = action.payload;
    },
    playNext: (state) => {
      if (state.shuffle) {
        state.currentIndex = Math.floor(Math.random() * state.playlist.length);
      } else if (state.currentIndex < state.playlist.length - 1) {
        state.currentIndex += 1;
      } else if (state.repeat === 'all') {
        state.currentIndex = 0;
      }
      state.currentSong = state.playlist[state.currentIndex];
    },
    playPrevious: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
      } else if (state.repeat === 'all') {
        state.currentIndex = state.playlist.length - 1;
      }
      state.currentSong = state.playlist[state.currentIndex];
    },
    playSong: (state, action) => {
      const { song, playlist, index } = action.payload;
      state.currentSong = song;
      state.playlist = playlist;
      state.currentIndex = index;
      state.isPlaying = true;
    },
  },
});

export const {
  setCurrentSong,
  setCurrentIndex,
  setIsPlaying,
  setIsLoading,
  setVolume,
  setCurrentTime,
  setDuration,
  setPlaylist,
  toggleShuffle,
  setRepeat,
  playNext,
  playPrevious,
  playSong,
} = playerSlice.actions;

export default playerSlice.reducer;
