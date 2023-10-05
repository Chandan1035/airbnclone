// Fetch listings from the RapidAPI Airbnb API
async function fetchListings() {
    const response = await fetch("https://rapidapi.com/3b-data-3b-data-default/api/airbnb13", {
      headers: {
        "X-RapidAPI-Host": "3b-data-3b-data-default.p.rapidapi.com",
        "X-RapidAPI-Key": 3d6f43308emsh6a723383eb2dd73p1170a0jsndc9b168809de,
      },
    });
    const json = await response.json();
    return json.data;
  }
  
  // Display the listings on the page
  function displayListings(listings) {
    const listingsContainer = document.getElementById("listings");
    listingsContainer.innerHTML = "";
  
    for (const listing of listings) {
      const listingElement = document.createElement("div");
      listingElement.classList.add("listing");
  
      // Add the listing's image
      const image = document.createElement("img");
      image.src = listing.images[0];
      image.alt = listing.title;
      listingElement.appendChild(image);
  
      // Add the listing's title
      const title = document.createElement("h3");
      title.textContent = listing.name;
      listingElement.appendChild(title);
  
      // Add the listing's price
      const price = document.createElement("p");
      price.textContent = `${listing.price.total} ${listing.price.currency}`;
      listingElement.appendChild(price);
  
      // Add the listing to the container
      listingsContainer.appendChild(listingElement);
    }
  }
  
  // Initialize the application
  window.addEventListener("DOMContentLoaded", async () => {
    const listings = await fetchListings();
    displayListings(listings);
  });
  
  const searchButton = document.getElementById("search-button");
  
  searchButton.addEventListener("click", () => {
    const searchInput = document.getElementById("search-input").value;
  
    fetch(`https://rapidapi.com/3b-data-3b-data-default/api/airbnb13?search=${searchInput}`, {
      headers: {
        "X-RapidAPI-Host": "3b-data-3b-data-default.p.rapidapi.com",
        "X-RapidAPI-Key": YOUR_API_KEY,
      },
    })
      .then(response => response.json())
      .then(data => {
        // Display the listings here
        displayListings(data);
      })
      .catch(error => console.error("Error:", error));
  });
  
  // Google Maps API key
  const GOOGLE_MAPS_API_KEY = "AIzaSyCkK8Bk3j41ET4lj22Vj0qP0CXquPBM-SY";
  
  // Get the user's current location
  let userLocation;
  
  window.onload = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    }
  };
  
  // Initialize the Google Maps map
  let map;
  
  function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 }, // Centered at some default location
      zoom: 8,
    });
  }
  
  // Create a listing card element for each listing
  function createListingCard(listing) {
    const listingCard = document.createElement("div");
    listingCard.classList.add("listing-card");
  
    listingCard.innerHTML = `
      <img class="image" src="${listing.images[0]}" alt="${listing.title}">
      <div class="listing-info">
        <h3>${listing.name}</h3>
        <p>${listing.price.total} ${listing.price.currency}</p>
      </div>
    `;
  
    return listingCard;
  }
  