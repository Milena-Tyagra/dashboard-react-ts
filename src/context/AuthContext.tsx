import React, { createContext, useContext, useEffect, useState } from "react"

import { Usuario } from "../services/usuariosService"

interface AuthContextProps {
  autenticado: boolean
  usuario: Usuario
  login: (usuario: Usuario) => void
  logout: () => void
  carregando: boolean
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: React.FC = ({ children }) => {
  const [autenticado, setAutenticado] = useState(false)
  const [usuario, setUsuario] = useState({} as Usuario)
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario")
    if (storedUser && storedUser !== "undefined") {
      setUsuario(JSON.parse(storedUser))
      setAutenticado(true)
    }
    setCarregando(false)
  }, [])

  const login = (usuarioLogado: Usuario) => {
    setUsuario(usuarioLogado)
    setAutenticado(true)
    localStorage.setItem("usuario", JSON.stringify(usuarioLogado))
  }

  const logout = () => {
    setUsuario({} as Usuario)
    setAutenticado(false)
    localStorage.removeItem("usuario")
  }

  return (
    <AuthContext.Provider
      value={{ autenticado, usuario, login, logout, carregando }}
    >
      {children}
    </AuthContext.Provider>
  )
}
