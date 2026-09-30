// get dom nodes
const upperDisplay = document.querySelector('#calculator-upper-display');
const mainDisplay = document.querySelector('#calculator-main-display');
const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const displayButtons = document.querySelectorAll('.display-button');

// operate function
function operate (operandA, operandB, operator) {
    if (((operator === undefined) || (operator === '')) ||
        ((operandA === undefined) || (operandA === '')) || 
        ((operandB === undefined) || (operandB === ''))) {
        return;
    }

    if (operator === '÷') {
        if (operandB == 0){
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
    currentNumber = '';
    currentResult = '';
}

// function to update the displays 
function updateDisplays () {
    upperDisplay.textContent = `= ${previousResult}`;
    mainDisplay.textContent = `${currentNumber} ${currentOperator}`;
}

// functions to check if a variable is blank 
function isCurrentNumber () {
    if ((currentNumber === '') || (currentNumber === undefined)) {
        return false;
    } else {
        return true;
    }
}

function isFirstOperand () {
    if ((firstOperand === '') || (firstOperand === undefined)) {
        return false;
    } else {
        return true;
    }
}

function isSecondOperand () {
    if ((secondOperand === '') || (secondOperand === undefined)) {
        return false;
    } else {
        return true;
    }
}

function isCurrentResult () {
    if ((currentResult === '') || (currentResult === undefined)) {
        return false;
    } else {
        return true;
    }
}

function isPreviousResult () {
    if ((previousResult === '') || (previousResult === undefined)) {
        return false;
    } else {
        return true;
    }
}

function isCurrentOperator () {
    if ((currentOperator === '') || (currentOperator === undefined)) {
        return false;
    } else {
        return true;
    }
}

// get numbers from number buttons
numberButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        currentNumber += event.target.textContent;
        updateDisplays();
        console.log(`current number: ${currentNumber}`);
    })
})

function operatorButtonHandler (e) {
	let operation = e.target.textContent; // places the operator in a variable
	// if there is no previous result => this is a first calculation
	if (!isPreviousResult()) {
		// check if there is a current number or first operand or current result
		if ((isCurrentResult()) && (isCurrentNumber())) {
			previousResult = currentResult;
			firstOperand = previousResult;
			currentOperator = operation;
			secondOperand = parseFloat(currentNumber);
			currentResult = operate(firstOperand, secondOperand, currentOperator);
            previousResult = currentResult;
			resetOperators();
		} else if ((isCurrentResult()) && (!isCurrentNumber())){
			previousResult = currentResult;
			firstOperand = previousResult;
			currentOperator = operation;
			currentNumber = '';
		} else if ((isFirstOperand()) && (!isCurrentResult()) && (isCurrentNumber())) {
			secondOperand = parseFloat(currentNumber);
			currentResult = operate(firstOperand, secondOperand, currentOperator);
            previousResult = currentResult;
			resetOperators();
            currentOperator = operation;
		} else if ((isFirstOperand()) && (!isCurrentResult()) && (!isCurrentNumber())) {
			currentOperator = operation;
		} else if ((isCurrentNumber()) && (!isFirstOperand()) && (!isSecondOperand())) {
			firstOperand = parseFloat(currentNumber);
			currentOperator = operation;
			currentNumber = '';
		} else if ((!isCurrentNumber()) && (!isFirstOperand()) && (!isSecondOperand())) {
			return;
		}
	} else if (isPreviousResult()) {
		// check if there is a current number or first/second operand or current result
		// currentOperator = operation;
		if (isCurrentNumber()) {
			firstOperand = previousResult;
			secondOperand = parseFloat(currentNumber);
			currentResult = operate(firstOperand, secondOperand, currentOperator);
			previousResult = currentResult;
			resetOperators();
            currentOperator = operation;
		} else if (!isCurrentNumber()) {
            currentOperator = operation;
			return;
		}
	}
    updateDisplays();
    reviewCurrentVariables();
}

function displayButtonHandler (e) {
	let buttonFunction = e.target.textContent;
	
	// equals
	if (buttonFunction === '=') {
		if ((isFirstOperand()) && (isSecondOperand()) && (isCurrentOperator())) {
			currentResult = operate(firstOperand, secondOperand, currentOperator);
            previousResult = currentResult;
			resetOperators();
		} else if ((isFirstOperand()) && (!isSecondOperand()) && (isCurrentOperator())) {
			if (currentNumber) {
				secondOperand = parseFloat(currentNumber);
				currentResult = operate(firstOperand, secondOperand, currentOperator);
                previousResult = currentResult;
				resetOperators();
			} else {
				currentResult = firstOperand;
				previousResult = currentResult;
				resetOperators();
			}
		} else if ((!isFirstOperand()) && (!isSecondOperand()) && (!isCurrentOperator())) {
			if (isCurrentNumber()) {
				currentResult = parseFloat(currentNumber);
                previousResult = currentResult;
				currentNumber = '';
			} 
		} else if (isPreviousResult()) {
            firstOperand = previousResult;
            if ((isCurrentOperator()) && (isCurrentNumber())) {
                secondOperand = parseFloat(currentNumber);
                currentResult = operate(firstOperand, secondOperand, currentOperator);
                previousResult = currentResult;
                resetOperators();
            } else if ((isCurrentNumber()) && (!isCurrentOperator)) {
                currentOperator = '';
                previousResult = parseFloat(currentNumber);
            } else {
                return;
            }
		} else {
			return;
        }
	}
	
	// positive/negative
	if (buttonFunction === '+/-') {
		if (isCurrentNumber()) {
			currentNumber = `${((parseFloat(currentNumber)) * -1)}`;
		} else {
			return;
		}
	}
	
	// dot
	if (buttonFunction === '.') {
		if (isCurrentNumber()) {
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
	if (buttonFunction === 'CE') {
		if (isCurrentNumber()) {
			currentNumber = currentNumber.slice(0, (currentNumber.length - 1));
		} else {
			return;
		}
	}
	
	// clear all
	if (buttonFunction === 'AC') {
		currentNumber = '';
		currentResult = '';
		previousResult = '';
		resetOperators();
	}
    // view variables
    updateDisplays();
    reviewCurrentVariables();
}

operatorButtons.forEach((button) => {
    button.addEventListener('click', operatorButtonHandler);
})

displayButtons.forEach((button) => {
    button.addEventListener('click', displayButtonHandler);
})

function reviewCurrentVariables () {
    console.log(`current number: ${currentNumber}`);
    console.log(`first operand: ${firstOperand}`);
    console.log(`current operator: ${currentOperator}`);
    console.log(`second operand: ${secondOperand}`);
    console.log(`current result: ${currentResult}`);
    console.log(`previous result: ${previousResult}`);
}