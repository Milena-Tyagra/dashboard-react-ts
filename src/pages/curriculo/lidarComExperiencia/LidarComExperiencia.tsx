import React from "react"
import { Modal } from "antd"
import { EModalTypes } from "../../../enums/EModalType"

import * as Yup from "yup"

import Form from "../../../components/common/forms/form"
import Input from "../../../components/common/forms/input"
import Textarea from "../../../components/common/forms/textarea"

import {
  criarExperiencia,
  atualizarExperiencia,
  Experiencia,
} from "../../../services/experienciasService"
import Botao from "../../../components/common/botao"

interface LidarComExperienciaProps {
  titulo: string
  aoFechar: () => void
  tipo: number
  info: Experiencia
}

const LidarComExperiencia: React.FC<LidarComExperienciaProps> = ({
  titulo,
  tipo,
  aoFechar,
  info,
}) => {
  const initialValues: Experiencia = info

  const validationSchema = Yup.object().shape({
    empresa: Yup.string().required("Campo obrigatório"),
    periodo: Yup.string().required("Campo obrigatório"),
    descricao: Yup.string().required("Campo obrigatório"),
  })

  const aoEnviar = async (
    values: Experiencia,
    { resetForm }: { resetForm: () => void }
  ) => {
    if (tipo === EModalTypes.CADASTRO.code) {
      await criarExperiencia(values)
    } else {
      await atualizarExperiencia(values)
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
              label="Empresa"
              name="empresa"
              touched={touched.empresa}
              errors={errors.empresa}
            />

            <Input
              label="Período"
              name="periodo"
              mask="99/99/9999 - 99/99/9999"
              touched={touched.periodo}
              errors={errors.periodo}
            />

            <Textarea
              label="Descrição"
              name="descricao"
              touched={touched.descricao}
              errors={errors.descricao}
            />
            <Botao tipo="submit">{titulo}</Botao>
          </>
        )}
      </Form>
    </Modal>
  )
}

export default LidarComExperiencia
