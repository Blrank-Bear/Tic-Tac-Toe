import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GameRoomList = () => {
  const [rooms, setRooms] = useState<any[]>([]);

  const create_room = async () => {
    const user_id = localStorage.getItem('user_id');
    console.log(user_id);
    await axios.post('http://192.168.137.29:8000/game/create', { creatorId: user_id });
    window.location.href = '/rooms';
  }

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await axios.get('http://192.168.137.29:8000/game/rooms');
      setRooms(response.data);
    };
    fetchRooms();
  }, []);

  const handleJoin = async (room: any) => {
    const user_id = localStorage.getItem('user_id');
    const response = await axios.post('http://192.168.137.29:8000/game/join', {roomId: room.id, user_id})
    console.log(response.data);
    if(response.data.status === 'ok')
      window.location.href = `/game/${room.id}`;
    else
      alert('You can`t join at this room!');
  }

  return (
    <div>
      <h2>Available Game Rooms</h2>
      <button onClick={create_room}>create Room</button>
      <ul>
        {rooms.map(room => (
          <li key={room.id}>
            Room ID: {room.id}
            {
              room.status === 0 ? 
              <button onClick={() => handleJoin(room)}>Join</button>
              : room.status === 1 ?
              <button onClick={() => handleJoin(room)}>In Progress</button>
              : <button>Done</button>
            }
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameRoomList;