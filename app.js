import express from "express";
const app = express();
export default app;

import tracksRouter from "#api/api_tracks";
import playlistsRouter from "#api/api_playlists";

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // not even sure I understand this

app.use("/tracks", tracksRouter);
app.use("/playlists", playlistsRouter);
app.use("/playlists/:id/tracks", playlistsRouter);

app.use((err, req, res, next) => {
  // Foreign key violation
  if (err.code === "23503") {
    return res.status(400).send(err.detail);
  }

  if (err.code === "22P02" || err.code === "22007" || err.code === "22008") {
    return res.status(400).send(err.detail);
  }

  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! You went the wrong way...");
});
