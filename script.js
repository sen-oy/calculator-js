// get dom nodes
const upperDisplay = document.querySelector('#calculator-upper-display');
const mainDisplay = document.querySelector('#calculator-main-display');
const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const displayButtons = document.querySelectorAll('.display-button');

// operate function
function operate (operandA, operandB, operator) {
    if (!operator || !operandA || !operandB) {
        return;
    }

    if (operator === '÷') {
        if (operandB === 0){
            console.log('Good job wise guy.')
            return 1;
        } else {
            return operandA / operandB;
        }
    } else if (operator === 'x') {
        return operandA * operandB;
    } else if (operator === '-') {
        return operandA - operandB;
    } else if (operator === '+') {
        return operandA + operandB;
    } else if (operator === '%') {
        return operandA % operandB;
    }
}

// instantiating important variables
let currentNumber = '';
let firstOperand = '';
let secondOperand = '';
let currentOperator = '';
let currentResult = '';
let previousResult = '';

// a function to reset operators
function resetOperators () {
    firstOperand = '';
    secondOperand = '';
    currentOperator = '';
}

// get numbers from number buttons
numberButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        currentNumber += event.target.textContent;
        console.log(`current number: ${currentNumber}`);
    })
})

function operatorButtonHandler (e) {
	let operation = e.target.textContent; // places the operator in a variable
	// if there is no previous result => this is a first calculation
	if (!previousResult) {
		// check if there is a current number or first operand or current result
		if ((currentResult) && (currentNumber)) {
			previousResult = currentResult;
			firstOperand = previousResult;
			currentOperator = operation;
			secondOperand = parseFloat(currentNumber);
			currentResult = operate(firstOperand, secondOperand, currentOperator);
			resetOperators();
			currentNumber = '';
		} else if ((currentResult) && (!currentNumber)){
			previousResult = currentResult;
			firstOperand = previousResult;
			currentOperator = operation;
			currentNumber = '';
		} else if ((firstOperand) && (!currentResult) && (currentNumber)) {
			currentOperator = operation;
			secondOperand = parseFloat(currentNumber);
			currentResult = operate(firstOperand, secondOperand, currentOperator);
			resetOperators();
		} else if ((firstOperand) && (!currentResult) && (!currentNumber)) {
			currentOperator = operation;
		} else if ((currentNumber) && (!firstOperand) && (!secondOperand)) {
			firstOperand = parseFloat(currentNumber);
			currentOperator = operation;
			currentNumber = '';
		} else if ((!currentNumber) && (!firstOperand) && (!secondOperand)) {
			return;
		}
	} else if (previousResult) {
		// check if there is a current number or first/second operand or current result
		currentOperator = operation;
		if (currentNumber) {
			firstOperand = previousResult;
			secondOperand = parseFloat(currentNumber);
			currentResult = operate(firstOperand, secondOperand, currentOperator);
			previousResult = currentResult;
			currentNumber = '';
			resetOperators();
		} else if (!currentNumber) {
			return;
		}
	}
}

function displayButtonHandler (e) {
	let buttonFunction = e.target.textContent;
	
	// equals
	if (buttonFunction === '=') {
		if ((firstOperand) && (secondOperand) && (currentOperator)) {
			currentResult = operate(firstOperand, secondOperand, currentOperator);
			resetOperators();
		} else if ((firstOperand) && (!secondOperand) && (currentOperator)) {
			if (currentNumber) {
				secondOperand = parseFloat(currentNumber);
				currentResult = operate(firstOperand, secondOperand, currentOperator);
				resetOperators();
			} else {
				currentResult = firstOperand;
				previousResult = currentResult;
				resetOperators();
				currentNumber = '';
			}
		} else if ((!firstNumber) && (!secondNumber) && (!currentOperator)) {
			if (currentNumber) {
				currentResult = parseFloat(currentNumber);
				currentNumber = '';
			} else {
				return;
			}
		}
	}
	
	// positive/negative
	if (buttonFunction === '+/-') {
		if (currentNumber) {
			currentNumber = `${((parseFloat(currentNumber)) * -1)}`;
		} else {
			return;
		}
	}
	
	// dot
	if (buttonFunction === '.') {
		if (currentNumber) {
			if (!(currentNumber.includes('.'))) {
				currentNumber = currentNumber + '.';
			} else {
				return;
			}
		} else {
			return;
		}
	}
	
	// clear entry
	if (buttonFunction === 'clear entry') {
		if (currentNumber) {
			currentNumber = currentNumber.slice(0, (currentNumber.length - 2));
		} else {
			return;
		}
	}
	
	// clear all
	if (buttonFunction === 'clear all') {
		currentNumber = '';
		currentResult = '';
		previousResult = '';
		resetOperators();
	}
}

operatorButtons.forEach((button) => {
    button.addEventListener('click', operatorButtonHandler);
})

displayButtons.forEach((button) => {
    button.addEventListener('click', displayButtonHandler);
})
