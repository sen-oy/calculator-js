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
            return 'NOPE';
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

// functional variables
let currentNumber = '';
let firstOperand;
let secondOperand;
let currentOperator;
let currentResult;
let previousResult;

// get numbers from number buttons
numberButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        currentNumber += event.target.textContent;
        console.log(`current number: ${currentNumber}`);
    })
})

function operatorButtonHandler (event) {
    // there is no previous result
    if (!previousResult) {
        // if there is no number yet
        if (!(firstOperand) && !(currentNumber)) {
            return;
        } else if (((currentNumber != '') || (currentNumber != undefined)) && ((firstOperand == '') || (firstOperand == undefined))){
            firstOperand = parseFloat(currentNumber);
            currentNumber = ''; // update display later
            currentOperator = event.target.textContent;
        } else if ((currentOperator != undefined || currentOperator != '') && ((firstOperand != '') || (firstOperand != undefined))) {
            if (secondOperand != '' || secondOperand != undefined) {
                currentResult = operate(firstOperand, secondOperand, event.target.textContent);
                previousResult = currentResult;
                currentResult = '';
                currentNumber = '';
                secondOperand = '';
            } else if (secondOperand == '' || secondOperand == undefined) {
                currentOperator = event.target.textContent;
                secondOperand = parseFloat(currentNumber);
                currentResult = operate(firstOperand, secondOperand, event.target.textContent);
                previousResult = currentResult;
                currentResult = '';
                currentNumber = '';
                firstOperand = '';
                secondOperand = '';
            }
        }
    }
    // there is a previous result
    else if (previousResult != undefined || previousResult != '') {
        if (currentNumber == '' || currentNumber == undefined) {
            return;
        } else if (currentNumber != '' || currentNumber != undefined) {
            firstOperand = previousResult; 
            secondOperand = parseFloat(currentNumber);
            currentResult = operate(firstOperand, secondOperand, event.target.textContent);
            previousResult = currentResult;
            currentResult = '';
            currentNumber = '';
            firstOperand = '';
            secondOperand = '';
        }
    }
}

function displayButtonHandler (event) {
    let operation = event.target.textContent;

    // equals
    if (operation == '=') {
        // if there is no previous result
        if (previousResult == '' || previousResult == undefined) {
            
        }
        // if there is a previous result
    }
    // positive-negative
    // dot
    // clear entry
    // clear all
}

