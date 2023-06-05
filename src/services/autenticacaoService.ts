import api from "./api"

export interface Usuario {
  id?: number
  email: string
  senha: string
}

export async function login(usuario: Usuario): Promise<Usuario> {
  const response = await api.post<Usuario>("/auth/login", usuario)
  return response.data
}
