const operandos = document.querySelectorAll('.operandos');
const operadores = document.querySelectorAll('.operadores');
const equals = document.getElementById('equals-btn');
const clear = document.getElementById('clear-btn');
const del = document.getElementById('del-btn');
const float = document.getElementById('float-btn');
const sign      = document.getElementById('sign-btn');

let currentNumber = "";
let lastNumber = "";
let operator = "";

let repeatOperator = "";   // para repetir operação com =
let repeatOperand  = "";   // operando repetido com =
let justEvaled     = false; // flag: acabou de apertar =

function calculator(a, b, op) {
    switch (op) {
        case '+': return parseFloat((a + b).toFixed(10))
        case '-': return parseFloat((a - b).toFixed(10))
        case '*': return parseFloat((a * b).toFixed(10))
        case '/': return b === 0 ? null: parseFloat((a / b).toFixed(10))
    }
}

function updateDisplay(expression = "") {
    document.getElementById('display-expression').textContent = expression;
    document.getElementById('display-number').textContent = currentNumber || lastNumber || "0";
}

function pressDigit(value) {
    if (justEvaled) {
        lastNumber = "";
        justEvaled = false;
    }
    currentNumber += value;
    updateDisplay(buildExpression());
}

function buildExpression() {
    if (!operator) return "";
    return `${lastNumber} ${operator}`;
}

function pressOperator(value) {
    justEvaled = false;
    repeatOperator = "";
    repeatOperand  = "";
    if (!currentNumber && lastNumber) {
        operator = value;
        updateDisplay(`${lastNumber} ${operator}`);
        return;
    }
    if (!lastNumber) {
        lastNumber = currentNumber;
    } else {
        lastNumber = calculator(Number(lastNumber), Number(currentNumber), operator);
    }
    operator = value;
    currentNumber = "";
    updateDisplay(`${lastNumber} ${operator}`);
}

function pressEquals() {
    if (justEvaled && repeatOperator) {
        lastNumber = calculator(Number(lastNumber), Number(repeatOperand), repeatOperator);
        document.getElementById('display-expression').textContent =
            `${lastNumber} ${repeatOperator} ${repeatOperand} =`;
        document.getElementById('display-number').textContent = lastNumber ?? "Erro";
        return;
    }

    if (currentNumber === "" || operator === "") return;

    repeatOperator = operator;
    repeatOperand  = currentNumber;

    const expression = `${lastNumber} ${operator} ${currentNumber} =`;
    lastNumber = calculator(Number(lastNumber), Number(currentNumber), operator);
    currentNumber = "";
    operator = "";
    justEvaled = true;

    document.getElementById('display-expression').textContent = expression;
    document.getElementById('display-number').textContent = lastNumber ?? "Erro";
}

function pressClear() {
    lastNumber     = "";
    currentNumber  = "";
    operator       = "";
    repeatOperator = "";
    repeatOperand  = "";
    justEvaled     = false;
    updateDisplay();
}

function pressDel() {
    if (currentNumber !== "") {
        currentNumber = currentNumber.slice(0, -1);
        updateDisplay(buildExpression());
    }
}

function pressFloat() {
    if (currentNumber === "" || currentNumber === ".") return;
    if (!currentNumber.includes('.')) {
        currentNumber += '.';
        updateDisplay(buildExpression());
    }
}

function pressSign() {
    if (currentNumber === "" || currentNumber === "0") return;
    currentNumber = currentNumber.startsWith('-')
        ? currentNumber.slice(1)
        : '-' + currentNumber;
    updateDisplay(buildExpression());
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
sign.addEventListener('click',   pressSign);

document.addEventListener('keydown', function (e) {
    if (e.key >= '0' && e.key <= '9')           pressDigit(e.key);
    else if (['+','-','*','/'].includes(e.key)) pressOperator(e.key);
    else if (e.key === 'Enter')                 pressEquals();
    else if (e.key === 'Escape')                pressClear();
    else if (e.key === 'Backspace')             pressDel();
    else if (e.key === '.')                     pressFloat();
})