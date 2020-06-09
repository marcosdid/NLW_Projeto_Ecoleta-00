// arquivo principal do meu projeto ** primeiro a ser executado
// importando o react ** OBRIGATORIO
import React from 'react';
// importando o ReactDOM para poder mexer com a arvore dom do meu html
import ReactDOM from 'react-dom';
// importando a função aonde esta o esqueleto da minha pasta do arquivo app.tsx
import App from './App';


// Colocando o ReactDom para renderizar meu app(esqueleto da pagina) no elemento com o id=root
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
