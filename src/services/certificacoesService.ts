import instanciaAxios from "./api"

export interface Certificacao {
  id?: number
  titulo: string
  instituicao: string
}

export async function criarCertificacao(certification: Certificacao) {
  const response = await instanciaAxios.post<Certificacao>(
    "/certificacoes/",
    certification
  )
  return response.data
}

export async function listarCertificacoes() {
  const response = await instanciaAxios.get<Certificacao>("/certificacoes/")
  return response.data
}

export async function atualizarCertificacao(certification: Certificacao) {
  const response = await instanciaAxios.put<Certificacao>(
    `/certificacoes/${certification.id}`,
    certification
  )
  return response.data
}

export async function deletarCertificacao(certification: Certificacao) {
  const response = await instanciaAxios.delete<Certificacao>(
    `/certificacoes/${certification.id}`
  )
  return response.data
}
