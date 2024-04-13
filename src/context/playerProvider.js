"use client";
import usePlayer from "@/hooks/yt";
import { PlayerContext } from "./playerContext";

function PlayerProvider({ children }) {
  const playerHook = usePlayer();

  return (
    <PlayerContext.Provider value={playerHook}>
      {children}
    </PlayerContext.Provider>
  );
}

export default PlayerProvider;
