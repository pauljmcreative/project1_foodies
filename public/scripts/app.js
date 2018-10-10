console.log("app.js is working!");

$(document).ready(function(){


const baseUrl = 'http://localhost:3000/api/';
const users = 'users/';
const comments = 'comments/';
const zomato = 'https://developers.zomato.com/api/v2.1/';
const zomatoKey = '64ec316d35f97e2df01286cf2d5f00df';



///////////SMOOTH SCROLL/////////////////
///////ask for explanation...

  $("a").on('click', function(event) {
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
      let $anchor = $(this);
      event.preventDefault();
      $('.nav-buttons a').removeClass('active');
      $(this).addClass('active');
    });
  });


/////SIGNUP FORM//////////////





// const getCuisines = () => {
//     fetch(######)
//       .then(res => res.json())
//       .then(cuisines => render(cuisines))
//       .catch(err => console.log(err));
//   }

//   getCuisines();


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

  console.log('Calling Home...')
  fetch(`${zomato}/cities?q=${query}`, {
    headers: {
      "user-key": zomatoKey
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      cityID = data.location_suggestions[0].id;
      console.log(cityId);
      getCityRestaurants(cityId)
    });

//call zomato api
//get city, country, restaurants
//if city and country match user input for city and country
//then show a restaurant that same city and country

};

function getCityRestaurants(cityId) {
  // ?entity_id=10831&entity_type=city
  fetch(zomato + 'search', {
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
