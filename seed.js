

const db = require('./models');



const userProfile = [
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




const userComments = [
{
  user: 'Kenny B nuggets',
  message: 'I lie awake at night assured these two will cure cancer based on their development skills.'
},
{
  user: 'Brock Poutine',
  message: 'I love poutine and I love these guys.  Their work is poutine.'
},
{
  user: 'Mark Floridageorgialine',
  message: 'Broooooooooooooooooooo!  I love sandwiches.'
},
];


db.User.remove({}, function (err, removeUsers) {
  if(err) {
    console.log(`Error occurred ${err}`);
  }
  db.User.create(userProfile, function(err, newUsers) {
    if(err) {
      console.log('error:', err);
    }
    console.log(`Created new gallery \n ${newUsers}`)
  });
});


db.Comment.remove({}, function (err, removeComments) {
  if(err) {
    console.log(`Error occurred ${err}`);
  }
  db.Comment.create(userComments, function(err, newComments) {
    if(err) {
      console.log('error:', err);
    }
    console.log(`Created new comments \n ${newComments}`)
    process.exit();
  });
});








