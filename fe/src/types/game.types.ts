export type Square = 'X' | 'O' | null;
export type Board = Square[];
export const serverUrl = "http://192.168.137.29:8000";

export type Room = {
    id: number,
    creator: number,
    joiner: number,
    status: number
}