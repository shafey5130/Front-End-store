CREATE TABLE IF NOT EXISTS products_order(
    id SERIAL PRIMARY KEY,
    product_id INTEGER,
    order_id INTEGER
);