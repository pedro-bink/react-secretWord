//css
import './App.css';

//data
import {words_list} from './data/Words'

//react related
import {useState, useEffect, useCallback} from 'react';

//components
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"}
]

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(words_list)
  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = (()=>{
    //picking a random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
    //picking a random word from the category picked previously
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    return {category, word}
  })

  const startGame = ( () => {
    setGameStage(stages[1].name)
    const {word, category} = pickWordAndCategory()
    
    //creating an array of letters
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((letter) => letter.toLowerCase())

    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)
    setGuessedLetters([])
  })

  const exitGame = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
    setGuesses(3)
    setScore(0)
    setGameStage(stages[0].name)
  }

  const checkLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()

    if(
    guessedLetters.includes(normalizedLetter) || 
    wrongLetters.includes(normalizedLetter)){
      return;
    }

    if (letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => 
      [...actualGuessedLetters,normalizedLetter])  
    }

    else{
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,normalizedLetter])
      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }  

  const clearStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  useEffect( () => {
    if(guesses <= 0){
      setGameStage(stages[2].name)
      clearStates()
    }
  }, [guesses])

  useEffect( () => {
    const uniqueLetters = [...new Set(letters)]
    console.log(uniqueLetters.length)
    console.log(guessedLetters.length)
    if (guessedLetters.length === uniqueLetters.length){
      setScore((actualScore) => actualScore+=100);
      startGame();
    }

  }, [guessedLetters])

  const retry = ( () => {
    setScore(0)
    setGuesses(3)
    setGuessedLetters([])
    startGame()
  })

  return (
    <div className="App">
     {gameStage === "start" && (<StartScreen startGame={startGame}></StartScreen>)}
     {gameStage === "game" && (<GameScreen 
    checkLetter={checkLetter} 
    pickedWord={pickedWord}
    pickedCategory={pickedCategory}
    letters={letters}
    guessedLetters={guessedLetters}
    wrongLetters={wrongLetters}
    guesses={guesses}
    score={score}
    setGameStage={setGameStage}
    stages={stages}
    exitGame={exitGame}
    >
     </GameScreen>)}
     {gameStage === "end" && (<EndScreen 
     retry={retry}
     score={score}
     exitGame={exitGame}
     >

     </EndScreen>)}

    </div>
  );
}

export default App;
