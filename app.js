const calContainer = document.querySelector("#calc-container");
const calcOutput = document.querySelector("#calc-output");
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
        default:
            break;
    }


}


const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
  button.addEventListener("click", () => {
    

    if(button.textContent === "clear")
    {
        calcOutput.value = "";
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


});function evaluateExpression(expression) 
{

    const tokens = expression.match(/(\d+|\+|\-|\*|\/|\^|\(|\))/g);
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] === '*') {
          const left = Number(tokens[i - 1]);
          const right = Number(tokens[i + 1]);
          const result = operate(left,"*",right)
          tokens.splice(i - 1, 3, result);
          i--;
        } else if (tokens[i] === '/') {
          const left = Number(tokens[i - 1]);
          const right = Number(tokens[i + 1]);
          const result = operate(left,"/",right)
          tokens.splice(i - 1, 3, result);
          i--;
        }
      }
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