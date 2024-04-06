import axios from "axios";

const BOARD_CHECK_API_URL =
  "https://e0cb-76-21-119-158.ngrok-free.app/board_status";

class BoardStatus {
  constructor(hasWinner, isFull, winner) {
    this.#hasWinner = hasWinner;
    this.#isFull = isFull;
    this.#winner = winner;
  }
  get hasWinner() {
    return this.#hasWinner;
  }
  get isFull() {
    return this.#isFull;
  }
  get winner() {
    return this.#winner;
  }

  #hasWinner;
  #isFull;
  #winner;
}

const boardChecker = async (board) => {
  try {
    const conf = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    const formData = new FormData();
    formData.append("board", JSON.stringify(board));

    const response = await axios.post(BOARD_CHECK_API_URL, formData, conf);
    if (response.status !== 200 || !response.data.success) {
      console.log(response);
      return null;
    }
    const data = response.data.data;
    return new BoardStatus(data.has_winner, data.is_full, data.winner);
  } catch (error) {
    console.log(`ERROR: ${error}`);
    return null;
  }
};

export { BoardStatus, boardChecker };
