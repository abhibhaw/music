"use client";

import React, { useEffect, useRef } from "react";
import YouTube from "react-youtube";
import { useMusicPlayer } from "@/contexts/MusicPlayerContext";
import {
  YouTubeEvent,
  YouTubePlayer as YouTubePlayerType,
} from "@/types/music";

interface YouTubePlayerProps {
  className?: string;
}

export function YouTubePlayer({ className }: YouTubePlayerProps) {
  const { playlist, playerState, setYoutubePlayer, nextTrack } =
    useMusicPlayer();

  const playerRef = useRef<YouTubePlayerType | null>(null);

  const currentTrack = playlist?.tracks[playlist.currentTrackIndex];

  const onReady = (event: YouTubeEvent) => {
    const player = event.target;
    setYoutubePlayer(player);
    playerRef.current = player;

    // Set initial volume
    player.setVolume(playerState.volume);

    // Hide the video player (audio only)
    const iframe = player.getIframe();
    if (iframe) {
      iframe.style.display = "none";
    }
  };

  const onStateChange = (event: YouTubeEvent) => {
    const state = event.data;

    // YouTube player states:
    // -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)

    if (state === 0) {
      // ended
      nextTrack();
    }
  };

  const onError = (event: YouTubeEvent) => {
    console.error("YouTube player error:", event);
    // Try to skip to next track on error
    setTimeout(() => {
      nextTrack();
    }, 2000);
  };

  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      enablejsapi: 1,
      fs: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      showinfo: 0,
    },
  };

  // Update volume when playerState.volume changes
  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setVolume(playerState.volume);
    }
  }, [playerState.volume]);

  if (!currentTrack) {
    return null;
  }

  return (
    <div className={className}>
      <YouTube
        videoId={currentTrack.youtubeId}
        opts={opts}
        onReady={onReady}
        onStateChange={onStateChange}
        onError={onError}
        key={currentTrack.youtubeId} // Force re-render when track changes
      />
    </div>
  );
}
