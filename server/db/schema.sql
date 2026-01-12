DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TYPE IF EXISTS pet_type_enum CASCADE;


CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL

);
CREATE TYPE pet_type_enum AS ENUM ('dog', 'cat');
CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    category VARCHAR NOT NULL,
    pet_type pet_type_enum NOT NULL,
    image_url TEXT NOT NULL,
    quantity INTEGER NOT NULL
);

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pet_id INTEGER REFERENCES pets(id) ON DELETE SET NULL,
    is_cart BOOLEAN NOT NULL DEFAULT true
);


CREATE TABLE order_items(
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    UNIQUE (order_id, product_id)
);


CREATE TABLE pets (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR NOT NULL,
  breed VARCHAR,
  pet_type pet_type_enum NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);