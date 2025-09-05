import db from "#db/client";

export async function createPlaylistTracks(playlist_id, track_id) {
  const SQL = `
    INSERT INTO playlists_tracks
        (playlist_id, track_id)
    VALUES($1, $2)
    RETURNING *
    `;
  const { rows: playlistTracks } = await db.query(SQL, [playlist_id, track_id]);
  return playlistTracks;
}

export async function getPlaylistTracksById(id) {
  const SQL = `SELECT * FROM playlists_tracks WHERE track_id = $1`;
  const { rows: playlistTrack } = await db.query(SQL, [id]);
  return playlistTrack;
}
