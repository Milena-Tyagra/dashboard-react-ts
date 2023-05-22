import React from "react"
import { Spin } from "antd"

import styles from "./Carregamento.module.css"

interface CarregamentoProps {
  children: React.ReactNode
  carregando: boolean
}

const Carregamento: React.FC<CarregamentoProps> = ({
  carregando,
  children,
}) => {
  return (
    <Spin
      spinning={carregando}
      size="large"
      className={styles.loading}
      tip="Carregando..."
    >
      {children}
    </Spin>
  )
}

export default Carregamento
