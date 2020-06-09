// arquivo que contem algumas informaçoes sobre o BD para poder executar as migrates

//importando a bibli path
import path from 'path'

// estamos usanddo module.exports pq o knex n suporta a syntax export default
module.exports = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations')
  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'database', 'seeds')
  },
  useNullAsDefault: true,
}

