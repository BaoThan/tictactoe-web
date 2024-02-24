import { useState } from "react";

function GameModeButton({ onClick }) {
  const [isBotMode, setIsBotMode] = useState(false);

  const handleToggle = () => {
    var newMode = !isBotMode;
    setIsBotMode(newMode);
    onClick(newMode);
  };

  return (
    <button className="game-mode-button" onClick={handleToggle}>
      {isBotMode ? "1 Player" : "2 Players"}
    </button>
  );
}

export default GameModeButton;
