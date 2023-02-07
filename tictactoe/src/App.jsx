import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Square from "./Square";

function App() {
  const squareitems = Array.from({ length: 9 }, (x, i) => ({
    index: i,
    contents: " ",
    isFilled: false,
  }));
  React.useEffect(() => {
    if (checkGameOver()) {
      setGameOver(true);
    }
  });
  const [gameOver, setGameOver] = useState(false);
  const [individualSquares, setIndividualSquares] = useState(squareitems);
  const [gameState, setGameState] = useState({
    currentTurn: "X",
    gameString: Array.from({ length: 9 }, (x, i) => `[${i}]`),
  });
  // console.log(squareitems)
  const squareElements = individualSquares.map((oneSquare) => {
    return (
      <Square key={oneSquare.index} item={oneSquare} toggle={handleClick} />
    );
  });
  function checkHorizontal() {
    return (
      (gameState.gameString[0] == gameState.gameString[1] &&
        gameState.gameString[1] == gameState.gameString[2]) ||
      (gameState.gameString[3] == gameState.gameString[4] &&
        gameState.gameString[4] == gameState.gameString[5]) ||
      (gameState.gameString[6] == gameState.gameString[7] &&
        gameState.gameString[7] == gameState.gameString[8])
    );
  }
  function checkVertical() {
    return (
      (gameState.gameString[0] == gameState.gameString[3] &&
        gameState.gameString[3] == gameState.gameString[6]) ||
      (gameState.gameString[1] == gameState.gameString[4] &&
        gameState.gameString[4] == gameState.gameString[7]) ||
      (gameState.gameString[2] == gameState.gameString[5] &&
        gameState.gameString[5] == gameState.gameString[8])
    );
  }
  function checkDiagonal() {
    return (
      (gameState.gameString[0] == gameState.gameString[4] &&
        gameState.gameString[4] == gameState.gameString[8]) ||
      (gameState.gameString[2] == gameState.gameString[4] &&
        gameState.gameString[4] == gameState.gameString[6])
    );
  }
  function checkGameOver() {
    return checkHorizontal() || checkVertical() || checkDiagonal();
  }
  function handleClick(id) {
    if (!gameOver) {
      const newSquares = [];
      const newGameString = [...gameState.gameString];
      individualSquares.forEach((aSquare) => {
        if (aSquare.index == id && !aSquare.isFilled) {
          newSquares.push({
            ...aSquare,
            contents: gameState.currentTurn,
            isFilled: !aSquare.isFilled,
          });
          setGameState((prevGameState) => {
            newGameString[id] = gameState.currentTurn;
            const newGameState = {
              currentTurn: prevGameState.currentTurn == "X" ? "O" : "X",
              gameString: newGameString,
            };
            return newGameState;
          });
        } else {
          newSquares.push(aSquare);
        }
      });
      setIndividualSquares(newSquares);
    }else{
      handleReset()
    }
  }
  function handleReset() {
    setIndividualSquares(squareitems);
    setGameOver(false);
    setGameState({
      currentTurn: "X",
      gameString: Array.from({ length: 9 }, (x, i) => `[${i}]`),
    });
  }
  return (
    <div className="maincontainer">
      {/* <h2>Current Turn: {gameState.currentTurn}</h2>
      <p>Game Over: {gameOver ? "Yes" : "No"}</p> */}
      {!gameOver && <h2 className="gameText">Current Turn: {gameState.currentTurn}</h2>}
      {gameOver && <h2 className="gameText">Game Over</h2>}

      <div className="gamecontainer">{squareElements}</div>
      {checkGameOver() && (
        <h2 className="winner">
          Winner:{gameState.currentTurn == "O" ? "X" : "O"}
        </h2  >
      )}
      <button className="resetbttn" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

export default App;
