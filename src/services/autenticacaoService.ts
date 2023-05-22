import  { Usuario, buscarUsuarioPeloEmail } from "./usuariosService"

export interface LoginData {
  email: string
  senha: string
}

export async function login(loginData: LoginData): Promise<Usuario> {
  const usuario = await buscarUsuarioPeloEmail(loginData.email)

  if (usuario && usuario.senha === loginData.senha) {
    return usuario
  } else {
    throw new Error("Email e/ou senha inválido(s)")
  }
}