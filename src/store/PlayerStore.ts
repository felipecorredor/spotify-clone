import type { Playlist, Song } from "@/lib/data";
import { create } from "zustand";

interface PlayerState {
  isPlaying: boolean;
  volume: number;
  currentMusic: {
    playlist?: Playlist | null;
    song?: Song | null;
    songs?: Song[];
  };
}

interface PlayerActions {
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentMusic: (currentMusic: PlayerState["currentMusic"]) => void;
  setVolume: (volume: number) => void;
}

export const usePlayerStore = create<PlayerState & PlayerActions>((set) => ({
  isPlaying: false,
  volume: 1,
  currentMusic: { playlist: null, song: null, songs: [] },
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  setVolume: (volume: number) => set({ volume }),
  setCurrentMusic: (currentMusic: PlayerState["currentMusic"]) =>
    set({ currentMusic }),
}));
