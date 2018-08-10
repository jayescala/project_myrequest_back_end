// Imports
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
// const request = require("superagent");
const cors = require("cors");
const socket = require("socket.io");
const request = require("request");

// Application
const app = express();

// Port Setup
  // Server Port
const PORT = process.env.PORT || 9000;

const server = app.listen(PORT, () => {
  const timestamp = (new Date(Date.now())).toLocaleString();
  console.log(timestamp + ": running on port " + PORT);
});

// mongodb Connection
require("./db/db.js");

// Models

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
app.use("/rooms", roomController);

// Static Routes
  // images
app.use("/images", express.static("images"));

// APIs
  // socket.io Setup
const io = socket(server);

io.on("connection", function(socket){
  console.log("Socket.io is connected.", socket.id);

  socket.on("chat", function(data){
    io.sockets.emit("chat", data);
  });

  socket.on("typing", function(data){
    socket.broadcast.emit("typing", data);
  });

  // socket.on("subscribeToTimer", (interval) => {
  //   console.log("Client is subscribing to time with interval ", interval);
  //   setInterval(() => {
  //     socket.emit("Timer: ", new Date());
  //   }, inteval);
  // });

  socket.on("disconnect", () => {
    console.log("Socket.io is disconnected.");
  });
});

  // Spotify API

const clientID = "21ab4c3863c843d18e4f2d6cfcebcf88";
const clientSecret = "898c8efe1ed44bd0b9969cc548bd95dd";

const authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    "Authorization": "Basic " + (new Buffer(clientID + ":" + clientSecret).toString("base64"))
  },
  form: {
    grant_type: "client_credentials"
  },
  json: true
};

const generateSearchType = (type) => {

  let typeString = "";

  for(let i = 0; i <= type.length-1; i++) {
    if(i !== type.length-1) {
      typeString += type[i] + "%2C";
    } else {
      typeString += type[i];
    }
  }
  return typeString;
}
    // Get Query
app.get("/search/:query", (req, res) => {
  request.post(authOptions, function(error, response, body) {
    if(!error && response.statusCode === 200) {
      const query = req.params.query;
      const typeArray = ["track"];
      const type = generateSearchType(typeArray);
      const limit = 10;
      const token = body.access_token;
      console.log(type, "This is type.");
      const options = {
        url: "https://api.spotify.com/v1/search?q=" + query + "&type=" + type + "&limit=" + limit,
        headers: {
          "Authorization": "Bearer " + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        res.send(body);
      });
    }
  });
});

// const id = "11dFghVXANMlKmJXsNCbNl";
    // Get Track
app.get("/tracks/:id", (req, res) => {
  request.post(authOptions, function(error, response, body) {
    if(!error && response.statusCode === 200) {
      const token = body.access_token;
      const options = {
        url: "https://api.spotify.com/v1/tracks/" + req.params.id,
        headers: {
          "Authorization": "Bearer " + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        res.send(body);
      });
    }
  });
});
