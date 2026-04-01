import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import GameRoomList from './components/GameRoomList';
import Register from './components/Register';
import Game from './components/Game';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/rooms" element={<GameRoomList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/game/:roomId" element={<Game />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
