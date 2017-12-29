var readlineSync = require('readline-sync');
var firebase = require("firebase");
var request = require('request');
// Initialize Firebase
 var config = {
    apiKey: "AIzaSyCLXhTlopBHdqn-Oq6QtwxhmdXk_mWhKWk",
    authDomain: "dashing-project-1512033832561.firebaseapp.com",
    databaseURL: "https://dashing-project-1512033832561.firebaseio.com",
    projectId: "dashing-project-1512033832561",
    storageBucket: "dashing-project-1512033832561.appspot.com",
    messagingSenderId: "219761389774"
  };
firebase.initializeApp(config);
var db = firebase.database();
var ref = db.ref('widget');
ref.on("child_added", function(snapshot) {
  request.post(
    'http://localhost:3030/widgets/synergy',
    { json: { "auth_token": "YOUR_AUTH_TOKEN", "value": snapshot.val() } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    }
  )
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

ref.on("value", function(snapshot) {
  //console.log(snapshot.val());
  var obj = snapshot.val();
  var values = Object.values(obj);
  var keys = Object.keys(obj);
  var length = values.length;
  var data = [];
  for(var i=0;i<10;i++) {
    console.log(values[length-10+i]);
    data[i]={
      "x": /*keys[length-10+i]*/length-9+i,
      "y": values[length-10+i]
    }
  }
  request.post(
    'http://localhost:3030/widgets/convergence',
    { json: { "auth_token": "YOUR_AUTH_TOKEN", "points": data} },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    }
  )
  }, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});