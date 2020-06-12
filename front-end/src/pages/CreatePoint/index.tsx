// arquivo responsavel pelo pagina de criação de points
// importando o react obrigatorio todo arquivo
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
// importando o componente LINK do pacote do react-DOM para fazer o sistemas de link da nossa pagina sem recarregamento
import {Link, useHistory } from 'react-router-dom'
// importando icone de flecha por lado da lib
import { FiArrowLeft } from 'react-icons/fi'
// importando as funçoes do map
import { Map, TileLayer, Marker} from 'react-leaflet'
// importando minha conexão com server/axios
import api from '../../services/api'
// importando o axios para fazer requisiçoes
import axios from 'axios'

import Dropzone from '../../components/Dropzone/index'

// importando o evento do mouse no leaflet
import { LeafletMouseEvent } from 'leaflet'

// importando o css pro arquivo
import './styles.css'
// importando minha logo
import logo from '../../assets/logo.svg'

/*
SEMPRE Q CRIAMOS UM ESTADO PRA UM ARRAY OU PRA UM OBJETO A GENTE PRECISA MANUALMENTE INFORMAR O TIPO DA VARIAVEL dentro dele
*/
interface Item {
  id: number
  title: string
  image_url: string
}
interface IBGEUFResponse {
  sigla: string
}
interface IBGECityResponse {
  nome: string
}

// criando a const que retorna o html da pagina CreatePoint
const CreatePoint =  () => {
  /* criando meus estados. */
  /* criando a const estado ITEMS  e a função q altera esse estado setItems PARA ARMAZEZAR MEUS ITEMS VINDOS DO SERVER
  aqui eu declaro o type do meu estado ITEMS *** e tem q colocar os [] */
  const [items, setItems] = useState<Item[]>([])
  // estado que ira armazenar as ufs do Brasil para o cliente selecionar
  const [ufs, setUfs] = useState<string[]>([])
  // estado que ira armazenar as cidades baseadas na UF que o cliente selecionar.
  const [ Citys, setCitys] = useState<string[]>([])
  // estado que ira armazenar a posiçao inicial do mapa que ira ser a posição do cliente
  const [ InitialPosition, setInitialPosition] = useState<[number, number]>([0, 0])
  // estado q ira armazenar os dados do formulario 
  const [ formData, setFormData ] = useState({
    name: '',
    email: '',
    whatsapp: ''
  })
  // estado que ira receber os items que o cliente escolher 
  const [ selectedItems, setSelectedItems] = useState<number[]>([])
  // estado que ira armazenar o estado que o cliente escolher
  const [ selectedUf, setSelectedUf] = useState('0')
  // estado que ira armazenar a cidade que o cliente escolher
  const [ selectedCity, setSelectedCity] = useState('0')
  // estado que ira armazenar a posição no mapa que o cliente escolher
  const [ selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])

  const [selectedFile, setSelectedFile] = useState<File>()
  
  const history = useHistory()

  // aqui eu to criando uma função que recebe o valor do meu select toda vez q ele for alterado e armazena na const UF
  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value

    setSelectedUf(uf)
  }
  // função que recebe o valor da cidade que o cliente seleciona e armazena no estado selectedCity
  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value

    setSelectedCity(city)
  }
  // função que recebe o valor da long e lat e o cliente seleciona selectedPosition
  function handleMapClick(event: LeafletMouseEvent ) {
    setSelectedPosition([
      event.latlng.lat,
      event.latlng.lng
    ])
  }
  // função que recebe os valores dos inputs Nome, Email, Whatsapp
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const {name, value} = event.target

    setFormData({ ...formData, [name]: value })
  }
  // função que recebe os ids dos items que o cliente seleciona
  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex(item => item === id)
    
    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id)

      setSelectedItems(filteredItems)
    } else {
      setSelectedItems([...selectedItems, id ])
    }
  }
  // função que pega todos os valores e envia pro back-end
  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const { name, email, whatsapp } = formData
    const uf = selectedUf
    const city = selectedCity
    const [ latitude, longtude ] = selectedPosition
    const items = selectedItems

    const data = new FormData()

    data.append('name', name)
    data.append('email', email)
    data.append('whatsapp', whatsapp)
    data.append('uf', uf)
    data.append('city', city)
    data.append('latitude', String(latitude))
    data.append('longtude', String(longtude))
    data.append('items', items.join(','))
    
    if (selectedFile) {
      data.append('image', selectedFile)
    }

    await api.post('points', data)

    alert('ponto de coleta criado!!')

    history.push('/')
  }
  
  /* useEffect é um soluçao para nosso problema com o fato de fazer varias requisiçoes toda vez q a pagina for alterada
  useEffect é um função q recebe 2 parametros o primeiro parametro é qual função eu quero executar
  o segundo parametro é quando eu quero executar para eu determinar quando executar essa função eu passo no segundo parametro
  um estado ou algo, e quando esse algo for alterado a função sera disparada, se eu nao colocar nd no seguindo parametro a funçaõ
  sera executada a primeira vez q o nosso Elemento for chamado/exibido em tela
  *** aqui eu buscando os items do meu server */
  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data)
    })
  }, [])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords

      setInitialPosition([latitude, longitude])
    })
  }, [])

  // aqui eu estou buscando as ufs do br e guardando no meu estado ufInitials
  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla)

      setUfs(ufInitials)
    })
  }, [])
  
  useEffect(() => {
    if (selectedUf ===  '0') {
      return
    }

    axios
      .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(response => {
      const cityNames = response.data.map(city => city.nome)

      setCitys(cityNames)
    })


    // carregar as cidades sempre que a uf mudar
    console.log('mudou')
  }, [selectedUf])


  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta"/>

        <Link to='/' >
          <FiArrowLeft />
          Voltar para Home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>Cadastro do <br/> ponto de coleta</h1>

        <Dropzone onFileUploaded={setSelectedFile} />

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input 
            type="text"
            name="name"
            id="name"
            onChange={handleInputChange}/> 
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input 
              type="email"
              name="email"
              id="email" 
              onChange={handleInputChange}/> 
            </div>
            <div className="field">
              <label htmlFor="name">Whatsapp</label>
              <input 
              type="text"
              name="whatsapp"
              id="whatsapp"
              onChange={handleInputChange} /> 
            </div>
          </div>
        </fieldset>


        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={InitialPosition} zoom={15} onClick={handleMapClick} >
            <TileLayer 
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={selectedPosition} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select 
              name="uf" 
              id="uf" 
              value={selectedUf} 
              onChange={handleSelectUf}
              >
                <option value="0">Selecione uma UF</option>
                {ufs.map(uf => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select 
                name="city" 
                value={selectedCity}
                onChange={handleSelectCity}
                id="city">
                <option value="0">Selecione uma cidade</option>
                {Citys.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Item de coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>
          
          <ul className="items-grid">
            {items.map(item => (
              // aqui eu coloco um propiedade key no meu li, por que o react pede uma chave de indentificação quando fazer alguma mudança em arrays
              <li 
              key={item.id} 
              onClick={() => handleSelectItem(item.id)}
              className={selectedItems.includes(item.id) ? 'selected ': ''}
              >
                <img src={item.image_url} alt={item.title}/>
                <span>{item.title}</span>
            </li>
            ))}
            
          </ul>
        </fieldset>
        <button type="submit">
          Cadastrar ponto de coleta
        </button>
      </form>
    </div>
  )
}

// esportando a const
export default CreatePoint