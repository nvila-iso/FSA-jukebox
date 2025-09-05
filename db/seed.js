import db from "#db/client";
import { faker } from "@faker-js/faker";

import { createTrack } from "./queries/tracks.js";
import { createPlaylist } from "./queries/playlists.js";
import { createPlaylistTracks } from "./queries/playlist_tracks.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO

  // create tracks
  for (let i = 0; i < 20; i++) {
    let songName = faker.music.songName({ max: 20 });
    let songDuration = faker.number.int({ min: 1, max: 5 });
    await createTrack(songName, songDuration);
  }

  // create playlists
  for (let i = 0; i < 10; i++) {
    let playlistName = faker.word.adjective({ length: { min: 5, max: 10 } });
    let playlistDesc = faker.word.words({ count: 6 });
    await createPlaylist(playlistName, playlistDesc);
  }

  // create playlists_tracks
  for (let i = 0; i < 15; i++) {
    const playlist_id = faker.number.int({ min: 1, max: 10 });
    const track_id = faker.number.int({ min: 1, max: 20 });
    await createPlaylistTracks(playlist_id, track_id);
  }
}
