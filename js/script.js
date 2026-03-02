const operandos = document.querySelectorAll('.operandos');
const operadores = document.querySelectorAll('.operadores');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');

let currentNumber = "";
let lastNumber = "";
let operator = "";

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

equals.addEventListener('click', function () {
    if (currentNumber !== "" && operator !== "") {
        lastNumber = calculator(Number(lastNumber), Number(currentNumber), operator);
        console.log(lastNumber);

        currentNumber = ""
        operator = "";
    }
})
