import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { songs, playlists } from "@/data/songs";

function usePlayer() {
  const [player, setPlayer] = useState(null);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [songList, setSongList] = useState(songs);

  const onReady = useCallback(
    (event) => {
      setPlayer(event.target);
      event.target.loadVideoById({ videoId: songList[index].videoID });
    },
    [index, songList]
  );

  const next = useCallback(() => {
    const i = (index + 1) % songList.length;
    setIndex(i);
    player.loadVideoById({ videoId: songList[i].videoID });
  }, [index, player, songList]);

  const previous = useCallback(() => {
    const i = (index - 1 + songList.length) % songList.length;
    setIndex(i);
    player.loadVideoById({ videoId: songList[i].videoID });
  }, [index, player, songList]);

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

  useEffect(() => {
    playlists.forEach((playlist) => {
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlist.playlistID}&maxResults=50&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
        )
        .then((res) => {
          const items = res.data.items;
          const newSongs = items.map((item) => ({
            title: item.snippet.title,
            videoID: item.snippet.resourceId.videoId,
          }));
          setSongList((prev) => [...prev, ...newSongs]);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []);

  return {
    player,
    onReady,
    onStateChange,
    currentSong: songList[index],
    states: { buffering, isPlaying },
    controls: {
      next,
      previous,
      playPause,
    },
  };
}

export default usePlayer;
