emailjs.init("561k8Uin1iOcxjTAV");

document
  .querySelector(".contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const form = event.target;
    const messageContainer = document.querySelector(".message-container");

    emailjs.sendForm("service_z07wubn", "template_vye2scf", form).then(
      function (response) {
        console.log("SUCCESS!", response);
        messageContainer.textContent = "Thanks for getting in touch!";
        messageContainer.classList.remove("error");
        messageContainer.classList.add("success");
        messageContainer.style.display = "block";
        form.reset();
      },
      function (error) {
        console.log("FAILED...", error);
        messageContainer.textContent =
          "Oh no! Message delivery failed. Please try again later.";
        messageContainer.classList.remove("success");
        messageContainer.classList.add("error");
        messageContainer.style.display = "block";
      }
    );
  });

document.querySelector(".reset-button").addEventListener("click", function () {
  const form = document.querySelector(".contact-form");
  const messageContainer = document.querySelector(".message-container");

  form.reset();

  messageContainer.style.display = "none";
  messageContainer.textContent = "";
});
