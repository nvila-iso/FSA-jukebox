import db from "#db/client";

export async function createPlaylist(name, description) {
  const SQL = `
    INSERT INTO playlists (name, description)
    VALUES ($1, $2)
    RETURNING *
    `;
  const { rows: playlists } = await db.query(SQL, [name, description]);
  console.log("###playlists###");
  console.log(playlists);
  console.log("###playlists###");
  return playlists[0];
}

export async function getPlaylists() {
  const SQL = `SELECT * FROM playlists`;
  const { rows: playlists } = await db.query(SQL);
  return playlists;
}

export async function getPlaylistsById(id) {
  const SQL = `SELECT * FROM playlists WHERE id = $1`;
  const { rows: playlist } = await db.query(SQL, [id]);
  return playlist[0];
}
