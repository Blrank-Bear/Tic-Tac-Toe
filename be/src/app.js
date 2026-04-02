const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const authRouter = require('./routes/auth.js');
const gameRouter = require('./routes/game.js');
const cors = require('cors');

const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/game', gameRouter);

// //insert database
// pool.connect()
//   .then(() => {
//     console.log('database connected');
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