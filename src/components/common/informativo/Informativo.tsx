import React from "react"

import styles from "./Informativo.module.css"

interface InformativoProps {
  children: React.ReactNode
}

const Informativo: React.FC<InformativoProps> = ({children}) => {
  return (
    <div className={styles.info}>
      {children}
    </div>
  )
}

export default Informativo