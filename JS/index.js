var numA =0, numB = 0, operator = "", result=0;
document.querySelector("#operationInput").value = '';

function addNum(numA,numB){
    var functioResult = numA+numB;
    parseFloatNew(functioResult);
    return functioResult;
}

function substarctNum(numA,numB){
    var functioResult = numA-numB;
    parseFloatNew(functioResult);
    return functioResult;
}

function multiplyNum(numA,numB){
    var functioResult = numA*numB;
    parseFloatNew(functioResult);
    return functioResult;
}

function divideNum(numA,numB){
    if(numB == 0){
        return document.querySelector("#operationInput").value = "Cannot divide with zero";
    }
    else {
    var functioResult = numA/numB;
    parseFloatNew(functioResult);
    return functioResult;
    }

}

function operate(numA,operator,numB){

    switch(operator){
        case "+":
            return addNum(numA,numB);
        case "-":
            return substarctNum(numA,numB);
        case "*":
            return multiplyNum(numA,numB);
        case "/":
            return divideNum(numA,numB);
        default:
            return console.log("Check operator or numbers");
    }

}

function clearAll(){
    document.querySelector("#operationInput").value = "";
    numA = 0;
    numB = 0;
    result = 0;
    document.querySelector("#dot").disabled = false;
}

function dotFind(){
    var regEx = new RegExp("[.]");
    
    if(regEx.test(numA.toString())){
        document.querySelector("#dot").disabled = true;
    }
    else if(regEx.test(numB.toString())){
        document.querySelector("#dot").disabled = true;
    }
    else{document.querySelector("#dot").disabled = false;}
}


// userInput function allows user to use keyboard for calculator. 

function userInput(inputField,userInput){
console.log(userInput);

if(userInput == "*" || userInput == "/" || userInput == "+" || userInput == "-" ){
    operator = userInput;
}

if((inputField.value.includes("*")||inputField.value.includes("/")||inputField.value.includes("-")||inputField.value.includes("+")) && userInput > 0){
    numB += userInput;
}
else if (userInput > 0 || userInput =="."){ 
    numA += userInput;
    
}

if(userInput == "Enter"){
    result = operate(parseFloat(numA),operator,parseFloat(numB));
    document.querySelector("#operationInput").value = result;
    
    numA = 0;
    numA = result;
    numB = 0;
}else if (userInput == "Backspace"){
    undoChange();
}

}

// function to undo numbers or operations
function undoChange(){
    var undoValueA = numA.toString();
    var undoValueB = numB.toString();
    const inputField = document.querySelector("#operationInput");
    if((inputField.value.includes("*")||inputField.value.includes("/")||inputField.value.includes("-")||inputField.value.includes("+"))){
        undoValueB = undoValueB.slice(0,-1);
        numB = undoValueB;
        console.log("Undo: "+numB);
    }
    else { 
        undoValueA = undoValueA.slice(0,-1);
        numA = undoValueA;
        console.log("Undo: "+numA);
    }
    

}

// numbers using only two decimals. toFixed() didn't work properly
function parseFloatNew(number){
    number = number.toString();
    number = number.slice(0,(number.indexOf(".")) + 2 + 1);
    return Number(number);
}



// Number buttons
const numberBtns = document.querySelectorAll("div.calculatorNumbers > .numbers");
numberBtns.forEach((button) => {

    button.addEventListener("click", ()=>{
        document.querySelector("#operationInput").value += button.textContent; 
        var inputField = document.querySelector("#operationInput").value;
       
        if(inputField.includes("*")||inputField.includes("/")||inputField.includes("-")||inputField.includes("+")){
            numB += button.textContent;
        }
        else{ 
            numA += button.textContent;
            console.log("InputField: "+ inputField.includes(""));
        }
    });
    
});

// Operation buttons - + * / 

const operationBtns = document.querySelectorAll("div.calculatorOperations > .operation");
operationBtns.forEach((button) => {
    
    button.addEventListener("click", ()=>{
        var inputField = document.querySelector("#operationInput").value;

        //tests if inputfield has number already if it does operation button can be used
        if(/\d/.test(inputField)){
        
            // checks if <div> with "operationInput" id has any operation already and if it has then calculates numbers. 
            if(inputField.includes("*")||inputField.includes("/")||inputField.includes("-")||inputField.includes("+")){
                document.querySelector("#operationInput").value = "";
                result = operate(parseFloat(numA),operator,parseFloat(numB));
                numA = result;


                document.querySelector("#operationInput").value += numA;
                document.querySelector("#operationInput").value += button.textContent;

                console.log("NumA: "+numA+"\nNumB: "+numB+"\nResult: "+result)
                numB = 0;
                operator = button.textContent;
                console.log("NumA: "+numA+"\nNumB: "+numB+"\nResult: "+result)
                document.querySelector("#dot").disabled = false;
            }
            else{
                document.querySelector("#operationInput").value += button.textContent;
                operator = button.textContent;
                document.querySelector("#dot").disabled = false;
            }
        }else console.log("noup");

    });
    
});

// Clear button uses "clearAll" function to erase "operationInput" div and numA,numB,result are set to 0 
const clearButton = document.querySelector("div.calculatorOperations > #clear");
clearButton.addEventListener("click", clearAll);


// Equal button uses "operate" function to calculate numbers that are in "operationInput" <div> and displays result
const equalButton = document.querySelector("div.calculatorOperations > #equal");
equalButton.addEventListener("click",() => {
    result = operate(parseFloat(numA),operator,parseFloat(numB));
    document.querySelector("#operationInput").value = result;
    
    numA = 0;
    numA = result;
    numB = 0;
    
    console.log(result)
});




const inputField = document.querySelector("#operationInput");
inputField.addEventListener("change",()=>{
    dotFind();
});

// user inputs transferred to userInput function
inputField.addEventListener("keydown",(e)=>{
    if((e.key >= 0 || e.key == "/"||e.key =="*"||e.key =="-"||e.key =="+"||e.key =="."||e.key =='Enter'|| e.key =="Backspace")){
        userInput(inputField,e.key);
        
    }else e.preventDefault();
    console.log("NumA: "+numA+"\nnumB: "+numB+"\nOperator: "+operator+"\nEvent: "+e.key+"\nInput: "+e.inputType)
});

// undo button
const backBtn = document.querySelector("#undo");
backBtn.addEventListener("click",()=>{
    undoChange();
    inputField.value = inputField.value.slice(0,-1);
});