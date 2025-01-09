const modalBtn = document.querySelector(".modal-btn");
const overlay = document.querySelector(".modal-overlay");
const closeBtn = document.querySelector(".close-btn");

modalBtn.addEventListener("click", function () {
  overlay.classList.add("open-modal");
});

closeBtn.addEventListener("click", function () {
  overlay.classList.remove("open-modal");
});
