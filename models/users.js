const mongoose = require('mongoose');
const Schema = mongoose.Schema


const usersSchema = new Schema({
  userName: String,
  password: String,
  foodPref: [String]
});

const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;