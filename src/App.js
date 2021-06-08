import React, { useEffect, useState } from 'react';
import Rock from './icons/Rock';
import Paper from './icons/Paper';
import Scissors from './icons/Scissors';
import './App.css';

// for handling the game outcome & a component rendering
// losesTo can be an array for multiple choices
const choices = [
  { id: 1, name: 'rock', component: Rock, losesTo: 2 },
  { id: 2, name: 'paper', component: Paper, losesTo: 3 },
  { id: 3, name: 'scissors', component: Scissors, losesTo: 1 },
]

export default function App() {
  // counters for the game results
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  // containers for the choices
  const [userChoice, setUserChoice ] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  // state of the  current game to show: win / lose / draw
  const [gameState, setGameState] = useState(null);

  // resets the UI and make the computer's move
  function restartGame() {
    setGameState(null);
    setUserChoice(null);
    // random computer's choice
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
  }

  // the beginning of the game (it's initial state)
  useEffect(() => {
    restartGame();
  }, []);

  // user click handler
  function handleUserChoice(choice) {
    // writes the user choice
    const chosenChoice = choices.find(c => c.id === choice);
    setUserChoice(chosenChoice);

    // compares it to the computer's and changes the game's state
    if (chosenChoice.losesTo === computerChoice.id) {
      // lose
      setLosses(losses => losses + 1)
      setGameState('lose');
    } else if (computerChoice.losesTo === chosenChoice.id) {
      // win
      setWins(wins => wins + 1)
      setGameState('win');
    } else if (computerChoice.id === chosenChoice.id) {
      // draw
      setGameState('draw');
    }

  }

  // creates icon components representing the choices made
  function renderComponent(choice) {
    const Component = choice.component;
    return <Component />
  }

  return (
    <div className="app">
      {/* information panel */}
      <div className="info">
        <h2>Rock. Paper. Scissors</h2>

        {/* wins vs losses stats */}
        <div className="wins-losses">
          <div className="wins">
            <span className="number">{wins}</span>
            <span className="text">{wins === 1 ? 'Win' : 'Wins'}</span>
          </div>

          <div className="losses">
            <span className="number">{losses}</span>
            <span className="text">{losses === 1 ? 'Loss' : 'Losses'}</span>
          </div>
        </div>
      </div>

      {/* the popup to show win/lose/draw */}
      {gameState && (
      <div
        className={`game-state ${gameState}`}
        // click on the outer area handler
        onClick={() => restartGame()}
        >
        <div>
          <div className="game-state-content">
            {/* conditional icon component render */}
            <p>{renderComponent(userChoice)}</p>

            {gameState === 'win' && <p>Congrats! You won!</p>}
            {gameState === 'lose' && <p>Sorry! You lost!</p>}
            {gameState === 'draw' && <p>You drew!</p>}

            {/* conditional icon component render */}
            <p>{renderComponent(computerChoice)}</p>
          </div>

          {/* closes the modal */}
          <button onClick={() => restartGame()}>Play Again</button>
        </div>
      </div>
      )}

      <div className="choices">
        {/* choices captions */}
        <div>You</div>
        <div />
        <div>Computer</div>

        {/* buttons for a user choice */}
        <div>
          <button className="rock" onClick={() => handleUserChoice(1)}>
            <Rock />
          </button>
          <button className="paper" onClick={() => handleUserChoice(2)}>
            <Paper />
          </button>
          <button className="scissors" onClick={() => handleUserChoice(3)}>
            <Scissors />
          </button>
        </div>

        <div className="vs">vs</div>

        {/* show the computer's choice */}
        <div>
          <button className="computer-choice">?</button>
        </div>
      </div>
    </div>
  );
}
