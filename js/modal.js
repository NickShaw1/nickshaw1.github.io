const modal = document.getElementById("myModal");
const closeBtn = document.querySelector(".close");
const modalContent = modal.querySelector(".modal-content");
const slideshowContainer = modal.querySelector(".slideshow-container");
let currentSlide = 0;
let slideData = [];
let lastScrollPosition = 0;

// Open modal
function openModal(location) {
  console.log("Opening modal for", location.name);

  // Save scroll position and disable background scrolling
  lastScrollPosition = window.scrollY;
  document.documentElement.classList.add("no-scroll");

  // Populate slide data
  slideData = location.images.map(({ src, text, title, place }) => ({
    src,
    text,
    title,
    place,
  }));

  currentSlide = 0;
  showSlide(currentSlide);

  // Show modal
  modal.style.display = "block";
  requestAnimationFrame(() => {
    modal.style.opacity = 1;
    modal.style.visibility = "visible";
  });
}

// Close modal
function closeModal() {
  // Re-enable background scrolling
  document.documentElement.classList.remove("no-scroll");

  // Hide modal
  modal.style.opacity = 0;
  modal.style.visibility = "hidden";
  setTimeout(() => {
    modal.style.display = "none";
  }, 300); // Matches CSS transition duration

  // Restore scroll position
  window.scrollTo(0, lastScrollPosition);

  console.log("Modal closed, scroll position restored");
}

// Show a specific slide
function showSlide(index) {
  const { src, text, title, place } = slideData[index];
  slideshowContainer.innerHTML = `
    <img src="${src}" class="mySlides active" alt="${title}">
  `;

  updateTextContent(".location-text", text.replace(/\n/g, "<br>"));
  updateTextContent(".location-title", title);
  updateTextContent(".location-place", place);
}

// Update modal text content
function updateTextContent(selector, content) {
  let element = modal.querySelector(selector);
  if (!element) {
    element = document.createElement("div");
    element.className = selector.slice(1);
    modalContent.appendChild(element);
  }
  element.innerHTML = content;
}

// Change slide
function changeSlide(offset) {
  currentSlide = (currentSlide + offset + slideData.length) % slideData.length;
  showSlide(currentSlide);
}

modal.addEventListener("click", function (e) {
  // Prevent closing modal if the click is on the prev or next buttons
  const isClickInsideModal = e.target.closest(".modal-content");
  const isClickOnControlButton = e.target.closest(".prev, .next");

  if (isClickOnControlButton) {
    return; // Early exit, do not close modal when clicking prev/next
  }

  if (!isClickInsideModal) {
    closeModal(); // Close modal if clicked outside the modal-content area
  }
});

// Close the modal when the close button is clicked
closeBtn.addEventListener("click", closeModal);

// Trap focus inside modal for accessibility
modal.addEventListener("keydown", (e) => {
  if (e.key === "Tab") trapFocus(e);
});

function trapFocus(event) {
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    lastElement.focus();
    event.preventDefault();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    firstElement.focus();
    event.preventDefault();
  }
}
