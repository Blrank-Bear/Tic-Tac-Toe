import { useState } from "react";
import { Board, Square } from "../types";
import { calculateWinner } from "../services/game.service";

export const useGame = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(board);

  // ✅ FIX: change player type from string → Square
  const makeMove = (index: number, player: Square) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = player; // ✅ now valid
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  return { board, setBoard, isXNext, winner, makeMove };
};