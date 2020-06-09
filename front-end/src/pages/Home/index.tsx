// pagina responsavel pela HOME da minha aplição

// importando o react * obrigatorio em toda pagina
import React from 'react'
// importando o icone FiloIN da lib react-icons
import { FiLogIn } from 'react-icons/fi'
// importando o componente LINK do pacote do react-DOM para fazer o sistemas de link da nossa pagina sem recarregamento
import { Link } from 'react-router-dom'

// importando o css da pagina
import './styles.css'
// importando a logo da pagina
import logo from '../../assets/logo.svg'

// criando a const que ira retornar o html da pagina Home
const Home = () => {
  return (
    // div que ira contem a pagina home
    <div id="page-home">
      {/* div com o conteudo é feito uma div dentro da outra pq assim podemos deixar a div content
      centralizada no meio da page-home*/}
      <div className="content">
        {/* cabeçalho da pagina*/}
        <header>
          {/* logo da pagina */}
          <img src={logo} alt="Ecoleta"/>
        </header>
        {/* Main é o conteudo principal */}
        <main>
          <h1>Seu marketplace de coleta de residuos</h1>
          <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</p>
          
          <Link to="/create-point">
            <span>
              <FiLogIn />
            </span>
            <strong>cadaste um ponto de coleta</strong>
          </Link>
        </main>
      </div>
    </div>
  )
}

// exportando a pagina Home
export default Home