"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Palette, X } from "lucide-react";
import { useMusicPlayer } from "@/contexts/MusicPlayerContext";
import { defaultBackgrounds } from "@/data/backgrounds";
import { LofiBackground } from "@/types/music";

export function BackgroundSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentBackground, setBackground } = useMusicPlayer();

  const handleBackgroundSelect = (background: LofiBackground) => {
    setBackground(background);
    setIsOpen(false);
  };

  return (
    <>
      {/* Toggle Button - Subtle and hidden */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-20 opacity-20 hover:opacity-100 transition-all duration-300 h-8 w-8 rounded-full bg-black/20 backdrop-blur-sm border border-white/20 hover:bg-black/40"
      >
        <Palette className="h-4 w-4 text-white" />
      </Button>

      {/* Background Selector Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <Card className="relative music-player-overlay p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Choose Background</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="transition-smooth"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {defaultBackgrounds.map((background) => (
                <div
                  key={background.id}
                  className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                    currentBackground?.id === background.id
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => handleBackgroundSelect(background)}
                >
                  <div className="aspect-video relative">
                    <Image
                      src={background.thumbnail}
                      alt={background.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                      onError={(e) => {
                        // Fallback to a solid color if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                          parent.style.background =
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <span className="text-white text-sm font-medium text-center px-2">
                        {background.name}
                      </span>
                    </div>
                  </div>
                  <div className="p-2">
                    <p className="text-sm font-medium text-center truncate">
                      {background.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Backgrounds from Giphy • Click to select
              </p>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
