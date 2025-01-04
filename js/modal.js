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

  // Trigger visibility and interaction immediately when the modal opens
  modal.style.opacity = 1;
  modal.style.visibility = "visible";
  modal.style.pointerEvents = "auto"; // Enable interaction with the modal and buttons

  // Add 'open' class to trigger button visibility
  modal.classList.add("open");

  // Trigger animation (if needed)
  requestAnimationFrame(() => {
    modal.style.opacity = 1;
    modal.style.visibility = "visible";
  });
}

// Close modal
function closeModal() {
  // Re-enable background scrolling
  document.documentElement.classList.remove("no-scroll");

  // Hide modal and buttons
  modal.classList.remove("open"); // Remove 'open' class
  modal.style.opacity = 0;
  modal.style.visibility = "hidden";
  modal.style.pointerEvents = "none"; // Disable interaction with the modal

  setTimeout(() => {
    modal.style.display = "none";
  }, 300); // Matches CSS transition duration

  // Restore scroll position
  window.scrollTo(0, lastScrollPosition);

  console.log("Modal closed, scroll position restored");
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

modal.addEventListener("touchstart", (event) => {
  console.log("Touch started on modal");
  // Other logic
});
