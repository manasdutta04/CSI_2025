import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  PlayIcon,
  PauseIcon,
  BackwardIcon,
  ForwardIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ArrowPathIcon,
  ArrowsRightLeftIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import {
  setIsPlaying,
  setCurrentTime,
  setDuration,
  setVolume,
  playNext,
  playPrevious,
  toggleShuffle,
  setRepeat,
} from '../redux/playerSlice';
import { formatTime } from '../utils/mockData';

const Player = () => {
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(0.5);

  const {
    currentSong,
    isPlaying,
    volume,
    currentTime,
    duration,
    shuffle,
    repeat,
  } = useSelector((state) => state.player);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      dispatch(setCurrentTime(audio.currentTime));
    };

    const handleDurationChange = () => {
      dispatch(setDuration(audio.duration));
    };

    const handleEnded = () => {
      if (repeat === 'one') {
        audio.currentTime = 0;
        audio.play();
      } else {
        dispatch(playNext());
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [dispatch, repeat]);

  // Play/Pause control
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong]);

  // Volume control
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    dispatch(setIsPlaying(!isPlaying));
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = (e.target.value / 100) * duration;
      audio.currentTime = newTime;
      dispatch(setCurrentTime(newTime));
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    dispatch(setVolume(newVolume));
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      dispatch(setVolume(previousVolume));
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      dispatch(setVolume(0));
      setIsMuted(true);
    }
  };

  const handleShuffle = () => {
    dispatch(toggleShuffle());
  };

  const handleRepeat = () => {
    const modes = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(repeat);
    const nextIndex = (currentIndex + 1) % modes.length;
    dispatch(setRepeat(modes[nextIndex]));
  };

  const handlePrevious = () => {
    dispatch(playPrevious());
  };

  const handleNext = () => {
    dispatch(playNext());
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  if (!currentSong) return null;

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-spotify-gray border-t border-spotify-light-gray px-4 py-3">
      <audio
        ref={audioRef}
        src={currentSong.audio}
        preload="metadata"
      />
      
      <div className="flex items-center justify-between">
        {/* Song Info */}
        <div className="flex items-center space-x-3 min-w-0 w-1/4">
          <img
            src={currentSong.cover}
            alt={currentSong.title}
            className="w-14 h-14 rounded object-cover"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-medium text-spotify-white truncate">
              {currentSong.title}
            </h4>
            <p className="text-xs text-spotify-light-gray truncate">
              {currentSong.artist}
            </p>
          </div>
          <button
            onClick={toggleLike}
            className="text-spotify-light-gray hover:text-spotify-white transition-colors"
          >
            {isLiked ? (
              <HeartIconSolid className="w-5 h-5 text-spotify-green" />
            ) : (
              <HeartIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 w-1/2 max-w-md">
          {/* Control Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleShuffle}
              className={`text-spotify-light-gray hover:text-spotify-white transition-colors ${
                shuffle ? 'text-spotify-green' : ''
              }`}
            >
              <ArrowsRightLeftIcon className="w-5 h-5" />
            </button>
            
            <button
              onClick={handlePrevious}
              className="text-spotify-light-gray hover:text-spotify-white transition-colors"
            >
              <BackwardIcon className="w-5 h-5" />
            </button>
            
            <button
              onClick={togglePlay}
              className="bg-spotify-white text-spotify-black rounded-full p-2 hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <PauseIcon className="w-5 h-5" />
              ) : (
                <PlayIcon className="w-5 h-5 ml-0.5" />
              )}
            </button>
            
            <button
              onClick={handleNext}
              className="text-spotify-light-gray hover:text-spotify-white transition-colors"
            >
              <ForwardIcon className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleRepeat}
              className={`text-spotify-light-gray hover:text-spotify-white transition-colors ${
                repeat !== 'off' ? 'text-spotify-green' : ''
              }`}
            >
              <ArrowPathIcon className="w-5 h-5" />
              {repeat === 'one' && (
                <span className="absolute -mt-1 -ml-1 text-xs">1</span>
              )}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-full">
            <span className="text-xs text-spotify-light-gray">
              {formatTime(currentTime)}
            </span>
            <div className="flex-1 relative">
              <input
                type="range"
                min="0"
                max="100"
                value={progressPercentage}
                onChange={handleProgressChange}
                className="w-full h-1 bg-spotify-light-gray rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            <span className="text-xs text-spotify-light-gray">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2 w-1/4 justify-end">
          <button
            onClick={toggleMute}
            className="text-spotify-light-gray hover:text-spotify-white transition-colors"
          >
            {isMuted || volume === 0 ? (
              <SpeakerXMarkIcon className="w-5 h-5" />
            ) : (
              <SpeakerWaveIcon className="w-5 h-5" />
            )}
          </button>
          <div className="w-24">
            <input
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              onChange={handleVolumeChange}
              className="w-full h-1 bg-spotify-light-gray rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
