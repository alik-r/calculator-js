'use strict';

const divDisplay = document.querySelector('.display');

// Infix to Postfix

function getFirstNum(strExpr) {
    const idxOfFirstOp = strExpr.split('').findIndex(el => ['+','-','*','/'].includes(el));
    if (idxOfFirstOp === -1) {
        return strExpr;
    }
    return strExpr.slice(0, idxOfFirstOp);
}

function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}

const precendence = new Map();
precendence.set('+', 1);
precendence.set('-', 1);
precendence.set('*', 2);
precendence.set('/', 2);

function infixToPostfix(strExpr) {
    const stack = [];
    const resultStr = [];
    for(let i = 0;i < strExpr.length;i++) {
        if(isOperator(strExpr.at(i))) { 
            while(stack.length && precendence.get(stack.at(-1)) > precendence.get(strExpr.at(i))) {
                resultStr.push(stack.at(-1)); 
                stack.pop();
            }
            stack.push(strExpr.at(i));
        } else { // strExpr[i] is an operand
            const operand = getFirstNum(strExpr.slice(i));
            resultStr.push(operand);
            i += operand.length - 1;
        }
    }
    while(stack.length !== 0) { // while stack is not empty
        resultStr.push(stack.at(-1));
        stack.pop();
    }
    return resultStr;
}

function evalPostfix(postfixArr) {
    const stack = [];
    for(const token of postfixArr) {
        if(isOperator(token)) {
            const operand1 = stack.pop();
            const operand2 = stack.pop();
            if(token === '+') {
                stack.push(operand1 + operand2);
            } else if(token === '-') {
                stack.push(operand2 - operand1);
            } else if(token === '*') {
                stack.push(operand1 * operand2);
            } else if(token === '/') {
                const quotient = operand1 === 0 ? NaN : operand2 / operand1;
                stack.push(quotient);
            }
        } else {
            stack.push(+token);
        }
    }
    return stack[0];
}

const btnEquals = document.querySelector('.btn.equals');
btnEquals.addEventListener('click', () => {
    // console.log('Pressed =');
    // console.log('Display:', divDisplay.textContent);
    // console.log('RPN:', infixToPostfix(divDisplay.textContent));
    // console.log('Results:', evalPostfix(infixToPostfix(divDisplay.textContent)));
    divDisplay.textContent = evalPostfix(infixToPostfix(divDisplay.textContent));
});


// Numbers

function displayAddNumber(event) {
    const num = event.target.textContent;
    if(divDisplay.textContent === '0') {
        divDisplay.textContent = num;
    } else {
        divDisplay.textContent += num;
    }
}

const btnsNumber = document.querySelectorAll('.btn.number');
btnsNumber.forEach(btn => btn.addEventListener('click', displayAddNumber));

// Operators

function displayAddOp(event) {
    const op = event.target.textContent;
    if(!['+', '-', '*', '/'].includes(divDisplay.textContent.at(-1))) {
        divDisplay.textContent += op;
    }
}

const btnOp = document.querySelectorAll('.btn.operator');
btnOp.forEach(btn => btn.addEventListener('click', displayAddOp));

// Clear
const btnClear = document.querySelector('.btn.clear');

function clearDisplay() {
    divDisplay.textContent = '0';
}

btnClear.addEventListener('click', clearDisplay);

// Backspace button
const btnBackspace = document.querySelector('.btn.backspace');

function pressBackspace() {
    if(divDisplay.textContent.length > 1) {
        divDisplay.textContent = divDisplay.textContent.slice(0, -1);
    }
}

btnBackspace.addEventListener('click', pressBackspace);