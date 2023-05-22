import React from "react"
import { Modal } from "antd"
import * as Yup from "yup"

import Form from "../../../components/common/forms/form"
import Input from "../../../components/common/forms/input"
import Textarea from "../../../components/common/forms/textarea"
import Botao from "../../../components/common/botao"
import {
  Informacoes,
  updateInformacoes,
} from "../../../services/informacoesService"

interface LidarComInformacoesProps {
  info: Informacoes
  aoFechar: () => void
}

const LidarComInformacoes: React.FC<LidarComInformacoesProps> = ({
  info,
  aoFechar,
}) => {
  const initialValues: Informacoes = info

  const validationSchema = Yup.object().shape({
    foto: Yup.string().required("Campo obrigatório"),
    nome: Yup.string().required("Campo obrigatório"),
    cargo: Yup.string().required("Campo obrigatório"),
    resumo: Yup.string().required("Campo obrigatório"),
  })

  const aoEnviar = async (
    values: Informacoes,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await updateInformacoes(values)
      console.log(values)
      resetForm()
      aoFechar()
      alert("Formulário enviado com sucesso")
    } catch (err) {
      console.log(err)
      alert("Ocorreu um erro, tente novamente")
    }
  }
  return (
    <Modal
      title="Cadastrar Informações"
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
              label="Foto"
              name="foto"
              touched={touched.foto}
              errors={errors.foto}
            />

            <Input
              label="Nome"
              name="nome"
              touched={touched.nome}
              errors={errors.nome}
            />

            <Input
              label="Cargo"
              name="cargo"
              touched={touched.cargo}
              errors={errors.cargo}
            />

            <Textarea
              label="Resumo"
              name="resumo"
              touched={touched.resumo}
              errors={errors.resumo}
            />
            <Botao tipo="submit">Cadastrar Informações</Botao>
          </>
        )}
      </Form>
    </Modal>
  )
}

export default LidarComInformacoes
