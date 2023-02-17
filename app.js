const calContainer = document.querySelector("#calc-container");
const numPad = document.querySelector("#num-pad");
const operandContainer= document.querySelector("#operand-container");
const optionsContainer = document.querySelector("#options-container");

innit();

function innit()
{
    createNumPad();
    createOperands();
}

function createNumPad()
{  
    for (let i = 0; i < 10; i++) {
        const num = document.createElement("button");
        num.classList.add("num", `num${i}`);
        num.textContent = i;
        numPad.append(num);
    }
}

function createOperands()
{
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