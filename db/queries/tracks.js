import db from "#db/client";

export async function createTrack(name, duration_ms) {
  const SQL = `
    INSERT INTO tracks (name, duration_ms)
    VALUES ($1, $2)
    RETURNING *
    `;
  const { rows: tracks } = await db.query(SQL, [name, duration_ms]);
  return tracks;
}

export async function getTracks() {
  const SQL = `SELECT * FROM tracks`;
  const { rows: tracks } = await db.query(SQL);
  return tracks;
}

export async function getTrackById(id) {
  const SQL = `SELECT * FROM tracks WHERE id = $1`;
  const { rows: track } = await db.query(SQL, [id]);
  return track[0];
}

export async function getTracksByPlaylistId(id) {
  const SQL = `
  SELECT tracks.*
  FROM playlists_tracks
    JOIN playlists on playlists_tracks.playlist_id = playlists.id
    JOIN tracks on playlists_tracks.track_id = tracks.id
  WHERE playlist_id = $1
  `;
  const { rows: tracks } = await db.query(SQL, [id]);
  return tracks;
}
