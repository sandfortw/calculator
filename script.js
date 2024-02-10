const displayedButtons = document.querySelectorAll(".number, .operator");
const display = document.querySelector("#display");
const clearButton = document.querySelector("#clear-button");
const deleteButton = document.querySelector("#delete-button");
const toggleNegativeBtn = document.querySelector("#toggle-negative");
const equalButton = document.querySelector("#equal-button");

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, num1, num2) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "–":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      if (num2 === 0) alert("Hey now...");
      return divide(num1, num2);
  }
}

// Number buttons include '.' key
//MINUS SYMBOLS ARE en-dashes! i.e. '–' not '-' (a hyphen)
displayedButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const displayText = display.textContent;
    const lastInput = displayText === "" ? "" : displayText.split(" ").filter(n => n).slice(-1)[0];
    const currentInputClass = button.className;
    const buttonText =
      button.textContent === " x " ? " * " : button.textContent;
    const lastInputDecimalorOperator = isDecimalOrOperator(lastInput)
    if (isDecimalOrOperator(lastInput) && currentInputClass === "operator") {
      if(lastInput === '.') {
        const noDecimal = displayText.slice(0, -1);
        display.textContent = noDecimal + buttonText;
      } else {
        const removedOperator = displayText.slice(0, -3);
        display.textContent = removedOperator + buttonText;
      }
    } else {
      display.textContent += buttonText;
    }
  });
});

function isDecimalOrOperator(input) {
  operators = /[+\–*/.]/;
  return input.match(operators) ? true : false;
}

clearButton.addEventListener("click", () => (display.textContent = ""));

deleteButton.addEventListener("click", () => {
  display.textContent = display.textContent.slice(0, -1);
});

// This function adds a negative sign before the last displayed number if positive,
// removes it if negative

toggleNegativeBtn.addEventListener("click", () =>
  toggleNegative(display.textContent)
);

function toggleNegative(displayString) {
  let dispArray = displayString.split(" ").filter((n) => n);
  const last_element = dispArray.slice(-1);
  isNaN(last_element)
    ? dispArray.push(" ")
    : (dispArray[dispArray.length - 1] = last_element * -1);
  display.textContent = dispArray.join(" ");
}

equalButton.addEventListener("click", () => {
  let array = display.textContent.split(" ").filter((n) => n);
  if (!isNaN(array.slice(-1))) {
    let accumulator = array.shift();
    while (array.length > 1) {
      let operator = array.shift();
      let nextNum = array.shift();
      accumulator = operate(operator, accumulator, nextNum);
    }
    display.textContent = Math.round(accumulator * 100) / 100;
  }
});
