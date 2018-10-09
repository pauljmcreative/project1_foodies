const mongoose = require('mongoose');
const Schema = mongoose.Schema


const commentsSchema = new Schema({
  id: String,
  userName: String,
  message: String,
});

const Comments = mongoose.model('Comments', CommentsSchema);
module.exports = Comments;