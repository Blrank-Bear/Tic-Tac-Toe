import { Square } from "./Square";

export const Board = ({ board, onClick }: any) => {
  return (
    <>
      {board.map((val: any, i: number) => (
        <Square key={i} value={val} onClick={() => onClick(i)} />
      ))}
    </>
  );
};