CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE,
    price integer NOT NULL,
    category VARCHAR,
    popularity integer DEFAULT 0
);