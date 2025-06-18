import { LofiBackground } from "@/types/music";

export const defaultBackgrounds: LofiBackground[] = [
  {
    id: "lofi-room-1",
    name: "Cozy Study Room",
    gifUrl:
      "https://i.pinimg.com/1200x/8f/8a/01/8f8a0169f254293444064fa6dc09d333.jpg",
    thumbnail:
      "https://i.pinimg.com/1200x/8f/8a/01/8f8a0169f254293444064fa6dc09d333.jpg",
  },
  {
    id: "lofi-coffee",
    name: "Coffee & Rain",
    gifUrl:
      "https://i.pinimg.com/originals/68/d2/81/68d28184068c76758bea59794ee97f6a.gif",
    thumbnail:
      "https://i.pinimg.com/originals/68/d2/81/68d28184068c76758bea59794ee97f6a.gif",
  },
  {
    id: "lofi-rain",
    name: "Rainy Window",
    gifUrl: "https://media.giphy.com/media/10UUe8ZsLnaqwo/giphy.gif",
    thumbnail: "https://media.giphy.com/media/10UUe8ZsLnaqwo/200w.gif",
  },
  {
    id: "lofi-city",
    name: "City Night Vibes",
    gifUrl: "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif",
    thumbnail: "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/200w.gif",
  },
  {
    id: "lofi-study",
    name: "Study Aesthetic",
    gifUrl: "https://media.giphy.com/media/3o7TKre2pXE2DeUVP2/giphy.gif",
    thumbnail: "https://media.giphy.com/media/3o7TKre2pXE2DeUVP2/200w.gif",
  },
  {
    id: "lofi-nature",
    name: "Nature Calm",
    gifUrl: "https://media.giphy.com/media/26gsjCZpPolPr3sBy/giphy.gif",
    thumbnail: "https://media.giphy.com/media/26gsjCZpPolPr3sBy/200w.gif",
  },
  {
    id: "lofi-sunset",
    name: "Sunset Vibes",
    gifUrl: "https://media.giphy.com/media/3o7TKE0jOJdZiJ8hG0/giphy.gif",
    thumbnail: "https://media.giphy.com/media/3o7TKE0jOJdZiJ8hG0/200w.gif",
  },
  {
    id: "lofi-train",
    name: "Train Journey",
    gifUrl: "https://media.giphy.com/media/l0HlPystfePnAI3G8/giphy.gif",
    thumbnail: "https://media.giphy.com/media/l0HlPystfePnAI3G8/200w.gif",
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
