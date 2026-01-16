import express from "express";
import getUserFromToken from "../middleware/getUserFromToken.js";
import requireUser from "../middleware/requireUser.js";
import { deleteForumPostById } from "../db/queries/forum_posts.js";
import { deleteForumRepliesById } from "../db/queries/forum_replies.js";

import {
  getAllForumPosts,
  getForumPostById,
  createForumPost,
} from "../db/queries/forum_posts.js";

import {
  getRepliesByPostId,
  addReplyToPost,
} from "../db/queries/forum_replies.js";

const router = express.Router();

router.get("/posts", async (req, res, next) => {
  try {
    const posts = await getAllForumPosts();
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

router.get("/posts/:postId", async (req, res, next) => {
  try {
    const postId = Number(req.params.postId);

    const post = await getForumPostById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const replies = await getRepliesByPostId(postId);

    res.json({ ...post, replies });
  } catch (err) {
    next(err);
  }
});

router.post("/posts", getUserFromToken, requireUser, async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const { title, category, body } = req.body;

    if (!title?.trim() || !body?.trim()) {
      return res.status(400).json({ error: "Title and body are required." });
    }

    const newPost = await createForumPost({
      title: title.trim(),
      category: category?.trim() || "General",
      user_id,
      body: body.trim(),
    });

    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/posts/:postId/replies",
  getUserFromToken,
  requireUser,
  async (req, res, next) => {
    try {
      const user_id = req.user.id;
      const post_id = Number(req.params.postId);
      const { body } = req.body;

      if (!body?.trim()) {
        return res.status(400).json({ error: "Reply body is required." });
      }

      const post = await getForumPostById(post_id);
      if (!post) return res.status(404).json({ error: "Post not found" });

      await addReplyToPost({
        post_id,
        user_id,
        body: body.trim(),
      });

      const replies = await getRepliesByPostId(post_id);
      res.status(201).json({ post_id, replies });
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/posts/:postId",
  getUserFromToken,
  requireUser,
  async (req, res, next) => {
    try {
      const post_id = Number(req.params.postId);
      const user_id = req.user.id;

      const deleted = await deleteForumPostById({ post_id, user_id });
      if (!deleted) return res.status(403).json({ error: "Not allowed" });

      res.json({ ok: true });
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/replies/:replyId",
  getUserFromToken,
  requireUser,
  async (req, res, next) => {
    try {
      const reply_id = Number(req.params.replyId);
      const user_id = req.user.id;

      const deleted = await deleteForumRepliesById({ reply_id, user_id });
      if (!deleted) return res.status(403).json({ error: "Not allowed" });

      res.json({ ok: true });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
