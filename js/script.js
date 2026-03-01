const operandos = document.querySelectorAll('.operandos');
const operadores = document.querySelectorAll('.operadores');

operandos.forEach(operando => {
    operando.addEventListener('click', function () {
        console.log(this.value)
    })
})

operadores.forEach(operador => {
    operador.addEventListener('click', function () {
        console.log(this.value)
    })
})