import * as Knex from 'knex';

export async function up(knex: Knex) {
    await knex.schema.createTable('user', table => {
        table.increments('id').primary();
        table.string('phone');
        table.integer('stage').unsigned();
        table.foreign('stage').references('stage.stage');
    });

    await knex('stage').insert({
        phone: '5551994543670@c.us',
        stage: 1
    });

    return;
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('user');
}