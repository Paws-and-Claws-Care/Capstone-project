import client from "../client.js";

export async function createForumPost({ title, category, user_id, body }) {
  const { rows } = await client.query(
    `
    INSERT INTO forum_posts (title, category, user_id, body)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `,
    [title, category, user_id, body]
  );

  return rows[0];
}

export async function getAllForumPosts() {
  const { rows } = await client.query(
    `
    SELECT
      fp.*,
      u.username,
      COUNT(fr.id)::int AS reply_count
    FROM forum_posts fp
    JOIN users u ON fp.user_id = u.id
    LEFT JOIN forum_replies fr ON fr.post_id = fp.id
    GROUP BY fp.id, u.username
    ORDER BY fp.created_at DESC;
    `
  );

  return rows;
}

export async function getForumPostById(post_id) {
  const { rows } = await client.query(
    `
    SELECT
      fp.*,
      u.username
    FROM forum_posts fp
    JOIN users u ON fp.user_id = u.id
    WHERE fp.id = $1;
    `,
    [post_id]
  );

  return rows[0];
}
