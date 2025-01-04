var modal = document.getElementById("myModal");
var closeBtn = document.getElementsByClassName("close")[0];
var currentSlide = 0;
var slideImages = [];
var slideTexts = [];
var slideTitles = [];
var slidePlaces = [];

var lastScrollPosition = 0; // Variable to store the last scroll position

function openModal(location) {
  console.log("Opening modal for", location.name);

  // Store the current scroll position
  lastScrollPosition = window.scrollY;

  // Disable background scrolling
  document.documentElement.classList.add("no-scroll");
  modal.style.overflowY = "auto"; // Allow scrolling inside the modal

  slideImages = location.images.map((image) => image.src);
  slideTexts = location.images.map((image) => image.text);
  slideTitles = location.images.map((image) => image.title);
  slidePlaces = location.images.map((image) => image.place);

  currentSlide = 0;
  showSlide(currentSlide);

  modal.style.opacity = 1;
  modal.style.visibility = "visible";
  modal.style.display = "block";
}

function closeModal() {
  // Re-enable background scrolling
  document.documentElement.classList.remove("no-scroll");
  modal.style.overflowY = "hidden"; // Disable scrolling inside the modal

  modal.style.opacity = 0;
  modal.style.visibility = "hidden";

  // Restore the scroll position
  window.scrollTo(0, lastScrollPosition);

  console.log("Modal closed, scroll position restored");
}

function showSlide(index) {
  var slideshowContainer = document.querySelector(".slideshow-container");
  slideshowContainer.innerHTML = ""; // Clear existing content

  var img = document.createElement("img");
  img.src = slideImages[index];
  img.className = "mySlides active";
  slideshowContainer.appendChild(img);

  var locationTextContainer = document.querySelector(".location-text");
  if (!locationTextContainer) {
    locationTextContainer = document.createElement("div");
    locationTextContainer.className = "location-text";
    modal.querySelector(".modal-content").appendChild(locationTextContainer);
  }
  locationTextContainer.innerHTML = slideTexts[index].replace(/\n/g, "<br>");

  var titleContainer = document.querySelector(".location-title");
  if (!titleContainer) {
    titleContainer = document.createElement("div");
    titleContainer.className = "location-title";
    modal.querySelector(".modal-content").appendChild(titleContainer);
  }
  titleContainer.textContent = slideTitles[index];

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

// Close modal if clicking outside the image container (on the modal background)
modal.addEventListener("click", function (e) {
  // Check if the click was outside the modal-content area (where the images are displayed)
  if (!e.target.closest(".modal-content")) {
    closeModal();
  }
});

// Close the modal when the close button is clicked
closeBtn.onclick = closeModal;
