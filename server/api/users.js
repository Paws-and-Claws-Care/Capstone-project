import express from "express";
const app = express.Router();

app.get("/", async (req, res, next) => {
  res.send("inside of GET /api/users route!");
});

export default app;
