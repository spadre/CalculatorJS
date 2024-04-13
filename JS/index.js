var numA =0, numB = 0, operator = "", result=0;

function addNum(numA,numB){
    return numA+numB;
}

function substarctNum(numA,numB){
    return numA-numB;
}

function multiplyNum(numA,numB){
    return numA*numB;
}

function divideNum(numA,numB){
    return numA/numB;
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
    document.querySelector("#operationInput").textContent = "";
    numA = 0;
    numB = 0;
    result = 0;
}


const numberBtns = document.querySelectorAll("div.calculatorNumbers > button");
numberBtns.forEach((button) => {

    button.addEventListener("click", ()=>{
        document.querySelector("#operationInput").textContent += button.textContent; 
        var inputField = document.querySelector("#operationInput").textContent;
       
        if(inputField.includes("*")||inputField.includes("/")||inputField.includes("-")||inputField.includes("+")){
            numB += button.textContent;
            console.log("numA: "+numA+"\nnumB: "+numB);
        }
        else{ 
            numA += button.textContent;
            console.log("numA: "+numA+"\nnumB: "+numB);
        }
    });
    
});


// Operation buttons - + * / 

const operationBtns = document.querySelectorAll("div.calculatorOperations > .operation");
operationBtns.forEach((button) => {
    
    button.addEventListener("click", ()=>{
        var inputField = document.querySelector("#operationInput").textContent;

        // checks if <div> with "operationInput" id has any operation already and if it has then calculates numbers. 
        if(inputField.includes("*")||inputField.includes("/")||inputField.includes("-")||inputField.includes("+")){
            document.querySelector("#operationInput").textContent = "";
            result = operate(parseInt(numA),operator,parseInt(numB));
            numA = result;
            document.querySelector("#operationInput").textContent += result;
            document.querySelector("#operationInput").textContent += button.textContent;
            numB = 0;
            operator = button.textContent;

        }
        else{
            document.querySelector("#operationInput").textContent += button.textContent;
            operator = button.textContent;
        }
    });
    
});

// Clear button uses "clearAll" function to erase "operationInput" div and numA,numB,result are set to 0 
const clearButton = document.querySelector("div.calculatorOperations > #clear");
clearButton.addEventListener("click", clearAll);


// Equal button uses "operate" function to calculate numbers that are in "operationInput" <div> and displays result
const equalButton = document.querySelector("div.calculatorOperations > #equal");
equalButton.addEventListener("click",() => {
    result = operate(parseInt(numA),operator,parseInt(numB));
    document.querySelector("#operationInput").textContent = result;
    numA = result;
    numB = 0;
    console.log(result)
});