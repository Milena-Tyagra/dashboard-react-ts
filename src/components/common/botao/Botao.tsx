import React from "react"

import styles from "./Botao.module.css"

interface BotaoProps {
  tipo?: "button" | "submit"
  onClick?: () => void
  atencao?: boolean
  children: React.ReactNode
}

const Botao: React.FC<BotaoProps> = ({
  tipo = "button",
  onClick,
  atencao,
  children,
}) => {
  return (
    <button
      type={tipo}
      onClick={onClick}
      className={`${styles.button} ${atencao && styles.redButton}`}
    >
      {children}
    </button>
  )
}

export default Botao
