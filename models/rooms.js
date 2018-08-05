// Imports
const mongoose = require("mongoose");

// Schema
const roomsSchema = new mongoose.Schema({
  code: String,

});

// Exports
module.exports = mongoose.model("Room", roomSchema);
