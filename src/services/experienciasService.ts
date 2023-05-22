import instanciaAxios from "./api"

export interface Experiencia {
  id?: number
  empresa: string
  periodo: string
  descricao: string
}

export async function criarExperiencia(experiencia: Experiencia) {
  const response = await instanciaAxios.post<Experiencia>(
    "/experiencias/",
    experiencia
  )
  return response.data
}

export async function listarExperiencia() {
  const response = await instanciaAxios.get<Experiencia[]>("/experiencias/")
  return response.data
}

export async function atualizarExperiencia(experiencia: Experiencia) {
  const response = await instanciaAxios.put<Experiencia>(
    `/Experiencias/${experiencia.id}`,
    experiencia
  )
  return response.data
}

export async function deletarExperiencia(experiencia: Experiencia) {
  const response = await instanciaAxios.delete<Experiencia>(
    `/Experiencias/${experiencia.id}`
  )
  return response.data
}
