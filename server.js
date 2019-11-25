//Require our dependencies
var express = require("express");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


//Set up the port to be either host's deisgnated port or port 3000
var PORT = process.env.PORT || 3000;

//Express
var app = express();
  //Set up Exrpess Router
  var router = express.Router();

//require the routes 
require("./config/routes")(router);

//!! Designate Public folder as static directory!!//
app.use(express.static(__dirname + "public"));

//Connect to express handlebars
app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//Set up body parser
app.use(bodyParser.urlencoded({
  extended: false
}));

//Every request will go through to the router
app.use(router);

//Connect Mongoose to database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(db, function(error){
  if (error){
    console.log(error);
  }else{
    console.log("Mongoose connection is successful");
  }

});

//Listen to the port
app.listen(PORT, function(){
  console.log("Listening to PORT: " + PORT);
})