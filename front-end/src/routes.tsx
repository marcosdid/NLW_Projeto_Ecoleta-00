// arquivo responsavel pelas rotas da minha aplicação**8
// importando o react routes e o BrowzerRouter
import React from 'react'
// importando componentes do react-routes-dom
import { Route, BrowserRouter } from 'react-router-dom'

// importando minhas paginas para colocalas nas rotas
import Home from './pages/Home'
import CreatePoint from './pages/CreatePoint'

// const q ira retornar minhas rotas com minhas paginas ***
const Routes = () => {
  return (
    <BrowserRouter >
    {/* Importando minha Home */}
      <Route component={Home} path="/" exact />
      {/* Importando minha create-point */}
      <Route component={CreatePoint} path="/create-point" />
    </BrowserRouter>
  )
}

// importando minhas rotas
export default Routes