const operandos = document.querySelectorAll('.operandos');
const operadores = document.querySelectorAll('.operadores');
const equals = document.getElementById('equals');


let firstNumber = 0;
let lastNumber = 0;
let operator = "";
let result = 0;

function calculator(a, b, operation) {
    console.log(operation)
    if (operation === '+') {
        return a + b;
    } else if (operation === '-') {
        return a - b;
    } else if (operation === '*') {
        return a * b;
    } else if (operation === '/') {
        return a / b;
    }
}

operandos.forEach(operando => {
    operando.addEventListener('click', function () {
        firstNumber = Number(this.value);
        console.log(`first ${firstNumber}`);
    })
})

operandos.forEach(operando => {
    operando.addEventListener('click', function () {
        lastNumber = Number(this.value);
        console.log(`last ${lastNumber}`);
    })
})

operadores.forEach(operador => {
    operador.addEventListener('click', function () {
        operator = this.value;
    })
})

equals.addEventListener('click', function () {
    result = calculator(firstNumber, lastNumber, operator);
    console.log(result);
})
