import { useState, useEffect } from "react";
import Board from "./Board";
import GameOver from "./GameOver";
import GameState from "./GameState";
import Reset from "./Reset";
import { boardChecker } from "../services/boardStatus";
import GameModeButton from "./GameModeButton";
import { bestNextMove, best_next_move } from "../services/nextMove";

const PLAYER_X = "X";
const PLAYER_O = "O";
const BOT = PLAYER_O;
const HUMAN = PLAYER_X;
const EMPTY_CELL = "";

function TicTacToe() {
  const [squares, setSquares] = useState(
    Array.from({ length: 3 }, () => Array(3).fill(EMPTY_CELL))
  );
  const [playerTurn, setPlayerTurn] = useState(HUMAN);
  const [gameState, setGameState] = useState(GameState.inProgress);
  const [isBotMode, setIsBotMode] = useState(false);

  const handleSquareClick = (row, col) => {
    if (squares[row][col] !== EMPTY_CELL) {
      return;
    }
    const newSquares = squares.map((row) => [...row]); // Create a copy of the squares array
    newSquares[row][col] = playerTurn;
    setSquares(newSquares);
    setPlayerTurn(playerTurn === PLAYER_X ? PLAYER_O : PLAYER_X);
  };

  const handleReset = () => {
    setGameState(GameState.inProgress);
    setSquares(Array.from({ length: 3 }, () => Array(3).fill(EMPTY_CELL)));
    setPlayerTurn(PLAYER_X);
  };

  const handleModeToggle = (botMode) => {
    setIsBotMode(botMode);
    handleReset();
  };

  function checkWinner() {
    boardChecker(squares).then((boardStat) => {
      if (boardStat.hasWinner) {
        setGameState(
          boardStat.winner == PLAYER_X
            ? GameState.playerXWins
            : GameState.playerOWins
        );
        return;
      } else if (boardStat.isFull) {
        setGameState(GameState.draw);
        return;
      }

      if (isBotMode && playerTurn == BOT) {
        botMakeMove(squares);
      }
    });
  }

  const botMakeMove = () => {
    bestNextMove(squares, BOT).then((nextMove) => {
      if (nextMove == [-1, -1]) {
        console.log("Failed to make next move");
        return;
      }
      const newSquares = squares.map((row) => [...row]);
      newSquares[nextMove[0]][nextMove[1]] = BOT;
      setSquares(newSquares);
      setPlayerTurn(HUMAN);
    });
  };

  useEffect(() => {
    checkWinner();
  }, [squares]);

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <GameModeButton onClick={handleModeToggle} />
      <Board squares={squares} onSquareClick={handleSquareClick} />
      <GameOver gameState={gameState} />
      <Reset gameState={gameState} onReset={handleReset} />
    </div>
  );
}

export default TicTacToe;
