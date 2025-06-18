import { LofiBackground } from "@/types/music";

export const defaultBackgrounds: LofiBackground[] = [
  {
    id: "lofi-room-1",
    name: "Cozy Study Room",
    gifUrl: "/girl.gif",
    thumbnail: "/girl.gif",
  },
];

// Fallback solid color backgrounds if GIFs fail to load
export const fallbackBackgrounds = [
  {
    id: "gradient-1",
    name: "Warm Gradient",
    color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: "gradient-2",
    name: "Sunset",
    color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: "gradient-3",
    name: "Ocean",
    color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    id: "gradient-4",
    name: "Forest",
    color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
];
