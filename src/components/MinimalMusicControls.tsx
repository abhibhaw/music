'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX,
  Music,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { useMusicPlayer } from '@/contexts/MusicPlayerContext';

export function MinimalMusicControls() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showOnHover, setShowOnHover] = useState(false);

  const {
    playlist,
    playerState,
    togglePlay,
    nextTrack,
    previousTrack,
    setVolume,
  } = useMusicPlayer();

  const currentTrack = playlist?.tracks[playlist.currentTrackIndex];
  const isMuted = playerState.volume === 0;

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(50);
    } else {
      setVolume(0);
    }
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <div 
      className="fixed bottom-4 right-4 z-20"
      onMouseEnter={() => setShowOnHover(true)}
      onMouseLeave={() => setShowOnHover(false)}
    >
      {/* Minimal collapsed state - just a small play button */}
      {!isExpanded && (
        <div className={`transition-all duration-300 ${showOnHover ? 'opacity-100 scale-110' : 'opacity-30 scale-100'}`}>
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlay}
            className={`h-10 w-10 rounded-full bg-black/20 backdrop-blur-sm border border-white/20 hover:bg-black/40 transition-all ${
              playerState.isPlaying ? 'animate-pulse' : ''
            }`}
          >
            {playerState.isPlaying ? (
              <Pause className="h-4 w-4 text-white" />
            ) : (
              <Play className="h-4 w-4 text-white ml-0.5" />
            )}
          </Button>
          
          {/* Expand button - only visible on hover */}
          {showOnHover && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(true)}
              className="h-6 w-6 rounded-full bg-black/20 backdrop-blur-sm border border-white/20 hover:bg-black/40 transition-all mt-1"
            >
              <ChevronUp className="h-3 w-3 text-white" />
            </Button>
          )}
        </div>
      )}

      {/* Expanded state - full controls */}
      {isExpanded && (
        <div className="bg-black/20 backdrop-blur-md rounded-lg border border-white/20 p-4 min-w-[280px] animate-in slide-in-from-bottom-2 fade-in-0 duration-300">
          {/* Collapse button */}
          <div className="flex justify-end mb-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(false)}
              className="h-6 w-6 rounded-full hover:bg-white/20 transition-all"
            >
              <ChevronDown className="h-3 w-3 text-white" />
            </Button>
          </div>

          {/* Current Track Info */}
          <div className="text-center space-y-2 mb-4">
            <div className="flex items-center justify-center gap-2 text-white/70">
              <Music className={`h-3 w-3 ${playerState.isPlaying ? "animate-bounce" : ""}`} />
              <span className="text-xs">Now Playing</span>
            </div>
            <h3 className="font-medium text-white text-sm line-clamp-2 leading-tight">
              {currentTrack.title}
            </h3>
            <p className="text-xs text-white/60">
              Track {playlist.currentTrackIndex + 1} of {playlist.tracks.length}
            </p>
          </div>

          {/* Main Controls */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={previousTrack}
              className="h-8 w-8 rounded-full hover:bg-white/20 transition-all"
            >
              <SkipBack className="h-4 w-4 text-white" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className={`h-10 w-10 rounded-full hover:bg-white/20 transition-all ${
                playerState.isPlaying ? "animate-pulse" : ""
              }`}
              disabled={playerState.isLoading}
            >
              {playerState.isPlaying ? (
                <Pause className="h-5 w-5 text-white" />
              ) : (
                <Play className="h-5 w-5 text-white ml-0.5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={nextTrack}
              className="h-8 w-8 rounded-full hover:bg-white/20 transition-all"
            >
              <SkipForward className="h-4 w-4 text-white" />
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="h-6 w-6 rounded-full hover:bg-white/20 transition-all"
            >
              {isMuted ? (
                <VolumeX className="h-3 w-3 text-white" />
              ) : (
                <Volume2 className="h-3 w-3 text-white" />
              )}
            </Button>
            
            <div className="flex-1">
              <Slider
                value={[playerState.volume]}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="transition-smooth"
              />
            </div>
            
            <span className="text-xs text-white/60 w-8 text-right">
              {Math.round(playerState.volume)}%
            </span>
          </div>

          {/* Loading State */}
          {playerState.isLoading && (
            <div className="text-center mt-2">
              <div className="inline-flex items-center gap-2 text-xs text-white/70">
                <div className="animate-spin rounded-full h-3 w-3 border border-white/50 border-t-transparent"></div>
                Loading...
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
