const calContainer = document.querySelector("#calc-container");
const calcOutput = document.querySelector("#calc-output");
const calcButtons = document.querySelector("#calc-buttons");
const bottomButtons = document.createElement("div");
const numPad = document.createElement("div");
const operandContainer = document.createElement("div");
const options = document.createElement("div");


innit();

function innit()
{
    bottomButtons.className = "bot-buttons"
    createOptions();
    createNumPad();
    createBasicOperands();
    bottomButtons.append(numPad);
    bottomButtons.append(operandContainer);
    calcButtons.append(options);
    calcButtons.append(bottomButtons);
}

function createOptions()
{
    options.className = "option-buttons";
    const clear = document.createElement("button");
    const backSpace = document.createElement("button");
    const parenthesisLeft = document.createElement("button");
    const parenthesisRight = document.createElement("button");
    const module = document.createElement("button");

    clear.textContent = "AC";
    backSpace.textContent = "DEL";
    parenthesisLeft.textContent = "(";
    parenthesisRight.textContent = ")";
    module.textContent = "%";

    options.append(clear);
    options.append(backSpace);
    options.append(parenthesisLeft);
    options.append(parenthesisRight);
    options.append(module);


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

    const dot = document.createElement("button");
    const equals = document.createElement("button")
    equals.classList.add("pad-item", "equal")
    dot.classList.add("pad-item", "dot");
    equals.textContent = "=";
    dot.textContent = ".";
    numPad.append(dot);
    numPad.append(equals)

}

function createBasicOperands()
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

function module(num1,num2)
{
    return num1 % num2;
}

function operate(num1, operator, num2)
{
    switch (operator) {
        case "+":
            return add(num1,num2);
            break;
        case "-":
            return subtract(num1,num2);
            break;
        case "*":
            return multiply(num1,num2);
            break;
        case "/":
            return divide(num1,num2);
            break;
        case "%":
            return module(num1,num2);
            break;
        default:
            break;
    }


}


const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
  button.addEventListener("click", () => {
    

    if(button.textContent === "AC")
    {
        calcOutput.value = "";
    }
    else if(button.textContent === "DEL")
    {
        const currentValue = calcOutput.value;
        const newValue = currentValue.slice(0, -1);
        calcOutput.value = newValue;   
    }
    else if(button.textContent !== "=")
    {
        calcOutput.value += button.textContent;
    }
    else
    {
        const displayValue = calcOutput.value;
       
        if(displayValue.length != 0)
        {
            console.log(displayValue);
            calcOutput.value = evaluateExpression(displayValue);
        }
       
    }

  });


});


function evaluateExpression(expression) 
{

    const tokens = expression.match(/(\d+|\+|\-|\%|\*|\/|\^|\(|\))/g);

    for (let i = 0;  i < tokens.length; i++) {
        if (tokens[i] === '(') {
            let parenCount = 1;
            let next = i + 1;
            while (parenCount > 0 && next < tokens.length) {
                if (tokens[next] === '(') {
                    parenCount++;
                } else if (tokens[next] === ')') {
                    parenCount--;
                }
                next++;
            }
            const subExpression = tokens.slice(i + 1, next - 1);
            const subResult = evaluateExpression(subExpression.join(' '));
            tokens.splice(i, next - i, subResult);
          }
    }
   

    evaluateOperator(tokens, '*');
    evaluateOperator(tokens, '/');
    evaluateOperator(tokens, '%');

    let result = Number(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
        if (tokens[i] === '+') {
            result = operate(result, "+", Number(tokens[i + 1]));
        } else if (tokens[i] === '-') {
            result = operate(result, "-", Number(tokens[i + 1]));
        }
    }

    return result;
}   


function evaluateOperator(tokens, operator) {
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i] === operator) {
        const left = Number(tokens[i - 1]);
        const right = Number(tokens[i + 1]);
        const result = operate(left, operator, right);
        tokens.splice(i - 1, 3, result);
        i--;
      }
    }
  }
  
  