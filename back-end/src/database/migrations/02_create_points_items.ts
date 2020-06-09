/* 
CRIAR A TABELA POINTS_ITEMS 
Na tabela point_items eu preciso guarda o id do points e os ids dos items
*/

import Knex from 'knex'

export async function up(knex: Knex) {
  // criando tabela, a função createTable() recebe dois parametros o nome da tabela e uma função com os campos da minha tabela
  return knex.schema.createTable('point_items', table => {
    // increments é um autoencremendo que ira acrecentar um numero a cada tabela exemplo: 1, 2, 3, 4 , que servira como identificador da tabela 
    table.increments('id').primary();

    // no campo 'point_id' eu coloco a referencia e qual a tabela onde ela fica
    table.integer('point_id')
    .notNullable()
    .references('id')
    .inTable('points')

    // no campo item_id, eu guardo os ids dos items que ira conter no point
    table.integer('item_id')
    .notNullable()
    .references('id')
    .inTable('items')
  })
}

// VOLTAR ATRAS/ DELETAR A TABELA 
export async function down(knex: Knex) {
  return knex.schema.dropTable('point_items')
}
