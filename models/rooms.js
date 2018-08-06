// Imports
const mongoose = require("mongoose");

// Schema
const roomsSchema = new mongoose.Schema({
  code: String, 
  createdByUsername: String, 
  createdByUserId: String,
  comments: String, 
  pendingRequest: String,
  approvedRequest: String,
  roomName: String,  
  description: String,
  image: String

});

// Exports
module.exports = mongoose.model("Room", roomSchema);
