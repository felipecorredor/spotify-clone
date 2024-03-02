import { Slider } from "@/components/shadcn/Slider";
import { useEffect, useState } from "react";

interface SongControlProp {
  audio: React.MutableRefObject<HTMLAudioElement | null>;
}

const SongControl = ({ audio }: SongControlProp) => {
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    if (audio.current) {
      audio.current.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (audio.current) {
        audio.current.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, []);

  const handleTimeUpdate = () => {
    if (audio.current) {
      setCurrentTime(audio.current.currentTime);
    }
  };

  const duration = audio?.current?.duration ?? 0;

  const formatTime = (time: number): string => {
    if (!time) return "00:00";

    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor(time / 60);

    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex gap-x-3 text-xs pt-2">
      <span className="opacity-50 w-12 text-right">
        {formatTime(currentTime)}
      </span>

      <Slider
        defaultValue={[0]}
        max={duration}
        min={0}
        value={[currentTime]}
        className="w-[600px]"
        onValueChange={([value]) => {
          if (audio.current) {
            audio.current.currentTime = value;
          }
        }}
      />
      <span className="opacity-50 w-12">
        {duration ? formatTime(duration) : "0:00"}
      </span>
    </div>
  );
};

export default SongControl;
