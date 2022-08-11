CREATE TABLE order_products(
    id SERIAL PRIMARY KEY,
    quantity integer NOT NULL,
    order_id integer REFERENCES orders(id),
    product_id integer REFERENCES products(id)
);