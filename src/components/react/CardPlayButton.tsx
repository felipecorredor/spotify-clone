import { Pause, Play } from "./IconsPlayer";
import { usePlayerStore } from "@/store/PlayerStore";

interface CardPlayButtonProps {
  id: string;
  size?: string;
}

const CardPlayButton = ({
  id,
  size = "small",
}: CardPlayButtonProps): JSX.Element => {
  /**
   * STORE
   */
  const { currentMusic, setCurrentMusic, isPlaying, setIsPlaying } =
    usePlayerStore((state) => state);

  /**
   * VARIABLES
   */
  const isPlayingPlayList = isPlaying && currentMusic.playlist?.id === id;
  const iconClassName = size === "small" ? "w-4 h-4" : "w-5 h-5";

  /**
   * FUNCTIONS
   */
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
      className="card-play-button rounded-full bg-green-500 p-4 hover:scale-105 transition hover:bg-green-400"
    >
      {isPlayingPlayList ? (
        <Pause className={iconClassName} />
      ) : (
        <Play className={iconClassName} />
      )}
    </button>
  );
};

export default CardPlayButton;
