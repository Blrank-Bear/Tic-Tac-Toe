import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import './css/Game.css'
import axios from 'axios';
import { Board, Squer } from '../type';


const socket = io('http://192.168.137.29:8000'); // Adjust the URL if needed

const calculateWinner = (squares: Board) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const Game = ({ }: any) => {
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
    socket.emit('make_move', { roomId, index, player });
  };

  useEffect(() => {
    socket.emit('join_room', { roomId, user_id });

    socket.on('move_made', ({ index, player }) => {
      const newBoard = board.slice();
      newBoard[index] = player;
      setBoard(newBoard);
      setIsXNext(player === 'X' ? false : true);
    });

    return () => {
      socket.off('move_made');
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