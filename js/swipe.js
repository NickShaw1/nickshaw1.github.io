// swipe.js
const SWIPE_THRESHOLD = 50; // Minimum distance for a swipe
const SWIPE_VERTICAL_LIMIT = 30; // Max vertical distance to qualify as horizontal swipe
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
let isMultiTouch = false;
let lastTouchMoveTime = 0;

// Utility: Debounce function
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

// Start touch event
modal.addEventListener("touchstart", (event) => {
  if (event.touches.length > 1) {
    isMultiTouch = true;
    return;
  }

  isMultiTouch = false;
  touchStartX = event.touches[0].screenX;
  touchStartY = event.touches[0].screenY;
});

// Move touch event
modal.addEventListener(
  "touchmove",
  debounce((event) => {
    if (isMultiTouch) return;

    event.preventDefault(); // Prevent default touch behavior like scrolling
  }, 50) // Debounce touchmove to limit processing frequency
);

// End touch event
modal.addEventListener("touchend", (event) => {
  if (isMultiTouch) return;

  touchEndX = event.changedTouches[0].screenX;
  touchEndY = event.changedTouches[0].screenY;

  const deltaX = touchStartX - touchEndX;
  const deltaY = touchStartY - touchEndY;

  // Detect primarily horizontal swipe
  if (Math.abs(deltaX) > SWIPE_THRESHOLD && Math.abs(deltaY) < SWIPE_VERTICAL_LIMIT) {
    if (deltaX > 0) {
      changeSlide(-1); // Swipe left
    } else {
      changeSlide(1); // Swipe right
    }
  }
});