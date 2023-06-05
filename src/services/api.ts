import axios from "axios"

const apiUrl = "https://site-pessoal-api-cuhk.onrender.com/api"
// const apiUrl = import.meta.env.VITE_API_URL
const instanciaAxios = axios.create({
  baseURL: apiUrl,
})

export default instanciaAxios
