import React from "react"
import { Modal } from "antd"
import { EModalTypes } from "../../../enums/EModalType"

import styles from "./LidarComProjeto.module.css"

// import { Formik, Form } from "formik"
import * as Yup from "yup"

import Form from "../../../components/common/forms/form"
import Input from "../../../components/common/forms/input"
import Select from "../../../components/common/forms/select"

import {
  criarProjeto,
  atualizarProjeto,
  Projeto,
} from "../../../services/projetosService"
import Botao from "../../../components/common/botao"

interface lidarComProjetosProps {
  titulo: string
  aoFechar: () => void
  tipo: number
  info: Projeto
}

const lidarComProjetos: React.FC<lidarComProjetosProps> = ({
  titulo,
  tipo,
  aoFechar,
  info,
}) => {
  const initialValues: Projeto = info
  const tecnologies = [
    { value: "HTML" },
    { value: "CSS" },
    { value: "JavaScript" },
    { value: "Vue" },
    { value: "React" },
    { value: "Node" },
    { value: "Phyton" },
    { value: "Java" },
    { value: "PHP" },
    { value: "Jango" },
    { value: "Express" },
    { value: "MySql" },
  ]

  const validationSchema = Yup.object().shape({
    titulo: Yup.string().required("Campo obrigatório"),
    descricao: Yup.string().required("Campo obrigatório"),
    tecnologias: Yup.array().required("Campo obrigatório"),
    link_repositorio: Yup.string().required("Campo obrigatório"),
    link_aplicacao: Yup.string().required("Campo obrigatório"),
  })

  const aoEnviar = async (
    values: Projeto,
    { resetForm }: { resetForm: () => void }
  ) => {
    if (tipo === EModalTypes.CADASTRO.code) {
      await criarProjeto(values)
    } else {
      await atualizarProjeto(values)
    }
    resetForm()
    aoFechar()
    alert("Formulário enviado com sucesso")
  }
  return (
    <Modal
      title={titulo}
      open={true}
      footer={null}
      onCancel={() => {
        aoFechar()
      }}
      bodyStyle={{ maxHeight: "60vh", overflowY: "auto", overflowX: "hidden" }}
    >
      <Form
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={aoEnviar}
      >
        {({ errors, touched }) => (
          <>
            <Input
              label="Título"
              name="titulo"
              touched={touched.titulo}
              errors={errors.titulo}
            />

            <Input
              label="Descrição"
              name="descricao"
              touched={touched.descricao}
              errors={errors.descricao}
            />

            <Select
              label="Tecnologias"
              name="tecnologias"
              multiple={true}
              options={tecnologies}
            />

            <Input
              label="Repositório"
              name="link_repositorio"
              touched={touched.link_repositorio}
              errors={errors.link_repositorio}
            />

            <Input
              label="Aplicação"
              name="link_aplicacao"
              touched={touched.link_aplicacao}
              errors={errors.link_aplicacao}
            />
            <Botao tipo="submit">{titulo}</Botao>
          </>
        )}
      </Form>
    </Modal>
  )
}

export default lidarComProjetos
