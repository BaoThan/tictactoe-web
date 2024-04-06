import axios from "axios";

const BEST_MOVE_API_URL =
  "https://e0cb-76-21-119-158.ngrok-free.app/best_next_move";

const bestNextMove = async (board, for_player) => {
  try {
    const conf = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    const formData = new FormData();
    formData.append("board", JSON.stringify(board));
    formData.append("player", for_player);

    const response = await axios.post(BEST_MOVE_API_URL, formData, conf);
    if (response.status !== 200 || !response.data.success) {
      console.log(response);
      return null;
    }
    return response.data.data.next_move;
  } catch (error) {
    console.log(`ERROR: ${error}`);
    return null;
  }
};

export { bestNextMove };
