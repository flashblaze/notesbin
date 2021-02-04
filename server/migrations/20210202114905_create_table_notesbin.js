exports.up = function (knex) {
  return knex.schema.createTable("notesbin", (table) => {
    table.increments().primary();
    table.text("note_hash").notNull();
    table.text("note").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("notesbin");
};
