"use client";

import { useEffect } from "react";
import { useMusicPlayer } from "@/contexts/MusicPlayerContext";

export function useKeyboardShortcuts() {
  const { togglePlay, nextTrack, previousTrack, setVolume, playerState } =
    useMusicPlayer();

  // Show temporary feedback for keyboard actions
  const showFeedback = (message: string) => {
    // Create a temporary toast-like notification
    const feedback = document.createElement("div");
    feedback.textContent = message;
    feedback.className =
      "fixed top-20 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg text-sm z-50 transition-all duration-300";
    document.body.appendChild(feedback);

    setTimeout(() => {
      feedback.style.opacity = "0";
      setTimeout(() => {
        document.body.removeChild(feedback);
      }, 300);
    }, 1500);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.contentEditable === "true"
      ) {
        return;
      }

      switch (event.code) {
        case "Space":
          event.preventDefault();
          togglePlay();
          showFeedback(playerState.isPlaying ? "Paused" : "Playing");
          break;

        case "ArrowRight":
          if (event.shiftKey) {
            event.preventDefault();
            nextTrack();
          }
          break;

        case "ArrowLeft":
          if (event.shiftKey) {
            event.preventDefault();
            previousTrack();
          }
          break;

        case "ArrowUp":
          event.preventDefault();
          const newVolumeUp = Math.min(100, playerState.volume + 5);
          setVolume(newVolumeUp);
          break;

        case "ArrowDown":
          event.preventDefault();
          const newVolumeDown = Math.max(0, playerState.volume - 5);
          setVolume(newVolumeDown);
          break;

        case "KeyM":
          event.preventDefault();
          setVolume(playerState.volume === 0 ? 50 : 0);
          break;

        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    togglePlay,
    nextTrack,
    previousTrack,
    setVolume,
    playerState.volume,
    playerState.isPlaying,
  ]);
}
