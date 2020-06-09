/*
AQUI EU USO UMA FERRAMENTA CHAMADA SEEDS DO KNEX PARA CRIAR TABELAS PADROES NA TABLEA **ITEMS**
QUE SÃO OS ITEMS PADROES DO NOSSO SITEMA, LAMPADAS, BATERIAS, PAPEIS, RESIDUOS, E OLEO
*/

// importando o knex ** com o K maisculo, para que usando o typescript possamos declarar o type do parametro knex E USAR A INTELIGENCIA DA IDLE
import Knex from 'knex'

export async function seed(knex: Knex) {
  await knex('items').insert([
    { title: 'Lâmpadas', image: 'Lampadas.svg'},
    { title: 'Pilhas e Baterias', image: 'Baterias.svg'},
    { title: 'Papéis e Papelão', image: 'papeis-papelao.svg'},
    { title: 'Residuos Eletrônicos', image: 'eletronicos.svg'},
    { title: 'Residuos Orgânicos', image: 'organicos.svg'},
    { title: 'Ôleo de Cozinha', image: 'oleo.svg'}
  ])
}

