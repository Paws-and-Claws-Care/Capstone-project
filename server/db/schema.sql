/* =========================
   DROP (in dependency order)
   ========================= */
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;

DROP TABLE IF EXISTS forum_replies CASCADE;
DROP TABLE IF EXISTS forum_posts CASCADE;

DROP TABLE IF EXISTS pets CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;

DROP TYPE IF EXISTS pet_type_enum CASCADE;

/* =========
   USERS
   ========= */
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL
);

/* =========
   ENUMS
   ========= */
CREATE TYPE pet_type_enum AS ENUM ('dog', 'cat');

/* =========
   PRODUCTS
   ========= */
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  category VARCHAR NOT NULL,
  pet_type pet_type_enum NOT NULL,
  image_url TEXT NOT NULL,
  quantity INTEGER NOT NULL
);

/* =========
   PETS
   ========= */
CREATE TABLE pets (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR NOT NULL,
  breed VARCHAR,
  pet_type pet_type_enum NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

/* =========
   ORDERS
   - cart orders: is_cart = true, date = NULL
   - placed orders: is_cart = false, date = NOW()
   ========= */
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,

  -- ✅ allow NULL while order is a cart
  date TIMESTAMP NULL,

  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  pet_id INTEGER REFERENCES pets(id) ON DELETE SET NULL,

  is_cart BOOLEAN NOT NULL DEFAULT true,

  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

/* =========
   ORDER ITEMS
   - stores price snapshot at time of add/checkout
   ========= */
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,

  quantity INTEGER NOT NULL CHECK (quantity > 0),

  -- ✅ snapshot price at purchase time (do NOT read from products later)
  price_at_purchase NUMERIC(10,2) NOT NULL CHECK (price_at_purchase >= 0),

  UNIQUE (order_id, product_id)
);

/* =========
   FORUM POSTS
   ========= */
CREATE TABLE forum_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  category VARCHAR(50) NOT NULL DEFAULT 'General',
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

/* =========
   FORUM REPLIES
   ========= */
CREATE TABLE forum_replies (
  id SERIAL PRIMARY KEY,
  post_id INTEGER NOT NULL REFERENCES forum_posts(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
