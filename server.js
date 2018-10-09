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


app.post('/api/users', (req, res) => {
  console.log(req.body);
  db.User.create(req.body, (err, newUser) => {
    if(err) throw err;
    console.log(newUser)
    res.json(newUser);
  });
});


app.put('/api/users/:id', (req, res) => {
  console.log('Received: ' + req.body)
    const userId = req.params.id;
    const userData = req.body;
    db.User.findByIdAndUpdate(userId, userData, {new: true}, (err, updateUser) => {
      res.json(updatedUser);
    });
});


app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  db.User.findByIdAndDelete(userId, (err, deletedUser) => {
    if(err) throw err;
    res.json(deletedUser);
  });
});


app.get('/api/comments', (req, res) => {
  db.Comment.find((err, allComments) => {
    if(err) throw err;
    res.json(allComments);
  });
});


app.post('/api/comments', (req, res) => {
  console.log(req.body);
  db.Comment.create(req.body, (err, newComment) => {
    if(err) throw err;
    console.log(newComment)
    res.json(newComment);
  });
});

app.put('/api/comments/:id', (req, res) => {
  db.Comment.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedComment) => {
    if (err) throw err;
    res.json(updatedComment);
  });
});






//Listen on port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log('Express server is up and running on http://localhost:3000/');
});