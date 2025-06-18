export interface Track {
  id: string;
  title: string;
  youtubeId: string;
  duration?: number;
  thumbnail?: string;
}

export interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
  currentTrackIndex: number;
}

export interface PlayerState {
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  isLoading: boolean;
  error?: string;
}

export interface LofiBackground {
  id: string;
  name: string;
  gifUrl: string;
  thumbnail: string;
}

// YouTube Player interface
export interface YouTubePlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  setVolume: (volume: number) => void;
  seekTo: (seconds: number) => void;
  getIframe: () => HTMLIFrameElement | null;
}

// YouTube event interfaces
export interface YouTubeEvent {
  target: YouTubePlayer;
  data?: number;
}

export interface MusicPlayerContextType {
  playlist: Playlist | null;
  playerState: PlayerState;
  currentBackground: LofiBackground | null;

  // Player controls
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setVolume: (volume: number) => void;
  seekTo: (time: number) => void;

  // Playlist management
  setPlaylist: (playlist: Playlist) => void;
  addTrack: (track: Track) => void;
  removeTrack: (trackId: string) => void;
  setCurrentTrack: (index: number) => void;

  // Background management
  setBackground: (background: LofiBackground) => void;

  // YouTube player instance
  youtubePlayer: YouTubePlayer | null;
  setYoutubePlayer: (player: YouTubePlayer) => void;
}
