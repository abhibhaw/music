"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useMusicPlayer } from "@/contexts/MusicPlayerContext";
import { defaultBackgrounds } from "@/data/backgrounds";

export function LofiBackground() {
  const { currentBackground, setBackground } = useMusicPlayer();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Set default background if none is selected
  useEffect(() => {
    if (!currentBackground) {
      setBackground(defaultBackgrounds[0]);
    }
  }, [currentBackground, setBackground]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  if (!currentBackground) {
    return (
      <div className="lofi-background bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100 dark:from-orange-900/20 dark:via-pink-900/20 dark:to-purple-900/20" />
    );
  }

  return (
    <>
      {/* Main background image */}
      {!imageError && (
        <Image
          src={currentBackground.gifUrl}
          alt={currentBackground.name}
          fill
          className={`lofi-background transition-opacity duration-1000 object-cover ${
            imageLoaded ? "opacity-60" : "opacity-0"
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          unoptimized // For GIFs
          priority
        />
      )}

      {/* Fallback gradient background */}
      {(imageError || !imageLoaded) && (
        <div
          className="lofi-background bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100 dark:from-orange-900/20 dark:via-pink-900/20 dark:to-purple-900/20"
          style={{
            opacity: imageError ? 0.6 : 0.3,
          }}
        />
      )}

      {/* Overlay for better text readability */}
      <div className="fixed inset-0 bg-black/10 dark:bg-black/20 pointer-events-none z-0" />
    </>
  );
}
