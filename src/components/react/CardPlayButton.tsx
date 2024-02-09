import { colors } from "@/lib/colors";
import { Pause, Play } from "./IconsPlayer";
import { usePlayerStore } from "@/store/PlayerStore";

interface CardPlayButtonProps {
  id: string;
}

const CardPlayButton = ({ id }: CardPlayButtonProps): JSX.Element => {
  const { currentMusic, setCurrentMusic, isPlaying, setIsPlaying } =
    usePlayerStore((state) => state);

  const isPlayingPlayList = isPlaying && currentMusic.playlist?.id === id;

  const handleClick = async () => {
    try {
      if (isPlayingPlayList) {
        setIsPlaying(false);
        return;
      }

      const response = await fetch(`/api/getInfoPlaylist.json?id=${id}`);

      const { songs, playlist } = await response.json();

      setIsPlaying(true);
      setCurrentMusic({ songs, playlist, song: songs[0] });
    } catch (error) {
      console.error("Error al manejar la solicitud:", error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="card-play-button rounded-full bg-green-500 p-4"
    >
      {isPlayingPlayList ? <Pause /> : <Play />}
    </button>
  );
};

export default CardPlayButton;
