# Storefront Backend Project

You can find database schema and api endpoints in the [REQUERMENTS.md](REQUIREMENTS.md) file

## How to run the project

### Installing packages

To be able to run storefront backend, you need to install the dependencies first.
To install dependencies:

```
yarn
```

### Setup and connect to database

This backend uses postgres database that runs on port 5500.

- Create user:

```sql
CREATE USER storefront_user WITH PASSWORD 'password@storefront123';
```

- Create backend database and give the user all access to database:

```sql
CREATE DATABASE storefront;
\c storefront;
GRANT ALL PRIVILEGES ON DATABASE storefront TO storefront_user;
```

- Create Testing database and give the user all access to database:

```sql
CREATE DATABASE storefront_test;
\c storefront_test;
GRANT ALL PRIVILEGES ON DATABASE storefront_test TO storefront_user;
```

- To apply the database schema changes like what provided in [REQUERMENTS.md](REQUIREMENTS.md) file:

```
yarn add -g db-migrate
yarn upmig
```

- To reset the database schema changes:

```
yarn resmig
```

### Setup environment variables

You have to make an `env` file in the root of the project that include the following informations.

```
postgres_host=localhost
postgres_db=storefront
postgres_db_test=storefront_test
postgres_user=storefront_user
postgres_password=password@storefront123
postgres_port=5500
ENV=dev
salt_rounds=10
pepper_password=sic-mundus
jwt_token=sic-mundus-creatus-est
saved_jwttoken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTg4NjA2MDl9.48FOgQ8K0nHUUVpOLGuLgAzjlS_Y82qLB2zexhGRmHM
```

## Start the backend

- To run the backend:

```
yarn watch
```

- You can also run the backend using nodemon by use the following command:

```
yarn start
```

### Testing backend

- To test backend:

```
yarn test
```

### End Points

- The api endpoints is included and described in the [REQUERMENTS.md](REQUIREMENTS.md) file.

### Backend Ports

- The server is running on port 3000.
- The database is running on port 5500.

### Aunhtentication

- The backend use JWT(jsonwebtoken) library to generate tokens.
- To provide tokens to backend you have to pass the token to the header of the request as following:

```
{
    'authorization': "Bearer <token>"
}
```

- You can get your token from login and create endpoints that described in the [REQUERMENTS.md](REQUIREMENTS.md) file.
