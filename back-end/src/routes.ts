// ARQUIVO QUE CUIDA DAS ROTAS DA MINHA APLICAÇÃO


// importanto o espress
import express from 'express'
//importando minha classe pointcontroller 
import PointController from './controllers/pointController'
// importando minha classe itemcontroller
import ItemController from './controllers/itemController'


// fazendo a const routes ficar responsavel pelas rotas da minha aplicação
const routes = express.Router()
// colocando os atributos do classe na const
const pointController = new PointController
// colocando os atributos do classe na const
const itemController = new ItemController


// AQUI é uma rota que lista todos meus items na tabela ITEMS
routes.get('/items', itemController.index )


// criando a rota para criação de points 
routes.post('/points', pointController.create)

// crinado a rota quer lista um point especifico por id
routes.get('/points/:id', pointController.show)
routes.get('/points', pointController.index)


//exportando minhas rotas
export default routes
