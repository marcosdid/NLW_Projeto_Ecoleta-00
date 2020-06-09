// SERVER DA MINHA APLICAÇÃO// arquivo principal

// Importando o express ** instalei o pacote de types do espress pra poder usar o typescript *****npm install @types/express -D
import express from 'express'
// importando minhas rotas para dentro do meu server
import routes from './routes'

import cors from 'cors'

import path from 'path'

// criando minha aplicação ** colocando dentro de app as funçoes express
const app = express()

// cors permite qual url vai acessar nossa api, no caso aq ele ta aceitando todas
app.use(cors())

// Fazendo minha aplicação entender o formato JSON
app.use(express.json())

// colocando minha aplicaçao pra usar minhas routes
app.use(routes)

/*
Para podermos acessar os arquivos da pasta upload pelo navegador
/uploado primeiro parametro é fixo a rota s e o segundo é
a imagem, entao passados que ele é estatico depois o caminho ate ele
*/ 
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

// colocando meu app pra ouvir a porta (3333)
app.listen(3333)
