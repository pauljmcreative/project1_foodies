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

////////COMMENTS SECTION///////////////////
const renderComments = (comments) => {
  console.log(comments);
  let commentContainer = document.getElementById("commentContainer")

  //clears each time so no duplicate data
  commentResults.innerHTML = '';
  .comments-form.children[0] = '';
  .comments-form.children[1] = '';

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



 // .then(comments => renderComments(comments))


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

};

function getCityRestaurants(cityId) {

  console.log('City ID = ' + cityId)
  fetch(`${zomato}/search?entity_id=${cityId}&entity_type=city`, {
    headers: {
      "user-key": "64ec316d35f97e2df01286cf2d5f00df"
    }
  })
    .then(res => res.json())
    .then((data) => {
      console.log(data)
    });
};

// const imageUrl = data.restaurants[0].restaurant.featured_image

// const ZomatoResponse = (res) => {
//   res.forEach(function (image) {
//         $('.results-section').append(`

//           <div class="zomato-images">
//             <img src="${res.data.restaurants.featured.url}">
//             <div class="btn-group">
//               <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
//               <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
//             </div>
//             <small class="text-muted">9 mins</small>
//           </div>

//         `),
//   });


// };





$('#cuisine-submit').on('click', findCityId);
// $('#comment-submit').on('click', handleCommentSubmit);


//end of document ready
});
