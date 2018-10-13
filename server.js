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

//Serve static files in public
app.use(express.static(__dirname + '/public'));

//Set up file routes - html endpoints
app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//Create routes - json endpoints
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
  // console.log(req.body);
  db.User.find((err, users) => {
    const user = users[0];
    const commentData = {user: user, message: req.body.message}
    db.Comment.create(commentData, (err, newComment) => {
      if(err) throw err;
      newComment.user = user;
      newComment.save((err, savedUser) => {
        res.json(newComment);
      });
    });
  });
});

app.put('/api/comments/:id', (req, res) => {
  db.Comment.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedComment) => {
    if (err) throw err;
    res.json(updatedComment);
  });
});

app.delete('/api/comments/:id', (req, res) => {
  const commentId = req.params.id;
  db.Comment.findByIdAndDelete(commentId, (err, deletedComment) => {
    if(err) throw err;
    res.json(deletedComment);
  });
});

//delete seed data
app.get('/api/nuke', (req, res) => {
  db.User.deleteMany(err => {
    if (err) throw err;
    db.Comment.deleteMany(err => {
      if (err) throw err;
      res.send('<h1>Database Nuked...</h1>');
    });
  });
});

//add seed data
app.get('/api/seed', (req, res) => {
  const userProfiles = [
  {
    username: 'k-nuggets',
    password: 'abc123',
    foodPref: ['italian', 'mexican']
  },
  {
    username: 'poutine4ever',
    password: 'toronto1',
    foodPref: ['mexican', 'french']
  },
  {
    username: 'markymark',
    password: 'gatorsrule1',
    foodPref: ['american', 'mexican']
  }
  ];

  const userComments = [
    {
      message: 'I lie awake at night assured these two will cure cancer based on their development skills.'
    },
    {
      message: 'I love poutine and I love these guys.  Their work is poutine.'
    },
    {
      message: 'Broooooooooooooooooooo!  I love sandwiches.'
    },
  ];

  // Delete all Users
  db.User.deleteMany(err => {
    if (err) throw err;
    console.log('All users deleted successfully');

    // Delete all comments
    db.Comment.deleteMany(err => {
      if (err) throw err;
      console.log('All comments deleted successfully');

      // Create new users
      db.User.create(userProfiles, (err, newProfiles) => {
        if (err) throw err;
        console.log(`Created ${newProfiles.length} new user profiles successfully.`);

        // Create new comments
        db.Comment.create(userComments, (err, newComments) => {
          if (err) throw err;
          console.log(`Created ${newComments.length} new comments successfully`);

          // Associate comments with users
          newComments.forEach((comment, index) => {
            comment.user = newProfiles[index];
            console.log(`Comment #${index} saved successfully.`);
            comment.save();
            if (index === newProfiles.length - 1) res.send('<h1>Database Seeded...</h1>');
          })
        })
      })
    })
  })

})


//Listen on port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log('Express server is up and running on http://localhost:3000/');
});