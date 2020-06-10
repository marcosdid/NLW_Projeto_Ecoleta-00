// ARQUIVO DE CONTROLE DOS POINTS


// importando request e response para poder declarar o tipo nos parametros do metodo create da classe
import { Request, Response} from 'express'
// importando minha conexão com o banco de dados
import Knex from '../database/connection'

// classe que ira "herdar" os metodos controles dos points
class PointsController {
  //listar points por cidade, estado ou itens
  async index(request: Request, response: Response) {

    // recebendo do request.query os dados q eu quero filtrar
    const {city, uf, items} = request.query

    /* os dados dos items estao vindo em forma de String, aqui eu estou convertendo para uma array
    aqui eu separado os itens na virgula
    aqui eu percorro estes itens excluidos os espaços e tornando eles numa array de numeros */
    const paserdItems = String(items).split(',').map(item => Number(item.trim()))

    /* 
    aqui eu pego os points que teem a cidade, uf ou items passados no query
    */
    const points = await Knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', paserdItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*')

    return response.json(points)
  }

  // metodo para listar 1 point
  async show(request: Request, response: Response) {
    // aqui eu recebo do requestparams o id do point quero mostras
    const { id } = request.params
    // aqui eu busco o point na tabela point pelo id **metodo first é usado para que a variavel seja um string n é uma array
    const point = await Knex('points').where('id', id).first()

    // aqui eu coloca uma condição que se o point n existe ele da erro
    if(!point) {
      return response.status(400).json({message: 'Point not found'})
    }

    /* 
    SELECT * FROM itens
      JOIN point_itens ON items.id = point_itens.item_id
      WHERE point_itens.point_id = {id}
    */

    // aqui eu coloco dentro da const items todos os items com relação a o point solicitado
    const items = await Knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title')

    // retornando o point e os items
    return response.json({point, items})
  }

  async create(request: Request, response: Response) {
    // recendo do request.body os dados dos points e separando via desestruturação cada um em uma variavel
    const {
      name, email, whatsapp, latitude, longtude, city, uf, items} = request.body
    
    /*console.log({name,email,
      whatsapp,
      latitude,
      longtude,
      city,
      uf,
      items})*/

    /*
    transaction é uma função do knex que serve para: se tivermos mais de 1 requisição 
    e alguma dessas requisiçoes der erro nenhuma é executada, assim prevenindo que,
    mesmo uma requisição tenha dado erro as outras que podem depender dql nao seja executadas.
    */
    const trx = await Knex.transaction()
    
    // criando a const points com todos os dados da point
    const point = {
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
      name,
      email,
      whatsapp,
      latitude,
      longtude,
      city,
      uf
    }

    /*
    criando o point dentro da tabela points passando os dados que recebemos 
    o metodo insert retorna os ids do dados que foram inseridos que iram pra variavel IDS
    */ 
    const insertedIds = await trx('points').insert(point)
  
    // colocando o id dentro de point_id
    const point_id = insertedIds[0]
  
    // Aqui eu crio uma const com os id dos items e o id da tabela points para fazer o pivo entre as duas tabelas
    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id
      }
    })
    
    // aqui eu crio na tabela point_items o pointItem
    await trx('point_items').insert(pointItems)
    
    // apos todas as requisições é necessario fazer um commit para confirmar 
    await trx.commit()
    
    return response.json({
      id: point_id,
      ...point,
    })
  }
}

export default PointsController