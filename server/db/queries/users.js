import db from "../client.js";
import bcrypt from "bcrypt";

export async function createUser(user) {
  if (!user.username.trim() || !user.email.trim() || !user.password.trim()) {
    throw Error("must have username, email, and password");
  }
  user.password = await bcrypt.hash(user.password, 5);
  const SQL = `
        INSERT INTO users(username, email, password) VALUES ($1, $2, $3) RETURNING *;
    `;
  const response = await db.query(SQL, [
    user.username,
    user.email,
    user.password,
  ]);
  return response.rows[0];
}

export async function getAllUsers() {
  const SQL = `
    SELECT id, username, email
    FROM users
    `;
  const response = await db.query(SQL);
  return response.rows;
}

export async function getUserById(id) {
  const SQL = `
    SELECT id, username, email
    FROM users
    WHERE id = $1
    `;
  const response = await db.query(SQL, [id]);
  return response.rows[0];
}

export async function getUserByUsername(username) {
  const SQL = `
    SELECT *
    FROM users
    WHERE username = $1
  `;

  const response = await db.query(SQL, [username]);

  return response.rows[0];
}

export async function getUserByEmail(email) {
  const SQL = `
    SELECT *
    FROM users
    WHERE email = $1
  `;
  const response = await db.query(SQL, [email]);
  return response.rows[0];
}
