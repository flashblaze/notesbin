# Server configuration

> This is still WIP

## How to get started

1. Install postgresql for your system

2. Create a database and table from the `psql` commandline:

`create databse notesbin;`

3. Replace `knexfile.js` with your credentials

4. Create `.env.development` and `.env.production` and copy the contents from `.env.example` to it

5. Replace the values accordingly

**Follow step 6 if migrations are not present**

6. Run `npx run migrate-create` to create migrations file and copy the content

```js
exports.up = function (knex) {
  return knex.schema.createTable("notesbin", (table) => {
    table.increments();
    table.text("note_hash");
    table.text("note");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("notesbin");
};
```

7. Run `npx run migrate-latest` to create the table with the necessary fields

**Follow step 8 if seeds are not present**

8. Run `npx run seed-create` to create seed file and copy the content

```js
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("notesbin")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("notesbin").insert([
        { id: 1, note_hash: "23d5fe1e-918a-449c-b708-3ac162ec10a0", note: "test1" },
        { id: 2, note_hash: "44ffdbc6-e3da-4848-a617-f87b1f6cefe9", note: "sample 1" },
      ]);
    });
};
```
