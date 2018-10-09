console.log("app.js is working!");

const baseUrl = 'http://localhost:3000/api/';
const users = 'users/';
const comments = 'comments/';


function removeMe () {
  console.log("ok i'll remove you");
  fetch(baseUrl + users + event.target.id)

};


$('#delete').on('click', removeMe);







