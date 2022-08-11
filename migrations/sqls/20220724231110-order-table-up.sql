CREATE TYPE statusDT AS ENUM ('active', 'completed');
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES users(id),
    status statusDT NOT NULL
);