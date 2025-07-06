export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverUrl: string;
  audioUrl: string;
  genre?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  coverUrl: string;
  songs: Song[];
  createdBy: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  releaseYear: number;
  coverUrl: string;
  songs: Song[];
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  songs: Song[];
  albums: Album[];
}

export interface Genre {
  id: string;
  name: string;
  songs: Song[];
  color1?: string;
  color2?: string;
}

export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
  queue: Song[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
  playlists: Playlist[];
  likedSongs: Song[];
} 