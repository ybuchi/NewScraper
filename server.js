//Require our dependencies
var express = require("express");

//Set up the port to be either host's deisgnated port or port 3000
var PORT = process.env.PORT || 3000;

//Express
var app = express();
  //Set up Exrpess Router
  var router = express.Router();

//!! Designate Public folder as static directory!!//
app.use(express.static(__dirname + "public"));
app.use(router);

//Listen to the port
app.listen(PORT, function(){
  console.log("Listening to PORT: " + PORT);
})