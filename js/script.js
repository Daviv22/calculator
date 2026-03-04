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
    if (currentNumber === "" || currentNumber === ".") return;
    if (!currentNumber.includes('.')) {
        currentNumber += '.';
        document.getElementById('display').textContent = currentNumber;
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

document.addEventListener('keydown', function (e) {
    if (e.key >= '0' && e.key <= '9') {
        currentNumber += e.key;
        document.getElementById('display').textContent = currentNumber || lastNumber || "0";

    } else if (['+', '-', '*', '/'].includes(e.key)) {
        if (!currentNumber && lastNumber) {
            operator = e.key;
            return;
        }
        if (!lastNumber) {
            lastNumber = currentNumber;
        } else {
            lastNumber = calculator(Number(lastNumber), Number(currentNumber), operator);
        }
        operator = e.key;
        currentNumber = "";
        document.getElementById('display').textContent = lastNumber + " " + operator;

    } else if (e.key === 'Enter') {
        if (currentNumber !== "" && operator !== "") {
            lastNumber = calculator(Number(lastNumber), Number(currentNumber), operator);
            currentNumber = "";
            operator = "";
            document.getElementById('display').textContent = currentNumber || lastNumber || "0";
        }

    } else if (e.key === 'Backspace') {
        if (currentNumber !== "") {
            currentNumber = currentNumber.slice(0, -1);
            document.getElementById('display').textContent = currentNumber || lastNumber || "0";
        }

    } else if (e.key === 'Escape') {
        lastNumber = "";
        currentNumber = "";
        operator = "";
        document.getElementById('display').textContent = "0";

    } else if (e.key === '.') {
        if (currentNumber === "" || currentNumber === ".") return;
        if (!currentNumber.includes('.')) {
            currentNumber += '.';
            document.getElementById('display').textContent = currentNumber;
        }
    }
})