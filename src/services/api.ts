import axios from "axios"

const instanciaAxios = axios.create({
  baseURL: "https://json-server-dashboard-lhjx.onrender.com",
})

export default instanciaAxios
