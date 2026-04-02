import { useState } from "react";
import { Board, Square } from "../types";
import { calculateWinner } from "../apis/game.service";

export const useGame = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isFirstPlayer, setIsFirstPlayer] = useState(true);

  const winner = calculateWinner(board);

  // FIX: change player type from string → Square
  const clickBoard = (index: number, player: Square) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = player; // now valid
    setBoard(newBoard);
    setIsFirstPlayer(!isFirstPlayer);
  };

  return { board, setBoard, isFirstPlayer, winner, clickBoard };
};