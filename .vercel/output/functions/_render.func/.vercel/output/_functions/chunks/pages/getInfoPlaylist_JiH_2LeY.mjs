import { a as allPlaylists, s as songs } from './_id__3j6Pw50a.mjs';

async function GET({
  request
}) {
  const { url } = request;
  const urlObject = new URL(url);
  const id = urlObject.searchParams.get("id");
  const playlist = allPlaylists.find((playlist2) => playlist2.id === id);
  const songs$1 = songs.filter((song) => song.albumId === playlist?.albumId);
  const responseObj = { playlist, songs: songs$1 };
  return new Response(JSON.stringify(responseObj), {
    headers: { "content-type": "application/json" }
  });
}

export { GET };
