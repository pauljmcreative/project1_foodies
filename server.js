//MODULE INSTALLATION
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./models');

//BODY PARSER
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//CORS//
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// const userProfile = [
// {
//   user: 'k-nuggets',
//   password: 'abc123',
//   foodPref: ['italian', 'mexican']
// },
// {
//   user: 'poutine4ever',
//   password: 'toronto1',
//   foodPref: ['mexican', 'french']
// },
// {
//   user: 'markymark',
//   password: 'gatorsrule1',
//   foodPref: ['american', 'mexican']
// }
// ];


// const userComments = [
// {
//   user: 'Kenny B nuggets',
//   message: 'I lie awake at night assured these two will cure cancer based on their development skills.'
// },
// {
//   user: 'Brock Poutine',
//   message: 'I love poutine and I love these guys.  Their work is poutine.'
// },
// {
//   user: 'Mark Floridageorgialine',
//   message: 'Broooooooooooooooooooo!  I love sandwiches.'
// },
// ];



// serve static files in public
app.use(express.static(__dirname + '/public'));


//Set up file routes
app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


//Create routes
app.get('/api/users', (req, res) => {
  db.User.find((err, allUsers) => {
    if(err) throw err;
    res.json(allUsers);
  });
});


app.get('/api/comments', (req, res) => {
  db.Comment.find((err, allComments) => {
    if(err) throw err;
    res.json(allComments);
  });
});








//Listen on port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log('Express server is up and running on http://localhost:3000/');
});