// ARQUIVO QUE ESTABELECE A CONEXÃO COM O BANCO DE DADOS

// importando o knex
import knex from 'knex'
// importando a biblioteca path //O módulo Path fornece uma maneira de trabalhar com diretórios e caminhos de arquivo.
import path from 'path'

// aqui eu crio uma constante connection, que contem todos os dados do banco de dados
const connection = knex({
  client: 'sqlite3',
  connection: {
    /* filename é aonde vamos armazenar o arquivo do nosso bando de dados nele eu passo 2 parametros, o local aonde o arquivo vai ficar e o nome dele
     a função path.resolve() une caminhos facilitando nossa vida
    __dirname é uma variavel global que contem o caminho pro diretorio que ela foi chamada*/
    filename: path.resolve(__dirname, 'database.sqlite')
  },
  useNullAsDefault: true,
})

// exportando connection
export default connection 