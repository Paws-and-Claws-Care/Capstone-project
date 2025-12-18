import db from "./client.js";
import seed from "./seed.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");
