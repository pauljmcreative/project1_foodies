const mongoose = require('mongoose');
const Schema = mongoose.Schema

const User = require('./users.js')

const CommentSchema = new Schema({
  user: User.schema,
  message: String
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;