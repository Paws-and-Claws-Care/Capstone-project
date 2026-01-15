const API_URL = "/api";

function headers(token) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function parse(res) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return text;
  }
}

export async function getForumPosts() {
  const res = await fetch(`${API_URL}/forum/posts`);
  const data = await parse(res);
  if (!res.ok) {
    throw new Error(
      typeof data === "string" ? data : data?.error || "Failed to load posts"
    );
  }
  return data;
}

export async function getForumPostById(postId) {
  const res = await fetch(`${API_URL}/forum/posts/${postId}`);
  const data = await parse(res);
  if (!res.ok) {
    throw new Error(
      typeof data === "string" ? data : data?.error || "Failed to load post"
    );
  }
  return data;
}

export async function createForumPost(token, { title, category, body }) {
  const res = await fetch(`${API_URL}/forum/posts`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify({ title, category, body }),
  });

  const data = await parse(res);
  if (!res.ok) {
    throw new Error(
      typeof data === "string" ? data : data?.error || "Failed to create post"
    );
  }
  return data;
}

export async function addForumReply(token, postId, { body }) {
  const res = await fetch(`${API_URL}/forum/posts/${postId}/replies`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify({ body }),
  });

  const data = await parse(res);
  if (!res.ok) {
    throw new Error(
      typeof data === "string" ? data : data?.error || "Failed to add reply"
    );
  }

  // NOTE: backend returns the newly created reply
  return data;
}
