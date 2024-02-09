import {
  allPlaylists,
  songs as allSongs,
  type Playlist,
  type Song,
} from "@/lib/data";

interface GetResponse {
  playlist: Playlist | undefined;
  songs: Song[];
}

type Request = {
  url: string;
};

interface GetInfoPlaylistParams {
  request: Request;
}

export async function GET({
  request,
}: GetInfoPlaylistParams): Promise<Response> {
  const { url } = request;

  const urlObject = new URL(url);
  const id = urlObject.searchParams.get("id");

  const playlist = allPlaylists.find((playlist) => playlist.id === id);
  const songs = allSongs.filter((song) => song.albumId === playlist?.albumId);

  const responseObj: GetResponse = { playlist, songs };

  return new Response(JSON.stringify(responseObj), {
    headers: { "content-type": "application/json" },
  });
}
