import type { Song } from "@/lib/data";

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

export default CurrentSong;
