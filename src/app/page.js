"use client";
import MediaCard from "@/components/player";
import YTEmbed from "@/components/yt";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <MediaCard />
      <YTEmbed />
    </Box>
  );
}
