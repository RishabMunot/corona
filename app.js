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

app.get("/home/:userName", function (req, res) {
  var db = admin.firestore();
  var userName = req.params.userName;
  console.log(userName)
  var baseRef = db.collection('users').where('userName', '==', userName);
  // // var challengeRef = baseRef.collection('challenges');
  baseRef.get()
    .then((resp) => {

      var user;
      var id;
      resp.forEach(doc => {
        // console.log(doc.data())
        user = doc.data();
        id = doc.id;
      })
      // console.log(resp.id)
      var challengeRef = db.collection('users').doc(id).collection('challenges');
      challengeRef.get()
        .then((documents) => {
          var list = [];
          documents.forEach(doc => {
            list.push(doc.data());
            // console.log(doc.docs.data())
          });
          // console.log(list)
          res.render('home', { list: list, user: user });
        })
        .catch((e) => {
          console.log(e);
        })
      // res.render('home')

    })
    .catch((e) => {
      res.redirect('/')
    })

});

app.get("/login", function (req, res) {

  res.render('login')
});

app.get("/signUp", function (req, res) {

  res.render('signup')
});

app.get("/ans/:userName", function (req, res) {
  var db = admin.firestore();
  var userName = req.params.userName;
  // db.collection('users').where('userName', '==', userName).collection('challenges').doc('id').get()
  res.render('answer')
});


app.post('/:userName/ans/:selectedAns', function (req, res) {
  var db = admin.firestore();
  var selectedAns = req.params.selectedAns;
  var userName = req.params.userName;

  db.collection('users').where('userName', '==', userName).get()
    .then((resp) => {
      resp.forEach(doc => {

      })
    })
    .catch((e) => {
      console.log(e);
    })


})

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
      // resp.docId
      console.log(resp.id);

      res.redirect('/home/' + user.userName);
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
          res.redirect('/home/' + user.userName)

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




app.post('/submit', function (req, res) {
  var db = admin.firestore();

})


app.listen(3000, function () {
  console.log("Server started on port 3000.");
});

