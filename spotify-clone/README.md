# Spotify 2.0 Clone

A modern Spotify clone built with React, TypeScript, and Tailwind CSS. This application provides an enhanced music streaming experience with features similar to Spotify.

## Features

- **Music Playback**: Play, pause, skip, and control volume for songs
- **Playlists**: Create, view, and manage playlists
- **Search**: Search for songs, artists, albums, and playlists
- **Library**: Browse your saved content including liked songs, albums, and playlists
- **User Profile**: View and edit your profile information
- **Genre Browsing**: Explore music by genre
- **Queue Management**: Add songs to queue and manage playback order
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- **React**: Frontend library for building user interfaces
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: For navigation and routing
- **React Icons**: Icon library

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/spotify-clone.git
cd spotify-clone
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/components`: Reusable UI components
  - `layout`: Layout components like Sidebar
  - `main`: Main content components like PlaylistCard, AlbumCard, etc.
  - `player`: Music player components
  - `sidebar`: Sidebar navigation components
- `src/context`: React context for state management
- `src/pages`: Page components for different routes
- `src/utils`: Utility functions and mock data
- `src/assets`: Static assets like images

## Features to be Added

- Authentication and user registration
- Integration with a real music API
- Mobile responsive design improvements
- Social features (sharing, following)
- Recommendations engine
- Offline mode

## License

This project is licensed under the MIT License.

## Acknowledgments

- Inspired by Spotify's user interface and functionality
- Uses mock data for demonstration purposes
