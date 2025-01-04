const modal = document.getElementById("myModal");
const closeBtn = document.querySelector(".close");
const modalContent = modal.querySelector(".modal-content");
const slideshowContainer = modal.querySelector(".slideshow-container");
let currentSlide = 0;
let slideData = [];
let lastScrollPosition = 0;

function preventTouchMove(e) {
  // Check for vertical scrolling and prevent only that
  if (e.touches.length === 1 && (e.scale || 1) === 1) {
    // Prevent vertical scrolling but allow pinch-zooming
    if (Math.abs(e.touches[0].screenY - e.touches[1]?.screenY || 0) > 0) {
      e.preventDefault();
    }
  }
}

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
let isPinchZooming = false;

function openModal(location) {
  console.log("Opening modal for", location.name);

  // Save scroll position and disable background scrolling
  lastScrollPosition = window.scrollY;

  // Safari fix: Lock body scroll using position: fixed
  if (isSafari && !isPinchZooming) {
    document.body.style.position = "fixed";
    document.body.style.top = `-${lastScrollPosition}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
  }

  // Prevent touchmove event on body (mobile Safari fix)
  document.body.addEventListener("touchmove", preventTouchMove, {
    passive: false,
  });

  // Populate slide data
  slideData = location.images.map(({ src, text, title, place }) => ({
    src,
    text,
    title,
    place,
  }));

  currentSlide = 0;
  showSlide(currentSlide);

  // Show modal immediately
  modal.style.display = "block";

  // After modal is displayed, adjust opacity and visibility
  requestAnimationFrame(() => {
    modal.style.opacity = 1;
    modal.style.visibility = "visible";
  });
}

// Close modal
function closeModal() {
  // Re-enable background scrolling
  if (isSafari && !isPinchZooming) {
    document.body.style.position = ""; // Reset position property
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
  }

  // Remove touchmove event listener (mobile Safari fix)
  document.body.removeEventListener("touchmove", preventTouchMove);

  // Restore scroll position immediately before modal hides
  window.scrollTo(0, lastScrollPosition);

  // Force reflow to ensure scroll position restoration
  document.body.getBoundingClientRect();

  // Hide modal using only display to avoid layout shift
  modal.style.display = "none";
  console.log("Modal closed, scroll position restored");
}

// Reset map pins state if needed
function resetMapPinsState() {
  mapPins.forEach((pin) => {
    pin.addEventListener("click", handlePinClick); // Re-attach click listeners if they were detached
  });
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

const images = document.querySelectorAll(".slideshow-container img");

images.forEach((img) => {
  // Add a load event listener to each image
  img.addEventListener("load", function () {
    // When the image is loaded, remove the aspect ratio CSS rule
    const slideshowItem = this.closest(".slideshow-container");
    slideshowItem.style.aspectRatio = ""; // Reset aspect ratio to auto
  });
});
