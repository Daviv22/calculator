const operandos = document.querySelectorAll('.operandos');
const operadores = document.querySelectorAll('.operadores');
const equals = document.getElementById('equals-btn');
const clear = document.getElementById('clear-btn');
const del = document.getElementById('del-btn');
const float = document.getElementById('float-btn');

let currentNumber = "";
let lastNumber = "";
let operator = "";

function calculator(a, b, op) {
    switch (op) {
        case '+': return parseFloat((a + b).toFixed(10))
        case '-': return parseFloat((a - b).toFixed(10))
        case '*': return parseFloat((a * b).toFixed(10))
        case '/': return b === 0 ? null: parseFloat((a / b).toFixed(10))
    }
}

function updateDisplay() {
    if (operator && !currentNumber) {
        document.getElementById('display').textContent = lastNumber + " " + operator;
    } else {
        document.getElementById('display').textContent = currentNumber || lastNumber || "0";
    }
}

function pressDigit(value) {
    currentNumber += value;
    updateDisplay();
}

function pressOperator(value) {
    if (!currentNumber && lastNumber) {
        operator = value;
        updateDisplay();
        return;
    }
    if (!lastNumber) {
        lastNumber = currentNumber;
    } else {
        lastNumber = calculator(Number(lastNumber), Number(currentNumber), operator);
    }
    operator = value;
    currentNumber = "";
    updateDisplay();
}

function pressEquals() {
    if (currentNumber !== "" && operator !== "") {
        lastNumber = calculator(Number(lastNumber), Number(currentNumber), operator);
        currentNumber = "";
        operator = "";
        updateDisplay();
    }
}

function pressClear() {
    lastNumber = "";
    currentNumber = "";
    operator = "";
    document.getElementById('display').textContent = "0";
}

function pressDel() {
    if (currentNumber !== "") {
        currentNumber = currentNumber.slice(0, -1);
        updateDisplay();
    }
}

function pressFloat() {
    if (currentNumber === "" || currentNumber === ".") return;
    if (!currentNumber.includes('.')) {
        currentNumber += '.';
        updateDisplay();
    }
}

operandos.forEach(operando => {
    operando.addEventListener('click', function () { pressDigit(this.value); })
})

operadores.forEach(operador => {
    operador.addEventListener('click', function () { pressOperator(this.value); })
})

equals.addEventListener('click', pressEquals);
clear.addEventListener('click', pressClear);
del.addEventListener('click', pressDel);
float.addEventListener('click', pressFloat);

document.addEventListener('keydown', function (e) {
    if (e.key >= '0' && e.key <= '9')           pressDigit(e.key);
    else if (['+','-','*','/'].includes(e.key)) pressOperator(e.key);
    else if (e.key === 'Enter')                 pressEquals();
    else if (e.key === 'Escape')                pressClear();
    else if (e.key === 'Backspace')             pressDel();
    else if (e.key === '.')                     pressFloat();
})