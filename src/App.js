import './App.css';
import React, { useEffect, useReducer, useState } from "react";
import { Choice } from './Components/Choice/choice';
import { Color } from './Components/Color/color';
import { ScoreService } from './service/ScoreService';
import { Score } from './Components/Score/Score';

function App() {

  const [oldScores, setOldScores] = useState(ScoreService.loadScore());
  
  const [correctCount, setCorrectCount] = useReducer(reducer, initialState);
  const [wrongCount, setWrongCount] = useReducer(reducer, initialState);

  const [color, setColor] = useState("#FFFFFF");
  const [choices, setChoices] = useState(shuffle(["#FF0000","#00FF00","#0000FF"]));
  const [gameState, setGameState] = useState(false);
  
  // Init and get old scores
  useEffect(() => {
    ScoreService.initScore();
    setOldScores(ScoreService.loadScore());
  }, [])

  // Change the color for the next 
  useEffect(() => {
    if (!gameState) {
      let newColor = getColor();
      setColor(newColor);
      setChoices(shuffle([newColor, getColor(), getColor()]));
    }
  }, [gameState])

  // Check if the chosen color is the correct one
  function choiceValidator(colorChoice) {
    if (!gameState) {
      colorChoice === color ? setCorrectCount({type: 'increment'}): setWrongCount({type: 'increment'});
      setGameState(true);
      colorChoice === color ? ScoreService.saveCurrentScore([correctCount.count + 1, wrongCount.count]) : ScoreService.saveCurrentScore([correctCount.count, wrongCount.count + 1]);
      
    }
  }
  

  // Render Choice element
  let elements = [];
  choices.forEach(choice => {
    elements.push(
      <Choice 
        color={choice} 
        gameState={gameState}
        borderColor={ choice === color ? "2px solid #00ff00": "2px solid red"}
        key={choice} 
        clickHandler={() => choiceValidator(choice)} 
      />)
  });

  return (
    <div id='appContainer'>

      <div id="appTitle">
        <h1>Color Guesser</h1>
      </div>
      
      <div id='gameContainer'>
        <div id='currentScore'>
          <h1>Score :<br/>{correctCount.count} - {wrongCount.count}</h1>
        </div>
        <Color color={color} />
        <div id="choicesContainer">
          {elements}
        </div>
        {gameState && 
        <div id="nextContainer">
          <button onClick={() => setGameState(false)}>Next</button>
        </div>
        }
      </div>

      <Score scores={oldScores}/>

    </div>
  );
}



// reducer of the score

const initialState = {count: 0};
function reducer(state, action) {
  switch(action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'reset':
      return {count: 0};
    default:
      throw new Error("Reducer default error");
  }
}

// Random color pick
function getColor() {
  let color = "";
  for (let index = 0; index < 6; index++) {
    color += Math.floor(Math.random() * 16).toString(16).toUpperCase();
  }
  return "#" + color;
}

// Fisher-Yates (aka Knuth) Shuffle.
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export default App;
