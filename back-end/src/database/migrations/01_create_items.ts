import Knex from 'knex'

// CRIAR A TABELA ITEMS
export async function up(knex: Knex) {
  // criando tabela, a função createTable() recebe dois parametros o nome da tabela e uma função com os campos da minha tabela
  return knex.schema.createTable('items', table => {
    // increments é um autoencremendo que ira acrecentar um numero a cada tabela exemplo: 1, 2, 3, 4 , que servira como identificador da tabela 
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('title').notNullable()
  })
}

// VOLTAR ATRAS/ DELETAR A TABELA 
export async function down(knex: Knex) {
  return knex.schema.dropTable('items')
}
