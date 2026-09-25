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
            viewVariables();
            return;
        } else if (((currentNumber != '') || (currentNumber != undefined)) && ((firstOperand == '') || (firstOperand == undefined))){
            firstOperand = parseFloat(currentNumber);
            currentNumber = ''; // update display later
            currentOperator = event.target.textContent;
            viewVariables();
        } else if ((currentOperator != undefined || currentOperator != '') && ((firstOperand != '') || (firstOperand != undefined))) {
            if (secondOperand != '' || secondOperand != undefined) {
                currentResult = operate(firstOperand, secondOperand, event.target.textContent);
                previousResult = currentResult;
                currentResult = '';
                currentNumber = '';
                secondOperand = '';
                currentOperator = '';
                viewVariables();
            } else if (secondOperand == '' || secondOperand == undefined) {
                currentOperator = event.target.textContent;
                secondOperand = parseFloat(currentNumber);
                currentResult = operate(firstOperand, secondOperand, event.target.textContent);
                previousResult = currentResult;
                currentResult = '';
                currentNumber = '';
                firstOperand = '';
                secondOperand = '';
                currentOperator = '';
                viewVariables();
            }
        }
    }
    // there is a previous result
    else if (previousResult != undefined || previousResult != '') {
        if (currentNumber == '' || currentNumber == undefined) {
            viewVariables();
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
            currentOperator = '';
            viewVariables();
        }
    }
}

function displayButtonHandler (event) {
    let operation = event.target.textContent;

    // equals (should largely concern the current result variable)
    if (operation == '=') {
        // if there is no previous result
        if (previousResult == '' || previousResult == undefined) {
            if (secondOperand != undefined || secondOperand != '') {
                currentResult = operate(firstOperand, secondOperand, currentOperator);
                previousResult = currentResult;
                firstOperand = '';
                secondOperand = '';
                currentOperator = '';
                currentResult = '';
                currentNumber = '';
                viewVariables();
            } else if (secondOperand == undefined || secondOperand == '') {
                if ((currentNumber != undefined) && (currentNumber != '')) {
                    secondOperand = parseFloat(currentNumber);
                    currentResult = operate(firstOperand, secondOperand, currentOperator);
                    previousResult = currentResult;
                    currentNumber = '';
                    currentResult = '';
                    firstOperand = '';
                    secondOperand = '';
                    currentOperator = '';
                    viewVariables();
                } else {
                    currentResult = firstOperand;
                    previousResult = currentResult;
                    currentResult = '';
                    firstOperand = '';
                    viewVariables();
                }
            } else if (firstOperand == undefined || firstOperand == '') {
                if ((currentNumber != undefined) && (currentNumber != '')) {
                    firstOperand = parseFloat(currentNumber);
                    currentResult = firstOperand;
                    previousResult = currentResult;
                    currentNumber = '';
                    currentResult = '';
                    firstOperand = '';
                    viewVariables();
                } else {
                    viewVariables();
                    return;
                }
            }
        }
        // if there is a previous result
        else if (previousResult != '' && previousResult != undefined) {
            viewVariables();
            previousResult = firstOperand;
            // if there is an active operator
            if ((currentOperator != '') && (currentOperator != undefined)) {
                if (secondOperand != '' && secondOperand != undefined) {
                    currentResult = operate(firstOperand, secondOperand, currentOperator);
                    previousResult = currentResult;
                    currentResult = '';
                    currentNumber = '';
                    firstOperand = '';
                    secondOperand = '';
                    currentOperator = '';
                    viewVariables();
                } else if (((secondOperand == '') && (secondOperand == undefined)) && ((currentNumber != '') && (currentNumber != undefined))) {
                    secondOperand = parseFloat(currentNumber);
                    currentResult = operate(firstOperand, secondOperand, currentOperator);
                    previousResult = currentResult;
                    currentResult = '';
                    currentNumber = '';
                    firstOperand = '';
                    secondOperand = '';
                    currentOperator = '';
                    viewVariables();
                } else if (((secondOperand == '') && (secondOperand == undefined)) && ((currentNumber == '') || (currentNumber == undefined))) {
                    currentResult = firstOperand;
                    previousResult = currentResult;
                    currentNumber = '';
                    currentResult = '';
                    firstOperand = '';
                    viewVariables();
                } 
            } else if (((firstOperand == '') && (firstOperand == undefined)) && ((currentNumber != '') && (currentNumber != undefined))) {
                firstOperand = parseFloat(currentNumber);
                currentResult = firstOperand;
                previousResult = currentResult;
                currentNumber = '';
                currentResult = '';
                firstOperand = '';
                viewVariables();
            } else if (((firstOperand == '') && (firstOperand == undefined)) && ((currentNumber == '') || (currentNumber == undefined))) {
                viewVariables();
                return;
            }
        }
    }
    // positive-negative
    if (operation == '+/-') {
        if ((currentNumber != undefined) && (currentNumber != '')) {
            currentNumber = `${parseFloat(currentNumber) * -1}`;
        } else {
            return;
        }
        viewVariables();
    }

    // dot
    if (operation == '.') {
        if ((currentNumber != undefined) && (currentNumber != '')) {
            if (currentNumber.includes('.')) {
                return;
            } else {
                currentNumber = currentNumber + '.';
            }
        } else {
            return;
        }
        viewVariables();
    }

    // clear entry
    if (operation = 'clear entry') {
        if ((currentNumber != undefined) && (currentNumber != '')) {
            currentNumber = currentNumber.slice(0, currentNumber.length - 2);
        } else {
            return;
        }
        viewVariables();
    }

    // clear all
    if (operation = 'clear all') {
        currentNumber = '';
        firstOperand = '';
        secondOperand = '';
        currentOperator = '';
        currentResult = '';
        previousResult = '';
        // update display later
        viewVariables();
    }
}

operatorButtons.forEach((button) => {
    button.addEventListener('click', operatorButtonHandler);
})

displayButtons.forEach((button) => {
    button.addEventListener('click', displayButtonHandler);
})

function viewVariables () {
    let variables = {
        current_number: currentNumber,
        current_result: currentResult,
        previous_result: previousResult,
        first_operand: firstOperand,
        second_operand: secondOperand,
        current_operator: currentOperator,
    };
    console.table(variables)
}