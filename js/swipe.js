// swipe.js
var touchStartX = 0;
var touchStartY = 0;
var touchEndX = 0;
var touchEndY = 0;
var isMultiTouch = false;

let lastTouchMoveTime = 0;

modal.addEventListener("touchstart", function (event) {
  if (event.touches.length > 1) {
    isMultiTouch = true;
    return;
  }
  isMultiTouch = false;

  touchStartX = event.touches[0].screenX;
  touchStartY = event.touches[0].screenY;
}, false);

modal.addEventListener("touchmove", function (event) {
  if (isMultiTouch) return; // Ignore swipe detection during multi-touch gestures

  const currentTime = Date.now();
  if (currentTime - lastTouchMoveTime < 100) {
    return; // Ignore touchmove events too quickly
  }

  lastTouchMoveTime = currentTime;
  event.preventDefault(); // Prevent default browser touch actions (like scrolling)
}, false);

modal.addEventListener("touchend", function (event) {
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
}, false);