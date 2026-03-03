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
        case '+': return a + b
        case '-': return a - b
        case '*': return a * b
        case '/': return b === 0 ? null: a / b
    }
}

operandos.forEach(operando => {
    operando.addEventListener('click', function () {
        currentNumber += this.value;
        document.getElementById('display').textContent = currentNumber || lastNumber || "0";
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
        document.getElementById('display').textContent = lastNumber + " " + operator;
    })
})

clear.addEventListener('click', function () {
    lastNumber = "";
    currentNumber = "";
    operator = "";
    document.getElementById('display').textContent = "0"; //
})

del.addEventListener('click', function () {
    if (currentNumber !== "") {
        currentNumber = currentNumber.slice(0, -1)
        document.getElementById('display').textContent = currentNumber || lastNumber || "0";
    }
})

float.addEventListener('click', function () {
    if (Number.isInteger(Number(currentNumber))) {
        currentNumber += '.';
        document.getElementById('display').textContent = currentNumber || lastNumber || "0";
    }
})

equals.addEventListener('click', function () {
    if (currentNumber !== "" && operator !== "") {
        lastNumber = calculator(Number(lastNumber), Number(currentNumber), operator);
        currentNumber = ""
        operator = "";

        document.getElementById('display').textContent = currentNumber || lastNumber || "0";
    }
})
