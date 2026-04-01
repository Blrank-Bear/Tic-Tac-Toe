const pool = require('../service/Pool.js');

exports.createRoom = async (req, res) => {
  const { creatorId } = req.body; // Assume creatorId is passed from the client

  try {
    const result = await pool.query('INSERT INTO rooms (creator) VALUES (?)', [creatorId]);
    res.status(201).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: 'Room creation failed' });
  }
};

exports.getRooms = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM rooms');
    res.status(200).json(result[0]);
    // console.log(result[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve rooms' });
  }
};

exports.joinRoom = async (req, res) => {
  const {user_id, roomId} = req.body;
  try {
    const [result] = await pool.query(`SELECT * FROM rooms WHERE id = '${roomId}'`);
    if(result[0].creator == user_id)
    {
      res.status(200).json({status: 'ok'});
      return ;
    }
    if(!result[0].joiner) {
      const UpdatedData = await pool.query(`UPDATE rooms SET joiner = ${user_id}, status = 1 WHERE id = ${roomId}`);
      res.status(200).json({status: 'ok'});
    }
    else {
      if(user_id == result[0].joiner)
        res.status(200).json({status: 'ok'});
      else 
        res.status(200).json({status: 'no'});
    }
  //   res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve rooms' });
  }
};

exports.getOneRoom = async (req, res) => {
  const {roomId} = req.body;
  try {
    const result = await pool.query(`SELECT * FROM rooms WHERE id = '${roomId}'`);
    res.status(200).json(result[0]);
  }
  catch {
    res.status(500).json({error: 'Failed to retrieve room'});
  }
}

