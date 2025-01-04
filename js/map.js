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
        title: "Tunnel View",
        place: "Yosemite, USA",
      },

      {
        src: "/images/about/trips/norcal/norcal2.jpg",
        text: "From Glacier Point, Yosemite National Park presents a dramatic view of both Half Dome and the park's vast landscape.",
        title: "Glacier Point",
        place: "Yosemite, USA",
      },

      {
        src: "/images/about/trips/norcal/norcal3.jpg",
        text: "Vernal Falls in Yosemite National Park cascades beautifully over the granite rocks, offering a refreshing sight.",
        title: "Vernal Falls",
        place: "Yosemite, USA",
      },

      {
        src: "/images/about/trips/norcal/norcal4.jpg",
        text: "The Golden Gate Bridge in San Francisco spans the bay, symbolizing the city's engineering marvel and scenic beauty.",
        title: "Golden Gate Bridge",
        place: "San Francisco, USA",
      },

      {
        src: "/images/about/trips/norcal/norcal5.jpg",
        text: "McWay Falls in Big Sur plunges gracefully into the Pacific Ocean, surrounded by beautiful coastal cliffs.",
        title: "McWay Falls",
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
        text: "San Diego Zoo is home to all kinds of diverse wildlife, offering a world-renowned experience for animal lovers.",
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
        text: "Walden Pond in Cambridge, Massachusetts, is famous for its association with Henry David Thoreau. I studied Walden in University and was fascinated with Transcendalism.",
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
        text: "The Douro Valley is known for its beautiful riverside views and lush vineyards, ideal for wine lovers.",
        title: "Douro Valley",
        place: "Portugal",
      },

      {
        src: "/images/about/trips/portugal/portugal3.jpg",
        text: "The Arouca Bridge is one of the world’s longest pedestrian suspension bridges.",
        title: "Arouca Bridge",
        place: "Portugal",
      },

      {
        src: "/images/about/trips/portugal/portugal4.jpg",
        text: "Porto is a vibrant city known for its historic architecture, scenic riverside, and world-famous port wine.",
        title: "Porto",
        place: "Portugal",
      },

      {
        src: "/images/about/trips/portugal/portugal5.jpg",
        text: "The Dom Luis Bridge in Porto offers great views of the city and the Douro River.",
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
        text: "The Eiffel Tower, completed in 1889, is a renowned landmark in Paris, France.",
        title: "Eiffel Tower",
        place: "Paris, France",
      },

      {
        src: "/images/about/trips/paris/paris2.jpg",
        text: "Notre-Dame Cathedral is located on the Île de la Cité, an island in the Seine River in central Paris.",
        title: "Notre Dame",
        place: "Paris, France",
      },

      {
        src: "/images/about/trips/paris/paris3.jpg",
        text: "Sacré-Coeur Basilica is a white-domed church located in Montmartre, Paris.",
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
    name: "Mallorca",
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
        text: "Dramatic views and thrilling turns through Mallorca's rugged landscape.",
        title: "Road to Sa Calobra",
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
        text: "Port de Sóller is a charming coastal town with a picturesque harbour by the Mediterranean Sea.",
        title: "Port de Sóller",
        place: "Mallorca, Spain",
      },

      {
        src: "/images/about/trips/mallorca/mallorca5.jpg",
        text: "Pollensa coastline's turquoise waters and spectacular views of surrounding mountains were a real highlight.",
        title: "Pollensa Coastline",
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
        title: "Grand Canal View",
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
        text: "Piazza San Marco is a grand open space surrounded by historic architecture, cafés, lots of pigeons and a vibrant atmosphere.",
        title: "Piazza San Marco",
        place: "Venice, Italy",
      },

      {
        src: "/images/about/trips/venice/venice4.jpg",
        text: "The Bridge of Sighs, named for the sighs of prisoners who, after being sentenced, were led across the bridge from the Doge’s Palace.",
        title: "Bridge of Sighs",
        place: "Venice, Italy",
      },

      {
        src: "/images/about/trips/venice/venice5.jpg",
        text: "Burano, with its colourful houses and charming canals, is a peaceful escape known for its lace-making tradition.",
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

  // Adding a custom class to the popup or an HTML element in the popup
  marker.getPopup()._contentNode.classList.add("map-pin");

  marker.on("click", function () {
    map.closePopup(); // Close any open popups
    openModal(location); // Open the modal with location data
  });
});

// Listen for clicks on elements with the 'map-pin' class
document.addEventListener("click", function (e) {
  if (e.target.matches(".map-pin")) {
    openModal(location); // Open the modal when the 'map-pin' is clicked
  }
});
