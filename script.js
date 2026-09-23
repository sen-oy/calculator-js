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