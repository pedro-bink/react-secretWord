import React from 'react'
import './css/EndScreen.css'

const EndScreen = ({retry, score, exitGame}) => {
  return (
    <div className='container'>
      <h1>Fim de jogo</h1>
      <p>A sua pontuação foi: {score}</p>
      <button onClick={retry}>Jogar novamente</button>
      <button onClick={exitGame}>Sair</button>
    </div>
  )
}

export default EndScreen