import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"

import Layout from "../components/layout"
import Home from "../pages/home"
import Informacoes from "../pages/curriculo/informacoes"

import ListaCertificacoes from "../pages/curriculo/listaCertificacoes"
import ListaExperiencias from "../pages/curriculo/listaExperiencias"
import ListaPortfolios from "../pages/portfolio/listaProjetos"
import { useAuth } from "../context/AuthContext"
import Titulo from "../components/common/titulo"

const AppRoutes: React.FC = () => {
  const { autenticado, carregando } = useAuth()

  if (carregando) {
    return <Titulo>Carregando...</Titulo>
  }

  if (!autenticado) {
    return <Navigate to="/login" />
  }
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/curriculo/informacoes/cadastro"
          element={<Informacoes />}
        />
        <Route
          path="/curriculo/certificacoes"
          element={<ListaCertificacoes />}
        />
        <Route path="/curriculo/experiencias" element={<ListaExperiencias />} />
        <Route path="/porfolio/projetos" element={<ListaPortfolios />} />
      </Routes>
    </Layout>
  )
}

export default AppRoutes
