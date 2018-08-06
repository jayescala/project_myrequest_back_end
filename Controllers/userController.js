const express = require('express'); 
const router = express.Router(); 
const User = require('../models/users.js'); 


// User Login // 
router.post('/login', async (req, res) => {
  console.log(req.session, 'this is session'); 
  try {
    const createdUser = await User.create(req.body); 

    req.session.logged = true; 
    req.session.username = req.body.username; 


    res.json({
      status: 200, 
      data: 'login successful'
    }); 
  } catch(err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = router; 