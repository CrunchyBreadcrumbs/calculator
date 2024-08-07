const textField = document.querySelector("#displayNumber");
const tinyText = document.querySelector("#displayTiny");
const enter = document.querySelector("#enter");
const dot = document.querySelector('#dot');

const specialBtns = document.querySelectorAll('.special');
const operatorBtns = document.querySelectorAll('.operator');
const numberBtns = document.querySelectorAll('.number');

let isResult = false;
let firstNum = null;
let operator = null;
let secondNum = null;

textField.textContent = '0';

for (const specialBtn of specialBtns){
    specialBtn.addEventListener("click", selectSpecial, false);
}

for(const numberBtn of numberBtns){
    numberBtn.addEventListener("click", selectNumber, false);
}

for(const operatorBtn of operatorBtns){
    operatorBtn.addEventListener("click", selectOperator, false);
}

enter.addEventListener("click", () => {
    let parsedText = parseFloat(textField.textContent);

    if(isNumber(parsedText)){

        if(isResult){
            textField.textContent = calculate(operator, firstNum, secondNum);
            tinyText.textContent = '';
            isResult = true;
        }
        else if (secondNum === null && firstNum !== null){
            secondNum = textField.textContent;
            textField.textContent = calculate(operator, firstNum, secondNum);
            tinyText.textContent = '';
            isResult = true;
        }
        else if (secondNum !== null){
            secondNum = textField.textContent;
            textField.textContent = calculate(operator, firstNum, secondNum);
            tinyText.textContent = '';
            isResult = true;
        }
    }
})

function selectOperator (){
    operator = this.value;
    console.log(operator);
    let parsedText = parseFloat(textField.textContent);

    if(isResult){
        secondNum = null;
        isResult = false;
        textField.textContent = operator;
        console.log(firstNum);
        tinyText.textContent = firstNum;
        console.log(`sO isResult`);
    }
    else if (firstNum != null && secondNum != null && isNumber(parsedText)){
        secondNum = textField.textContent;
        textField.textContent = operator;
        console.log(`sO else if 1`);
        calculate(operator, firstNum, secondNum);
        tinyText.textContent = firstNum;
    }
    else if(firstNum === null && isNumber(parsedText)){
        firstNum = textField.textContent;
        tinyText.textContent = firstNum;
        console.log(`sO else if 2 & firstNum ${firstNum}`);
        textField.textContent = operator;
    }
    else if (secondNum === null && isNumber(parsedText)){
        secondNum = textField.textContent;
        console.log(`sO else if 3 & firstNum: ${firstNum} & secondNum: ${secondNum}`);
        textField.textContent = operator;
        calculate(operator, firstNum, secondNum);
        tinyText.textContent = firstNum;
    }
    
}

function selectNumber () {
    if(isResult){
        textField.textContent = '';
        firstNum = null;
        secondNum = null;
        isResult = false;
    }
    else if(textField.textContent === '+'|| textField.textContent === '-'
        || textField.textContent === '*'|| textField.textContent === '/'
        || textField.textContent ===  '0'
    ){
        textField.textContent = '';
    }

    textField.textContent += this.value;
}

function selectSpecial () {
    switch (this.value){
        case 'C':
            firstNum = null;
            secondNum = null;
            operator = null;
            isResult = false;
            textField.textContent = '0';
            tinyText.textContent = '';
            break;

        case 'delete':
            if(!isResult){
                let text = textField.textContent;
                if(text.length === 1){
                    textField.textContent = '0';
                }
                textField.textContent = text.substring(0, text.length - 1);
            }
            break;

        case '+/-':
            let opposite = parseFloat(textField.textContent);
            if(opposite !== 0){
                opposite *= -1;
                textField.textContent = opposite;
                if(isResult){
                    firstNum = null;
                    secondNum = null;
                    isResult = false;
                }
            }
            break;

        case '.':
            if(isResult){
                firstNum = null;
                secondNum = null;
                textField.textContent = '0' + this.value;
                isResult = false;
            }
            else if(!textField.textContent.includes('.')){
                textField.textContent += this.value;
            }
            break;
        
            case '%':
                let number = textField.textContent;
                textField.textContent = number * 0.01;
                if(isResult){
                    firstNum = null;
                    secondNum = null;
                    isResult = false;
                }
                break;  
    }
}

function calculate (opr, num1, num2){
    let result;
    
    switch(opr){
        case '+':
            result = (parseFloat(num1) + parseFloat(num2)).toFixed(2);
            firstNum = result;
            return result;
        
        case '-':
            result = (parseFloat(num1) + parseFloat(num2)).toFixed(2);
            firstNum = result;
            return result;

        case '*':
            result = (parseFloat(num1) + parseFloat(num2)).toFixed(2);
            firstNum = result;
            return result;
        
        case '/':
            if(num1 === '0' && num2 === '0'){
                alert('yeah.. no. Nice try, buddy.')
                return 0;
            }
            result = (parseFloat(num1) + parseFloat(num2)).toFixed(2);
            firstNum = result;
            return result;
    }   
}

function isNumber(value){
    return typeof value === 'number' && !Number.isNaN(value);
}
