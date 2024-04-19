import { useState, useEffect } from "react";
import Board from "./Board";
import GameOver from "./GameOver";
import GameState from "./GameState";
import Reset from "./Reset";
import { boardChecker } from "../services/boardStatus";
import GameModeButton from "./GameModeButton";
import { bestNextMove } from "../services/nextMove";

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
  const [disabled, setDisabled] = useState(false);

  const handleSquareClick = (row, col) => {
    if (disabled) {
      return;
    }
    if (isBotMode && playerTurn == BOT) {
      return;
    }
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
    setDisabled(false);
    setPlayerTurn(PLAYER_X);
  };

  const handleModeToggle = (botMode) => {
    setIsBotMode(botMode);
    handleReset();
  };

  function checkWinner() {
    var allEmpty = squares.every(function (row) {
      return row.every(function (cell) {
        return cell === EMPTY_CELL;
      });
    });

    if (allEmpty) {
      setDisabled(false);
      return;
    }

    boardChecker(squares).then((boardStat) => {
      if (boardStat.hasWinner) {
        setGameState(
          boardStat.winner == PLAYER_X
            ? GameState.playerXWins
            : GameState.playerOWins
        );
        setDisabled(true);
        return;
      } else if (boardStat.isFull) {
        setGameState(GameState.draw);
        setDisabled(true);
        return;
      }

      if (isBotMode && playerTurn == BOT) {
        botMakeMove(squares);
        setDisabled(false);
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
      <Board
        disabled={disabled}
        squares={squares}
        onSquareClick={handleSquareClick}
      />
      <GameOver gameState={gameState} />
      <Reset gameState={gameState} onReset={handleReset} />
    </div>
  );
}

export default TicTacToe;
