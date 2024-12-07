// Select the elements
const inputDisplay = document.getElementById('input');
const numpers = document.querySelectorAll('.numpers .rows div'); // target individual buttons directly
const operators = document.querySelectorAll('.process div');
const equalButton = document.querySelector('.equal');
const clearButton = document.querySelector('#row-four div:last-child');

// Variables to store current input and previous input for calculation
let currentInput = '';
let operator = '';
let previousInput = '';

// Add event listeners for numbers
numpers.forEach(button => {
  button.addEventListener('click', (e) => {
    const value = e.target.textContent;
    
    if (value === 'C') {
      // Clear the input
      currentInput = '';
      previousInput = '';
      operator = '';
      inputDisplay.textContent = '';
    } else {
      // Append clicked number or decimal to the current input
      currentInput += value;
      inputDisplay.textContent = currentInput;
    }
  });
});

// Add event listeners for operators
operators.forEach(op => {
  op.addEventListener('click', (e) => {
    const selectedOperator = e.target.textContent;
    
    if (currentInput === '') return; // Prevent operator selection without a number
    
    if (previousInput !== '') {
      // Perform calculation if operator is pressed after entering two numbers
      currentInput = calculate(previousInput, currentInput, operator);
      inputDisplay.textContent = currentInput;
    }
    
    operator = selectedOperator;
    previousInput = currentInput;
    currentInput = '';
  });
});

// Add event listener for the equal button
equalButton.addEventListener('click', () => {
  if (previousInput === '' || currentInput === '' || operator === '') return;

  currentInput = calculate(previousInput, currentInput, operator);
  inputDisplay.textContent = currentInput;
  
  // Reset for next calculation
  previousInput = '';
  operator = '';
});

// Calculation function
function calculate(num1, num2, operator) {
  const number1 = parseFloat(num1);
  const number2 = parseFloat(num2);

  switch (operator) {
    case '+':
      return (number1 + number2).toString();
    case '-':
      return (number1 - number2).toString();
    case '×':
      return (number1 * number2).toString();
    case '÷':
      return (number1 / number2).toString();
    default:
      return '';
  }
}
