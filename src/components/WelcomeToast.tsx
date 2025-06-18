'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Music, Palette, List } from 'lucide-react';

export function WelcomeToast() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show welcome toast after a brief delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    // Auto-hide after 8 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 9000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      <div className="bg-black/80 backdrop-blur-md rounded-lg border border-white/20 p-6 max-w-md text-white">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Music className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Welcome to Lofi Player</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsVisible(false)}
            className="h-6 w-6 rounded-full hover:bg-white/20 transition-all"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>

        <div className="space-y-3 text-sm text-white/80">
          <p>Your minimalist music player for work background.</p>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                <Music className="h-3 w-3" />
              </div>
              <span>Hover bottom-right for controls</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                <List className="h-3 w-3" />
              </div>
              <span>Top-left for playlist</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                <Palette className="h-3 w-3" />
              </div>
              <span>Top-right for backgrounds</span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/20">
            <p className="text-xs">
              <strong>Keyboard shortcuts:</strong> Space (play/pause), ↑/↓ (volume), Shift+←/→ (tracks)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
