import Square from "./Square";

function Board({ squares, onSquareClick }) {
  const lastRowIdx = squares.length - 1;
  const lastColIdx = squares[0].length - 1;
  return (
    <div className="board">
      {squares.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((value, colIndex) => (
            <Square
              key={colIndex}
              value={value}
              className={`${rowIndex !== lastRowIdx ? "bottom-border" : ""} ${
                colIndex !== lastColIdx ? "right-border" : ""
              }`}
              onClick={() => onSquareClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
