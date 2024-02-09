import { useEffect, useRef } from "react";
import { Pause, Play, Volume, VolumeSilence } from "./IconsPlayer";
import { usePlayerStore } from "@/store/PlayerStore";
import type { Song } from "@/lib/data";
import { Slider } from "../shadcn/Slider";

interface CurrentSongProps {
  song: Song | null | undefined;
}

const CurrentSong = ({ song }: CurrentSongProps) => {
  const artistString = song?.artists.join(", ");

  return (
    <div className={`flex items-center gap-5 relative overflow-hidden`}>
      <picture className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
        <img src={song?.image} alt={song?.title} />
      </picture>
      <div className="flex flex-col">
        <h3 className="font-bold block">{song?.title}</h3>
        <span className="text-xs text-gray-400">{artistString}</span>
      </div>
    </div>
  );
};

const SongControl = () => {};

const VolumeControl = () => {
  const volume = usePlayerStore((state) => state.volume);
  const setVolume = usePlayerStore((state) => state.setVolume);
  const previousVolumeRef = useRef(volume);

  const isVolumeSilenced = volume < 0.1;

  const handleClickVolumen = () => {
    if (isVolumeSilenced) {
      setVolume(previousVolumeRef.current);
    } else {
      previousVolumeRef.current = volume;
      setVolume(0);
    }
  };

  return (
    <div className="flex justify-center gap-x-2 text-white">
      <button
        className="opacity-70 hover:opacity-100 transition"
        onClick={handleClickVolumen}
      >
        {isVolumeSilenced ? <VolumeSilence /> : <Volume />}
      </button>

      <Slider
        defaultValue={[100]}
        max={100}
        min={0}
        value={[volume * 100]}
        className="w-[95px]"
        onValueChange={(value) => {
          const [newVolume] = value;
          const volumeValue = newVolume / 100;
          setVolume(volumeValue);
        }}
      />
    </div>
  );
};

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
    <div className="flex flex-row justify-between w-full  z-50">
      <div>
        <CurrentSong song={currentMusic.song} />
      </div>

      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center">
          <button className="bg-white rounded-full p-2" onClick={handleClick}>
            {isPlaying ? <Pause /> : <Play />}
          </button>
        </div>
      </div>

      <div className="grid grid-flow-col place-content-center gap-2">
        <VolumeControl />
      </div>

      <audio ref={audioRef} />
    </div>
  );
};

export default Player;
