// Imports
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const request = require("superagent");

// Models

// Application
const app = express();

// mongodb Connection
require("./db/db.js");

// Middleware
  // body-parser
app.use(bodyParser.urlencoded({extended: false}));
  // method-override
app.use(methodOverride("_method"));
  // express-session
app.use(session({secret: "max", resave: false, saveUninitialized: false}));

// Controllers

// Static Routes
  // images
app.use("/images", express.static("images"));

// Routes
  // Home Page
app.get("/", async (req, res) => {
  res.send("HOME PAGE");
});

// APIs

// Port Setup
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  const timestamp = (new Date(Date.now())).toLocaleString();
  console.log(timestamp + ": running on port " + PORT);
});
