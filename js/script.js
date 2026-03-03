const operandos = document.querySelectorAll('.operandos');
const operadores = document.querySelectorAll('.operadores');
const equals = document.getElementById('equals-btn');
const clear = document.getElementById('clear-btn');
const del = document.getElementById('del-btn');

let currentNumber = "";
let lastNumber = "";
let operator = "";

function calculator(a, b, op) {
    switch (op) {
        case '+': return a + b
        case '-': return a - b
        case '*': return a * b
        case '/': return b === 0 ? null: a * b
    }
}

operandos.forEach(operando => {
    operando.addEventListener('click', function () {
        currentNumber += this.value;
    })
})

operadores.forEach(operador => {
    operador.addEventListener('click', function () {
        if (!currentNumber && lastNumber) {
            operator = this.value;
            return
        }
        if (!lastNumber) {
            lastNumber = currentNumber;
        } else {
            lastNumber = calculator(Number(lastNumber), Number(currentNumber), operator);
        }
        operator = this.value;
        currentNumber = ""
    })
})

clear.addEventListener('click', function () {
    lastNumber = "";
    currentNumber = "";
    operator = "";
})

del.addEventListener('click', function () {
    if (currentNumber !== "") {
        currentNumber = currentNumber.slice(0, -1)
    }
})

equals.addEventListener('click', function () {
    if (currentNumber !== "" && operator !== "") {
        lastNumber = calculator(Number(lastNumber), Number(currentNumber), operator);
        console.log(lastNumber);

        currentNumber = ""
        operator = "";
    }
})
