import React from 'react'
import './css/StartScreen.css'

const StartScreen = ({startGame}) => {
  return (
    <div className="start">
        <h1>Secret Word</h1>
        <p>Clique no botão abaixo para iniciar o jogo</p>
        <button onClick={startGame}>Iniciar o jogo</button>
    </div>
  )
}

export default StartScreen