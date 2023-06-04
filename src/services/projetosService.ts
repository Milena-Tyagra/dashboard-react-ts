import instanciaAxios from "./api"

export interface Projeto {
  id?: number
  titulo: string
  descricao: string
  tecnologias: string[]
  link_repositorio: string
  link_aplicacao: string
}

export async function criarProjeto(projeto: Projeto) {
  const response = await instanciaAxios.post<Projeto>("/portfolio/", projeto)
  return response.data
}

export async function listarProjetos() {
  const response = await instanciaAxios.get<Projeto[]>("/portfolio/")
  return response.data
}

export async function atualizarProjeto(projeto: Projeto) {
  const response = await instanciaAxios.put<Projeto>(
    `/portfolio/${projeto.id}`,
    projeto
  )
  return response.data
}

export async function deletarProjeto(projeto: Projeto) {
  const response = await instanciaAxios.delete<Projeto>(
    `/portfolio/${projeto.id}`
  )
  return response.data
}
