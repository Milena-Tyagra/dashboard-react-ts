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
  const response = await instanciaAxios.post<Projeto>(
    "/Projetos/",
    projeto
  )
  return response.data
}

export async function listarProjetos() {
  const response = await instanciaAxios.get<Projeto>("/projetos/")
  return response.data
}

export async function atualizarProjeto(projeto: Projeto) {
  const response = await instanciaAxios.put<Projeto>(
    `/Projetos/${projeto.id}`,
    projeto
  )
  return response.data
}

export async function deletarProjeto(projeto: Projeto) {
  const response = await instanciaAxios.delete<Projeto>(
    `/Projetos/${projeto.id}`
  )
  return response.data
}
