import React from "react"
import {
  Usuario,
  login as loginService,
} from "../../services/autenticacaoService"
import { useAuth } from "../../context/AuthContext"

import { useNavigate } from "react-router-dom"
import * as Yup from "yup"

import styles from "./Login.module.css"

import Input from "../../components/common/forms/input"
import Form from "../../components/common/forms/form"
import Botao from "../../components/common/botao"
import Titulo from "../../components/common/titulo"

const initialValues: Usuario = {
  email: "",
  senha: "",
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  senha: Yup.string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória"),
})
const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const onSubmit = async (values: Usuario) => {
    try {
      const user = await loginService(values)
      login(user)
      navigate("/")
    } catch (error) {
      alert("erro")
    }
  }
  return (
    <div className={styles.loginWrapper}>
      <Form
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <div className={styles.form}>
            <Titulo>MEU SITE PESSOAL</Titulo>

            <Input
              label="Email"
              name="email"
              type="email"
              errors={errors.email}
              touched={touched.email}
            />
            <Input
              label="Senha"
              name="senha"
              type="password"
              errors={errors.senha}
              touched={touched.senha}
            />
            <Botao tipo="submit">Entrar</Botao>
          </div>
        )}
      </Form>
    </div>
  )
}

export default Login
