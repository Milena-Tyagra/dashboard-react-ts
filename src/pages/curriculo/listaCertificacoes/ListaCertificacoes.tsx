import React, { useEffect, useState } from "react"
import { EModalTypes } from "../../../enums/EModalType"
import type { ColumnsType } from "antd/es/table"
import { Table } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"

import LidarComCertificacao from "../lidarComCertificacao"

import styles from "./ListaCertificacoes.module.css"
import {
  deletarCertificacao,
  listarCertificacoes,
  Certificacao,
} from "../../../services/certificacoesService"
import Botao from "../../../components/common/botao"
import Carregamento from "../../../components/layout/carregamento"

const ListaCertificacoes = () => {
  const [certificacoes, setCertificacoes] = useState<Certificacao[]>([])
  const [carregando, setCarregando] = useState(true)
  const [modalAberto, setModalAberto] = useState(false)
  const [emEdicao, setEmEdicao] = useState(false)
  const [tipoModal, setTipoModal] = useState(EModalTypes.CADASTRO.code)
  const [certificacaoEmFoco, setCertificacaoEmFoco] = useState({
    titulo: "",
    instituicao: "",
  })

  const columns: ColumnsType<Certificacao> = [
    {
      title: "Título",
      dataIndex: "titulo",
      key: "titulo",
    },
    {
      title: "Instituição",
      dataIndex: "instituicao",
      key: "instituicao",
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
              deletaCertificacao(record)
            }}
            atencao
          >
            <DeleteOutlined />
          </Botao>
        </div>
      ),
    },
  ]

  const buscaCertificacoes = async () => {
    setCarregando(true)
    try {
      const data = await listarCertificacoes()
      setCertificacoes(data)
    } catch (err) {
      console.log(err)
      alert("Ocorreu um erro, tente novamente")
    } finally {
      setCarregando(false)
    }
  }

  const abreEdicao = (certificacao: Certificacao) => {
    setTipoModal(EModalTypes.EDICAO.code)
    setCertificacaoEmFoco(certificacao)
    setEmEdicao(true)
    setModalAberto(true)
  }

  const fechaModal = () => {
    setModalAberto(false)
    setEmEdicao(false)
    setTipoModal(EModalTypes.CADASTRO.code)
    setCertificacaoEmFoco({
      titulo: "",
      instituicao: "",
    })
    buscaCertificacoes()
  }

  const deletaCertificacao = async (certification: Certificacao) => {
    await deletarCertificacao(certification)
    buscaCertificacoes()
  }

  useEffect(() => {
    buscaCertificacoes()
  }, [])
  return (
    <>
      {modalAberto && (
        <LidarComCertificacao
          titulo={emEdicao ? "Editar Certificação" : "Cadastrar Certificação"}
          aoFechar={() => fechaModal()}
          tipo={tipoModal}
          info={certificacaoEmFoco}
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
                Cadastrar nova certificação
              </Botao>
            </div>

            <Table columns={columns} dataSource={certificacoes} rowKey="id" />
          </>
        )}
      </Carregamento>
    </>
  )
}

export default ListaCertificacoes
