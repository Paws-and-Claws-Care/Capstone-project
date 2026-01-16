import client from "../client.js";

export async function addReplyToPost({ post_id, user_id, body }) {
  const { rows } = await client.query(
    `
    INSERT INTO forum_replies (post_id, user_id, body)
    VALUES ($1, $2, $3)
    RETURNING id, post_id, user_id, body, created_at;
    `,
    [post_id, user_id, body]
  );

  // now join to include username so frontend can render immediately
  const reply = rows[0];

  const { rows: joined } = await client.query(
    `
    SELECT
      fr.*,
      u.username
    FROM forum_replies fr
    JOIN users u ON fr.user_id = u.id
    WHERE fr.id = $1;
    `,
    [reply.id]
  );

  return joined[0];
}

export async function getRepliesByPostId(post_id) {
  const { rows } = await client.query(
    `
    SELECT
      fr.id,
      fr.post_id,
      fr.user_id,
      fr.body,
      fr.created_at,
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

export async function deleteForumRepliesById({ reply_id, user_id }) {
  const { rows } = await client.query(
    `
    DELETE FROM forum_replies
    WHERE id = $1 AND user_id = $2
    RETURNING *;
    `,
    [reply_id, user_id]
  );

  return rows[0];
}
