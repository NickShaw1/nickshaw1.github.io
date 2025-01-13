const reviews = [
  {
    id: 1,
    author: "Whiskers McFluff",
    job: "Senior Developer",
    img: "/exercises/reviews/cat1.jpg",
    info: `"This software is incredible! It's intuitive, saves so much time, and makes tasks so much easier and more efficient."`,
  },
  {
    id: 2,
    author: "Gizmo Furrington",
    job: "Product Owner",
    img: "/exercises/reviews/cat2.jpg",
    info: `"Absolutely brilliant! Fast, reliable, and makes everything more organized. I can’t imagine working without it now."`,
  },
  {
    id: 3,
    author: "Luna Pawsworth",
    job: "Test Lead",
    img: "/exercises/reviews/cat3.jpg",
    info: `"Effortless to use! This software makes tasks so much faster and keeps everything organized. A must-have."`,
  },
  {
    id: 4,
    author: "Jasper Tailington",
    job: "Chief Architect",
    img: "/exercises/reviews/cat4.jpg",
    info: `"The interface is clean, and it makes everything so much easier. I can’t imagine working without it."`,
  },
  {
    id: 5,
    author: "Bella Snuggleton",
    job: "CTO",
    img: "/exercises/reviews/cat5.jpg",
    info: `"I really love it! It’s so easy to navigate and has completely transformed the way I work."`,
  },
];

const img = document.getElementById("person-img");
const author = document.getElementById("author");
const job = document.getElementById("job");
const info = document.getElementById("info");

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const randomBtn = document.querySelector(".random-btn");

let currentItem = 0;

window.addEventListener("DOMContentLoaded", function () {
  showPerson(currentItem);
});

function showPerson(cat) {
  const item = reviews[cat];
  img.src = item.img;
  author.textContent = item.author;
  job.textContent = item.job;
  info.textContent = item.info;
}

nextBtn.addEventListener("click", function () {
  currentItem++;
  if (currentItem > reviews.length - 1) {
    currentItem = 0;
  }
  showPerson(currentItem);
});

prevBtn.addEventListener("click", function () {
  currentItem--;
  if (currentItem < 0) {
    currentItem = reviews.length - 1;
  }
  showPerson(currentItem);
});

randomBtn.addEventListener("click", function () {
  currentItem = Math.floor(Math.random() * reviews.length);
  showPerson(currentItem);
});
