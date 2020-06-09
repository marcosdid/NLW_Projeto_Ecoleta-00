// CRIAÇÃO DA TABELA POINTS

// importando o knex ** com o K maisculo, para que usando o typescript possamos declarar o type do parametro knex E USAR A INTELIGENCIA DA IDLE
import Knex from 'knex'

// CRIAR A TABELA POINTS 
export async function up(knex: Knex) {
  // criando tabela, a função createTable() recebe dois parametros o nome da tabela e uma função com os campos da minha tabela
  return knex.schema.createTable('points', table => {
    // increments é um autoencremendo que ira acrecentar um numero a cada tabela exemplo: 1, 2, 3, 4 , que servira como identificador da tabela 
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable()
    table.string('whatsapp').notNullable();
    table.decimal('latitude').notNullable();
    table.decimal('longtude').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  })
}

// VOLTAR ATRAS/ DELETAR A TABELA 
export async function down(knex: Knex) {
  return knex.schema.dropTable('points')
}
