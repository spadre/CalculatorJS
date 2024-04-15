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

// Number buttons
const numberBtns = document.querySelectorAll("div.calculatorNumbers > button");
numberBtns.forEach((button) => {

    button.addEventListener("click", ()=>{
        document.querySelector("#operationInput").value += button.textContent; 
        var inputField = document.querySelector("#operationInput").value;
       
        if(inputField.includes("*")||inputField.includes("/")||inputField.includes("-")||inputField.includes("+")){
            numB += button.textContent;
        }
        else{ 
            numA += button.textContent;
            
        }
    });
    
});

// Dot button

const dotBtn = document.querySelector("#dot")
dotBtn.addEventListener("click",()=>{

    var regEx = new RegExp("[.]");
    
    if(regEx.test(numA.toString())){
        document.querySelector("#dot").disabled = true;
    }
    else if(regEx.test(numB.toString())){
        document.querySelector("#dot").disabled = true;
    }
    else{document.querySelector("#dot").disabled = false;}

});


// Operation buttons - + * / 

const operationBtns = document.querySelectorAll("div.calculatorOperations > .operation");
operationBtns.forEach((button) => {
    
    button.addEventListener("click", ()=>{
        var inputField = document.querySelector("#operationInput").value;

        // checks if <div> with "operationInput" id has any operation already and if it has then calculates numbers. 
        if(inputField.includes("*")||inputField.includes("/")||inputField.includes("-")||inputField.includes("+")){
            document.querySelector("#operationInput").value = "";
            result = operate(parseFloat(numA),operator,parseFloat(numB));
            numA = result;
            //parseFloatNew(numA);

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


// numbers using only two decimals. toFixed() didn't work properly
function parseFloatNew(number){
    number = number.toString();
    number = number.slice(0,(number.indexOf(".")) + 2 + 1);
    return Number(number);
}



test();
function test(){
    
    var testi1 = "415142.51",testi2 = 4512, tulos =0;
    
    console.log(isNaN(parseFloatNew(testi1)))
    console.log(isNaN(testi2))

}