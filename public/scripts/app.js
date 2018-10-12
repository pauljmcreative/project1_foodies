console.log("app.js is working!");

$(document).ready(function(){


const baseUrl = 'http://localhost:3000/api/';
const users = 'users/';
const comments = 'comments/';
const zomato = 'https://developers.zomato.com/api/v2.1';
const zomatoKey = "64ec316d35f97e2df01286cf2d5f00df";
const commentResults = document.getElementById('commentContainer')


///////////SMOOTH SCROLL/////////////////
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

 $(function() {
    $('.nav-buttons a').bind('click',function(event){
      event.preventDefault();
      $('.nav-buttons a').removeClass('active');
      $(this).addClass('active');
    });
  });


/////SIGNUP FORM//////////////

/////USER PROFILE//////////////
//get all user profiles
// const getUsers = (event) => {
//     event.preventDefault();
//     fetch(baseUrl + users)  
//       .then(res => res.json())
//       .then(data => {
//       }console.log(data[0]._id))
//       .catch(err => console.log(err))
//   }

///////////HANDLE COMMENTS///////////////////////
const renderComments = (comments) => {

  let commentContainer = document.getElementById("commentContainer")

  //clears each time so no duplicate data
  commentResults.innerHTML = '';
  document.querySelector('.comments-form').children[0] = '';
  document.querySelector('.comments-form').children[1] = '';
  comments.forEach(comment => {
    // console.log(comment.message);

    commentContainer.insertAdjacentHTML('afterbegin', `
      <div class="comment-results">
          <p><strong>${comment.user.username}</strong></p>
          <p><strong>${comment.message}</strong></p>
      </div>
    `)
  });

  commentCarousel();
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
  
  const userComment = document.getElementById('message').value;
  const commentData = { message: userComment };

  fetch((baseUrl + comments), {
      method: "POST",
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(commentData),
  })
    .then(res => res.json())
    .then((data) => {
      getComments();
    })
    .catch(err => console.log(err));
}


function commentCarousel() {
  console.log('Carouselling...')
  let commentIndex = 0;
  setInterval(function(){
    const commentResultsArray = $('#commentContainer .comment-results');
    commentIndex += 1;
    if (commentIndex > commentResultsArray.length -1) {commentIndex = 0}
    $('.comment-results').eq(commentIndex).siblings().attr('class', 'comment-results');
    $('.comment-results').eq(commentIndex).attr('class', 'show');
    
  },5000);
}


// find restaurants that match city and country - use zomato api to find rest in city/country
function findCityId (event) {
  event.preventDefault();
  const query = encodeURI(document.getElementById('cityName').value);
  let cityId = null;  
  fetch(`${zomato}/cities?q=${query}`, {
    headers: {
      "user-key": zomatoKey
    }
  }).then(res => res.json())
    .then(data => {
      cityId = data.location_suggestions[0].id;
      getCityRestaurants(cityId);
  });
};

function getCityRestaurants(cityId) {
  fetch(`${zomato}/search?entity_id=${cityId}&entity_type=city`, {
    headers: {
      "user-key": "64ec316d35f97e2df01286cf2d5f00df"
    }
  })
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      const restaurants = data.restaurants;
      zomatoResponse(restaurants);
    });
};


//const imageUrl = data.restaurants[0].restaurant.featured_image;

const zomatoResponse = (data) => {
  console.log(data[0].restaurant);
  const results = document.querySelector('.results-section');
  data.forEach((item, index) => {
    let image = item.restaurant.featured_image ? item.restaurant.featured_image : `http://picsum.photos/200?image=${index}`

    results.insertAdjacentHTML('afterbegin', `
      <img src="${image}" alt="${item.restaurant.name}" width="200" />
    `)
  })
};


$('#cuisine-submit').on('click', findCityId);
$('#comment-submit').on('click', handleCommentSubmit);


//end of document ready
});
