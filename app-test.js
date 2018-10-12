console.log("app.js is working!");

$(document).ready(function(){


const baseUrl = 'http://localhost:3000/api/';
const users = 'users/';
const comments = 'comments/';
const zomato = 'https://developers.zomato.com/api/v2.1';
const zomatoKey = "64ec316d35f97e2df01286cf2d5f00df";



///////////SMOOTH SCROLL/////////////////
///////ask for explanation...

  $("a").on('click', function(event) {
    console.log('Hash = ' + this.hash)
    if (this.hash !== "") {
      event.preventDefault();
      let hash = this.hash;
      
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 

      800, function(){
        window.location.hash = hash;
      });
    }
  });

///////////SMOOTH SCROLL BINDING TO ANCHOR/////////////////
 $(function() {
    $('.nav-buttons a').bind('click',function(event){
      event.preventDefault();
      $('.nav-buttons a').removeClass('active');
      $(this).addClass('active');
    });
  });


/////SIGNUP FORM//////////////


/////USER PROFILE//////////////

// Pulling profile data for logged in user to display on profile greeting link dropdown menu to edit
 // const getMyGallery = () => {
 //        fetch(galleryUrl)
 //            .then(res => res.json())
 //            .then(galleries => renderGallery(galleries))
 //            .catch(err => console.log(err));
 //    }
 //    getMyGallery();

//get all user profiles
const getUsers = (event) => {
    event.preventDefault();
    fetch(baseUrl + users)  
      .then(res => res.json())
      .then(data => {
      }console.log(data[0]._id))
      .catch(err => console.log(err))
  }

  $('#submit-user').on('click', getUsers);

//get one user


//get data
//put data in the ui below

//build user profile ui
// function viewProfile () {
// $('#profile-greeting').append(`
//   <div class="user-profile-info">
//   <p>User Name: ${respose[i].username}</p>
//   <p>Password: ${response[i].password}</p>
//   <button>Edit</button>
//   </div>
// `)
// }; 






// const cuisineSubmit = (event) =>{
//         event.preventDefault();
//         console.log('form submitted');
//         const profileName = $(#username). document.getElementById('username').value;
//         const profilePassword = document.getElementById('password').value;
//         const profileFoodPref = document.getElementById('foodPref').value;
//         const profileData = {username: profileName, password: profilePassword, foodPref: profileFoodPref};

//         fetch(baseUrl, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json; charset=utf-8",
//             },
//             body: JSON.stringify(data),
//         })
//             .then(res => res.json())
//             .then(() => getProjects())
//             .catch(err => console.log(err));
//     }


// const render = (users) => {
// console.log(users);

// lat long zomato url:  var zUrl = `https://developers.zomato.com/api/v2.1/search?lat=${pos.lat}&lon=${pos.lng}&cuisines=${cuisines}&sort=real_distance` 


//-->find restaurants that match city and country - use zomato api to find rest in city/country
function findCityId (event) {
  const query = encodeURI(document.getElementById('cityName').value);
  let cityId = null;
  event.preventDefault();
  console.log('City Name = ' + query)
  console.log('Requesting City ID...')
  fetch(`${zomato}/cities?q=${query}`, {
    headers: {
      "user-key": zomatoKey
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      cityId = data.location_suggestions[0].id;
      console.log(cityId);
      getCityRestaurants(cityId)
    });

//call zomato api
//get city, country, restaurants
//if city and country match user input for city and country
//then show a restaurant that same city and country

};

function getCityRestaurants(cityId) {

  console.log('City ID = ' + cityId)
  fetch(`${zomato}/search?entity_id=${cityId}&entity_type=city`, {
    headers: {
      "user-key": "64ec316d35f97e2df01286cf2d5f00df"
    }
  })
    .then(res => res.json())
    .then(data => console.log(data));
}

$('#cuisine-submit').on('click', findCityId);


//end of document ready
});




////////Get comments and post in carousel...///////////

const renderComments = (comments) => {
  console.log(comments);
  let commentContainer = document.getElementById("commentContainer")

  //clears each time so no duplicate data
  commentResults.innerHTML = '';
  form.children[0] = '';
  form.children[1] = '';

  comments.forEach(comment => {
    console.log(comment.message);

    commentContainer.insertAdjacentHTML('afterbegin', `
      <div class="comment-results">
          <p><strong>${comment.name}</strong></p>
          <p><strong>${comment.message}</strong></p>
      </div>
    `)
  });
}

const getComments = () => {
  fetch(baseUrl + comments)
    .then(res => res.json())
    .then(comments => renderComments(comments))
    .catch(err => console.log(err));
}
getComments();


const handleCommentSubmit = (event) => {
  event.preventDefault();
  console.log('message submitted');
  
  const dummyUsername = "Paul21";
  const userComment = document.getElementById('message').value;
  const commentData = {username: dummyUsername, message: userComment};

  fetch((baseUrl + comments), {
      method: "POST",
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(data => renderComments(data))
    .catch(err => console.log(err));
}


/////revolving carousel////////////
let commentIndex = 0;
setInterval(function(){
  $('#comment-results.children').attr('id', '');
  commentIndex += 1;
  if (commentIndex > $('#comment-results').length -1) {commentIndex = 0}
  $('#comment-results').eq(commentIndex).attr('id', 'show');
},5000);


