import React from "react"
import { Modal } from "antd"
import { EModalTypes } from "../../../enums/EModalType"

import * as Yup from "yup"

import Form from "../../../components/common/forms/form"

import Input from "../../../components/common/forms/input"
import Select from "../../../components/common/forms/select"

import {
  criarCertificacao,
  atualizarCertificacao,
  Certificacao,
} from "../../../services/certificacoesService"
import Botao from "../../../components/common/botao"

interface LidarComCertificacaoProps {
  titulo: string
  aoFechar: any
  tipo: number
  info: Certificacao
}

const LidarComCertificacao: React.FC<LidarComCertificacaoProps> = ({
  titulo,
  tipo,
  aoFechar,
  info,
}) => {
  const initialValues: Certificacao = info

  const validationSchema = Yup.object().shape({
    instituicao: Yup.string().required("Campo obrigatório"),
    titulo: Yup.string().required("Campo obrigatório"),
  })

  const aoEnviar = async (
    values: Certificacao,
    { resetForm }: { resetForm: () => void }
  ) => {
    if (tipo === EModalTypes.CADASTRO.code) {
      await criarCertificacao(values)
    } else {
      await atualizarCertificacao(values)
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
            <Select
              label="Instituição"
              name="instituicao"
              options={[{ value: "Alura" }, { value: "Uniasselvi" }]}
            />

            <Input
              label="Título"
              name="titulo"
              touched={touched.titulo}
              errors={errors.titulo}
            />
            <Botao tipo="submit">{titulo}</Botao>
          </>
        )}
      </Form>
    </Modal>
  )
}

export default LidarComCertificacao


// const renderField = (inputProps: InputProps) => {
//   console.log(inputProps)
//   const { field } = inputProps

//   // if (mask) {
//   //   return (
//   //     <InputMask
//   //       mask={mask}
//   //       value={field.value}
//   //       onChange={field.onChange}
//   //       onBlur={field.onBlur}
//   //     >
//   //       {(inputProps: any) => (
//   //         <input
//   //           {...inputProps}
//   //           id={field.name}
//   //           type={type}
//   //           className={`${className ?? styles.input} ${
//   //             touched && errors && styles.error
//   //           }`}
//   //         />
//   //       )}
//   //     </InputMask>
//   //   )
//   // } else {
//   //   return (
//   //     <input
//   //       id={field.name}
//   //       type={type}
//   //       className={`${className ?? styles.input} ${
//   //         touched && errors && styles.error
//   //       }`}
//   //       {...field}
//   //     />
//   //   )
//   // }
// }