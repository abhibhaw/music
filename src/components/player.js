"use client";

import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { PlayerContext } from "@/context/playerContext";
import songs from "@/data/songs";

const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export default function MediaCard() {
  const { controls, index, states } = useContext(PlayerContext);
  const [songInfo, setSongInfo] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${songs[index].videoID}&key=${apiKey}`
      )
      .then((res) => {
        if (res.data.items.length) {
          setSongInfo(res.data.items[0].snippet);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [index]);

  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {states.buffering ? "Buffering..." : songInfo?.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {states.isPlaying ? "Playing" : "Paused"}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton aria-label="previous" onClick={controls.previous}>
            {theme.direction === "rtl" ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </IconButton>
          <IconButton aria-label="play/pause" onClick={controls.playPause}>
            {states.isPlaying ? (
              <PauseIcon sx={{ height: 38, width: 38 }} />
            ) : (
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            )}
          </IconButton>
          <IconButton aria-label="next" onClick={controls.next}>
            {theme.direction === "rtl" ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </IconButton>
        </Box>
      </Box>

      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={songInfo?.thumbnails?.standard?.url}
        alt={songInfo?.title}
      />
    </Card>
  );
}
