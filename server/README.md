# server

Server is built using:

- [express](https://expressjs.com/)
- [postgresql](https://www.postgresql.org/)
- [knex](http://knexjs.org/)

## Installation

1. Install postgresql and create a database

2. Create `.env.development` and `.env.production`, copy the contents from `.env.example` to it and replace the values with the ones when you created the database

- `CORS_URL` - url on which the client is running

- `PG_HOST` - would mostly be `localhost`

3. Install the dependencies by running `yarn`

4. Run `npx run migrate-latest` to create the table with the necessary fields

## Running locally

Run `npm run dev` which will use `.env.development` file for variables

## Running on server

Run `npm start` which will use `.env.production` file for variables
