import React from 'react'
import './css/GameScreen.css'
import {useState, useRef} from 'react';

const GameScreen = ({checkLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score, setGameStage, stages, exitGame}) => {

  const [letter, setLetter] = useState("")
  const letterInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    checkLetter(letter)
    setLetter("")
    letterInputRef.current.focus();
  }

  return (
    <div className="game">
      
      <div id='e'>
      <button className='exit' onClick={exitGame}>Sair</button>
        <p className="points">
          <span>Pontuação: {score}</span>
        </p>
        
      </div>
      

      <h1>Adivinhe a palavra</h1>
      <p>Você ainda tem {guesses} tentativa(s)</p>

      <h3 className="tip">
        Dica: <span>{pickedCategory}</span>
      </h3>

      <div className="wordContainer">
        {letters.map((letter, i) => (
          guessedLetters.includes(letter) ? (<span key={i} className="letter">{letter}</span>) : (<span key={i} className="blank"></span>)
        ))}
      </div>

      <div className="letterContainer">
        <p>Tente adivinha uma letra da palavra </p>
        <form onSubmit={handleSubmit}>
          <input 
          type="text"
          name="letter" 
          max-lenght="1" 
          required 
          onChange={(e) => setLetter(e.target.value)}
          value={letter}
          ref={letterInputRef}
          />
          <button>Enviar</button>
        </form>
      </div>

      <div className="wrongLetterContainer">
      <p>Letras já utilizadas</p>
        
       {wrongLetters.map((letter, i) => (
         <span key={i}> {letter}, </span>
       ))}
      </div>

    </div>
  )
}

export default GameScreen