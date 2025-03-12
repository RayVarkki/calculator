
let numbers = document.querySelectorAll(".button.number");
let display = document.querySelector(".display");
let acButton = document.querySelector(".button.ac");
let equalsButton = document.querySelector(".button.equals");
let operandButtons = document.querySelectorAll(".button.operand");
let negativePositiveButton = document.querySelector(".button.negPos");
let firstNumber = 0;
let secondNumber = null;
let operand = null;
let result = null;

const MAX_DIGITS = 9;

function adjustFontSize() {
    let displayValue = display.textContent;
    let minimumFontSize = 40;
    let maximumFontSize = 80;
    let fontSize = maximumFontSize + "px";
    if(displayValue.length > MAX_DIGITS){
         fontSize = Math.max(minimumFontSize, (maximumFontSize * MAX_DIGITS) / displayValue.length) + "px";
    }
    display.style.fontSize = fontSize;
}

numbers.forEach((number) => {
    number.addEventListener("click", (clickedEvent) => {

        let calculatorValue = clickedEvent.target.textContent;
        let displayValue = display.textContent;
        console.log(operand);
        if(displayValue == "0" || operand && !secondNumber || result){
            display.textContent = calculatorValue;
            result = null;
        }else{
            display.textContent += calculatorValue;
        }
        if(displayValue.length >= 9){
            display.textContent = display.textContent.substring(0,9);
        }
        adjustFontSize();
        if(!operand){
            firstNumber = display.textContent;
        }else{
            secondNumber = display.textContent;
        }
    })
});

operandButtons.forEach((operandButton) => {
    operandButton.addEventListener("click", (clickedOperand) => {
        if(firstNumber != null && secondNumber != null && operand){
            evaluate();
        }
        operand = clickedOperand.target.textContent;
    });
})

function resetDisplay(){

    display.textContent = 0;
    firstNumber = 0;
    operand = null;
    secondNumber = null;
}



function evaluate(){
    
    this.calculate = {
        "X" : (a,b) => a * b,
        "-" : (a,b) => a - b,
        "+" : (a,b) => +a + +b, 
        "/" : (a,b) => a / b,
        "%" : (a,b) => a % b
    }

    if(firstNumber != null && secondNumber != null && operand){

        result = this.calculate[operand](firstNumber,secondNumber);
        display.textContent = result;
        adjustFontSize();
        firstNumber = result;
        secondNumber = null;
        operand = null;
    }


}

function negativePositive(){

    if(display.textContent.startsWith("0")){
        return;
    }
    if(!display.textContent.includes("-")){
        if(!operand){
            firstNumber = -(firstNumber);
            display.textContent = firstNumber;
        }else{
            secondNumber = -(secondNumber);
            display.textContent = secondNumber;
        }
    }else{
        if(!operand){
            firstNumber = -(firstNumber);
            display.textContent = firstNumber;
        }else{
            secondNumber = -(secondNumber);
            display.textContent = secondNumber;
        }
    }

}

equalsButton.addEventListener("click", evaluate);
acButton.addEventListener("click", resetDisplay);
negativePositiveButton.addEventListener("click", negativePositive);

