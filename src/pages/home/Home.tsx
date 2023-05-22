import React, { useEffect, useState } from "react"
import Titulo from "../../components/common/titulo"
import Carregamento from "../../components/layout/carregamento"

import Informativo from "../../components/common/informativo"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"

import { Projeto, listarProjetos } from "../../services/projetosService"

ChartJS.register(ArcElement, Tooltip, Legend)

const Home: React.FC = () => {
  const [carregando, setCarregando] = useState(false)
  const [grafico, setGrafico] = useState({})
  useEffect(() => {
    buscaProjetos()
  }, [])

  const buscaProjetos = async () => {
    setCarregando(true)
    try {
      const data = await listarProjetos()
      formataGraficos(data)
    } catch (err) {
      console.log(err)
      alert("Ocorreu um erro, tente novamente")
    } finally {
      setCarregando(false)
    }
  }

  const formataGraficos = (data: Projeto[]) => {
    const serie: { [tec: string]: number } = {}

    data.forEach((item: Projeto) => {
      item.tecnologias.forEach((tec) => {
        if (!serie[tec]) {
          serie[tec] = 1
        } else {
          serie[tec] += 1
        }
      })
    })
    setGrafico(serie)
  }

  const data = {
    labels: Object.keys(grafico),
    datasets: [
      {
        label: "Projetos com a tecnologia",
        data: Object.values(grafico),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }
  return (
    <main>
      <Titulo>Bem vindo ao nosso site</Titulo>
      <Informativo>
        <p>Tecnologias</p>
        <Pie data={data} />
      </Informativo>
    </main>
  )
}

export default Home
