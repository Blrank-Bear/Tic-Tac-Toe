import styles from "./Game.module.css";
import { useParams } from "react-router-dom";
import { useGame } from "../../hooks/useGame";
import { useSocket } from "../../hooks/useSocket";
import { emitEvent } from "../../socket/socket";
import { useEffect, useState } from "react";
import { getRoomCreator } from "../../apis/game.service";
import { getLocalStorage } from "../../utils/localStorage";
import { PLAYER_CLICK } from "../../utils/define";

const Game = () => {
  const { roomId } = useParams();
  const [creator, setCreator] = useState<number>(0);
  const { board, setBoard, isFirstPlayer, winner, clickBoard } = useGame();
  
  // const userId: any = localStorage.getItem('userId');
  const userId: number = getLocalStorage().userId;

  const handleClick = (index: number) => {
    if(creator == userId) {
        if(!isFirstPlayer) return;
    }
    else {
        if(isFirstPlayer) return;
    }
    clickBoard(index, isFirstPlayer ? "X" : "O");
    emitEvent("make_move", { roomId, index });
  };

  useSocket(PLAYER_CLICK, (data) => {
    setBoard((prev: any) => {
      const newBoard = [...prev];
      newBoard[data.index] = data.player;
      return newBoard;
    });
  });

  useEffect(() => {
    const creatorId = getRoomCreator(roomId);
    setCreator(creatorId);
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Tic Tac Toe</h2>

        <div className={styles.status}>
          {winner ? `Winner: ${winner}` : `Next: ${isFirstPlayer ? "X" : "O"}`}
        </div>

        <div className={styles.board}>
          {board.map((_, i) => (
            <button key={i} onClick={() => handleClick(i)}>
              {board[i]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;