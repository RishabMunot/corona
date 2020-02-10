/* <script src="https://www.gstatic.com/firebasejs/7.8.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.8.1/firebase-analytics.js"></script>

 */

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDQ0Sl3tIphMVvZtYH8VCgjcknQtDvqJso",
    authDomain: "corona-e6d82.firebaseapp.com",
    databaseURL: "https://corona-e6d82.firebaseio.com",
    projectId: "corona-e6d82",
    storageBucket: "corona-e6d82.appspot.com",
    messagingSenderId: "252628663035",
    appId: "1:252628663035:web:c0f755187d087da74b0e5e",
    measurementId: "G-XVBF7MCE0M"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function signUp() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (data) {
            console.log(data)
        })
        .catch(function (e) {
            console.log(e);
        })
}

function login() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (data) {
            console.log(data)
        })
        .catch(function (e) {
            console.log(e);
        })
}



function getCurrentUser() {
    firebase.auth().onAuthStateChanged(function (user) {
        var name, imgUrl;
        if (user) {
            console.log(user.email);

            document.getElementById('user').innerHTML = 'Name: ' + user.email
        } else {
            // No user is signed in.

            window.location.href = 'index.html';
        }
    });

}

window.onload = function () {
    getCurrentUser()
}