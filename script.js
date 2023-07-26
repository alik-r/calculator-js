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


function calculateResult() {
  divDisplay.textContent = evalPostfix(infixToPostfix(divDisplay.textContent));
}

const btnEquals = document.querySelector('.btn.equals');
btnEquals.addEventListener('click', calculateResult);

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

function clearDisplay() {
    divDisplay.textContent = '0';
}

const btnClear = document.querySelector('.btn.clear');
btnClear.addEventListener('click', clearDisplay);

// Backspace 
const btnBackspace = document.querySelector('.btn.backspace');

function pressBackspace() {
    if(divDisplay.textContent.length > 1) {
        divDisplay.textContent = divDisplay.textContent.slice(0, -1);
    }
}

btnBackspace.addEventListener('click', pressBackspace);

// Keyboard support

document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (key === 'Enter') {
    // Press 'Enter' key for '=' operation
    event.preventDefault(); 
    calculateResult();
  } else if (key === 'Escape') {
    // Press 'Escape' key for 'C' (Clear) operation
    clearDisplay();
  } else if (key === 'Backspace') {
    // Press 'Backspace' key for '⌫' (Backspace) operation
    pressBackspace();
  } else if (key === '+' || key === '-' || key === '*' || key === '/') {
    displayAddOpKeyb(key);
  } else if (/^[0-9.]$/.test(key)) {
    displayAddNumberKeyb(key);
  }
});

function displayAddNumberKeyb(key) {
  const num = key;
  if (divDisplay.textContent === '0') {
    divDisplay.textContent = num;
  } else {
    divDisplay.textContent += num;
  }
}

function displayAddOpKeyb(key) {
  const op = key;
  if (!['+', '-', '*', '/'].includes(divDisplay.textContent.at(-1))) {
    divDisplay.textContent += op;
  }
}

function pressBackspace() {
  if (divDisplay.textContent.length > 1) {
    divDisplay.textContent = divDisplay.textContent.slice(0, -1);
  }
}