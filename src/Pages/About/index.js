import React, { Component } from 'react'
import MainPanel from 'Components/Panels'
import styled from 'styled-components'

const TextContainer = styled.div`
  width: 90%;
  flex-grow: 1;
`

export default class About extends Component {
  render = () => (
    <MainPanel>
      <TextContainer>
        <p>
          Mi nombre es Juan Pablo, soy estudiante de la EMPA y programador de
          sistemas.
        </p>
        <p>
          Armé este sitio para ayudarme a prepararme para la materia Lenguage
          Musical, y lo publiqué en caso de que le fuera útil a otros
          estudiantes o interesados en teoría musical y audiopercepción.
        </p>
        <p>
          Si bien existen muchos sitios y apps que proveen ejercicios similares
          (y algunos mucho más avanzados) quise hacer el mío porque:
        </p>
        <ul>
          <li>
            quería ejercicios lo más parecido posibles a los que me toman en la
            EMPA; y
          </li>
          <li>me resultó divertido :-) </li>
        </ul>
        <p>
          Si sos programador y te interesa colaborar con el proyecto (o
          simplemente chusmear cómo esta hecho) el código fuente está&nbsp;
          <a href="https://github.com/holden-caulfield/empa-trainer">acá</a>
        </p>
        <p>Version: 2.1</p>
      </TextContainer>
    </MainPanel>
  )
}
