'use strict';

//const findNowButton = document.getElementById('findNowButton');


document.addEventListener('DOMContentLoaded', function () {
  const locationInput = document.getElementById('locationInput'); // Change 'location' to 'hhhh'
  const findNowButton = document.getElementById('findNowButton');
  const resultsContainer = document.getElementById('results');

  
});

/*const locationInput = document.getElementById('locationInput');
const findNowButton = document.getElementById('findNowButton');

findNowButton.addEventListener('click', function () {
  const locationValue = locationInput.value;
  if (locationValue) {
    // Performing the search based on the location input value
    
  }
});*/


document.addEventListener('DOMContentLoaded', function () {
  const locationInput = document.getElementById('locationInput');
  const findNowButton = document.getElementById('findNowButton');
  const resultsContainer = document.getElementById('results');

  

  // Function to redirect to "others.html" when the button is clicked
  const redirectToOthers = function () {
    const locationValue = locationInput.value;
    if (locationValue) {
      // Redirect to "others.html" only if a location is provided
      window.location.href = "others.html";
    }
  };

  // Add a click event listener to the "Find Now" button
  findNowButton.addEventListener('click', redirectToOthers);
});



function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Construct the URL with latitude and longitude parameters
  const url = `others.html?latitude=${latitude}&longitude=${longitude}`;

  // Redirect to the other page
  window.location.href = url;
}

function error() {
  status.textContent = 'Unable to retrieve your location';
}


function geoFindMe() {

  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');

  mapLink.href = '';
  mapLink.textContent = '';

  function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      status.textContent = '';
      mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
  }

  function error() {
      status.textContent = 'Unable to retrieve your location';
  }

  if (!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
  } else {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
  }

}

document.querySelector('#find-me').addEventListener('click', geoFindMe);



// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
function initAutocomplete() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -33.8688, lng: 151.2195 },
    zoom: 13,
    mapTypeId: "roadmap",
  });
  // Creating the search box and link it to the UI element.
  const input = document.getElementById("hhhh");
  const searchBox = new google.maps.places.SearchBox(input);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        }),
      );
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

window.initAutocomplete = initAutocomplete;



let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: 20.32482868484555, lng: 85.81856411303461 },
    zoom: 8,
  });
}

initMap();



if ("geolocation" in navigator) {
  // Geolocation is available
} else {
  // Geolocation is not available in this browser
}

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
    // You have access to the user's location in the `position` object.
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }, function(error) {
    // Handle errors or user's denial of location access
    console.error("Error getting location:", error);
  });
}

/*if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
    // Access user's location
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }, function(error) {
    // Handle errors or user's denial of location access
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.error("User denied the request for location.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.error("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.error("The request to get user location timed out.");
        break;
      default:
        console.error("An unknown error occurred.");
        break;
    }
  });
}*/


function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 0, lng: 0 }, // Setting your default map center
    zoom: 15, // Adjusting the initial zoom level as needed
  });

  const input = document.querySelector('.input-field'); // Select the input field for location
  const autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.bindTo('bounds', map);

  const infowindow = new google.maps.InfoWindow();
  const service = new google.maps.places.PlacesService(map);

  autocomplete.addListener('place_changed', function () {
    infowindow.close();
    const place = autocomplete.getPlace();

    if (!place.geometry) {
      return;
    }

    // Performing a search for doctors near the selected location.
    service.nearbySearch({
      location: place.geometry.location,
      radius: 5000, // Adjust the radius as needed
      type: 'doctor',
    }, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // Processing the search results (doctors).
        for (let i = 0; i < results.length; i++) {
          // Creating markers or other display elements for each doctor.
        }
      }
    });
  });
}


var MapApiApplication = {
  myCurrentPosition : "",
  mapOptions : "",
  marker : "",
  initialize : function(){
     MapApiApplication.myCurrentPosition = new google.maps.LatLng(20.324989658241595, 85.81890743577213);
     MapApiApplication.mapOptions = {
       zoom: 13,
       center: MapApiApplication.myCurrentPosition,
       mapTypeId: google.maps.MapTypeId.ROADMAP
     };
     MapApiApplication.map = new google.maps.Map(document.getElementById('map-canvas'), MapApiApplication.mapOptions);
     MapApiApplication.marker = new google.maps.Marker({
        position: MapApiApplication.myCurrentPosition,
        map: MapApiApplication.map,
        title: 'Here You Are'
     });
  }, 
};


document.addEventListener('DOMContentLoaded', function () {
  const locationInput = document.getElementById('location');
  const findNowButton = document.getElementById('findNowButton');
  const resultsContainer = document.getElementById('results');

  let map;
  let service;

  // Initialize Google Maps
  function initMap() {
    const initialLocation = new google.maps.LatLng(20.325633550150574, 85.82491558367845);

    map = new google.maps.Map(document.getElementById('map'), {
      center: initialLocation,
      zoom: 15, // Adjust the initial zoom level as needed
    });

    service = new google.maps.places.PlacesService(map);
  }

  // Function to perform a Nearby Search for hospitals
  function searchForHospitals(location) {
    const request = {
      location,
      radius: 5000, // Adjust the radius as needed (in meters)
      type: 'hospital', // Specify the type of place you're searching for
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        resultsContainer.innerHTML = ''; // Clear previous results

        for (let i = 0; i < results.length; i++) {
          const place = results[i];
          const name = place.name;

          const resultElement = document.createElement('p');
          resultElement.textContent = name;

          resultsContainer.appendChild(resultElement);
        }
      } else {
        console.error('Error in nearbySearch:', status);
      }
    });
  }

  // Add a click event listener to the "Find Now" button
  //findNowButton.addEventListener('click', function () {
    const redirectToOthers = function () {
    //const locationValue = locationInput.value;
    const locationValue = locationInput.value.trim();
    if (locationValue) {
      // Convert location input to LatLng
      //const geocoder = new google.maps.Geocoder();
      //geocoder.geocode({ address: locationValue }, (results, status) => {
        //if (status === google.maps.GeocoderStatus.OK) {
          //const location = results[0].geometry.location;
          //searchForHospitals(location);
          window.location.href="others.html";
       // } else {
          //console.error('Error geocoding location:', status);
         // alert("Please enter a location before finding.");
        //}
      }
    };
//}
  //});
  findNowButton.addEventListener('click', redirectToOthers);
  });
    
  // Initialize Google Maps when the DOM is ready
  //initMap();
//});

/*// Add a click event listener to the "Find Now" button
findNowButton.addEventListener('click', function () {
  const locationValue = locationInput.value;
  if (locationValue) {
    // Convert location input to LatLng
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: locationValue }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const location = results[0].geometry.location;
        searchForHospitals(location);
      } else {
        console.error('Error geocoding location:', status);
      }
    });
  }
});*/

// Initialize Google Maps when the DOM is ready
initMap();
const resultsContainer = document.getElementById('results'); // Define the resultsContainer variable
// Function to perform a Nearby Search for hospitals
function searchForHospitals(location) {
  const request = {
    location,
    radius: 50000, // Adjust the radius as needed (in meters)
    type: 'hospital', // Specify the type of place you're searching for
  };

  service.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      resultsContainer.innerHTML = ''; // Clear previous results

      for (let i = 0; i < results.length; i++) {
        const place = results[i];
        const name = place.name;

        const resultElement = document.createElement('p');
        resultElement.textContent = name;

        resultsContainer.appendChild(resultElement);
      }
    } else {
      console.error('Error in nearbySearch:', status);
    }
  });
}

// Add a reference to the "Find Now" button by its id
const findNowButton = document.getElementById("findNowButton");

// Add a click event listener to the button
findNowButton.addEventListener('click', function() {
  // Redirect to "others.html" when the button is clicked
  window.location.href = "pages/others.html";
});

const sampleHospitals = [
  'Hospital A',
  'Hospital B',
  'Hospital C',
  
];
// Function performing a Nearby Search for hospitals
function searchForHospitals(location) {
  // Construct the URL with hospital names as query parameters
  const hospitalNames = sampleHospitals.join(',');

  // Redirect to the other page and pass hospital data as a query parameter
  window.location.href = `others.html?hospitals=${hospitalNames}`;
}




/*function searchForHospitals(location) {
  // Clearing previous results
  resultsContainer.innerHTML = '';

  // Simulating a search by looping through sample hospital names
  sampleHospitals.forEach((name) => {
    const resultElement = document.createElement('p');
    resultElement.textContent = name;
    resultsContainer.appendChild(resultElement);
  });
}*/

// Adding a click event listener to the "Find Now" button
findNowButton.addEventListener('click', function () {
  const locationValue = locationInput.value;
  if (locationValue) {
    // Simulate a search using sample hospital names
    searchForHospitals(locationValue);
  }
});





// here ho
document.addEventListener('DOMContentLoaded', function () {
  const locationInput = document.getElementById('locationInput');
  const findNowButton = document.getElementById('findNowButton');
  const resultsContainer = document.getElementById('results');

  let map;
  let service;

  // Initialize Google Maps
  function initMap() {
    const initialLocation = new google.maps.LatLng(20.325633550150574, 85.82491558367845);

    map = new google.maps.Map(document.getElementById('map'), {
      center: initialLocation,
      zoom: 15, // Adjust the initial zoom level as needed
    });

    service = new google.maps.places.PlacesService(map);
  }

  // Function to perform a Nearby Search for hospitals
  function searchForHospitals(location) {
    const request = {
      location,
      radius: 5000, // Adjust the radius as needed (in meters)
      type: 'hospital', // Specify the type of place you're searching for
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        resultsContainer.innerHTML = ''; // Clear previous results

        for (let i = 0; i < results.length; i++) {
          const place = results[i];
          const name = place.name;

          const resultElement = document.createElement('p');
          resultElement.textContent = name;

          resultsContainer.appendChild(resultElement);
        }
      } else {
        console.error('Error in nearbySearch:', status);
      }
    });
  }

  // Add a click event listener to the "Find Now" button
  findNowButton.addEventListener('click', function () {
    const locationValue = locationInput.value;
    if (locationValue) {
      // Convert location input to LatLng
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: locationValue }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const location = results[0].geometry.location;
          searchForHospitals(location);
        } else {
          console.error('Error geocoding location:', status);
        }
      });
    }
  });

  // Initialize Google Maps when the DOM is ready
  initMap();
});










































/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * PRELOADER
 * 
 * preloader will be visible until document load
 */

const preloader = document.querySelector("[data-preloader]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * MOBILE NAVBAR
 * 
 * show the mobile navbar when click menu button
 * and hidden after click menu close button or overlay
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNav = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNav);



/**
 * HEADER & BACK TOP BTN
 * 
 * active header & back top btn when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElementOnScroll = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

window.addEventListener("scroll", activeElementOnScroll);



/**
 * SCROLL REVEAL
 */

const revealElements = document.querySelectorAll("[data-reveal]");

const revealElementOnScroll = function () {
  for (let i = 0, len = revealElements.length; i < len; i++) {
    if (revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.15) {
      revealElements[i].classList.add("revealed");
    } else {
      revealElements[i].classList.remove("revealed");
    }
  }
}

window.addEventListener("scroll", revealElementOnScroll);

window.addEventListener("load", revealElementOnScroll);
