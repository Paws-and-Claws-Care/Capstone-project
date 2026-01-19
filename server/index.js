import client from "./db/client.js";
import express from "express";
import apiRouter from "./api/index.js";

import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(express.json());

// API always
app.use("/api", apiRouter);

// Only serve the built frontend in production
if (process.env.NODE_ENV === "production") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const distPath = path.join(__dirname, "../client/dist");

  app.use(express.static(distPath));

  // SPA fallback without wildcards
  app.use((req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// error handler last
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send({
    error: err.message ? err.message : err,
  });
});

const init = async () => {
  const PORT = process.env.PORT || 3000;
  await client.connect();
  console.log("connected to database");

  app.listen(PORT, () => console.log(`listening on port ${PORT}`));
};

init();
