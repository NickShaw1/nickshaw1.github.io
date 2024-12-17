let slideIndex = 0;
showSlides();


function showSlides() {
  let slides = document.querySelectorAll(".slide");
  let dots = document.querySelectorAll(".dot");


  slides.forEach((slide) => (slide.style.display = "none"));

  if (slideIndex >= slides.length) {
    slideIndex = 0; 
  }


  slides[slideIndex].style.display = "block";


  dots.forEach((dot) => dot.classList.remove("active"));
  dots[slideIndex].classList.add("active");
}


function currentSlide(n) {
  slideIndex = n - 1;
  showSlides();
}
