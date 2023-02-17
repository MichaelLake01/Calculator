const calContainer = document.querySelector("#calc-container");
const calcButtons = document.createElement("div");
const numPad = document.createElement("div");
const operandContainer= document.createElement("div");

innit();

function innit()
{
    calcButtons.className = "calc-btns";
    calContainer.append(calcButtons);
    createNumPad();
    createOperands();
    calcButtons.append(numPad);
    calcButtons.append(operandContainer);

}

function createNumPad()
{  
    numPad.className = "num-pad";

    for (let i = 0; i < 10; i++) {
        const num = document.createElement("button");
        num.classList.add("num", `num${i}`);
        num.textContent = i;
        numPad.append(num);
    }

    const equal = document.createElement("button");
    const clear = document.createElement("button");
    equal.classList.add("pad-item", "equal");
    clear.classList.add("pad-item", "clear");
    equal.textContent = "=";
    clear.textContent = "clear";
    numPad.append(equal);
    numPad.append(clear);

}

function createOperands()
{
    operandContainer.className = "operand-container";

    const operands = ["+", "-", "*", "/"];
    for (let i = 0; i < operands.length; i++) {
        const operand = document.createElement("button");
        operand.classList.add("operand", operands[i]);
        operand.textContent = operands[i];
        operandContainer.append(operand);
    }

}




function add(num1,num2)
{
    return num1 + num2;
}

function subtract(num1,num2)
{
    return num1 - num2;

}

function multiply(num1,num2)
{
    return num1 * num2;

}

function divide(num1,num2)
{
    return num1 / num2;

}

function operate(num1, operator, num2)
{
    switch (operator) {
        case "+":
            add(num1,num2);
            break;
        case "-":
            subtract(num1,num2);
            break;
        case "*":
            multiply(num1,num2);
            break;
        case "/":
            divide(num1,num2);
            break;
        default:
            break;
    }
}