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

  res.render('loading')
});

app.get("/home", function (req, res) {
  res.send('Home Screen')

  res.render('signup')
});

app.get("/login", function (req, res) {

  res.render('login')
});

app.get("/signUp", function (req, res) {

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
  db.collection('users').where('userName', '==', user.userName).get()
    .then((resp) => {
      resp.forEach(doc => {
        var data = doc.data();
        if (data['password'] == user.password) {
          res.redirect('/home')

        }
        else {
          res.redirect('/login');

        }
      })
    })
    .catch((e) => {
      console.log(e);
      res.redirect('/login');
    })
});

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});

