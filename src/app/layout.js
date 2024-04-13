import PlayerProvider from "@/context/playerProvider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Music",
  description: "My collection of musics to jam at work",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PlayerProvider>{children}</PlayerProvider>
      </body>
    </html>
  );
}
