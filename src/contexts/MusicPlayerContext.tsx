"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  Track,
  Playlist,
  PlayerState,
  LofiBackground,
  MusicPlayerContextType,
  YouTubePlayer,
} from "@/types/music";

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(
  undefined
);

const defaultPlayerState: PlayerState = {
  isPlaying: false,
  volume: 50,
  currentTime: 0,
  duration: 0,
  isLoading: false,
};

const defaultPlaylist: Playlist = {
  id: "default",
  name: "Lofi Playlist",
  tracks: [
    {
      id: "1",
      title: "Relaxing Guitar for Stress Relief, work and study - 1",
      youtubeId: "f-i_nJLG2Is",
    },
    {
      id: "2",
      title: "Relaxing Guitar for Stress Relief, work and study - 2",
      youtubeId: "7rd3na9pG74",
    },
    {
      id: "3",
      title: "Piano Lofi Hip Hop Mix",
      youtubeId: "wQClbqLKZ4c",
    },
  ],
  currentTrackIndex: 0,
};

export function MusicPlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [playlist, setPlaylistState] = useState<Playlist>(defaultPlaylist);
  const [playerState, setPlayerState] =
    useState<PlayerState>(defaultPlayerState);
  const [currentBackground, setCurrentBackground] =
    useState<LofiBackground | null>(null);
  const [youtubePlayer, setYoutubePlayer] = useState<YouTubePlayer | null>(
    null
  );

  // Load saved state from localStorage
  useEffect(() => {
    const savedPlaylist = localStorage.getItem("lofi-playlist");
    const savedPlayerState = localStorage.getItem("lofi-player-state");
    const savedBackground = localStorage.getItem("lofi-background");

    if (savedPlaylist) {
      try {
        setPlaylistState(JSON.parse(savedPlaylist));
      } catch (e) {
        console.error("Failed to load saved playlist:", e);
      }
    }

    if (savedPlayerState) {
      try {
        const parsed = JSON.parse(savedPlayerState);
        setPlayerState((prev) => ({ ...prev, volume: parsed.volume || 50 }));
      } catch (e) {
        console.error("Failed to load saved player state:", e);
      }
    }

    if (savedBackground) {
      try {
        setCurrentBackground(JSON.parse(savedBackground));
      } catch (e) {
        console.error("Failed to load saved background:", e);
      }
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem("lofi-playlist", JSON.stringify(playlist));
  }, [playlist]);

  useEffect(() => {
    localStorage.setItem(
      "lofi-player-state",
      JSON.stringify({ volume: playerState.volume })
    );
  }, [playerState.volume]);

  useEffect(() => {
    if (currentBackground) {
      localStorage.setItem(
        "lofi-background",
        JSON.stringify(currentBackground)
      );
    }
  }, [currentBackground]);

  const play = useCallback(() => {
    if (youtubePlayer) {
      youtubePlayer.playVideo();
      setPlayerState((prev) => ({ ...prev, isPlaying: true }));
    }
  }, [youtubePlayer]);

  const pause = useCallback(() => {
    if (youtubePlayer) {
      youtubePlayer.pauseVideo();
      setPlayerState((prev) => ({ ...prev, isPlaying: false }));
    }
  }, [youtubePlayer]);

  const togglePlay = useCallback(() => {
    if (playerState.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [playerState.isPlaying, play, pause]);

  const nextTrack = useCallback(() => {
    const nextIndex = (playlist.currentTrackIndex + 1) % playlist.tracks.length;
    setPlaylistState((prev) => ({ ...prev, currentTrackIndex: nextIndex }));
  }, [playlist.currentTrackIndex, playlist.tracks.length]);

  const previousTrack = useCallback(() => {
    const prevIndex =
      playlist.currentTrackIndex === 0
        ? playlist.tracks.length - 1
        : playlist.currentTrackIndex - 1;
    setPlaylistState((prev) => ({ ...prev, currentTrackIndex: prevIndex }));
  }, [playlist.currentTrackIndex, playlist.tracks.length]);

  const setVolume = useCallback(
    (volume: number) => {
      if (youtubePlayer) {
        youtubePlayer.setVolume(volume);
      }
      setPlayerState((prev) => ({ ...prev, volume }));
    },
    [youtubePlayer]
  );

  const seekTo = useCallback(
    (time: number) => {
      if (youtubePlayer) {
        youtubePlayer.seekTo(time);
      }
    },
    [youtubePlayer]
  );

  const setPlaylist = useCallback((newPlaylist: Playlist) => {
    setPlaylistState(newPlaylist);
  }, []);

  const addTrack = useCallback((track: Track) => {
    setPlaylistState((prev) => ({
      ...prev,
      tracks: [...prev.tracks, track],
    }));
  }, []);

  const removeTrack = useCallback((trackId: string) => {
    setPlaylistState((prev) => {
      const newTracks = prev.tracks.filter((track) => track.id !== trackId);
      const removedIndex = prev.tracks.findIndex(
        (track) => track.id === trackId
      );
      let newCurrentIndex = prev.currentTrackIndex;

      if (removedIndex <= prev.currentTrackIndex && newCurrentIndex > 0) {
        newCurrentIndex--;
      }

      return {
        ...prev,
        tracks: newTracks,
        currentTrackIndex: Math.min(newCurrentIndex, newTracks.length - 1),
      };
    });
  }, []);

  const setCurrentTrack = useCallback((index: number) => {
    setPlaylistState((prev) => ({ ...prev, currentTrackIndex: index }));
  }, []);

  const setBackground = useCallback((background: LofiBackground) => {
    setCurrentBackground(background);
  }, []);

  const value: MusicPlayerContextType = {
    playlist,
    playerState,
    currentBackground,
    play,
    pause,
    togglePlay,
    nextTrack,
    previousTrack,
    setVolume,
    seekTo,
    setPlaylist,
    addTrack,
    removeTrack,
    setCurrentTrack,
    setBackground,
    youtubePlayer,
    setYoutubePlayer,
  };

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const context = useContext(MusicPlayerContext);
  if (context === undefined) {
    throw new Error("useMusicPlayer must be used within a MusicPlayerProvider");
  }
  return context;
}
