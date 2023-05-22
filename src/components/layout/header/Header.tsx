import React from "react"
import Titulo from "../../common/titulo"

import styles from "./Header.module.css"

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Titulo>Dasboard do meu site pessoal</Titulo>
      </div>
    </header>
  )
}

export default Header
