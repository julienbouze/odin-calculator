let userInput = document.querySelector("#user-input");
let c = document.querySelector("#clear");
let ac = document.querySelector("#allclear");
let result = document.querySelector("#result");
let buttons = document.querySelectorAll("button");
let digits = document.querySelectorAll("button[data-type='number']");
let operators = document.querySelectorAll("button[data-type='operator']");
let equal = document.querySelector("button[data-type='equal']");
let decimal = document.querySelector("button[data-type='decimal']");

let operand1 = "";
let operand2 = "";
let operator = "";

document.addEventListener("keydown", keyboard);
ac.addEventListener('click', allClear);
c.addEventListener('click', clear);
Array.from(digits).forEach(function (digit) {
    digit.addEventListener('click', setOperand);
});

decimal.addEventListener('click', setDecimal);
Array.from(operators).forEach(function (operator) {
    operator.addEventListener('click', setOperator);
});

equal.addEventListener('click', function () {
    let operation = Math.round(operate(operand1, operand2, operator)*100)/100;
    if (operand1 != "" && operand2 != "" && operator != "") {
        result.textContent = operation;
        operand1 = operation.toString();
        operator = "";
        operand2 = "";
        displayCalculation();
    }
});

function setOperator() {
    if (operand1 != "" && operand2 == "") {
        operator = this.value;
    }
    displayCalculation();
}

function setOperand() {
    if (operator != "") {
        operand2 += this.value;
    }
    else {
        operand1 += this.value;
    }
    displayCalculation();
}

function setDecimal() {
    if (operand1 != "" && operator == "" && !operand1.includes(".")) {
        operand1 += this.value;
    }
    else if (operator != "" && operand2 != "" && !operand2.includes(".")) {
        operand2 += this.value;
    }
    displayCalculation();
}

function displayCalculation() {
    if (operand1 != "" || operator != "" || operand2 != "") {
        userInput.textContent = operand1.concat(operator, operand2);
    }
    else {
        userInput.textContent = "0";
    }
}

function clear() {
    if (operand1 != "" && operator == "" && operand2 == "") {
        operand1 = operand1.slice(0, -1);
    }
    else if (operand1 != "" && operator != "" && operand2 == "") {
        operator = operator.slice(0, -1);
    }
    else if (operand1 != "" && operator != "" && operand2 != "") {
        operand2 = operand2.slice(0, -1);
    }
    displayCalculation();
}

function allClear() {
    operand1 = "";
    operand2 = "";
    operator = "";
    displayCalculation();
    result.textContent = "\u00A0";
}

function add(operand1, operand2) {
    return operand1 + operand2;
}

function substract(operand1, operand2) {
    return operand1 - operand2;
}

function multiply(operand1, operand2) {
    return operand1 * operand2;
}

function divide(operand1, operand2) {
    return operand1 / operand2;
}
function modulo(operand1, operand2) {
    return operand1 % operand2;
}

function operate(operand1, operand2, operator) {
    if (operand1 != "" && operand2 != "" && operator != "") {
        operand1 = parseFloat(operand1);
        operand2 = parseFloat(operand2);
        switch (operator) {
            case "+":
                return add(operand1, operand2);
            case "-":
                return substract(operand1, operand2);
            case "*":
                return multiply(operand1, operand2);
            case "/":
                return divide(operand1, operand2);
            case "%":
                return modulo(operand1, operand2);
            default:
                return NaN;
        }
    }
    else {
        return "";
    }

}

function keyboard(event) {
    var key = event.key;
    buttons.forEach(function (button) {
        if (button.dataset.char === key) {
            button.click();
        }
    });
}


