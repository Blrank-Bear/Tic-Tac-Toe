import styles from "./Game.module.css";
import { useParams } from "react-router-dom";
import { useGame } from "../../hooks/useGame";
import { useSocket } from "../../hooks/useSocket";
import { emitEvent } from "../../services/socket";
import { useEffect, useState } from "react";
import { getRoom } from "../../services/game.service";

const Game = () => {
  const { roomId } = useParams();
  const [creator, setCreator] = useState<number>(0);
  const user_id: any = localStorage.getItem('user_id');
  const { board, setBoard, isXNext, winner, makeMove } = useGame();

  const handleClick = (index: number) => {
    if(creator == user_id) {
        if(!isXNext)return ;
    }
    else {
        if(isXNext)return ;
    }
    makeMove(index, isXNext ? "X" : "O");
    emitEvent("make_move", { roomId, index });
  };

  useSocket("move_made", (data) => {
    setBoard((prev: any) => {
      const newBoard = [...prev];
      newBoard[data.index] = data.player;
      return newBoard;
    });
  });

  useEffect(() => {
    const res = getRoom(roomId);
    setCreator(res);
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Tic Tac Toe</h2>

        <div className={styles.status}>
          {winner ? `Winner: ${winner}` : `Next: ${isXNext ? "X" : "O"}`}
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