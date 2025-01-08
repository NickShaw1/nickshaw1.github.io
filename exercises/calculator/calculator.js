const display = document.getElementById("display");

function appendToDisplay(input) {
  display.value += input;
}

function clearDisplay() {
  display.value = "";
}

function calculate() {
  try {
    let result = eval(display.value);
    display.value = result;
  } catch (error) {
    display.value = "Error";
  }
}

function percentage() {
  if (display.value) {
    let currentValue = parseFloat(display.value);
    display.value = (currentValue / 100).toString();
  }
}

function square() {
  if (display.value) {
    display.value = Math.pow(parseFloat(display.value), 2).toString();
  }
}

function sqrt() {
  if (display.value) {
    let result = Math.sqrt(parseFloat(display.value)).toString();
    display.value = result;
  }
}
