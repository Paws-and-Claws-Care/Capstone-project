import { Client } from "pg";

const isProd = process.env.NODE_ENV === "production";

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: isProd ? { rejectUnauthorized: false } : false,
});

export default client;
