# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index `route: '/api/products'` [GET]
- Show `route: '/api/products/:id'` [GET]
- Create [token required] `route: '/api/products'` [POST]

```
request body({name: string, price: number, category: string})
```

- [ADDED] Update [token required] `route: '/api/products'` [PUT]

```
request body({id: number, name: string, price: number, category: string})
```

- [ADDED] Delete [token required] `route: '/api/products/:id'` [DELETE]
- [OPTIONAL] Top 5 most popular products `route: '/api/top/products'` [GET]
- [OPTIONAL] Products by category (args: product category) `route: '/api/products/category/:cat'` [GET]

#### Users

- Index [token required] `route: '/api/users'` [GET]
- Show [token required] `route: '/api/users/:id'` [GET]
- Create N[token required] `route: '/api/users'` [POST]

```
request body({user_name: string, first_name: string, last_name: string, password: string})
```

- [ADDED] Login `route: '/api/users/login'` [POST]

```
request body({user_name: string, password: string})
```

- [ADDED] Update [token required] `route: '/api/users'` [PUT]

```
request body({id: number, user_name: string, first_name: string, last_name: string, password: string})
```

- [ADDED] Delete [token required] `route: '/api/users/:id'` [DELETE]

#### Orders

- Current Order by user (args: user id)[token required] `route: '/api/orders/current/:user_id'` [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required] `route: '/api/orders/completed/:user_id'` [GET]
- [ADDED] Index [token required] `route: '/api/orders'` [GET]
- [ADDED] Create [token required] `route: '/api/orders'` [POST]

```
request body({user_id: string});
```

- [ADDED] Update Status [token required] `route: '/api/orders/status'` [PUT]

```
request body({order_id: string})
```

- [ADDED] Delete [token required] `route: '/api/orders/:id'` [DELETE]
- [ADDED] Add Product [token required] `route: '/api/orders/product'` [POST]

```
request body({order_id: string, product_id: string, quantity: number})
```

## Data Shapes

#### Product

- id: serial [primary key]
- name: varchar
- price: number
- [OPTIONAL] category: varchar
- popularity: number

```sql
CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE,
    price integer NOT NULL,
    category VARCHAR,
    popularity integer DEFAULT 0
);
```

#### User

- id: serial [primary key]
- user_name: varchar
- firstName: varchar
- lastName: varchar
- password: varchar

```sql
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    user_name VARCHAR NOT NULL UNIQUE,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    password VARCHAR NOT NULL
);
```

#### Orders

- id: serial [primary key]
- user_id: number [foreign key to User table]
- status of order (active or complete): ENUM ('active', 'complete')

```sql
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES users(id),
    status statusDT NOT NULL
);
```

#### Order_products

- id: number
- quantity of each product in the order: number
- order_id: number [foreign key to Order table]
- product_id: number [foreign key to Product table]

```sql
CREATE TABLE order_products(
    id SERIAL PRIMARY KEY,
    quantity integer NOT NULL,
    order_id integer REFERENCES orders(id),
    product_id integer REFERENCES products(id)
);
```
