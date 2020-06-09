// ARQUIVO AONDE FICA O ESQUELETO DA MINHA PAGINA *****************
// TODOS OS ARQUIVOS NO REACT É OBRIGATORIO IMPORTAR O REACT** importando o useState
import React from 'react';

// importando o css da minha aplicação css global***
import './App.css';

// importando a rota da minha aplicação
import Route from './routes'

// JSX: Sintaxe de XML dentro do Javascript

// função principal q ira retornar todo meu app
function App() {
  // retornando a rotas da minha aplicação 
  return (
    <Route />
  );
}

// exportando minha função
export default App;
