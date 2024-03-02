import { useEffect, useRef } from "react";
import { Pause, Play } from "./IconsPlayer";
import { usePlayerStore } from "@/store/PlayerStore";
import CurrentSong from "./Player/CurrentSong";
import VolumeControl from "./Player/VolumeControl";
import SongControl from "./Player/SongControl";

const Player = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const { isPlaying, setIsPlaying, currentMusic, volume } = usePlayerStore(
    (state) => state,
  );

  useEffect(() => {
    isPlaying ? audioRef.current?.play() : audioRef.current?.pause();
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const { song, playlist } = currentMusic;
    if (song) {
      const src = `/music/${playlist?.id}/0${song.id}.mp3`;
      if (audioRef.current) {
        audioRef.current.src = src;
        audioRef.current.volume = volume;
        audioRef.current.play();
      }
    }
  }, [currentMusic]);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-row justify-between w-full px-1 z-50">
      <div className="">
        <CurrentSong song={currentMusic.song} />
      </div>

      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex flex-col items-center justify-center">
          <div className="flex gap-4">
            <button className="bg-white rounded-full p-2" onClick={handleClick}>
              {isPlaying ? <Pause /> : <Play />}
            </button>
          </div>
          <SongControl audio={audioRef} />
          <audio ref={audioRef} />
        </div>
      </div>

      <div className="grid grid-flow-col place-content-center gap-2">
        <VolumeControl />
      </div>
    </div>
  );
};

export default Player;
