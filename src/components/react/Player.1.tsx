import { useEffect, useRef, useState, type RefObject } from "react";
import { Pause, Play } from "./IconsPlayer";

export const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef: RefObject<HTMLAudioElement> = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    audioRef && audioRef.current?.src;
    `/music/1/01.mp3`;
  }, []);

  const handleClick = () => {
    isPlaying ? audioRef.current?.pause() : audioRef.current?.play();

    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-row justify-between w-full px-4 z-50">
      <div>CurrentSong...</div>

      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center">
          <button className="bg-white rounded-full p-2" onClick={handleClick}>
            {isPlaying ? <Pause /> : <Play />}
          </button>
        </div>
      </div>

      <div className="grid place-content-center">Volumen</div>

      <audio controls ref={audioRef} />
    </div>
  );
};
