// remove "type" from filename

export type FirstPlayer = 'X';
export type SecondPlayer = 'O';
export type Square = FirstPlayer | SecondPlayer | null;
export type Board = Square[];
export type Room = {
    id: number,
    creator: number,
    joiner: number,
    status: number
}