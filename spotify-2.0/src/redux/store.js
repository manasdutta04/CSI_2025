import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './playerSlice';
import musicReducer from './musicSlice';

const store = configureStore({
  reducer: {
    player: playerReducer,
    music: musicReducer,
  },
});

export default store;
