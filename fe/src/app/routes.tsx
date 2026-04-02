import { Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Game from "../pages/Game/Game";
import Rooms from "../pages/Rooms/GameRoomList";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/rooms" element={<Rooms />} />
    <Route path="/game/:roomId" element={<Game />} />
  </Routes>
);