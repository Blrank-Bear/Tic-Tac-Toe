const express = require('express');
const { createRoom, getRooms, joinRoom, getOneRoom } = require('../controllers/gameController.js');
const router = express.Router();

router.post('/create', createRoom);
router.get('/rooms', getRooms);
router.post('/join', joinRoom);
router.post('/room', getOneRoom);

module.exports = router;