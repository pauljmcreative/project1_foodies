

const db = require('./models');



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
    message: 'I love every restaurant they recommend!'
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
          //if (index === newProfiles.length - 1) process.exit();
        });
      });
    });
  });
});



// db.User.remove({}, function (err, removeUsers) {
//   if(err) {
//     console.log(`Error occurred ${err}`);
//   }
//   db.User.create(userProfile, function(err, newUsers) {
//     if(err) {
//       console.log('error:', err);
//     }
//     console.log(`Created new gallery \n ${newUsers}`)
//   });
// });


// db.Comment.remove({}, function (err, removeComments) {
//   if(err) {
//     console.log(`Error occurred ${err}`);
//   }
//   db.Comment.create(userComments, function(err, newComments) {
//     if(err) {
//       console.log('error:', err);
//     }
//     console.log(`Created new comments \n ${newComments}`)
//     process.exit();
//   });
// });








