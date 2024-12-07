// Select the elements
const inputDisplay = document.getElementById('input');
const numpers = document.querySelectorAll('.numpers .rows div'); 
const operators = document.querySelectorAll('.process div');
const equalButton = document.querySelector('.equal');
const clearButton = document.querySelector('#row-four div:last-child');

// Variables to store current input and previous input for calculation
let currentInput = '';
let operator = '';
let previousInput = '';

numpers.forEach(button => {
  button.addEventListener('click', (e) => {
    handleInput(e.target.textContent);
  });
});

operators.forEach(op => {
  op.addEventListener('click', (e) => {
    handleOperator(e.target.textContent);
  });
});

equalButton.addEventListener('click', () => {
  if (previousInput === '' || currentInput === '' || operator === '') return;

  currentInput = calculate(previousInput, currentInput, operator);
  inputDisplay.textContent = currentInput;
  
  previousInput = '';
  operator = '';
});

document.addEventListener('keydown', (e) => {
  const key = e.key;

  if (!isNaN(key) || key === '.') {
    handleInput(key);
  } else if (['+', '-', '*', '/'].includes(key)) {
    const symbol = key === '*' ? '×' : key === '/' ? '÷' : key;
    handleOperator(symbol);
  } else if (key === 'Enter' || key === '=') {
    equalButton.click();
  } else if (key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
    inputDisplay.textContent = currentInput;
  } else if (key === 'Escape') {
    clearButton.click();
  }
});

function handleInput(value) {
  if (value === 'C') {
    clearCalculator();
  } else {
    currentInput += value;
    inputDisplay.textContent = `${previousInput} ${operator} ${currentInput}`;
  }
  operator = selectedOperator;
  previousInput = currentInput;
  currentInput = '';
  inputDisplay.textContent = `${previousInput} ${operator}`; // Display the operator

}

function handleOperator(selectedOperator) {

  if (previousInput !== '') {
    currentInput = calculate(previousInput, currentInput, operator);
    inputDisplay.textContent = currentInput;
  }

  operator = selectedOperator;
  previousInput = currentInput;
  currentInput = '';
}

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

// Clear the calculator
function clearCalculator() {
  currentInput = '';
  previousInput = '';
  operator = '';
  inputDisplay.textContent = '';
}
