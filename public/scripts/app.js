console.log("app.js is working!");

$(document).ready(function(){


const baseUrl = 'http://localhost:3000/api/';
const users = 'users/';
const comments = 'comments/';
const zomato = 'https://developers.zomato.com/api/v2.1';
const zomatoKey = "64ec316d35f97e2df01286cf2d5f00df";



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
















// const render = (users) => {
//   console.log(users);
// }

//   users.forEach(user => {
//            console.log(user.username);
//           $('#profile-greeting').insertAdjacentHTML('afterbegin', `
//               <div id="project-results">
//                   <p><strong>${project.name}</strong></p>
//                   <p><strong>${project.date}</strong></p>
//                   <p><strong>${project.description}</strong></p>
//                   <p><strong>${project.techstack}</strong></p>
//                   <img src="${project.screenshot}">
//                   <small id="${project._id}">EDIT</small>
//                   <small id="${project._id}">DELETE</small>
//               </div>
//     `)
//   });
// }




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

//   $('#submit-user').on('click', getUsers);



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
