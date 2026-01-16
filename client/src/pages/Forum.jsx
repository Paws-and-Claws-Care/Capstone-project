import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getForumPosts,
  getForumPostById,
  createForumPost,
  addForumReply,
} from "../api/forum";
import { getToken } from "../api/auth";

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

        const arr = Array.isArray(data) ? data : [];
        setPosts(arr);

        if (arr.length && selectedId == null) {
          setSelectedId(arr[0].id);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    // Sticky footer without a shared layout:
    <div className="d-flex flex-column min-vh-100">
      {/* PAGE CONTENT */}
      <div className="flex-grow-1">
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
            {/* LEFT COLUMN */}
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
                                className={
                                  active ? "text-white-50" : "text-muted"
                                }
                              >
                                {post.category} • by {post.username} •{" "}
                                {formatDate(post.created_at)}
                              </small>
                            </div>

                            <span
                              className={`badge d-flex align-items-center ${
                                active ? "bg-light text-dark" : "bg-primary"
                              }`}
                              title="Replies"
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

            {/* RIGHT COLUMN */}
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
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER (Forum: Home, About, Contact) */}
      <footer className="bg-light border-top mt-5">
        <div className="container py-4">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-2 text-secondary small">
            <div>© {new Date().getFullYear()} Paws & Claws Care</div>

            <div className="d-flex gap-3">
              <Link className="text-secondary text-decoration-none" to="/">
                Home
              </Link>
              <Link className="text-secondary text-decoration-none" to="/about">
                About
              </Link>
              <Link
                className="text-secondary text-decoration-none"
                to="/contact"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* Components */

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
              placeholder="e.g., Best treats for puppies?"
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
              placeholder="Write your question or share your experience..."
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

function PostDetail({ post, onAddReply }) {
  const [replyBody, setReplyBody] = useState("");

  async function handleReply(e) {
    e.preventDefault();
    await onAddReply(post.id, { body: replyBody });
    setReplyBody("");
  }

  const replies = post.replies ?? [];

  return (
    <>
      <h5 className="fw-bold">{post.title}</h5>
      <p className="text-muted mb-2">
        {post.category} • by {post.username} • {formatDate(post.created_at)}
      </p>
      <p>{post.body}</p>

      <hr />

      <h6 className="fw-bold">Replies ({replies.length})</h6>

      {replies.length === 0 ? (
        <p className="text-muted">No replies yet. Be the first to reply!</p>
      ) : (
        <div className="mb-3">
          {replies.map((r) => (
            <div key={r.id} className="border rounded p-2 mb-2">
              <div className="fw-semibold">
                {r.username}{" "}
                <span className="text-muted fw-normal">
                  • {formatDate(r.created_at)}
                </span>
              </div>
              <div>{r.body}</div>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleReply} className="row g-2">
        <div className="col-12">
          <input
            className="form-control"
            value={replyBody}
            onChange={(e) => setReplyBody(e.target.value)}
            placeholder="Write a reply..."
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
