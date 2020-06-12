// ARQUIVO QUE CUIDA DAS ROTAS DA MINHA APLICAÇÃO


// importanto o espress
import express from 'express'

import { celebrate, Joi } from 'celebrate'
//importando minha classe pointcontroller 
import PointController from './controllers/pointController'
// importando minha classe itemcontroller
import ItemController from './controllers/itemController'

import multer from 'multer'
import multerConfing from './config/multer'
 
// fazendo a const routes ficar responsavel pelas rotas da minha aplicação
const routes = express.Router()

const upload = multer(multerConfing)



// colocando os atributos do classe na const
const pointController = new PointController
// colocando os atributos do classe na const
const itemController = new ItemController


// AQUI é uma rota que lista todos meus items na tabela ITEMS
routes.get('/items', itemController.index )




// criando a rota para criação de points 
routes.post(
  '/points',
  upload.single('image'), 
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required(),
      whatsapp: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string().required()
    })
  }, {
    abortEarly: false
  }),
  pointController.create)




// crinado a rota quer lista um point especifico por id
routes.get('/points/:id', pointController.show)
routes.get('/points', pointController.index)


//exportando minhas rotas
export default routes
