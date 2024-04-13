import { PlayerContext } from "@/context/playerContext";
import { useContext } from "react";
import YouTube from "react-youtube";

const YTEmbed = () => {
  const { onReady, onStateChange } = useContext(PlayerContext);

  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      disablekb: 1,
      controls: 0,
    },
  };

  return (
    <div>
      <YouTube
        videoId="aqg-Uugxz3Q"
        opts={opts}
        onReady={onReady}
        onStateChange={onStateChange}
      />
    </div>
  );
};

export default YTEmbed;
