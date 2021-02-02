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
