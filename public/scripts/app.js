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


//Search////////

// find restaurants that match city and country - use zomato api to find rest in city/country
//triggerd by search submit
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

//triggered by findCityId function
function getCityRestaurants(cityId) {
  fetch(`${zomato}/search?entity_id=${cityId}&entity_type=city`, {
    headers: {
      "user-key": "64ec316d35f97e2df01286cf2d5f00df"
    }
  })
    .then(res => res.json())
    .then((data) => {
      const restaurants = data.restaurants;
      //EL--remove--this function not needed-> zomatoResponse(restaurants);
      foundRestaurants(restaurants);
    });
};



///EL --- Restaurant images------
//EL---for each restaurant, get the featured image and display in results section------
//EL--code to remove -not needed-----------
// const zomatoResponse = (data) => {
//   const results = document.querySelector('.results-section');
//   //EL//for each restaurant, get featured image, if no featured image, use random from picsum
//   //add photos to results section
//   data.forEach((item, index) => {
//     let image = item.restaurant.featured_image ? item.restaurant.featured_image : `http://picsum.photos/200?image=${index}`
//     results.insertAdjacentHTML('afterbegin', `
//       <img src="${image}" alt="${item.restaurant.name}" width="200" />
//     `)
//   })
// };
//EL end code to remove -------------------

//EL--get array of all restaurants for a city
//show one at a time, start with first, and increment on next button click
const foundRestaurants = (data) => {
  let foundRestaurantsArray = data;
  let i = 0;
  
  //show first restaurant initially
  let rImage = foundRestaurantsArray[0].restaurant.featured_image;
  //TODO: or show default image
  let rName = foundRestaurantsArray[0].restaurant.name;
  let rAddress = foundRestaurantsArray[0].restaurant.location.address;

  $('.results-section').append(`
    <section class="name-address">
      <h2 class="restaurant-name">${rName}</h2>
      <h3 class="restaurant-address">${rAddress}</h3>
    </section>

    <section class="restaurant-carousel">
      <button class="previous-button">Previous</button>
      <img src="${rImage}" alt="Photo of food at ${rName}."/>
      <button class="next-button">Next</button>
    </section>
    `);

  //when user selects next button, show next restaurant
  $('.next-button').on('click',() => {
      if (i < foundRestaurantsArray.length - 1) {
        i++;
      } else {
        i=0;
      };

      let nextImage = foundRestaurantsArray[i].restaurant.featured_image;
      let nextName = foundRestaurantsArray[i].restaurant.name;
      let nextAddress = foundRestaurantsArray[i].restaurant.location.address;

      $('.restaurant-name').text(nextName);
      $('.restaurant-address').text(nextAddress);
      $('.restaurant-carousel img').attr('src', nextImage);
  });

    $('.previous-button').on('click',() => {
      if (i > 0 && i < foundRestaurantsArray.length - 1) {
        i--
      };

      let nextImage = foundRestaurantsArray[i].restaurant.featured_image;
      let nextName = foundRestaurantsArray[i].restaurant.name;
      let nextAddress = foundRestaurantsArray[i].restaurant.location.address;

      $('.restaurant-name').text(nextName);
      $('.restaurant-address').text(nextAddress);
      $('.restaurant-carousel img').attr('src', nextImage);
  });

};  
//EL---end of code changes for restaurant carousel//////


$('#cuisine-submit').on('click', findCityId);
$('#comment-submit').on('click', handleCommentSubmit);


//end of document ready
});
