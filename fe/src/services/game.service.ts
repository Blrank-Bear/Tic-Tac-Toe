import { Board, Room } from "../types";
import { api } from "./api";

export const calculateWinner = (squares: Board) => {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    for (let [a, b, c] of lines) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
};

export const getRoom = (roomId: any): number => {
    api.post("/game/room", { roomId })
        .then((res) => {
            return res.data.creator;
        })
        .catch((err) => {console.log(err)})
    return 0;
};

export const getRooms = (): Room[] | null => {
    api.post('/game/rooms')
        .then((res) => {
            if (res.status == 200) return res.data;
        })
        .catch((err) => { return null })
    return null
}

export const createRoom = (user_id: any) => {
    api.post('/game/create', { creatorId: user_id })
        .then((res) => {
            window.location.href = '/rooms';
        })
        .catch((err) => {
            console.log(err);
        })
}