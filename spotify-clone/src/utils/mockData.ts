import { Album, Artist, Genre, Playlist, Song, UserProfile } from '../types';

// Mock Songs
export const mockSongs: Song[] = [
  {
    id: '1',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    duration: 354,
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273acc72a0c37378fca5ee9a35e',
    audioUrl: 'https://example.com/audio/bohemian-rhapsody.mp3',
    genre: 'Rock',
  },
  {
    id: '2',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 200,
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
    audioUrl: 'https://example.com/audio/blinding-lights.mp3',
    genre: 'Pop',
  },
  {
    id: '3',
    title: 'Sicko Mode',
    artist: 'Travis Scott',
    album: 'Astroworld',
    duration: 312,
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273072e9faef2ef7b6db63834a3',
    audioUrl: 'https://example.com/audio/sicko-mode.mp3',
    genre: 'Hip Hop',
  },
  {
    id: '4',
    title: 'Bad Guy',
    artist: 'Billie Eilish',
    album: 'When We All Fall Asleep, Where Do We Go?',
    duration: 194,
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b2732a038d3bf875d23e4aeaa84e',
    audioUrl: 'https://example.com/audio/bad-guy.mp3',
    genre: 'Pop',
  },
  {
    id: '5',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: '÷ (Divide)',
    duration: 233,
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96',
    audioUrl: 'https://example.com/audio/shape-of-you.mp3',
    genre: 'Pop',
  },
];

// Mock Albums
export const mockAlbums: Album[] = [
  {
    id: '1',
    title: 'A Night at the Opera',
    artist: 'Queen',
    releaseYear: 1975,
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273acc72a0c37378fca5ee9a35e',
    songs: [mockSongs[0]],
  },
  {
    id: '2',
    title: 'After Hours',
    artist: 'The Weeknd',
    releaseYear: 2020,
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
    songs: [mockSongs[1]],
  },
  {
    id: '3',
    title: 'Astroworld',
    artist: 'Travis Scott',
    releaseYear: 2018,
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273072e9faef2ef7b6db63834a3',
    songs: [mockSongs[2]],
  },
  {
    id: '4',
    title: 'When We All Fall Asleep, Where Do We Go?',
    artist: 'Billie Eilish',
    releaseYear: 2019,
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b2732a038d3bf875d23e4aeaa84e',
    songs: [mockSongs[3]],
  },
  {
    id: '5',
    title: '÷ (Divide)',
    artist: 'Ed Sheeran',
    releaseYear: 2017,
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96',
    songs: [mockSongs[4]],
  },
];

// Mock Artists
export const mockArtists: Artist[] = [
  {
    id: '1',
    name: 'Queen',
    imageUrl: 'https://i.scdn.co/image/af2b8e57f6d7b5d43a616bd1e27ba552cd8bfd42',
    songs: [mockSongs[0]],
    albums: [mockAlbums[0]],
  },
  {
    id: '2',
    name: 'The Weeknd',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb',
    songs: [mockSongs[1]],
    albums: [mockAlbums[1]],
  },
  {
    id: '3',
    name: 'Travis Scott',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb19c2790744c792d05570bb71',
    songs: [mockSongs[2]],
    albums: [mockAlbums[2]],
  },
  {
    id: '4',
    name: 'Billie Eilish',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb7b9a246e4a7c4e8a4356ebd7',
    songs: [mockSongs[3]],
    albums: [mockAlbums[3]],
  },
  {
    id: '5',
    name: 'Ed Sheeran',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb3bcef85e105dfc42399ef0ba',
    songs: [mockSongs[4]],
    albums: [mockAlbums[4]],
  },
];

// Mock Genres
export const mockGenres: Genre[] = [
  {
    id: '1',
    name: 'Pop',
    songs: [mockSongs[1], mockSongs[3], mockSongs[4]],
    color1: '#8C67AC',
    color2: '#4D2C87'
  },
  {
    id: '2',
    name: 'Rock',
    songs: [mockSongs[0]],
    color1: '#E9142A',
    color2: '#8B1932'
  },
  {
    id: '3',
    name: 'Hip Hop',
    songs: [mockSongs[2]],
    color1: '#FF9D00',
    color2: '#E1400B'
  },
  {
    id: '4',
    name: 'Electronic',
    songs: [],
    color1: '#7856FF',
    color2: '#1D3264'
  },
  {
    id: '5',
    name: 'Jazz',
    songs: [],
    color1: '#1DB954',
    color2: '#006450'
  }
];

// Mock Playlists
export const mockPlaylists: Playlist[] = [
  {
    id: '1',
    name: 'My Favorites',
    description: 'A collection of my favorite songs',
    coverUrl: 'https://mosaic.scdn.co/300/ab67616d0000b273072e9faef2ef7b6db63834a3ab67616d0000b2732a038d3bf875d23e4aeaa84eab67616d0000b273acc72a0c37378fca5ee9a35eab67616d0000b273ba5db46f4b838ef6027e6f96',
    songs: [mockSongs[0], mockSongs[1], mockSongs[4]],
    createdBy: 'user1',
  },
  {
    id: '2',
    name: 'Workout Mix',
    description: 'Songs to get you pumped up',
    coverUrl: 'https://i.scdn.co/image/ab67706f00000003c0d078f3a4488f3afb4d64a3',
    songs: [mockSongs[1], mockSongs[2], mockSongs[4]],
    createdBy: 'user1',
  },
  {
    id: '3',
    name: 'Chill Vibes',
    description: 'Relaxing songs for a calm mood',
    coverUrl: 'https://i.scdn.co/image/ab67706f00000003a302aa5a8a977e9faec05666',
    songs: [mockSongs[3], mockSongs[4]],
    createdBy: 'user1',
  },
  {
    id: '4',
    name: 'Top Hits',
    description: 'The most popular tracks right now',
    coverUrl: 'https://i.scdn.co/image/ab67706f000000034979d0a9bfb3bf8fecda54f6',
    songs: [mockSongs[1], mockSongs[3], mockSongs[4]],
    createdBy: 'Spotify',
  },
  {
    id: '5',
    name: 'Rock Classics',
    description: 'Rock legends & epic songs that continue to inspire generations',
    coverUrl: 'https://i.scdn.co/image/ab67706f00000003e8107e325d8f8f5aff5ba55b',
    songs: [mockSongs[0]],
    createdBy: 'Spotify',
  },
];

// Mock User
export const mockUser: UserProfile = {
  id: 'user1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  imageUrl: 'https://i.scdn.co/image/ab6775700000ee85c2589d0d26bd1bc0c5409b46',
  playlists: mockPlaylists,
  likedSongs: [mockSongs[0], mockSongs[3]],
}; 