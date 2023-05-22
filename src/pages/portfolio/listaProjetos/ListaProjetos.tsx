import React, { useState, useEffect } from "react"
import { EModalTypes } from "../../../enums/EModalType"
import type { ColumnsType } from "antd/es/table"
import { Table, Tag } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"

import LidarComProjeto from "../lidarComProjeto"

import styles from "./ListaProjetos.module.css"

import {
  deletarProjeto,
  listarProjetos,
  Projeto,
} from "../../../services/projetosService"
import Botao from "../../../components/common/botao"
import Carregamento from "../../../components/layout/carregamento"

const ListaPortfolios = () => {
  const [projetos, setProjetos] = useState<Projeto[]>([])
  const [carregando, setCarregando] = useState(false)
  const [modalAberto, setModalAberto] = useState(false)
  const [emEdicao, setEmEdicao] = useState(false)
  const [tipoModal, setTipoModal] = useState(EModalTypes.CADASTRO.code)
  const [projetoEmFoco, setProjetoEmFoco] = useState({
    titulo: "",
    descricao: "",
    tecnologias: [],
    link_repositorio: "",
    link_aplicacao: "",
  } as Projeto)

  const columns: ColumnsType<Projeto> = [
    {
      title: "Título",
      dataIndex: "titulo",
      key: "titulo",
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
    },
    {
      title: "Tecnologias",
      dataIndex: "tecnologias",
      key: "tecnologias",
      render: (_, { tecnologias }) => (
        <>
          {tecnologias.map((tec) => {
            return (
              <Tag color={"black"} key={tec}>
                {tec.toUpperCase()}
              </Tag>
            )
          })}
        </>
      ),
    },
    {
      title: "Link Repositório",
      dataIndex: "link_repositorio",
      key: "link_repositorio",
    },
    {
      title: "Link da aplicação",
      dataIndex: "link_aplicacao",
      key: "link_aplicacao",
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
              deletaProjeto(record)
            }}
            atencao
          >
            <DeleteOutlined />
          </Botao>
        </div>
      ),
    },
  ]

  const buscaProjetos = async () => {
    setCarregando(true)
    try {
      const data = await listarProjetos()
      setProjetos(data)
    } catch (err) {
      console.log(err)
      alert("Ocorreu um erro, tente novamente")
    } finally {
      setCarregando(false)
    }
  }

  const abreEdicao = (projeto: Projeto) => {
    setTipoModal(EModalTypes.EDICAO.code)
    setProjetoEmFoco(projeto)
    setEmEdicao(true)
    setModalAberto(true)
  }

  const fechaModal = () => {
    setModalAberto(false)
    setEmEdicao(false)
    setTipoModal(EModalTypes.CADASTRO.code)
    setProjetoEmFoco({
      titulo: "",
      descricao: "",
      tecnologias: [],
      link_repositorio: "",
      link_aplicacao: "",
    })
    buscaProjetos()
  }
  const deletaProjeto = async (projeto: Projeto) => {
    await deletarProjeto(projeto)
    buscaProjetos()
  }

  useEffect(() => {
    buscaProjetos()
  }, [])

  return (
    <>
      {modalAberto && (
        <LidarComProjeto
          titulo={emEdicao ? "Editar Portfólio" : "Cadastrar Portfólio"}
          aoFechar={() => fechaModal()}
          tipo={tipoModal}
          info={projetoEmFoco}
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
                Cadastrar novo Portfólio
              </Botao>
            </div>

            <Table columns={columns} dataSource={projetos} rowKey="id" />
          </>
        )}
      </Carregamento>
    </>
  )
}

export default ListaPortfolios
