// Imports
const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String, required: true, unique: true
  },
  password: {
    type: String, required: true
  }
});

module.exports = mongoose.model("User", userSchema);
