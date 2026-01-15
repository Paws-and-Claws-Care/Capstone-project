import client from "../client.js";

export async function addReplyToPost({ post_id, user_id, body }) {
  const { rows } = await client.query(
    `
    INSERT INTO forum_replies (post_id, user_id, body)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
    [post_id, user_id, body]
  );

  return rows[0];
}

export async function getRepliesByPostId(post_id) {
  const { rows } = await client.query(
    `
    SELECT
      fr.*,
      u.username
    FROM forum_replies fr
    JOIN users u ON fr.user_id = u.id
    WHERE fr.post_id = $1
    ORDER BY fr.created_at ASC;
    `,
    [post_id]
  );

  return rows;
}
