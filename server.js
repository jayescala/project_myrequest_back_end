// Imports
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const request = require("superagent");
const cors = require("cors");

// Models

// Application
const app = express();

// mongodb Connection
require("./db/db.js");

// Middleware
  // body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
  // method-override
app.use(methodOverride("_method"));
  // express-session
app.use(session({secret: "max", resave: false, saveUninitialized: false}));
  // cors
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// Controllers
// user
const userController = require("./controllers/userController.js");
app.use("/user", userController);
// room
const roomController = require("./controllers/roomController.js");
app.use("/api/v1/rooms", roomController);

// Static Routes
  // images
app.use("/images", express.static("images"));

// APIs

// Port Setup
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  const timestamp = (new Date(Date.now())).toLocaleString();
  console.log(timestamp + ": running on port " + PORT);
});
