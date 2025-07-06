import React, { useEffect, useState, useRef } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaRandom, FaRedo, FaHeart, FaRegHeart, FaList } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { usePlayer } from '../../context/PlayerContext';
import { useUser } from '../../context/UserContext';
import { formatTime } from '../../utils/formatTime';

const Player: React.FC = () => {
  const { 
    playerState, 
    playSong, 
    pauseSong, 
    nextSong, 
    prevSong, 
    setVolume, 
    setProgress,
    addToQueue,
    removeFromQueue
  } = usePlayer();
  
  const { userState, toggleLikeSong } = useUser();
  
  const [isSeeking, setIsSeeking] = useState(false);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [showQueue, setShowQueue] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);
  
  // Helper function to render icons with proper type assertion
  const renderIcon = (Icon: IconType, className?: string) => {
    return React.createElement(Icon as React.ComponentType<{ className?: string }>, { className });
  };
  
  // Check if current song is liked
  const isCurrentSongLiked = playerState.currentSong 
    ? userState.user?.likedSongs.some(song => song.id === playerState.currentSong?.id)
    : false;
  
  // Update progress every second when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (playerState.isPlaying && !isSeeking) {
      interval = setInterval(() => {
        const newProgress = Math.min(playerState.progress + 1, playerState.duration);
        setProgress(newProgress);
        
        // Update progress bar width
        if (progressBarRef.current) {
          progressBarRef.current.style.setProperty('--progress', `${(newProgress / playerState.duration) * 100}%`);
        }
        
        if (newProgress >= playerState.duration) {
          if (repeatMode === 'one') {
            // Repeat the current song
            if (playerState.currentSong) {
              playSong(playerState.currentSong);
            }
          } else {
            nextSong();
            
            // If repeat all is on and we've reached the end of the queue
            if (repeatMode === 'all' && playerState.queue.length === 0) {
              // Logic for repeating all would go here
              // In a real app, we would need to keep track of the original playlist
            }
          }
        }
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [playerState.isPlaying, playerState.progress, playerState.duration, isSeeking, nextSong, setProgress, repeatMode, playSong, playerState.currentSong, playerState.queue.length]);
  
  // Update progress bar on initial render and when progress changes
  useEffect(() => {
    if (progressBarRef.current && playerState.duration) {
      progressBarRef.current.style.setProperty('--progress', `${(playerState.progress / playerState.duration) * 100}%`);
    }
  }, [playerState.progress, playerState.duration]);
  
  const handlePlayPause = () => {
    if (playerState.isPlaying) {
      pauseSong();
    } else if (playerState.currentSong) {
      playSong(playerState.currentSong);
    }
  };
  
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    
    if (progressBarRef.current) {
      progressBarRef.current.style.setProperty('--progress', `${(newProgress / playerState.duration) * 100}%`);
    }
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };
  
  const handleToggleShuffle = () => {
    setIsShuffleOn(!isShuffleOn);
    // In a real app, we would need to shuffle the queue here
  };
  
  const handleToggleRepeat = () => {
    if (repeatMode === 'off') setRepeatMode('all');
    else if (repeatMode === 'all') setRepeatMode('one');
    else setRepeatMode('off');
  };
  
  const handleToggleLike = () => {
    if (playerState.currentSong) {
      toggleLikeSong(playerState.currentSong);
    }
  };
  
  const handleToggleQueue = () => {
    setShowQueue(!showQueue);
  };
  
  const handleRemoveFromQueue = (songId: string) => {
    removeFromQueue(songId);
  };
  
  // If no song is playing, show a minimal player
  if (!playerState.currentSong) {
    return (
      <div className="h-20 bg-spotify-dark-gray border-t border-gray-800 px-4 flex items-center justify-center text-spotify-gray">
        <p>No song is currently playing</p>
      </div>
    );
  }
  
  return (
    <div className="h-20 bg-spotify-dark-gray border-t border-gray-800 px-4 flex items-center relative glassmorphism">
      {/* Song Info */}
      <div className="flex items-center w-1/4">
        <img 
          src={playerState.currentSong.coverUrl} 
          alt={playerState.currentSong.title} 
          className="h-14 w-14 object-cover mr-3 rounded shadow-md"
        />
        <div className="flex flex-col">
          <p className="text-white text-sm font-medium">{playerState.currentSong.title}</p>
          <p className="text-spotify-gray text-xs">{playerState.currentSong.artist}</p>
        </div>
        <button 
          className="ml-4 focus:outline-none tooltip button-hover"
          onClick={handleToggleLike}
          data-tooltip={isCurrentSongLiked ? "Remove from Liked Songs" : "Save to Liked Songs"}
        >
          {isCurrentSongLiked 
            ? renderIcon(FaHeart, "text-spotify-green")
            : renderIcon(FaRegHeart, "text-spotify-gray hover:text-white")
          }
        </button>
      </div>
      
      {/* Player Controls */}
      <div className="flex flex-col items-center justify-center w-2/4">
        <div className="flex items-center space-x-4 mb-2">
          <button 
            className={`text-spotify-gray hover:text-white focus:outline-none tooltip button-hover ${isShuffleOn ? 'text-spotify-green' : ''}`}
            onClick={handleToggleShuffle}
            data-tooltip="Enable shuffle"
          >
            {renderIcon(FaRandom)}
          </button>
          <button 
            className="text-spotify-gray hover:text-white focus:outline-none button-hover tooltip"
            onClick={prevSong}
            data-tooltip="Previous"
          >
            {renderIcon(FaStepBackward)}
          </button>
          <button 
            className="bg-white rounded-full w-8 h-8 flex items-center justify-center hover:scale-105 transition focus:outline-none button-hover"
            onClick={handlePlayPause}
          >
            {playerState.isPlaying 
              ? renderIcon(FaPause)
              : renderIcon(FaPlay, "ml-1")
            }
          </button>
          <button 
            className="text-spotify-gray hover:text-white focus:outline-none button-hover tooltip"
            onClick={nextSong}
            data-tooltip="Next"
          >
            {renderIcon(FaStepForward)}
          </button>
          <button 
            className={`text-spotify-gray hover:text-white focus:outline-none button-hover tooltip ${
              repeatMode === 'all' ? 'text-spotify-green' : 
              repeatMode === 'one' ? 'text-spotify-green' : ''
            }`}
            onClick={handleToggleRepeat}
            data-tooltip={
              repeatMode === 'off' ? "Enable repeat" :
              repeatMode === 'all' ? "Enable repeat one" :
              "Disable repeat"
            }
          >
            {repeatMode === 'one' 
              ? <span className="relative">
                  {renderIcon(FaRedo)}
                  <span className="absolute top-0 right-0 text-xs">1</span>
                </span>
              : renderIcon(FaRedo)
            }
          </button>
        </div>
        
        <div className="flex items-center w-full space-x-2">
          <span className="text-xs text-spotify-gray">
            {formatTime(playerState.progress)}
          </span>
          <div className="relative w-full h-1" ref={progressBarRef}>
            <input
              type="range"
              min="0"
              max={playerState.duration}
              value={playerState.progress}
              onChange={handleProgressChange}
              onMouseDown={() => setIsSeeking(true)}
              onMouseUp={() => setIsSeeking(false)}
              className="w-full h-1 absolute z-10 opacity-0 cursor-pointer"
            />
            <div className="progress-bar w-full absolute top-0 left-0"></div>
          </div>
          <span className="text-xs text-spotify-gray">
            {formatTime(playerState.duration)}
          </span>
        </div>
      </div>
      
      {/* Volume Control and Queue */}
      <div className="flex items-center justify-end w-1/4">
        <button 
          className={`mr-4 focus:outline-none button-hover tooltip ${showQueue ? 'text-spotify-green' : 'text-spotify-gray hover:text-white'}`}
          onClick={handleToggleQueue}
          data-tooltip="Queue"
        >
          {renderIcon(FaList)}
        </button>
        <div className="volume-control flex items-center">
          {renderIcon(FaVolumeUp, "text-spotify-gray mr-2")}
          <div className="volume-slider">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={playerState.volume}
              onChange={handleVolumeChange}
              className="w-24 h-1"
            />
          </div>
        </div>
      </div>
      
      {/* Queue Panel */}
      {showQueue && (
        <div className="absolute bottom-20 right-0 w-80 bg-spotify-dark-gray rounded-t-lg shadow-lg overflow-hidden glassmorphism animate-slide-up">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-white font-bold">Queue</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {playerState.queue.length === 0 ? (
              <div className="p-4 text-center text-spotify-gray">
                <p>Your queue is empty</p>
              </div>
            ) : (
              <div>
                {playerState.queue.map((song, index) => (
                  <div 
                    key={`${song.id}-${index}`}
                    className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-md m-1 card-hover"
                  >
                    <div className="flex items-center">
                      <img 
                        src={song.coverUrl} 
                        alt={song.title} 
                        className="h-10 w-10 object-cover mr-3 rounded"
                      />
                      <div>
                        <p className="text-white text-sm">{song.title}</p>
                        <p className="text-spotify-gray text-xs">{song.artist}</p>
                      </div>
                    </div>
                    <button 
                      className="text-spotify-gray hover:text-white focus:outline-none button-hover"
                      onClick={() => handleRemoveFromQueue(song.id)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Player; 