import React, { useState, useEffect } from "react"
import styles from "./Informacoes.module.css"
import Botao from "../../../components/common/botao"

import LidarComInformações from "../lidarComInformacoes"
import {
  getInformacoes,
  Informacoes,
} from "../../../services/informacoesService"
import Titulo from "../../../components/common/titulo"
import Carregamento from "../../../components/layout/carregamento"

const Informacoes: React.FC = () => {
  const [isOpenedModal, setIsOpenModal] = useState(false)
  const [carregando, setCarregando] = useState(false)
  const [info, setInfo] = useState<Informacoes>({
    id: 0,
    foto: "",
    nome: "Não informado",
    cargo: "Não informado",
    resumo: "Não informado",
  })

  useEffect(() => {
    getInfo()
  }, [])

  const getInfo = async () => {
    setCarregando(true)
    try {
      const info = await getInformacoes()
      setInfo(info)
    } catch (err) {
      console.log(err)
      alert("Ocorreu um erro, tente novamente")
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className={styles.container}>
      {isOpenedModal && (
        <LidarComInformações
          info={info}
          aoFechar={() => {
            setIsOpenModal(false)
            getInfo()
          }}
        />
      )}
      {info.foto !== "" && (
        <img src={info.foto} alt="" className={styles.photo} />
      )}

      <Carregamento carregando={carregando}>
        {carregando ? (
          <div className={styles.container}></div>
        ) : (
          <>
            <div>
              <Titulo>Nome:</Titulo>
              <p className={styles.data}> {info.nome}</p>
            </div>
            <div>
              <Titulo>Cargo:</Titulo>
              <p className={styles.data}> {info.cargo}</p>
            </div>
            <div>
              <Titulo>Resumo:</Titulo>
              <p className={styles.data}> {info.resumo}</p>
            </div>

            <div className={styles.button}>
              <Botao
                onClick={() => {
                  setIsOpenModal(true)
                }}
              >
                Editar informações
              </Botao>
            </div>
          </>
        )}
      </Carregamento>
    </div>
  )
}

export default Informacoes
