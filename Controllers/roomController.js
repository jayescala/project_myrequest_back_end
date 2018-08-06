const express = require('express'); 
const router = express.Router(); 
const Room = require('../models/rooms.js');

// Main Page Router // Index Route // 
router.get('/', async (req, res, next) => {
  console.log(req.session, 'this is get all');
  try {
    const Room = await Room.find();

    res.json({
      status: 200, 
      data: Room
    }); 


  } catch(err) {
    res.send(err)

  }
  
});

// Create Room // 
router.post('/', async (req, res) => {
  try {
    console.log(req.body, 'this is the req.body'); 
    const createdRoom = await Room.create(req.body);

    res.json({
      status: 200, 
      data: createdRoom
  }); 
  
  } catch(err) {
    console.log(err);
    res.send(err); 
  }
});

// Find Room // 
router.get('/:id', async (req, res, next) => {
  try {
    const foundRoom = await Room.findById(req.params.id);
    res.json({
      status: 200,
      data: foundRoom
    }); 


  } catch(err) {
    res.send(err); 

  }

}); 

// Delete Room // 
router.delete('/:id', async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndRemove(req.params.id);
    res.json({
      status: 200,
      data: deletedRoom
    }); 
  } catch(err) {
    res.send(err); 
  }
}); 

module.exports = router; 
