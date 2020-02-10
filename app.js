//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended: true }));
//FIREBASE
var admin = require("firebase-admin");

var serviceAccount = require("./corona-e6d82-firebase-adminsdk-d311k-6c9937a85f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://corona-e6d82.firebaseio.com"
});



// ROUTING
app.get("/", function (req, res) {
  // res.sendFile(__dirname + '/views/login.html')

  res.render('login')
});

app.get("/home", function (req, res) {
  // res.sendFile(__dirname + '/views/login.html')

  res.render('signup')
});


app.post('/signUp', function (req, res) {
  var db = admin.firestore();
  var user = {
    'userName': req.body.userName,
    'name': req.body.name,
    'password': req.body.password,
  };
  console.log(user);
  db.collection('users').add(user)
    .then((resp) => {
      res.redirect('/home');
    })
    .catch((e) => {
      console.log(e);
      res.redirect('/');
    })
});

app.post('/login', function (req, res) {
  var db = admin.firestore();
  var user = {
    'userName': req.body.userName,
    'password': req.body.password,
  };
  console.log(user);
  db.collection('users').where('userName', '==', user.userName).where('password', '==', user.password).get()
    .then((resp) => {
      res.redirect('/home')
    })
    .catch((e) => {
      console.log(e);
      res.redirect('/login');
    })
});

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});

