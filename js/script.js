const operandos = document.querySelectorAll('.operandos');
const operadores = document.querySelectorAll('.operadores');
const equals = document.getElementById('equals');

let currentNumber = "";
let lastNumber = "";
let operator = "";

let state = 1;

let result = 0;

function calculator(a, b, operation) {
    if (operation === '+') {
        return a + b;
    } else if (operation === '-') {
        return a - b;
    } else if (operation === '*') {
        return a * b;
    } else if (operation === '/') {
        if (b === 0) return null
        return a / b;
    }
}

operandos.forEach(operando => {
    operando.addEventListener('click', function () {
        if (state) {
            currentNumber += this.value;
        } else {
            lastNumber = currentNumber;
            currentNumber = "";
            currentNumber += this.value;
        }

    })
})

operadores.forEach(operador => {
    operador.addEventListener('click', function () {
        operator = this.value;
        state = 0
    })
})

function strToNumber(num) {
    return Number(num)
}

equals.addEventListener('click', function () {
    result = calculator(strToNumber(lastNumber), strToNumber(currentNumber), operator);
    alert(`${lastNumber} ${operator} ${currentNumber} = ${result}`);
    lastNumber = result;
    currentNumber = "";
})