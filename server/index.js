import client from "./db/client.js";
import express from "express";
import apiRouter from "./api/index.js";

const app = express();
//body parsing middleware
app.use(express.json());

import petsRouter from "./api/pets.js";
app.use("/api/pets", petsRouter);

//for deployment only
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// for deployment only
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../client/dist/index.html"))
);

app.use(
  "/assets",
  express.static(path.join(__dirname, "../client/dist/assets"))
);

//use api routes

app.use("/api", apiRouter);

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
