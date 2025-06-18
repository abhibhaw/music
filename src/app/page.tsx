"use client";

import { MusicPlayerProvider } from "@/contexts/MusicPlayerContext";
import { MinimalMusicControls } from "@/components/MinimalMusicControls";
import { YouTubePlayer } from "@/components/YouTubePlayer";
import { LofiBackground } from "@/components/LofiBackground";
import { BackgroundSelector } from "@/components/BackgroundSelector";
import { PlaylistManager } from "@/components/PlaylistManager";
import { WelcomeToast } from "@/components/WelcomeToast";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

function MusicPlayerApp() {
  useKeyboardShortcuts();

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <LofiBackground />

      {/* Background Selector */}
      <BackgroundSelector />

      {/* Playlist Manager */}
      <PlaylistManager />

      {/* Hidden YouTube Player */}
      <YouTubePlayer className="hidden" />

      {/* Minimal Controls - Bottom Right Corner */}
      <MinimalMusicControls />

      {/* Welcome Toast */}
      <WelcomeToast />
    </div>
  );
}

export default function Home() {
  return (
    <MusicPlayerProvider>
      <MusicPlayerApp />
    </MusicPlayerProvider>
  );
}
