import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("comments", (table) => {
    table.increments("id").primary();

    table.string("comment", 4000).notNullable();
    table.string("speech").notNullable();
    table.string("speechLang").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("comments");
}
