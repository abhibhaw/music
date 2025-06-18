"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { List, X, Plus, Play, Trash2, Music, ExternalLink } from "lucide-react";
import { useMusicPlayer } from "@/contexts/MusicPlayerContext";
import { Track } from "@/types/music";

export function PlaylistManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [newTrackUrl, setNewTrackUrl] = useState("");
  const [newTrackTitle, setNewTrackTitle] = useState("");
  const [isAddingTrack, setIsAddingTrack] = useState(false);

  const { playlist, removeTrack, addTrack, setCurrentTrack, playerState } =
    useMusicPlayer();

  const extractYouTubeId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/, // Direct video ID
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const handleAddTrack = () => {
    if (!newTrackUrl.trim()) return;

    const youtubeId = extractYouTubeId(newTrackUrl.trim());
    if (!youtubeId) {
      alert("Please enter a valid YouTube URL or video ID");
      return;
    }

    const newTrack: Track = {
      id: Date.now().toString(),
      title: newTrackTitle.trim() || "Untitled Track",
      youtubeId,
    };

    addTrack(newTrack);
    setNewTrackUrl("");
    setNewTrackTitle("");
    setIsAddingTrack(false);
  };

  const handlePlayTrack = (index: number) => {
    setCurrentTrack(index);
  };

  const handleRemoveTrack = (trackId: string) => {
    if (playlist && playlist.tracks.length > 1) {
      removeTrack(trackId);
    } else {
      alert("Cannot remove the last track from the playlist");
    }
  };

  if (!playlist) return null;

  return (
    <>
      {/* Toggle Button - Subtle and hidden */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-20 opacity-20 hover:opacity-100 transition-all duration-300 h-8 w-8 rounded-full bg-black/20 backdrop-blur-sm border border-white/20 hover:bg-black/40"
      >
        <List className="h-4 w-4 text-white" />
      </Button>

      {/* Playlist Manager Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <Card className="relative music-player-overlay p-6 max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Music className="h-5 w-5" />
                Playlist Manager
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="transition-smooth"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Add Track Section */}
            <div className="mb-6 p-4 border rounded-lg bg-muted/20">
              {!isAddingTrack ? (
                <Button
                  onClick={() => setIsAddingTrack(true)}
                  className="w-full"
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Track
                </Button>
              ) : (
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="YouTube URL or Video ID"
                    value={newTrackUrl}
                    onChange={(e) => setNewTrackUrl(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
                    onKeyDown={(e) => e.key === "Enter" && handleAddTrack()}
                  />
                  <input
                    type="text"
                    placeholder="Track Title (optional)"
                    value={newTrackTitle}
                    onChange={(e) => setNewTrackTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
                    onKeyDown={(e) => e.key === "Enter" && handleAddTrack()}
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleAddTrack} size="sm">
                      Add Track
                    </Button>
                    <Button
                      onClick={() => {
                        setIsAddingTrack(false);
                        setNewTrackUrl("");
                        setNewTrackTitle("");
                      }}
                      variant="outline"
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Playlist */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="space-y-2">
                {playlist.tracks.map((track, index) => (
                  <div
                    key={track.id}
                    className={`p-3 border rounded-lg transition-all hover:bg-muted/20 ${
                      index === playlist.currentTrackIndex
                        ? "border-primary bg-primary/10"
                        : "border-border"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{track.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Track {index + 1} • ID: {track.youtubeId}
                        </p>
                      </div>

                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handlePlayTrack(index)}
                          className="h-8 w-8 transition-smooth"
                          disabled={
                            index === playlist.currentTrackIndex &&
                            playerState.isPlaying
                          }
                        >
                          <Play className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            window.open(
                              `https://youtube.com/watch?v=${track.youtubeId}`,
                              "_blank"
                            )
                          }
                          className="h-8 w-8 transition-smooth"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveTrack(track.id)}
                          className="h-8 w-8 transition-smooth text-destructive hover:text-destructive"
                          disabled={playlist.tracks.length <= 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                {playlist.tracks.length} track
                {playlist.tracks.length !== 1 ? "s" : ""} in playlist
              </p>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
