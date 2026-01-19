import client from "./db/client.js";
import express from "express";
import apiRouter from "./api/index.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
//body parsing middleware
app.use(express.json());

//for deployment only

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// for deployment only
const distPath = path.join(__dirname, "../client/dist");

// Serve everything in dist (assets, css, js, etc.)
app.use(express.static(distPath));

// IMPORTANT: mount /api BEFORE the catch-all
app.use("/api", apiRouter);

// SPA fallback: any non-API route should return index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

//custom error handling route
app.use((err, req, res, next) => {
  console.log(err);
  res
    .status(err.status || 500)
    .send({ error: err.message ? err.message : err });
});

const init = async () => {
  const PORT = process.env.PORT || 3000;
  await client.connect();
  console.log("connected to database");

  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
};

init();
