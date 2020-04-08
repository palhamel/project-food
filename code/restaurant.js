// Variables
const apiKey = "4fd2dd29c14db73b1a3c8639ecc045bb"
const cityName = 61
const cuisineType = 60
const apiData = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityName}&entity_type=city&cuisines=${cuisineType}`
let ourArray
let restaurantName 
let averageCost 
let address
let restImage
let ratings
let restaurantsArrays


// DOM
const foodReview = document.getElementById("foodReview")


//Sorting on price
const priceRange = () => {
  ourArray.sort((a, b) =>
    a.restaurant.average_cost_for_two - b.restaurant.average_cost_for_two
  ) 
}


// Sorting on rating
const sortRatings = () => {
  ourArray.sort((a,b) => {
    return b.restaurant.user_rating.aggregate_rating - a.restaurant.user_rating.aggregate_rating
  })
}


// JSON
fetch(apiData, { headers: { "user-key": apiKey } })
  .then(response => response.json())
  
  .then((json) => {
    console.log(json)

    ourArray = json.restaurants
    printFood(ourArray)
    })

    const printFood = (array) => {
      foodReview.innerHTML = ""
      array.forEach(item => {
        restaurantName = item.restaurant.name
        // console.log(restaurantName)

        averageCost = item.restaurant.average_cost_for_two
        // console.log(averageCost)

        address = item.restaurant.location.address
        // console.log(address)

        restImage = item.restaurant.photos[0].photo.url
        // console.log(restImage)

        ratings = item.restaurant.user_rating.aggregate_rating
        // console.log(ratings)
          foodReview.innerHTML += `<div id="children">
          <img src="${restImage}"></img>
          <p class="name text">${restaurantName}</p>
          <p class="text">${address}</p>
          <p class="text">Average Price for Two: £${averageCost}</p>
          <p class="text">★ ${ratings}/5.0 </p>
          </div>`
    })
  }



// On click - price
  const clickedPriceSort = () => {
    priceRange()
    printFood(ourArray)
  }
    
// On click - rating
const clickedRating = () => {
  sortRatings()
  printFood(ourArray)
} 
document.getElementById('sortRating').onclick = clickedRating
      
