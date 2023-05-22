import React, { useState, useEffect } from "react"
import { EModalTypes } from "../../../enums/EModalType"
import type { ColumnsType } from "antd/es/table"
import { Table, Button } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"

import LidarComExperiencia from "../lidarComExperiencia"

import styles from "./ListaExperiencias.module.css"
import {
  deletarExperiencia,
  listarExperiencia,
  Experiencia,
} from "../../../services/experienciasService"
import Botao from "../../../components/common/botao"
import Carregamento from "../../../components/layout/carregamento"

const ListaExperiencias = () => {
  const [experiencias, setExperiencias] = useState<Experiencia[]>([])
  const [carregando, setCarregando] = useState(false)
  const [modalAberto, setModalAberto] = useState(false)
  const [emEdicao, setEmEdicao] = useState(false)
  const [tipoModal, setTipoModal] = useState(EModalTypes.CADASTRO.code)
  const [ExperienciaEmFoco, setExperienciaEmFoco] = useState({
    empresa: "",
    periodo: "",
    descricao: "",
  })

  const columns: ColumnsType<Experiencia> = [
    {
      title: "Empresa",
      dataIndex: "empresa",
      key: "empresa",
    },
    {
      title: "Período",
      dataIndex: "periodo",
      key: "periodo",
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className={styles.actions}>
          <Botao
            onClick={() => {
              abreEdicao(record)
            }}
          >
            <EditOutlined />
          </Botao>

          <Botao
            onClick={() => {
              deletaExperiencia(record)
            }}
            atencao
          >
            <DeleteOutlined />
          </Botao>
        </div>
      ),
    },
  ]

  const buscaExperiencias = async () => {
    setCarregando(true)
    try {
      const data = await listarExperiencia()
      setExperiencias(data)
    } catch (err) {
      console.log(err)
      alert("Ocorreu um erro, tente novamente")
    } finally {
      setCarregando(false)
    }
  }

  const abreEdicao = (experiencia: Experiencia) => {
    setTipoModal(EModalTypes.EDICAO.code)
    setExperienciaEmFoco(experiencia)
    setEmEdicao(true)
    setModalAberto(true)
  }

  const fechaModal = () => {
    setModalAberto(false)
    setEmEdicao(false)
    setTipoModal(EModalTypes.CADASTRO.code)
    setExperienciaEmFoco({
      empresa: "",
      periodo: "",
      descricao: "",
    })
    buscaExperiencias()
  }

  const deletaExperiencia = async (experiencia: Experiencia) => {
    await deletarExperiencia(experiencia)
    buscaExperiencias()
  }

  useEffect(() => {
    buscaExperiencias()
  }, [])

  return (
    <>
      {modalAberto && (
        <LidarComExperiencia
          titulo={emEdicao ? "Editar Experiência" : "Cadastrar Experiência"}
          aoFechar={() => fechaModal()}
          tipo={tipoModal}
          info={ExperienciaEmFoco}
        />
      )}

      <Carregamento carregando={carregando}>
        {carregando ? (
          <div className={styles.container}></div>
        ) : (
          <>
            <div className={styles.button}>
              <Botao
                onClick={() => {
                  setModalAberto(true)
                }}
              >
                Cadastrar nova experiência
              </Botao>
            </div>

            <Table columns={columns} dataSource={experiencias} rowKey="id" />
          </>
        )}
      </Carregamento>
    </>
  )
}

export default ListaExperiencias
