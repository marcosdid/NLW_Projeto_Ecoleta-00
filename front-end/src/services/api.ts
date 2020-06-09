// pagina q faz as requisiçoes pro meu back-end
// importando o axios
import axios from 'axios'

// const q ira ter as funçoes do axios
const api = axios.create({
  baseURL: 'http://localhost:3333'
})

// exportando axios
export default api