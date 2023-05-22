import React from "react"
import styles from "./Titulo.module.css"

interface TituloProps {
  className?: string
  children: React.ReactNode
}

const Titulo: React.FC<TituloProps> = ({
  className = styles.title,
  children,
}) => {
  return <h1 className={className}>{children}</h1>
}

export default Titulo
