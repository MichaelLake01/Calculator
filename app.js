// Select containers from html
const calContainer = document.querySelector("#calc-container");
const calcOutput = document.querySelector("#calc-output");
const calcButtons = document.querySelector("#calc-buttons");

// Create containers for each section on the calculator
const bottomButtons = document.createElement("div");
const numPad = document.createElement("div");
const operandContainer = document.createElement("div");
const options = document.createElement("div");


innit();

// initialise calculator content
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
    
    // Create number pad
    for (let i = 0; i < 10; i++) {
        const num = document.createElement("button");
        num.classList.add("num", `num${i}`);
        num.textContent = i;
        numPad.append(num);
    }

    // Add equal and dot
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

    // Create operands
    const operands = ["+", "-", "*", "/"];
    for (let i = 0; i < operands.length; i++) {
        const operand = document.createElement("button");
        operand.classList.add("operand", operands[i]);
        operand.textContent = operands[i];
        operandContainer.append(operand);
    }

}


// arithmetic functions 

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

// Check for all buttons
const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
  button.addEventListener("click", () => {
    

    if(button.textContent === "AC")
    {
        calcOutput.value = "";
    }
    // Delete last value with slice
    else if(button.textContent === "DEL")
    {
        const currentValue = calcOutput.value;
        const newValue = currentValue.slice(0, -1);
        calcOutput.value = newValue;   
    }
    // Append if not equals
    else if(button.textContent !== "=")
    {
        calcOutput.value += button.textContent;
    }
    else
    {
        // Store calcOutput
        const displayValue = calcOutput.value;
       
        // If not empty
        if(displayValue.length != 0)
        {
            calcOutput.value = evaluateExpression(displayValue);
        }
       
    }

  });


});


function evaluateExpression(expression) 
{

    // Find any digits, +, -, %, *, /, ( and )
    // Store in an array as characters
    const tokens = expression.match(/(\d+|\+|\-|\%|\*|\/|\^|\(|\))/g);

    // Loop over the characters
    for (let i = 0;  i < tokens.length; i++) {
        // If character is equal to starting parenthesis
        if (tokens[i] === '(') {
            // Increase parenthesis count to keep track of total amount 
            let parenCount = 1;
            // Get the next character
            let next = i + 1;
            // While there are parenthesis and the next token is not larger than the end of the array
            while (parenCount > 0 && next < tokens.length) {
                // Find an additional starting parenthesis if there is one
                if (tokens[next] === '(') {
                    // increase total count accordingly
                    parenCount++;
                // Find end parenthesis
                } else if (tokens[next] === ')') {
                    // deduct from total count
                    parenCount--;
                }
                // Go to the next character
                next++;
            }
            // Get the expression between the two parenthesis
            // i is equal to the starting parenthesis
            // deduct 1 from next as we have already added 1 to next at the end of the while loop.
            const subExpression = tokens.slice(i + 1, next - 1); // (inclusive, exclusive)
            // Recursively run evaluateExpression and join the subExpression so it can be evaluated by the regex.
            const subResult = evaluateExpression(subExpression.join(' '));
            // Replace the expression between the parenthesis, including the two parenthesis, with the result.
            tokens.splice(i, next - i, subResult);
          }
    }
   

    // Evaluate *, / and % operands first according to PEMDAS
    evaluateOperator(tokens, '*');
    evaluateOperator(tokens, '/');
    evaluateOperator(tokens, '%');

    // Set result to the first number in the array
    let result = Number(tokens[0]);
    // Set i to 1 as thats where the first operator is
    // Increment in 2s as all operators are positioned on odd numbers and numbers are positioned on even numbers
    for (let i = 1; i < tokens.length; i += 2) {
        // Find +
        if (tokens[i] === '+') {
            
            result = operate(result, "+", Number(tokens[i + 1])); // => result += nextNum
        } else if (tokens[i] === '-') {
            result = operate(result, "-", Number(tokens[i + 1])); // => result -= nextNum
        }
    }

    return result;
}   



function evaluateOperator(tokens, operator) {
    for (let i = 0; i < tokens.length; i++) {
        // If character is equal to a operator
        if (tokens[i] === operator) {
            // Get the prev position
            const left = Number(tokens[i - 1]);
            // Get the next position
            const right = Number(tokens[i + 1]);
            // Calculate the result
            const result = operate(left, operator, right);
            // Replace the result for the expression
            tokens.splice(i - 1, 3, result);
            // Reset the position of i to i - 1
            // i will be equal to the starting position of result, which means it will be a number.
            // In order to evaluate the operator before the number, we take i - 1.
            i--;
      }
    }
  }
  
  