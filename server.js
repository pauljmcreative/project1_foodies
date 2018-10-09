//MODULE INSTALLATION
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

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


let userProfile = [
{
  user: 'k-nuggets',
  password: 'abc123',
  foodPref: ['italian', 'mexican']
},
{
  user: 'poutine4ever',
  password: 'toronto1',
  foodPref: ['mexican', 'french']
},
{
  user: 'markymark',
  password: 'gatorsrule1',
  foodPref: ['american', 'mexican']
}
];





// serve static files in public
app.use(express.static(__dirname + '/public'));


//Set up file routes
app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



app.get('/api/users', (req, res) => {
  console.log('get-users info works!');
    // if(err) throw err;
    // console.log(userProfile);
    res.json(userProfile);
});










//Listen on port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log('Express server is up and running on http://localhost:3000/');
});