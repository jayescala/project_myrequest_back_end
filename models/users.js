// Imports
const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String
  }
});

module.exports = mongoose.model("User", userSchema);
