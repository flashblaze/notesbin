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
