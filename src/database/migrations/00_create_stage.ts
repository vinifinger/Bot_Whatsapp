import * as Knex from 'knex';

export async function up(knex: Knex) {
    await knex.schema.createTable('stage', table => {
        table.increments('stage').primary();
        table.string('description');
        table.string('message');
    });

    await knex('stage').insert({
        description: 'Hello',
        message: 'BOT - Olá, eu sou um BOT!!!'
    });

    return;
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('stage');
}