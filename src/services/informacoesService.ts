import instanciaAxios from "./api"

export interface Informacoes {
  id: number
  foto: string
  nome: string
  cargo: string
  resumo: string
}

export async function updateInformacoes(informacoes: Informacoes) {
  const response = await instanciaAxios.put<Informacoes>(
    "/informacoes/1",
    informacoes
  )
  return response.data
}

export async function getInformacoes() {
  const response = await instanciaAxios.get<Informacoes>("/informacoes/1")
  return response.data
}
