CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(191),
    price INTEGER,
    category VARCHAR(191) DEFAULT('uncategory'),
    userid INTEGER,
    CONSTRAINT products_users_userid FOREIGN KEY(userid) REFERENCES users(id)

);