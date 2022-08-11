CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    user_name VARCHAR NOT NULL UNIQUE,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    password VARCHAR NOT NULL
);