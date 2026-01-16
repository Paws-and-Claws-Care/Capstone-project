import { useEffect, useState } from "react";
import { getUser, getToken } from "../api/auth";

import {
  getForumPosts,
  getForumPostById,
  createForumPost,
  addForumReply,
  deleteForumPost,
  deleteForumReply,
} from "../api/forum";

function formatDate(d) {
  if (!d) return "";
  const date = typeof d === "string" || typeof d === "number" ? new Date(d) : d;
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString();
}

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setError("");
        setLoadingPosts(true);

        const data = await getForumPosts();
        if (ignore) return;

        setPosts(Array.isArray(data) ? data : []);

        if (Array.isArray(data) && data.length && selectedId == null) {
          setSelectedId(data[0].id);
        }
      } catch (err) {
        if (!ignore) setError(err?.message || "Failed to load forum posts");
      } finally {
        if (!ignore) setLoadingPosts(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadDetail() {
      if (selectedId == null) {
        setSelectedPost(null);
        return;
      }

      try {
        setError("");
        setLoadingDetail(true);

        const detail = await getForumPostById(selectedId);
        if (ignore) return;

        setSelectedPost(detail);
      } catch (err) {
        if (!ignore)
          setError(err?.message || "Failed to load discussion detail");
      } finally {
        if (!ignore) setLoadingDetail(false);
      }
    }

    loadDetail();
    return () => {
      ignore = true;
    };
  }, [selectedId]);

  async function handleCreatePost({ title, category, body }) {
    const token = getToken?.();
    if (!token) {
      setError("You must be logged in to create a post.");
      return;
    }

    if (!title?.trim() || !body?.trim()) return;

    try {
      setError("");

      const newPost = await createForumPost(token, {
        title: title.trim(),
        category: category?.trim() || "General",
        body: body.trim(),
      });

      const refreshed = await getForumPosts();
      setPosts(Array.isArray(refreshed) ? refreshed : []);

      setSelectedId(newPost.id);
    } catch (err) {
      setError(err?.message || "Failed to create post");
    }
  }

  async function handleAddReply(postId, { body }) {
    const token = getToken?.();
    if (!token) {
      setError("You must be logged in to reply.");
      return;
    }

    if (!body?.trim()) return;

    try {
      setError("");

      await addForumReply(token, postId, { body: body.trim() });

      setLoadingDetail(true);
      const detail = await getForumPostById(postId);
      setSelectedPost(detail);

      const refreshed = await getForumPosts();
      setPosts(Array.isArray(refreshed) ? refreshed : []);
    } catch (err) {
      setError(err?.message || "Failed to add reply");
    } finally {
      setLoadingDetail(false);
    }
  }

  async function handleDeletePost(postId) {
    const token = getToken?.();
    if (!token) {
      setError("You must be logged in to delete.");
      return;
    }

    try {
      setError("");
      await deleteForumPost(token, postId);

      const refreshed = await getForumPosts();
      const list = Array.isArray(refreshed) ? refreshed : [];
      setPosts(list);

      if (selectedId === postId) {
        const nextId = list.length ? list[0].id : null;
        setSelectedId(nextId);
        setSelectedPost(null);
      } else if (selectedId != null) {
        const detail = await getForumPostById(selectedId);
        setSelectedPost(detail);
      }
    } catch (err) {
      setError(err?.message || "Failed to delete post");
    }
  }

  async function handleDeleteReply(replyId) {
    const token = getToken?.();
    if (!token) {
      setError("You must be logged in to delete.");
      return;
    }

    try {
      setError("");
      await deleteForumReply(token, replyId);

      setLoadingDetail(true);
      if (selectedId != null) {
        const detail = await getForumPostById(selectedId);
        setSelectedPost(detail);
      }

      const refreshed = await getForumPosts();
      setPosts(Array.isArray(refreshed) ? refreshed : []);
    } catch (err) {
      setError(err?.message || "Failed to delete reply");
    } finally {
      setLoadingDetail(false);
    }
  }

  return (
    <div className="container my-4">
      <div className="mb-3">
        <h1 className="fw-bold">🐾 Paws & Claws Discussion Forum</h1>
        <p className="text-muted">
          Ask questions, share experiences, and help fellow pet parents.
        </p>

        {error ? (
          <div className="alert alert-danger py-2 mb-0">{error}</div>
        ) : null}
      </div>

      <CreatePostForm onCreate={handleCreatePost} />

      <div className="row g-3 mt-1">
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header fw-bold">Discussions</div>

            <div className="list-group list-group-flush">
              {loadingPosts ? (
                <div className="p-3 text-muted">Loading discussions…</div>
              ) : posts.length === 0 ? (
                <div className="p-3 text-muted">No discussions yet.</div>
              ) : (
                posts.map((post) => {
                  const active = post.id === selectedId;

                  return (
                    <button
                      key={post.id}
                      className={`list-group-item list-group-item-action ${
                        active ? "active" : ""
                      }`}
                      onClick={() => setSelectedId(post.id)}
                      type="button"
                    >
                      <div className="d-flex justify-content-between align-items-start">
                        <div className="me-2">
                          <div className="fw-semibold">{post.title}</div>
                          <small
                            className={active ? "text-white-50" : "text-muted"}
                          >
                            {post.category} • by {post.username} •{" "}
                            {formatDate(post.created_at)}
                          </small>
                        </div>

                        <span
                          className={`badge d-flex align-items-center ${
                            active ? "bg-light text-dark" : "bg-primary"
                          }`}
                        >
                          💬 Replies: {post.reply_count ?? 0}
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header fw-bold">Discussion Detail</div>

            <div className="card-body">
              {loadingDetail ? (
                <p className="text-muted mb-0">Loading discussion…</p>
              ) : !selectedPost ? (
                <p className="text-muted mb-0">
                  Click a discussion from the left column.
                </p>
              ) : (
                <PostDetail
                  post={selectedPost}
                  onAddReply={handleAddReply}
                  onDeletePost={handleDeletePost}
                  onDeleteReply={handleDeleteReply}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CreatePostForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Dog");
  const [body, setBody] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await onCreate({ title, category, body });
    setTitle("");
    setCategory("Dog");
    setBody("");
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header fw-bold">Start a New Discussion</div>
      <div className="card-body">
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Dog</option>
              <option>Cat</option>
              <option>Health</option>
              <option>Food</option>
              <option>Training</option>
              <option>General</option>
            </select>
          </div>

          <div className="col-md-8">
            <label className="form-label">Title</label>
            <input
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label">Message</label>
            <textarea
              className="form-control"
              rows="3"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>

          <div className="col-12">
            <button className="btn btn-primary" type="submit">
              Post Discussion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PostDetail({ post, onAddReply, onDeletePost, onDeleteReply }) {
  const [replyBody, setReplyBody] = useState("");

  const me = getUser?.();
  const canDeletePost = me && me.id === post.user_id;

  async function handleReply(e) {
    e.preventDefault();
    await onAddReply(post.id, { body: replyBody });
    setReplyBody("");
  }

  const replies = post.replies ?? [];

  return (
    <>
      <div className="d-flex justify-content-between align-items-start">
        <div className="me-2">
          <h5 className="fw-bold mb-1">{post.title}</h5>
          <p className="text-muted mb-2">
            {post.category} • by {post.username} • {formatDate(post.created_at)}
          </p>
        </div>

        {canDeletePost ? (
          <button
            className="btn btn-sm btn-outline-danger"
            type="button"
            onClick={() => onDeletePost(post.id)}
          >
            Delete
          </button>
        ) : null}
      </div>

      <p>{post.body}</p>

      <hr />

      <h6 className="fw-bold">Replies ({replies.length})</h6>

      {replies.length === 0 ? (
        <p className="text-muted">No replies yet. Be the first to reply!</p>
      ) : (
        <div className="mb-3">
          {replies.map((r) => {
            const canDeleteReply = me && me.id === r.user_id;

            return (
              <div key={r.id} className="border rounded p-2 mb-2">
                <div className="d-flex justify-content-between align-items-start">
                  <div className="fw-semibold">
                    {r.username}{" "}
                    <span className="text-muted fw-normal">
                      • {formatDate(r.created_at)}
                    </span>
                  </div>

                  {canDeleteReply ? (
                    <button
                      className="btn btn-sm btn-outline-danger"
                      type="button"
                      onClick={() => onDeleteReply(r.id)}
                    >
                      Delete
                    </button>
                  ) : null}
                </div>

                <div>{r.body}</div>
              </div>
            );
          })}
        </div>
      )}

      <form onSubmit={handleReply} className="row g-2">
        <div className="col-12">
          <input
            className="form-control"
            value={replyBody}
            onChange={(e) => setReplyBody(e.target.value)}
            required
          />
        </div>

        <div className="col-12">
          <button className="btn btn-success" type="submit">
            Submit Reply
          </button>
        </div>
      </form>
    </>
  );
}
