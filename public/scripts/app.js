console.log("app.js is working!");

$(document).ready(function(){


const baseUrl = 'http://localhost:3000/api/';
const users = 'users/';
const comments = 'comments/';
const zomato = 'https://developers.zomato.com/api/v2.1';
const zomatoKey = "64ec316d35f97e2df01286cf2d5f00df";
const commentResults = document.getElementById('commentContainer')


///////////SMOOTH SCROLL/////////////////
  $('a').on('click', function(event) {
    console.log('Hash = ' + this.hash)
    if (this.hash !== '') {
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
  console.log(comments)

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
          <small id="${comment._id}">EDIT</small>
          <small id="${comment._id}">DELETE</small>
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
////////////////////////////////////////////////
///////////EDIT DELETE//////////////////////////
////////////////////////////////////////////////

//triggered on clicks within #commentContainer

const handleEditDelete = (event) => {
  //select delete button to delete comment
  if (event.target.innerText === 'DELETE') {
    fetch(baseUrl + comments + event.target.id, {
      method: 'DELETE',
      })
      .then(() => getComments())
      .catch(err => console.log(err));
  
  //select edit to edit comment
  } else if(event.target.innerText === 'EDIT') {
    const parent = event.target.parentNode;
    const commentName = parent.children[0].innerText;
    const commentMessage = parent.children[1].innerText;
    const commentId = parent.children[2].id;

    //create edit comment form
    parent.insertAdjacentHTML('beforeend', `
      <span id="editComment">
        <input id="editCommentName" name="name" type="text" value="${commentName}">
        <input id="editCommentMessage" name="message" type="text" value="${commentMessage}">
        <button id="editCancel">CANCEL</button>
        <button id="editSubmit" data-id="${commentId}">SUBMIT</button>
      </span>
    `);

    //cancel->remove edit comment form
    } else if(event.target.id === 'editCancel') {
      const commentForm = document.getElementById('editComment');
      commentForm.remove();

    //save changes -> submit 
    } else if(event.target.id === 'editSubmit') {
      let commentId = event.target.getAttribute('data-id');
      const newCommentName = document.getElementById('editCommentName').value;
      const newCommentMessage = document.getElementById('editCommentMessage').value;
      const newCommentData = {username: newCommentName, message: newCommentMessage};
      console.log("comment data is " + newCommentData);
      
      if (newCommentName.length !== 0 && newCommentMessage.length !== 0) {
        fetch(baseUrl + comments + commentId, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          body: JSON.stringify(newCommentData)
        })
          .then(() => getComments());
      }
    }
  }

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


//comment carousel
function commentCarousel() {
  console.log('Carouselling...')
  let commentIndex = 0;
  setInterval(function(){
    const commentResultsArray = $('#commentContainer .comment-results');
    commentIndex += 1;
    if (commentIndex > commentResultsArray.length -1) {commentIndex = 0}
    $('.comment-results').eq(commentIndex).siblings().attr('class', 'comment-results');
    $('.comment-results').eq(commentIndex).attr('class', 'show');
    
  },30000);
}

////////////////////////////////////////
/////Search for restaurants by city/////
////////////////////////////////////////

//matches searched city name to zomato City ID
function findCityId (event) {
  event.preventDefault();

  //Remove results section
  $('.results-section').empty();

  //scroll to results
  document.querySelector('.results-section').scrollIntoView({behavior: 'smooth'});

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

//Finds Zomato restaurants by Zomato CityID
function getCityRestaurants(cityId) {
  fetch(`${zomato}/search?entity_id=${cityId}&entity_type=city`, {
    headers: {
      "user-key": "64ec316d35f97e2df01286cf2d5f00df"
    }
  })
    .then(res => res.json())
    .then((data) => {
      const restaurants = data.restaurants;
      foundRestaurants(restaurants);
    });
};


///////////////////////////////
///////RESTAURANT CAROUSEL/////
///////////////////////////////

//Get array of all restaurants for a city
//Show first restaurant in results section
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

  //when user selects previous button, show previous restaurant
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
/////END RESTAURANT CAROUSEL//////
//////////////////////////////////


$('#cuisine-submit').on('click', findCityId);
$('#comment-submit').on('click', handleCommentSubmit);
$('#commentContainer').on('click', handleEditDelete);


//end of document ready
});
