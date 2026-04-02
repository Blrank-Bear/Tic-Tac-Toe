import { FirstPlayer, SecondPlayer } from "../types";

export const FIRST_PLAYER:FirstPlayer = 'X';
export const SECOND_PLAYER: SecondPlayer = 'O';
export const NEXT_PLAYER = {
    [FIRST_PLAYER]: SECOND_PLAYER,
    [SECOND_PLAYER]: FIRST_PLAYER
}

// socket
export const PLAYER_CLICK = "move_made";