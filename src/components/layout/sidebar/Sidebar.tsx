import React from "react"

import { NavLink } from "react-router-dom"
import { useAuth } from "../../../context/AuthContext"

import styles from "./Sidebar.module.css"

const Sidebar: React.FC = () => {
  const { logout } = useAuth()
  return (
    <div className={styles.sidebar}>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <NavLink to="/" className={styles.active}>
              <h3>Home</h3>
            </NavLink>
          </li>
        </ul>
        <h3>Currículo</h3>
        <ul>
          <li>
            <NavLink
              to="/curriculo/informacoes/cadastro"
              className={styles.active}
            >
              <h3>Informações</h3>
            </NavLink>
          </li>
          <li>
            <NavLink to="/curriculo/certificacoes" className={styles.active}>
              <h3>Certificações</h3>
            </NavLink>
          </li>
          <li>
            <NavLink to="/curriculo/experiencias" className={styles.active}>
              <h3>Experiências</h3>
            </NavLink>
          </li>
        </ul>
        <h3>Portfólio</h3>
        <ul>
          <li>
            <NavLink to="/porfolio/projetos" className={styles.active}>
              <h3>Projetos</h3>
            </NavLink>
          </li>
        </ul>

        <ul>
          <li>
            <NavLink onClick={logout} to="/login" className={styles.active}>
              <h3>Sair</h3>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
