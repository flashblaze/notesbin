const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: "5432",
});

const db = require("knex")({
  client: "pg",
  connection: `postgres://postgres:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:5432/${process.env.PG_DATABASE}`,
});

module.exports = {
  pool,
  db,
};
