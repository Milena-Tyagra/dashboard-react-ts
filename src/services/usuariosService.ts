import instanciaAxios from "./api"

export interface Usuario {
  id: number;
  email: string;
  senha: string;
}

export async function buscarUsuarioPeloEmail(email: string): Promise<Usuario> {
  const response = await instanciaAxios.get(`usuarios`, {params: {email}});
  return response.data[0]
}