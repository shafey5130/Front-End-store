CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    userid INTEGER,
    status TINYINT DEFAULT 0,
    CONSTRAINT orders_users_userid FOREIGN KEY(userid) REFERENCES users(id)
);