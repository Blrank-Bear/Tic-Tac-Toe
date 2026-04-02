import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './css/Game.css'
import axios from 'axios';
import { Board, Squer } from '../type';
import { calculateWinner } from '../service/service';
import { socket_api } from '../service/socket';

const Game: React.FC = () => {
  const parms = useParams();
  const { roomId } = parms;
  const [creator, setCreator] = useState<string>('0');
  const user_id = localStorage.getItem('user_id');
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [player, setPlayer] = useState<Squer>(user_id == creator ? 'X' : 'O'); // Assume player X starts
  const winner = calculateWinner(board);
  const status = winner ? `Winner: ${winner}` : `Next player: ${isXNext ? 'X' : 'O'}`;

  const handleClick = (index: number) => {
    if (user_id == creator) {
      if (!isXNext) return;
    }
    else
      if (isXNext) return;

    const newBoard = board.slice();
    if (newBoard[index] || calculateWinner(newBoard)) return;

    newBoard[index] = player;
    setBoard(newBoard);
    setIsXNext(!isXNext);

    // Emit the move to the server
    socket_api(0, 'make_move', { roomId, index, player });
  };

  const move_made = (data: any) => {
    const newBoard = board.slice();
    newBoard[data.index] = data.player;
    setBoard(newBoard);
    setIsXNext(data.player === 'X' ? false : true);
  }

  useEffect(() => {
    socket_api(0, 'join_room', { roomId, user_id })

    const propdata = socket_api(1, 'move_made', {});
    move_made(propdata);

    return () => {
      socket_api(2, 'move_made', {});
    };
  }, [board, roomId]);

  useEffect(() => {
    axios.post('http://192.168.137.29:8000/game/room', { roomId })
      .then((res) => {
        // console.log(res);
        setCreator(res.data[0].creator);
        setPlayer(user_id == res.data[0].creator ? 'X' : 'O');
      })
  }, []);

  return (
    <div className='game-pannel'>
      <div className='status'>{status}</div>
      <div className="board">
        {board.map((value, index) => (
          <button className='key-button' key={index} onClick={() => handleClick(index)}>{value}</button>
        ))}
      </div>
    </div>
  );
};

export default Game;