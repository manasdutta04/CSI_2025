import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { PlayerState, Song } from '../types';

interface PlayerContextProps {
  playerState: PlayerState;
  playSong: (song: Song) => void;
  pauseSong: () => void;
  nextSong: () => void;
  prevSong: () => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  addToQueue: (song: Song) => void;
  removeFromQueue: (songId: string) => void;
}

const initialState: PlayerState = {
  currentSong: null,
  isPlaying: false,
  volume: 0.5,
  progress: 0,
  duration: 0,
  queue: [],
};

type PlayerAction =
  | { type: 'PLAY_SONG'; payload: Song }
  | { type: 'PAUSE_SONG' }
  | { type: 'NEXT_SONG' }
  | { type: 'PREV_SONG' }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'SET_PROGRESS'; payload: number }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'ADD_TO_QUEUE'; payload: Song }
  | { type: 'REMOVE_FROM_QUEUE'; payload: string };

const playerReducer = (state: PlayerState, action: PlayerAction): PlayerState => {
  switch (action.type) {
    case 'PLAY_SONG':
      return {
        ...state,
        currentSong: action.payload,
        isPlaying: true,
        progress: 0,
        duration: action.payload.duration,
      };
    case 'PAUSE_SONG':
      return {
        ...state,
        isPlaying: false,
      };
    case 'NEXT_SONG':
      if (state.queue.length === 0) return state;
      
      const nextSong = state.queue[0];
      const newQueue = state.queue.slice(1);
      
      return {
        ...state,
        currentSong: nextSong,
        isPlaying: true,
        progress: 0,
        duration: nextSong.duration,
        queue: newQueue,
      };
    case 'PREV_SONG':
      // For simplicity, just restart the current song
      return {
        ...state,
        progress: 0,
      };
    case 'SET_VOLUME':
      return {
        ...state,
        volume: action.payload,
      };
    case 'SET_PROGRESS':
      return {
        ...state,
        progress: action.payload,
      };
    case 'SET_DURATION':
      return {
        ...state,
        duration: action.payload,
      };
    case 'ADD_TO_QUEUE':
      return {
        ...state,
        queue: [...state.queue, action.payload],
      };
    case 'REMOVE_FROM_QUEUE':
      return {
        ...state,
        queue: state.queue.filter((song) => song.id !== action.payload),
      };
    default:
      return state;
  }
};

const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [playerState, dispatch] = useReducer(playerReducer, initialState);

  const playSong = (song: Song) => {
    dispatch({ type: 'PLAY_SONG', payload: song });
  };

  const pauseSong = () => {
    dispatch({ type: 'PAUSE_SONG' });
  };

  const nextSong = () => {
    dispatch({ type: 'NEXT_SONG' });
  };

  const prevSong = () => {
    dispatch({ type: 'PREV_SONG' });
  };

  const setVolume = (volume: number) => {
    dispatch({ type: 'SET_VOLUME', payload: volume });
  };

  const setProgress = (progress: number) => {
    dispatch({ type: 'SET_PROGRESS', payload: progress });
  };

  const addToQueue = (song: Song) => {
    dispatch({ type: 'ADD_TO_QUEUE', payload: song });
  };

  const removeFromQueue = (songId: string) => {
    dispatch({ type: 'REMOVE_FROM_QUEUE', payload: songId });
  };

  return (
    <PlayerContext.Provider
      value={{
        playerState,
        playSong,
        pauseSong,
        nextSong,
        prevSong,
        setVolume,
        setProgress,
        addToQueue,
        removeFromQueue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = (): PlayerContextProps => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}; 