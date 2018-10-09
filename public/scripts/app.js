console.log("app.js is working!");

const baseUrl = 'http://localhost:3000/api/';
const users = 'users/';
const comments = 'comments/';
const apiKey = '64ec316d35f97e2df01286cf2d5f00df';


 // var zUrl = `https://developers.zomato.com/api/v2.1/search?lat=${pos.lat}&lon=${pos.lng}&cuisines=${cuisines}&sort=real_distance` 

// $.ajax({
//       url: my_url,
//       headers: {
//           "user-key": "64ec316d35f97e2df01286cf2d5f00df"
//       },
//       method: 'GET',
//       dataType: 'json',
//       success



$.ajax({
  method: 'GET',
  url: 'https://developers.zomato.com/api/v2.1/categories',
  headers: {
          "user-key": "64ec316d35f97e2df01286cf2d5f00df"
      },
  dataType: 'json',
  success: successFunction,
  error: (err) => console.log(err),
});

function successFunction(response) {
  console.log(response);
};




//curl -X GET --header "Accept: application/json" --header "user-key: 64ec316d35f97e2df01286cf2d5f00df" "https://developers.zomato.com/api/v2.1/categories"






