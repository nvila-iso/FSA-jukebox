import express from "express";
const router = express.Router();
export default router;

import {
  createPlaylist,
  getPlaylists,
  getPlaylistsById,
} from "#db/queries/playlists";

import { getTracksByPlaylistId, getTrackById } from "#db/queries/tracks";

import {
  createPlaylistTracks,
  getPlaylistTracksById,
} from "#db/queries/playlist_tracks";

router
  .route("/")
  .get(async (req, res) => {
    const playlists = await getPlaylists();
    res.status(200).send(playlists);
  })
  .post(async (req, res) => {
    if (!req.body) return res.status(400).send("Request body required.");

    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).send("Request body needs: name and description.");
    }
    const playlist = await createPlaylist(name, description);
    res.status(201).send(playlist);
  });

router.param("id", async (req, res, next, id) => {
  const playlist = await getPlaylistsById(id);
  if (!playlist) return res.status(404).send("Playlist not found.");

  req.playlist = playlist;
  next();
});

router.route("/:id").get((req, res) => {
  res.send(req.playlist);
});

router
  .route("/:id/tracks")
  .get(async (req, res) => {
    const { id } = req.params;
    const playlists = await getTracksByPlaylistId(id);
    res.status(200).send(playlists);
  })
  .post(async (req, res) => {
    if (!req.body) return res.status(400).send("REquest body is required...");

    const { trackId } = req.body;
    if (!trackId)
      return res.status(400).send("Request body requires trackId...");

    const playlistTrack = await createPlaylistTracks(req.playlist.id, trackId);
    res.status(201).send(playlistTrack);
  });

// if (!req.body) return res.status(400).send("Request body required...");

// const { id } = req.params;
// const { trackId } = req.body;

// if (!id || !trackId) {
//   return res.status(400).send("ID is missing...");
// }

// const track = await getTrackById(trackId);
// const exTrack = await getPlaylistTracksById(trackId);

// if (!track) {
//   return res.status(400).send("Track does not exist...");
// } else if (!exTrack) {
//   return res.status(400).send("This track already exists...");
// }

// const newTrack = await createPlaylistTracks(id, trackId);

// res.status(201).send(newTrack);
