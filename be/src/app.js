const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const authRouter = require('./routes/auth.js');
const gameRouter = require('./routes/game.js');
const pool = require('./service/Pool.js');
const cors = require('cors');

const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/game', gameRouter);

// //insert database
// pool.connect();
//   .then(() => {
//     const Query = `CREATE TABLE users (
//       id SERIAL PRIMARY KEY,
//       name VARCHAR NOT NULL,
//       gender VARCHAR NOT NULL,
//       dob DATE NOT NULL,
//       email VARCHAR UNIQUE NOT NULL,
//       password VARCHAR NOT NULL
//     );

//     CREATE TABLE rooms (
//       id SERIAL PRIMARY KEY,
//       creator INT NOT NULL,
//       joiner INT,
//       status INT DEFAULT 0
//     );

//     CREATE TABLE game_history (
//       id SERIAL PRIMARY KEY,
//       room_id INT NOT NULL,
//       winner VARCHAR,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     );`
//     pool.query(Query);
//   })

// Socket.IO setup

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join_room', (data) => {
    socket.join(data.roomId);
    console.log(`User ${socket.id} joined room: ${data.roomId}`);
  });

  socket.on('make_move', ({ roomId, index, player }) => {
    // Broadcast the move to all clients in the room
    socket.to(roomId).emit('move_made', { index, player });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server
const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});