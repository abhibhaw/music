import songs from "@/data/songs";
import { useState, useCallback } from "react";

function usePlayer() {
  const [player, setPlayer] = useState(null);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [buffering, setBuffering] = useState(false);

  const onReady = useCallback(
    (event) => {
      setPlayer(event.target);
      event.target.loadVideoById({ videoId: songs[index].videoID });
    },
    [index]
  );

  const next = useCallback(() => {
    const i = (index + 1) % songs.length;
    setIndex(i);
    player.loadVideoById({ videoId: songs[i].videoID });
  }, [index, player]);

  const previous = useCallback(() => {
    const i = (index - 1 + songs.length) % songs.length;
    setIndex(i);
    player.loadVideoById({ videoId: songs[i].videoID });
  }, [index, player]);

  const playPause = useCallback(() => {
    isPlaying ? player.pauseVideo() : player.playVideo();
  }, [isPlaying, player]);

  const onStateChange = useCallback(
    (event) => {
      switch (event.data) {
        case -1: // Unstarted
          setIsPlaying(false);
          setBuffering(false);
          break;
        case 0: // Ended
          next();
          setBuffering(false);
          break;
        case 1: // Playing
          setIsPlaying(true);
          setBuffering(false);
          break;
        case 3: // Buffering
          setBuffering(true);
          setIsPlaying(false);
          break;
        default:
          setBuffering(false);
          setIsPlaying(false);
      }
    },
    [next]
  );

  return {
    player,
    onReady,
    onStateChange,
    index,
    states: { buffering, isPlaying },
    controls: {
      next,
      previous,
      playPause,
    },
  };
}

export default usePlayer;
