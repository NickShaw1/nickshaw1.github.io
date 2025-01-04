var map = L.map("map", {
  scrollWheelZoom: false,
}).setView([54.787, -6.492], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var locations = [
  {
    name: "Northern California, USA",
    lat: 37.7749,
    lon: -122.4194,
    images: [
      {
        src: "/images/about/trips/norcal/norcal1.jpg",
        text: "Yosemite National Park's Tunnel View offers a breathtaking panoramic vista of iconic granite peaks and valleys.",
        title: "Yosemite National Park - Tunnel View",
        place: "Yosemite, USA",
      },

      {
        src: "/images/about/trips/norcal/norcal2.jpg",
        text: "From Glacier Point, Yosemite National Park presents a dramatic view of the park's vast landscape and Half Dome.",
        title: "Yosemite National Park - Glacier Point",
        place: "Yosemite, USA",
      },

      {
        src: "/images/about/trips/norcal/norcal3.jpg",
        text: "Vernal Falls in Yosemite National Park cascades beautifully over the granite rocks, offering a refreshing sight.",
        title: "Yosemite National Park - Vernal Falls",
        place: "Yosemite, USA",
      },

      {
        src: "/images/about/trips/norcal/norcal4.jpg",
        text: "The Golden Gate Bridge in San Francisco spans the bay, symbolizing the city's engineering marvel and scenic beauty.",
        title: "San Francisco - Golden Gate Bridge",
        place: "San Francisco, USA",
      },

      {
        src: "/images/about/trips/norcal/norcal5.jpg",
        text: "McWay Falls in Big Sur plunges gracefully into the Pacific Ocean, surrounded by stunning coastal cliffs.",
        title: "Big Sur - McWay Falls",
        place: "Big Sur, USA",
      },
    ],
  },
  {
    name: "Southern California, USA",
    lat: 34.0522,
    lon: -118.2437,
    images: [
      {
        src: "/images/about/trips/socal/socal1.jpg",
        text: "Los Angeles at night, with its vibrant lights and dynamic skyline, showcases the city's iconic energy.",
        title: "Los Angeles at Night",
        place: "Los Angeles, USA",
      },

      {
        src: "/images/about/trips/socal/socal2.jpg",
        text: "The Valley of Fire's striking red sandstone formations create an otherworldly landscape in Nevada’s desert.",
        title: "Valley of Fire",
        place: "Nevada, USA",
      },

      {
        src: "/images/about/trips/socal/socal3.jpg",
        text: "The Hoover Dam stands as a monumental feat of engineering, straddling the border between Nevada and Arizona.",
        title: "Hoover Dam",
        place: "Nevada, USA",
      },

      {
        src: "/images/about/trips/socal/socal4.jpg",
        text: "Pioneer Saloon in Goodsprings, Nevada, offers a historic glimpse into the Old West with its rustic charm.",
        title: "Pioneer Saloon",
        place: "Goodsprings, USA",
      },

      {
        src: "/images/about/trips/socal/socal5.jpg",
        text: "San Diego Zoo is home to diverse wildlife, offering a world-renowned experience for animal lovers.",
        title: "San Diego Zoo",
        place: "San Diego, USA",
      },
    ],
  },
  {
    name: "New York, USA",
    lat: 40.7128,
    lon: -74.006,
    images: [
      {
        src: "/images/about/trips/nyc/nyc1.jpg",
        text: "The Statue of Liberty stands as a symbol of freedom and democracy, welcoming visitors to New York.",
        title: "Statue of Liberty",
        place: "New York, USA",
      },

      {
        src: "/images/about/trips/nyc/nyc2.jpg",
        text: "From the World Trade Center, enjoy breathtaking views of Brooklyn and the surrounding New York skyline.",
        title: "View from WTC",
        place: "New York, USA",
      },

      {
        src: "/images/about/trips/nyc/nyc3.jpg",
        text: "From Brooklyn, take in the iconic view of the World Trade Center towering over the cityscape.",
        title: "View from Brooklyn",
        place: "Brooklyn, USA",
      },

      {
        src: "/images/about/trips/nyc/nyc4.jpg",
        text: "Provincetown in Cape Cod is known for its charming coastal views, art galleries, and historic lighthouses.",
        title: "Provincetown",
        place: "Cape Cod, USA",
      },

      {
        src: "/images/about/trips/nyc/nyc5.jpg",
        text: "Walden Pond in Cambridge, Massachusetts, is famous for its tranquil beauty and association with Henry David Thoreau.",
        title: "Walden Pond",
        place: "Cambridge, USA",
      },
    ],
  },
  {
    name: "Porto, Portugal",
    lat: 41.1579,
    lon: -8.6291,
    images: [
      {
        src: "/images/about/trips/portugal/portugal1.jpg",
        text: "The Douro Valley in Portugal offers picturesque landscapes with terraced vineyards and the serene Douro River.",
        title: "Douro Valley",
        place: "Portugal",
      },

      {
        src: "/images/about/trips/portugal/portugal2.jpg",
        text: "The Douro Valley is known for its stunning riverside views and lush vineyards, ideal for wine lovers.",
        title: "Douro Valley",
        place: "Portugal",
      },

      {
        src: "/images/about/trips/portugal/portugal3.jpg",
        text: "The Arouca Bridge in Portugal is one of the world’s longest pedestrian suspension bridges, offering stunning views.",
        title: "Arouca Bridge",
        place: "Portugal",
      },

      {
        src: "/images/about/trips/portugal/portugal4.jpg",
        text: "Porto, Portugal is a vibrant city known for its historic architecture, scenic riverside, and world-famous port wine.",
        title: "Porto",
        place: "Portugal",
      },

      {
        src: "/images/about/trips/portugal/portugal5.jpg",
        text: "The Dom Luis Bridge in Porto offers spectacular views of the city and the Douro River.",
        title: "Dom Luis Bridge",
        place: "Porto, Portugal",
      },
    ],
  },
  {
    name: "Paris, France",
    lat: 48.8566,
    lon: 2.3522,
    images: [
      {
        src: "/images/about/trips/paris/paris1.jpg",
        text: "The Eiffel Tower is a striking iron lattice structure offering panoramic views, symbolizing modern engineering and architecture.",
        title: "Eiffel Tower",
        place: "Paris, France",
      },

      {
        src: "/images/about/trips/paris/paris2.jpg",
        text: "Notre Dame Cathedral is a Gothic masterpiece with intricate design and stained glass windows, despite enduring centuries of damage.",
        title: "Notre Dame Cathedral",
        place: "Paris, France",
      },

      {
        src: "/images/about/trips/paris/paris3.jpg",
        text: "Sacré-Coeur Basilica is a white-domed church offering panoramic city views, symbolizing faith and national unity.",
        title: "Sacré Coeur",
        place: "Paris, France",
      },

      {
        src: "/images/about/trips/paris/paris4.jpg",
        text: "La Défense is a modern business district with striking skyscrapers and the Grand Arch, symbolizing France’s economic progress.",
        title: "La Défense",
        place: "Paris, France",
      },

      {
        src: "/images/about/trips/paris/paris5.jpg",
        text: "The River Seine flows through Paris, lined with cafés and bridges, offering a serene and picturesque backdrop.",
        title: "The Seine at night",
        place: "Paris, France",
      },
    ],
  },
  {
    name: "Mallorca,",
    lat: 39.6955,
    lon: 3.0176,
    images: [
      {
        src: "/images/about/trips/mallorca/mallorca1.jpg",
        text: "Cala Sa Calobra is a serene beach surrounded by cliffs, offering crystal-clear waters and breathtaking Mediterranean views.",
        title: "Cala Sa Calobra",
        place: "Mallorca, Spain",
      },

      {
        src: "/images/about/trips/mallorca/mallorca2.jpg",
        text: "The winding road to Cala Sa Calobra offers dramatic views and thrilling turns through Mallorca's rugged landscape.",
        title: "The Winding Road to Cala Sa Calobra",
        place: "Mallorca, Spain",
      },

      {
        src: "/images/about/trips/mallorca/mallorca3.jpg",
        text: "Torrent de Pareis is a dramatic gorge where towering cliffs meet rushing waters, a haven for adventurous hikers.",
        title: "Torrent de Pareis",
        place: "Mallorca, Spain",
      },

      {
        src: "/images/about/trips/mallorca/mallorca4.jpg",
        text: "Port de Sóller is a charming coastal town with a picturesque harbor and stunning views of the Mediterranean Sea.",
        title: "Port de Sóller",
        place: "Mallorca, Spain",
      },

      {
        src: "/images/about/trips/mallorca/mallorca5.jpg",
        text: "The Port de Pollensa coastline offers tranquil beaches with turquoise waters and spectacular views of surrounding mountains.",
        title: "Port de Pollensa Coastline",
        place: "Mallorca, Spain",
      },
    ],
  },
  {
    name: "Venice, Italy",
    lat: 45.4408,
    lon: 12.3155,
    images: [
      {
        src: "/images/about/trips/venice/venice1.jpg",
        text: "The Grand Canal offers stunning views from the Rialto Bridge, lined with historic buildings and bustling gondolas.",
        title: "Grand Canal View from Rialto Bridge",
        place: "Venice, Italy",
      },

      {
        src: "/images/about/trips/venice/venice2.jpg",
        text: "The Rialto Bridge connects the districts with elegant stone arches, offering views of the Grand Canal’s lively activity.",
        title: "Rialto Bridge",
        place: "Venice, Italy",
      },

      {
        src: "/images/about/trips/venice/venice3.jpg",
        text: "Piazza San Marco is a grand open space surrounded by historic architecture, cafés, and a vibrant atmosphere.",
        title: "Piazza San Marco",
        place: "Venice, Italy",
      },

      {
        src: "/images/about/trips/venice/venice4.jpg",
        text: "The Bridge of Sighs connects the Doge’s Palace to the prison, offering a picturesque view over the Rio di Palazzo.",
        title: "Bridge of Sighs",
        place: "Venice, Italy",
      },

      {
        src: "/images/about/trips/venice/venice5.jpg",
        text: "Burano, with its colorful houses and charming canals, is a peaceful escape known for its lace-making tradition.",
        title: "Burano",
        place: "Venice, Italy",
      },
    ],
  },
  {
    name: "Japan",
    lat: 35.6762,
    lon: 139.6503,
    images: [
      {
        src: "/images/about/trips/japan/japan1.jpg",
        text: "I’ll soon be traveling to Tokyo, Mt. Fuji, Kyoto, and Hiroshima.",
        title: "Japan Trip",
        place: "Planned - March 2025",
      },
    ],
  },
];
locations.forEach(function (location) {
  var marker = L.marker([location.lat, location.lon]).addTo(map);
  marker.bindPopup(location.name);

  marker.on("click", function () {
    openModal(location);
  });
});

var modal = document.getElementById("myModal");
var closeBtn = document.getElementsByClassName("close")[0];
var currentSlide = 0;
var slideImages = [];
var slideTexts = [];
var slideTitles = [];
var slidePlaces = [];

var touchStartX = 0;
var touchStartY = 0;
var touchEndX = 0;
var touchEndY = 0;
var isMultiTouch = false;

window.onload = function () {
  modal.style.display = "none";
};

let lastScrollPosition = 0; // Variable to store the last scroll position

function openModal(location) {
  console.log("Opening modal for", location.name);

  // Store the current scroll position
  lastScrollPosition = window.scrollY;

  // Disable background scrolling by adding the class
  document.documentElement.classList.add("no-scroll");

  // Enable modal scroll
  modal.style.overflowY = "auto"; // Allow scrolling inside the modal

  slideImages = location.images.map(function (image) {
    return image.src;
  });
  slideTexts = location.images.map(function (image) {
    return image.text;
  });
  slideTitles = location.images.map(function (image) {
    return image.title; // Add the title property
  });
  slidePlaces = location.images.map(function (image) {
    return image.place; // Add the place property
  });
  currentSlide = 0;
  showSlide(currentSlide);

  modal.style.opacity = 1;
  modal.style.visibility = "visible";
  modal.style.display = "block";

  touchStartX = 0;
  touchStartY = 0;
  touchEndX = 0;
  touchEndY = 0;

  console.log("Modal opened");
}

function closeModal() {
  // Re-enable background scrolling
  document.documentElement.classList.remove("no-scroll");

  // Disable modal scroll
  modal.style.overflowY = "hidden"; // Disable scrolling inside the modal

  modal.style.opacity = 0;
  modal.style.visibility = "hidden";

  // Restore the scroll position to where it was before the modal was opened
  window.scrollTo(0, lastScrollPosition);

  console.log("Modal closed, scroll position restored");
}

function showSlide(index) {
  var slideshowContainer = document.querySelector(".slideshow-container");
  slideshowContainer.innerHTML = ""; // Clear existing content

  // Create the image element
  var img = document.createElement("img");
  img.src = slideImages[index];
  img.className = "mySlides active";
  slideshowContainer.appendChild(img);

  // Update text content for location text
  var locationTextContainer = document.querySelector(".location-text");
  if (!locationTextContainer) {
    locationTextContainer = document.createElement("div");
    locationTextContainer.className = "location-text";
    modal.querySelector(".modal-content").appendChild(locationTextContainer);
  }
  locationTextContainer.innerHTML = slideTexts[index].replace(/\n/g, "<br>");

  // Update the title
  var titleContainer = document.querySelector(".location-title");
  if (!titleContainer) {
    titleContainer = document.createElement("div");
    titleContainer.className = "location-title";
    modal.querySelector(".modal-content").appendChild(titleContainer);
  }
  titleContainer.textContent = slideTitles[index];

  // Update the place
  var placeContainer = document.querySelector(".location-place");
  if (!placeContainer) {
    placeContainer = document.createElement("div");
    placeContainer.className = "location-place";
    modal.querySelector(".modal-content").appendChild(placeContainer);
  }
  placeContainer.textContent = slidePlaces[index];
}

function changeSlide(n) {
  currentSlide += n;
  if (currentSlide >= slideImages.length) currentSlide = 0;
  if (currentSlide < 0) currentSlide = slideImages.length - 1;
  showSlide(currentSlide);
}

// Enhanced swipe and pinch detection
modal.addEventListener(
  "touchstart",
  function (event) {
    if (event.touches.length > 1) {
      isMultiTouch = true;
      return;
    }
    isMultiTouch = false;

    touchStartX = event.touches[0].screenX;
    touchStartY = event.touches[0].screenY;
  },
  false
);

modal.addEventListener(
  "touchmove",
  function (event) {
    if (isMultiTouch) return; // Ignore swipe detection during multi-touch gestures
  },
  false
);

modal.addEventListener(
  "touchend",
  function (event) {
    if (isMultiTouch) return; // Ignore swipe detection during multi-touch gestures

    touchEndX = event.changedTouches[0].screenX;
    touchEndY = event.changedTouches[0].screenY;

    var deltaX = touchStartX - touchEndX;
    var deltaY = touchStartY - touchEndY;

    // Detect primarily horizontal swipe
    if (Math.abs(deltaX) > 50 && Math.abs(deltaY) < 30) {
      if (deltaX > 0) {
        changeSlide(-1); // Swipe left
      } else {
        changeSlide(1); // Swipe right
      }
    }
  },
  false
);

closeBtn.onclick = closeModal;

window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
};
