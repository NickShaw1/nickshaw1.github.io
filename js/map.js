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
        text: "Yosemite National Park - Tunnel view",
      },
      {
        src: "/images/about/trips/norcal/norcal2.jpg",
        text: "Yosemite National Park - Glacier Point",
      },
      {
        src: "/images/about/trips/norcal/norcal3.jpg",
        text: "Yosemite National Park - Vernal falls",
      },
      {
        src: "/images/about/trips/norcal/norcal4.jpg",
        text: "San Francisco - Golden Gate Bridge",
      },
      {
        src: "/images/about/trips/norcal/norcal5.jpg",
        text: "Big Sur - McWay falls",
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
        text: "Los Angeles at night",
      },
      {
        src: "/images/about/trips/socal/socal2.jpg",
        text: "Valley of Fire",
      },
      {
        src: "/images/about/trips/socal/socal3.jpg",
        text: "Hoover Dam",
      },
      {
        src: "/images/about/trips/socal/socal4.jpg",
        text: "Pioneer Saloon, Goodsprings NV",
      },
      {
        src: "/images/about/trips/socal/socal5.jpg",
        text: "San Diego Zoo",
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
        text: "New York - Statue of Liberty",
      },
      {
        src: "/images/about/trips/nyc/nyc2.jpg",
        text: "New York - From WTC overlooking Brooklyn",
      },
      {
        src: "/images/about/trips/nyc/nyc3.jpg",
        text: "Brooklyn - Looking back to WTC",
      },
      {
        src: "/images/about/trips/nyc/nyc4.jpg",
        text: "Provincetown - Cape Cod",
      },
      {
        src: "/images/about/trips/nyc/nyc5.jpg",
        text: " Cambridge, Massachusetts - Walden Pond",
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
        text: "Portugal - Douro Valley",
      },
      {
        src: "/images/about/trips/portugal/portugal2.jpg",
        text: "Portugal - Douro Valley",
      },
      {
        src: "/images/about/trips/portugal/portugal3.jpg",
        text: "Portugal - Arouca bridge",
      },
      {
        src: "/images/about/trips/portugal/portugal4.jpg",
        text: "Porto, Portugal",
      },
      {
        src: "/images/about/trips/portugal/portugal5.jpg",
        text: "Porto, Portugal - Dom Luis bridge",
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
        text: "Eiffel Tower",
      },
      {
        src: "/images/about/trips/paris/paris2.jpg",
        text: "Notre Dame Cathedral",
      },
      {
        src: "/images/about/trips/paris/paris3.jpg",
        text: "Sacre Coeur",
      },
      {
        src: "/images/about/trips/paris/paris4.jpg",
        text: "La Défense",
      },
      {
        src: "/images/about/trips/paris/paris5.jpg",
        text: "The Seine at night",
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
        text: "Mallorca - Cala Sa Calobra",
      },
      {
        src: "/images/about/trips/mallorca/mallorca2.jpg",
        text: "Mallorca - Sa Colabra",
      },
      {
        src: "/images/about/trips/mallorca/mallorca3.jpg",
        text: "Mallorca - Torrent de Pareis",
      },
      {
        src: "/images/about/trips/mallorca/mallorca4.jpg",
        text: "Mallorca - Port de Sóller",
      },
      {
        src: "/images/about/trips/mallorca/mallorca5.jpg",
        text: "Mallorca - Pollensa coastline",
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
        text: "Venice, Italy - Canal Views",
      },
      {
        src: "/images/about/trips/venice/venice2.jpg",
        text: "Venice, Italy - Rialto Bridge",
      },
      {
        src: "/images/about/trips/venice/venice3.jpg",
        text: "Venice, Italy - Piazza San Marco",
      },
      {
        src: "/images/about/trips/venice/venice4.jpg",
        text: "Venice, Italy - Bridge of Sighs",
      },
      {
        src: "/images/about/trips/venice/venice5.jpg",
        text: "Venice, Italy - Burano",
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
        text: "Coming March 2025!",
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

var touchStartX = 0;
var touchEndX = 0;

window.onload = function () {
  modal.style.display = "none";
};

function openModal(location) {
  console.log("Opening modal for", location.name);

  // Disable background scrolling
  document.documentElement.style.overflow = "hidden";

  slideImages = location.images.map(function (image) {
    return image.src;
  });
  slideTexts = location.images.map(function (image) {
    return image.text;
  });
  currentSlide = 0;
  showSlide(currentSlide);

  modal.style.opacity = 1;
  modal.style.visibility = "visible";
  modal.style.display = "block";

  touchStartX = 0;
  touchEndX = 0;

  console.log("Modal opened");
}

function closeModal() {
  // Re-enable background scrolling
  document.documentElement.style.overflow = "auto";

  modal.style.opacity = 0;
  modal.style.visibility = "hidden";
}

function showSlide(index) {
  var slideshowContainer = document.querySelector(".slideshow-container");
  slideshowContainer.innerHTML = "";

  var img = document.createElement("img");
  img.src = slideImages[index];
  img.className = "mySlides active";
  slideshowContainer.appendChild(img);

  var textOverlay = document.querySelector(".text-overlay");
  if (!textOverlay) {
    textOverlay = document.createElement("div");
    textOverlay.className = "text-overlay";
    modal.querySelector(".modal-content").appendChild(textOverlay);
  }
  textOverlay.textContent = slideTexts[index];
}

function changeSlide(n) {
  currentSlide += n;
  if (currentSlide >= slideImages.length) currentSlide = 0;
  if (currentSlide < 0) currentSlide = slideImages.length - 1;
  showSlide(currentSlide);
}

modal.addEventListener(
  "touchstart",
  function (event) {
    touchStartX = event.changedTouches[0].screenX;
  },
  false
);

modal.addEventListener(
  "touchend",
  function (event) {
    touchEndX = event.changedTouches[0].screenX;

    if (touchStartX - touchEndX > 50) {
      changeSlide(1);
    } else if (touchEndX - touchStartX > 50) {
      changeSlide(-1);
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
