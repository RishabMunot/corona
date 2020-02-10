//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();



//FIREBASE
var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://corona-e6d82.firebaseio.com"
});



// ROUTING
app.get("/", function(req, res){
    res.send("Hello");
  });
  
  app.listen(3000, function(){
    console.log("Server started on port 3000.");
  });
  
  