import { useMemo, useState } from "react";

const seedPosts = [
  {
    id: 1,
    title: "Best food for senior dogs?",
    category: "Dog",
    author: "Shikha",
    createdAt: "Jan 10, 2026",
    body:
      "My dog is 10 years old. What food brands or ingredients do you recommend for senior dogs?",
    replies: [
      {
        id: "r1",
        author: "Sumit",
        createdAt: "Jan 10, 2026",
        message:
          "Look for senior formulas with joint support and moderate calories. Ask your vet if there are health issues."
      }
    ]
  },
  {
    id: 2,
    title: "Cat not drinking enough water",
    category: "Cat",
    author: "Avir",
    createdAt: "Jan 9, 2026",
    body: "My cat avoids the water bowl. How can I increase water intake?",
    replies: [
      {
        id: "r2",
        author: "Shikha",
        createdAt: "Jan 9, 2026",
        message: "Try a water fountain + wet food. Keep bowls away from litter."
      }
    ]
  }
];

export default function Forum() {
  const [posts, setPosts] = useState(seedPosts);
  const [selectedId, setSelectedId] = useState(seedPosts[0]?.id || null);

  const selectedPost = useMemo(
    () => posts.find((p) => p.id === selectedId),
    [posts, selectedId]
  );

  function createPost({ title, category, body, author }) {
    if (!title.trim() || !body.trim()) return;

    const newPost = {
      id: Date.now(),
      title: title.trim(),
      category: category || "General",
      author: author?.trim() || "Guest",
      createdAt: new Date().toLocaleDateString(),
      body: body.trim(),
      replies: []
    };

    setPosts((prev) => [newPost, ...prev]);
    setSelectedId(newPost.id);
  }

  function addReply(postId, { author, message }) {
    if (!message.trim()) return;

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          replies: [
            ...p.replies,
            {
              id: crypto.randomUUID(),
              author: author?.trim() || "Guest",
              createdAt: new Date().toLocaleDateString(),
              message: message.trim()
            }
          ]
        };
      })
    );
  }

  return (
    <div className="container my-4">
      <div className="mb-3">
        <h1 className="fw-bold">🐾 Paws & Claws Discussion Forum</h1>
        <p className="text-muted">
          Ask questions, share experiences, and help fellow pet parents.
        </p>
      </div>

      <CreatePostForm onCreate={createPost} />

      <div className="row g-3 mt-1">
        {/* LEFT COLUMN = discussions box */}
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header fw-bold">Discussions</div>

            <div className="list-group list-group-flush">
              {posts.map((post) => {
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
                    <div className="d-flex justify-content-between">
                      <div>
                        <div className="fw-semibold">{post.title}</div>
                        <small className={active ? "text-white-50" : "text-muted"}>
                          {post.category} • by {post.author} • {post.createdAt}
                        </small>
                      </div>
                      <span className={`badge ${active ? "bg-light text-dark" : "bg-primary"}`}>
                        {post.replies.length}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN = discussion detail */}
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header fw-bold">Discussion Detail</div>

            <div className="card-body">
              {!selectedPost ? (
                <p className="text-muted mb-0">
                  Click a discussion from the left column.
                </p>
              ) : (
                <PostDetail post={selectedPost} onAddReply={addReply} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function CreatePostForm({ onCreate }) {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Dog");
  const [body, setBody] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onCreate({ author, title, category, body });
    setAuthor("");
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
            <label className="form-label">Your Name</label>
            <input
              className="form-control"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g., Shikha"
            />
          </div>

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

          <div className="col-md-4">
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
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");

  function handleReply(e) {
    e.preventDefault();
    onAddReply(post.id, { author, message });
    setMessage("");
  }

  return (
    <>
      <h5 className="fw-bold">{post.title}</h5>
      <p className="text-muted mb-2">
        {post.category} • by {post.author} • {post.createdAt}
      </p>
      <p>{post.body}</p>

      <hr />

      <h6 className="fw-bold">Replies ({post.replies.length})</h6>

      {post.replies.length === 0 ? (
        <p className="text-muted">No replies yet. Be the first to reply!</p>
      ) : (
        <div className="mb-3">
          {post.replies.map((r) => (
            <div key={r.id} className="border rounded p-2 mb-2">
              <div className="fw-semibold">
                {r.author} <span className="text-muted fw-normal">• {r.createdAt}</span>
              </div>
              <div>{r.message}</div>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleReply} className="row g-2">
        <div className="col-md-4">
          <input
            className="form-control"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name"
          />
        </div>
        <div className="col-md-8">
          <input
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
