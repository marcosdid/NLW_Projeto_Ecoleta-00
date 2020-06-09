// ARQUIVO CONTROLADOR DE ITEMS

// importando request e response para poder declarar o tipo nos parametros do metodo create da classe
import {Request, Response} from 'express'
// importando minha conexão com o banco de dados
import knex from '../database/connection'

// classe que ira "herdar" os metodos controles dos items
class itemController {
  async index (request: Request, response: Response)  {
    // pegando todos os items da tabela ITEMS
    const items = await knex('items').select('*')
    
    /* 
    Aqui eu pego os items e faço um tratamento nele usando o metodo .map, e crio a const serialized 
    que nele em vez de retornar o nome do arquivo da pasta upload, ele retorna o link direto pro item***
    */ 
    const serializedItens = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://192.168.0.117:3333/uploads/${item.image}`
      }
    })

    // retornando essa lista de items
    return response.json(serializedItens)
  }
}

// exportando minha classe
export default itemController