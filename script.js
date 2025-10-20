//general functionalities
//base maps
var streetMap = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
);
var darkMap = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
);
var satellite = L.tileLayer(
  "https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
  {
    subdomains: ["mt0", "mt1", "mt2", "mt3"], //akes loading map tiles faster leaflet can use mt0, mt1, mt2, mt3 at once
  }
);
//starting basemap
var map = L.map("map", {
  center: [31.5204, 74.3587], //set coordinates
  zoom: 11, //zoom
  layers: [streetMap], //here e can street with any one like dark or satttelite map
});
//library data
//stored in variable
var libraries = [
  {
    name: "Punjab Public Library",
    lat: 31.582045,
    lng: 74.329376,
    type: "public",
    year: 1884,
    event: "Book Fair",
    books: ["The History of Lahore", "Allama Iqbal Poetry Collection"],
  },
  {
    name: "LUMS Library",
    lat: 31.4704,
    lng: 74.4085,
    type: "university",
    year: 1986,
    event: "AI & Research Expo",
    books: [
      "Artificial Intelligence by Russell & Norvig",
      "Data Science for Dummies",
    ],
  },
  {
    name: "British Council Library",
    lat: 31.5204,
    lng: 74.3587,
    type: "private",
    year: 1973,
    event: "English Book Week",
    books: ["Pride and Prejudice", "To Kill a Mockingbird"],
  },
  {
    name: "GCU Library",
    lat: 31.5795,
    lng: 74.3081,
    type: "university",
    year: 1870,
    event: "Student Poetry Day",
    books: ["Gitanjali by Tagore", "The Waste Land by T.S. Eliot"],
  },
  {
    name: "Quaid-e-Azam Library",
    lat: 31.5544,
    lng: 74.3422,
    type: "public",
    year: 1866,
    event: "National Book Day",
    books: ["Jinnah of Pakistan", "Iqbal: The Life of a Poet Philosopher"],
  },
  {
    name: "PU Central Library",
    lat: 31.5199,
    lng: 74.3079,
    type: "university",
    year: 1882,
    event: "Research Workshop",
    books: ["Research Methodology by Kothari", "Academic Writing Essentials"],
  },
  {
    name: "FAST-NUCES Library",
    lat: 31.4817,
    lng: 74.3033,
    type: "university",
    year: 1990,
    event: "Tech Talk",
    books: ["Clean Code", "Python Crash Course"],
  },
  {
    name: "Lahore College for Women University Library",
    lat: 31.5668,
    lng: 74.3155,
    type: "university",
    year: 1922,
    event: "Women Writers Week",
    books: ["We Should All Be Feminists", "Becoming by Michelle Obama"],
  },
  {
    name: "COMSATS Lahore Library",
    lat: 31.4033,
    lng: 74.2182,
    type: "university",
    year: 2002,
    event: "Science Exhibition",
    books: ["A Brief History of Time", "Astrophysics for People in a Hurry"],
  },
  {
    name: "Kinnaird College Library",
    lat: 31.5439,
    lng: 74.3391,
    type: "university",
    year: 1913,
    event: "Creative Writing Week",
    books: ["Bird by Bird", "On Writing by Stephen King"],
  },
  {
    name: "NCA Library",
    lat: 31.5791,
    lng: 74.3088,
    type: "university",
    year: 1875,
    event: "Art Book Fair",
    books: ["The Story of Art", "Ways of Seeing"],
  },
  {
    name: "UET Main Library",
    lat: 31.5799,
    lng: 74.4059,
    type: "university",
    year: 1921,
    event: "Engineering Expo",
    books: ["Engineering Mechanics", "Thermodynamics: An Engineering Approach"],
  },
  {
    name: "Dar-ul-Hikmat Library",
    lat: 31.5546,
    lng: 74.3511,
    type: "public",
    year: 1995,
    event: "Community Reading Day",
    books: ["Urdu Short Stories", "Pakistani Literature: A History"],
  },
  {
    name: "Alhamra Arts Council Library",
    lat: 31.5603,
    lng: 74.3389,
    type: "public",
    year: 1959,
    event: "Arts Festival",
    books: ["The Art Spirit", "Modern Art Explained"],
  },
  {
    name: "Model Town Community Library",
    lat: 31.4801,
    lng: 74.3302,
    type: "public",
    year: 1980,
    event: "Book Exchange",
    books: ["The Book Thief", "The Little Prince"],
  },
];
//-----------general--------------------------
//-----------function_1-----------------------
//-----------(automatically)add markers+ pop up---------------------
var markers = []; //array to store markers
function addMarkers() {
  libraries.forEach(function (obj) {
    var marker = L.marker([obj.lat, obj.lng])
      .addTo(map)
      .bindPopup(`<b>${obj.name}</b><br>Type: ${obj.type}`);
    // Marker click event that shows details
    marker.on("click", function () {
      showlibrarydetails(obj);
    });

    markers.push({
      // // Store marker details in array
      marker: marker,
      type: obj.type,
      name: obj.name,
      lat: obj.lat,
      lon: obj.lng,
    });
  });
}
addMarkers(); //call the function
//-----------function_2(general) and Function-10(thematic)-----------------------
// we add in f1 Marker click event that shows details
//showing library details in the detailbar
let rating = 0; // store the last selected rating
let libraryRatings = {}; // store ratings for each library separately

function showlibrarydetails(obj) {
  const detailBar = document.querySelector(".detailbar");

  // if this library was rated before, load that rating
  rating = libraryRatings[obj.name] || 0;

  // show details
  detailBar.innerHTML = `
    <h3>${obj.name}</h3>
    <p><b>Type:</b> ${obj.type}</p>
    <p><b>Founded:</b> ${obj.year}</p>
    <p><b>Event:</b> ${obj.event}</p>
    <p><b>Recommended Books:</b></p>
    <ul>
      <li>${obj.books[0]}</li>
      <li>${obj.books[1]}</li>
    </ul>

    <p><b>Rate this Library:</b></p>
    <div class="stars">
      <span onclick="setRating('${obj.name}',1)">★</span>
      <span onclick="setRating('${obj.name}',2)">★</span>
      <span onclick="setRating('${obj.name}',3)">★</span>
      <span onclick="setRating('${obj.name}',4)">★</span>
      <span onclick="setRating('${obj.name}',5)">★</span>
    </div>
  `;

  // highlight already saved rating
  const starsList = detailBar.querySelectorAll(".stars span");
  starsList.forEach((star, index) => {
    star.style.cursor = "pointer"; //  makes hand cursor appear
    star.style.color = index < rating ? "gold" : "#ccc";
  });
}

function setRating(libraryName, stars) {
  rating = stars;
  libraryRatings[libraryName] = stars; // save rating for this library

  const starsList = document.querySelectorAll(".detailbar .stars span");
  starsList.forEach((star, index) => {
    star.style.color = index < stars ? "gold" : "#ccc";
  });
}

//-----------function_3-----------------------
var currentBaseMap = 0;
function changeMap() {
  currentBaseMap = (currentBaseMap + 1) % 3;
  map.removeLayer(streetMap);
  map.removeLayer(darkMap);
  map.removeLayer(satellite);
  if (currentBaseMap == 0) streetMap.addTo(map);
  if (currentBaseMap == 1) darkMap.addTo(map);
  if (currentBaseMap == 2) satellite.addTo(map);
}
//-----------function_4-----------------------
//search
document.getElementById("search").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  if (query.trim() === "") {
    markers.forEach((obj) => obj.marker.addTo(map));
    map.setView([defaultView.lat, defaultView.lon], defaultView.zoom);
    return;
  }
  markers.forEach((obj) => {
    if (obj.name.toLowerCase().includes(query)) {
      obj.marker.addTo(map);
      map.setView([obj.lat, obj.lon], 14);
    } else {
      map.removeLayer(obj.marker);
    }
  });
});
//-----------function-5-----------------------
//locate me
// Ask browser for user's current location and zoom map to it
let userMarker = null; // store the user's location marker
let userCircle = null; // store the user's location circle
let defaultView = { lat: 31.5204, lon: 74.3587, zoom: 11 }; // our map's original position

function locateMe() {
  // if userMarker exists, it means "Nearest Me" was already clicked before
  if (userMarker && userCircle) {
    map.removeLayer(userMarker); // remove the marker
    map.removeLayer(userCircle); // remove the circle
    userMarker = null;
    userCircle = null;
    map.setView([defaultView.lat, defaultView.lon], defaultView.zoom); // reset map to default view
    return;
  }

  // otherwise, locate the user and show their position
  map.locate({ setView: true, maxZoom: 14 });
  map.once("locationfound", (e) => {
    userMarker = L.marker(e.latlng)
      .addTo(map)
      .bindPopup("You are here ")
      .openPopup();

    userCircle = L.circle(e.latlng, {
      radius: 2000,
      color: "blue",
      fillOpacity: 0.1,
    }).addTo(map);
  });
}
//-----------on theme functions-----------------------
//-----------function-6-----------------------
function filterByYear(year) {
  document.getElementById("yearVal").textContent = year;
  markers.forEach((obj, index) => {
    if (libraries[index].year <= year) {
      obj.marker.addTo(map);
    } else {
      map.removeLayer(obj.marker);
    }
  });
}
//-----------function-7-----------------------
//filter by types

document.getElementById("filter").addEventListener("change", function () {
  //event listner
  showLibraries(this.value);
});
function showLibraries(type) {
  markers.forEach((obj) => map.removeLayer(obj.marker));
  markers.forEach((obj) => {
    if (type === "all" || obj.type === type) {
      obj.marker.addTo(map);
    }
  });
}
//-----------function-8-----------------------
// Event color mapping
const eventColors = {
  "Book Fair": "black",
  "AI & Research Expo": "pink",
  "English Book Week": "brown",
  "Student Poetry Day": "purple",
  "National Book Day": "yellow",
  "Research Workshop": "white",
  "Tech Talk": "blue",
  "Women Writers Week": "red",
  "Science Exhibition": "light green",
  "Creative Writing Week": "light blue",
  "Art Book Fair": "gold",
  "Engineering Expo": "light gray",
  "Community Reading Day": "cyan",
  "Arts Festival": "orange",
  "Book Exchange": "brown",
};

// Function to show or hide event circles + update sidebar details
function toggleEvents() {
  const detailBar = document.querySelector(".detailbar");

  // Hide events
  if (eventVisible) {
    eventCircles.forEach((c) => map.removeLayer(c));
    eventCircles = [];
    eventVisible = false;
    detailBar.innerHTML =
      "<h3>Library Details</h3><p>Events hidden. Click 'Show Events' to view.</p>";
    return;
  }

  // Show events
  libraries.forEach((lib) => {
    const color = eventColors[lib.event] || "gray";
    const circle = L.circleMarker([lib.lat, lib.lng], {
      radius: 9,
      color: color,
      fillColor: color,
      fillOpacity: 0.8,
    })
      .addTo(map)
      .bindPopup(`<b>${lib.name}</b><br>Event: ${lib.event}`);

    eventCircles.push(circle);
  });

  // Add event legend and library details to right panel
  let html = `<h3> Library Event Details</h3>`;
  libraries.forEach((lib) => {
    const color = eventColors[lib.event] || "gray";
    html += `
      <div style="margin:5px 0; display:flex; align-items:center;">
        <div style="width:15px; height:15px; background:${color}; border-radius:50%; margin-right:8px;"></div>
        <b>${lib.name}</b> — <span>${lib.event}</span>
      </div>
    `;
  });
  detailBar.innerHTML = html;

  eventVisible = true;
}
let eventCircles = [];
let eventVisible = false;
//-----------function-9-----------------------
//show recommendations in detailbar
let recommendationsVisible = false;
function showRecommendations() {
  const detailBar = document.querySelector(".detailbar");
  if (recommendationsVisible) {
    detailBar.innerHTML =
      "<h3>Library Details</h3><p>Recommendations hidden. Click 'Book Recommendations' to view.</p>";
    recommendationsVisible = false;
    return;
  }

  let html = "<h3>Book Recommendations</h3>";

  libraries.forEach((lib) => {
    html += `
      <div style="margin-bottom:10px;">
        <b>${lib.name}</b><br>
        Recommended Books:
        <ul style="margin-top:5px;">
          <li>${lib.books[0]}</li>
          <li>${lib.books[1]}</li>
        </ul>
      </div>
    `;
  });
  recommendationsVisible = true;

  detailBar.innerHTML = html;
}
