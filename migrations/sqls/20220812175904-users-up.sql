CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(191),
    last_name VARCHAR(191),
    username VARCHAR(191) UNIQUE,
    password VARCHAR(191)
);