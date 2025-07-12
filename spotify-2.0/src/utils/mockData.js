// Mock data for the Spotify clone
export const mockSongs = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 200,
    cover: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    genre: 'Pop',
    year: 2020,
  },
  {
    id: '2',
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    album: 'Fine Line',
    duration: 174,
    cover: 'https://i.scdn.co/image/ab67616d0000b273adea4a49c5c9c7e1f8e82b9b',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    genre: 'Pop',
    year: 2020,
  },
  {
    id: '3',
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    duration: 203,
    cover: 'https://i.scdn.co/image/ab67616d0000b273c9b6e54b4b3e0c3c7e8c7a2a',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    genre: 'Pop',
    year: 2020,
  },
  {
    id: '4',
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    album: 'SOUR',
    duration: 178,
    cover: 'https://i.scdn.co/image/ab67616d0000b273a91c10fe9472d9bd89802e5a',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    genre: 'Pop',
    year: 2021,
  },
  {
    id: '5',
    title: 'Stay',
    artist: 'The Kid LAROI & Justin Bieber',
    album: 'Stay',
    duration: 141,
    cover: 'https://i.scdn.co/image/ab67616d0000b273e2e352d89e7711f02e8b981f',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    genre: 'Pop',
    year: 2021,
  },
  {
    id: '6',
    title: 'Industry Baby',
    artist: 'Lil Nas X & Jack Harlow',
    album: 'MONTERO',
    duration: 212,
    cover: 'https://i.scdn.co/image/ab67616d0000b273c4fee55d7b6e6a5a6b5b0b5b',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    genre: 'Hip-Hop',
    year: 2021,
  },
  {
    id: '7',
    title: 'Heat Waves',
    artist: 'Glass Animals',
    album: 'Dreamland',
    duration: 238,
    cover: 'https://i.scdn.co/image/ab67616d0000b2737a4781629469bb83356cd318',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    genre: 'Alternative',
    year: 2020,
  },
  {
    id: '8',
    title: 'Shivers',
    artist: 'Ed Sheeran',
    album: '=',
    duration: 207,
    cover: 'https://i.scdn.co/image/ab67616d0000b273e2e352d89e7711f02e8b981f',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    genre: 'Pop',
    year: 2021,
  },
];

export const mockGenres = [
  { id: 'all', name: 'All' },
  { id: 'pop', name: 'Pop' },
  { id: 'hip-hop', name: 'Hip-Hop' },
  { id: 'rock', name: 'Rock' },
  { id: 'electronic', name: 'Electronic' },
  { id: 'jazz', name: 'Jazz' },
  { id: 'classical', name: 'Classical' },
  { id: 'country', name: 'Country' },
  { id: 'r&b', name: 'R&B' },
  { id: 'alternative', name: 'Alternative' },
];

export const mockAlbums = [
  {
    id: '1',
    title: 'After Hours',
    artist: 'The Weeknd',
    cover: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
    year: 2020,
    genre: 'Pop',
    songs: ['1'],
  },
  {
    id: '2',
    title: 'Fine Line',
    artist: 'Harry Styles',
    cover: 'https://i.scdn.co/image/ab67616d0000b273adea4a49c5c9c7e1f8e82b9b',
    year: 2020,
    genre: 'Pop',
    songs: ['2'],
  },
  {
    id: '3',
    title: 'Future Nostalgia',
    artist: 'Dua Lipa',
    cover: 'https://i.scdn.co/image/ab67616d0000b273c9b6e54b4b3e0c3c7e8c7a2a',
    year: 2020,
    genre: 'Pop',
    songs: ['3'],
  },
];

export const mockArtists = [
  {
    id: '1',
    name: 'The Weeknd',
    image: 'https://i.scdn.co/image/ab6761610000e5ebb0b0d0c0a0b0c0a0b0c0a0b0',
    followers: 89123456,
    genre: 'Pop',
    verified: true,
  },
  {
    id: '2',
    name: 'Harry Styles',
    image: 'https://i.scdn.co/image/ab6761610000e5ebb0b0d0c0a0b0c0a0b0c0a0b0',
    followers: 67890123,
    genre: 'Pop',
    verified: true,
  },
  {
    id: '3',
    name: 'Dua Lipa',
    image: 'https://i.scdn.co/image/ab6761610000e5ebb0b0d0c0a0b0c0a0b0c0a0b0',
    followers: 56789012,
    genre: 'Pop',
    verified: true,
  },
];

export const mockPlaylists = [
  {
    id: '1',
    name: 'Today\'s Top Hits',
    description: 'The most played songs right now',
    cover: 'https://i.scdn.co/image/ab67706f000000025551996f500ba876bda73fa5',
    songs: ['1', '2', '3', '4', '5'],
    followers: 29000000,
    isPublic: true,
  },
  {
    id: '2',
    name: 'RapCaviar',
    description: 'The sound of hip-hop',
    cover: 'https://i.scdn.co/image/ab67706f000000025551996f500ba876bda73fa5',
    songs: ['6'],
    followers: 14000000,
    isPublic: true,
  },
  {
    id: '3',
    name: 'Pop Rising',
    description: 'The next generation of pop superstars',
    cover: 'https://i.scdn.co/image/ab67706f000000025551996f500ba876bda73fa5',
    songs: ['7', '8'],
    followers: 8000000,
    isPublic: true,
  },
];

export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
