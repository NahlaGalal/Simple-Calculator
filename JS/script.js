var num = null, op = null, 
    point = false, // To ensure that only one point in the number
    showResult = false;
var numbers = Array.from(document.querySelectorAll(".Numbers button"));
var equation = document.querySelectorAll("#result p")[0];
var result = document.querySelectorAll("#result p")[1];
var operations = Array.from(document.querySelectorAll(".Operators button"))
var pointBtn = document.querySelector('.point')
var equalBtn = document.querySelector('.equal')
var sqaureBtn = document.getElementsByClassName("square")[0]
var sqrtBtn = document.getElementsByClassName("sqrt")[0]
var triMode = document.querySelector('.triMode')
var sinBtn = document.getElementsByClassName("sin")[0]
var cosBtn = document.getElementsByClassName("cos")[0]
var tanBtn = document.getElementsByClassName("tan")[0]

// Mathimatical operations
function Calculate(num1, num2, op){
    point = false;
    if(op === '+') return num1 + num2
    else if(op === '-') return num1 - num2
    else if(op === '*') return num1 * num2
    else if(op === '/'){
        if(num2 == 0) return -1
        return num1 / num2
    }
    else return num1 % num2
}

function disableBtn(bool){
    sinBtn.disabled = bool;
    cosBtn.disabled = bool;
    tanBtn.disabled = bool;
    sqaureBtn.disabled = bool;
    sqrtBtn.disabled = bool;
}

equalBtn.disabled = true
disableBtn(true)

// Numbers buttons
numbers.forEach(number => {
    number.addEventListener("click", function(){
        if(number.textContent === '.' && point === false) point = true
        if(showResult){
            num = null;
            result.textContent = number.textContent
            equation.innerHTML = ""
            showResult = false;
        }
        else result.textContent += number.textContent
        equalBtn.disabled = false
        if(point) pointBtn.disabled = true
        else pointBtn.disabled = false
        disableBtn(false)
    })
});

// AC button
document.querySelector(".clear").addEventListener("click", function(){
    num = null;
    op = null;
    point = false;
    showResult = false;
    result.textContent = "";
    equation.innerHTML = "";
    pointBtn.disabled = false
    equalBtn.disabled = true
    disableBtn(true)
})

// Operations buttons
operations.forEach(operation => {
    operation.addEventListener("click", function(){
        op = operation.textContent;
        if(result.textContent !== ""
            && result.textContent !== "Can't devide by zero"){
            if(showResult) equation.innerHTML = result.textContent + operation.textContent
            else equation.innerHTML += result.textContent + operation.textContent
            if(num === null || showResult) num = parseFloat(result.textContent)
            else num = Calculate(num, parseFloat(result.textContent), op);
        }
        else{
            if(equation.innerHTML.slice(-1) === '+' 
            || equation.innerHTML.slice(-1) === '-'
            || equation.innerHTML.slice(-1) === '*'
            || equation.innerHTML.slice(-1) === '/'
            || equation.innerHTML.slice(-1) === 'Mod'){
                    equation.innerHTML = equation.innerHTML.slice(0, -1) + op
            }else{
                equation.innerHTML += op
            }
        }
        point = false;
        pointBtn.disabled = false
        equalBtn.disabled = true
        result.textContent = ""
        showResult = false;
        disableBtn(true)
    })
})

// Equal button
equalBtn.addEventListener('click', function(){
    equalBtn.disabled = true;
    equation.innerHTML += result.textContent
    if(result.textContent !== "") num = Calculate(num, parseFloat(result.textContent), op)
    showResult = true;
    point = false
    pointBtn.disabled = false
    result.textContent = num
    if(num === -1){
        result.textContent = "Can't devide by zero";   
    }
    disableBtn(false)
})

// Square root
sqrtBtn.addEventListener("click", function(){
    var root = Math.sqrt(parseFloat(result.textContent))
    if(num === null) num = root
    else num = Calculate(num, root, op);
    if(showResult) equation.innerHTML = "&radic; " + result.textContent 
    else equation.innerHTML += "&radic; " + result.textContent 
    showResult = false;
    result.textContent = ""
    disableBtn(true)
})

// Square function
sqaureBtn.addEventListener('click', function(){
    var square = Math.pow(parseFloat(result.textContent), 2)
    if(num === null) num = square
    else num = Calculate(num, square, op);
    if(showResult) equation.innerHTML = result.textContent + '<sup> 2 </sup>'
    else equation.innerHTML += result.textContent + '<sup> 2 </sup>'
    showResult = false;
    result.textContent = ""
    disableBtn(true)
})

// Sin function
sinBtn.addEventListener("click", function(){
    var sine;
    if(triMode.textContent === 'Rad') sine = Math.sin(parseFloat(result.textContent))
    else sine = Math.sin(parseFloat(result.textContent) * Math.PI / 180)
    if(num === null) num = sine
    else num = Calculate(num, sine, op)
    if(showResult) equation.innerHTML = "Sin(" + result.textContent + ")"
    else equation.innerHTML += "Sin(" + result.textContent + ")"
    showResult = true
    result.textContent = ""
    disableBtn(true)
})

// Cos function
cosBtn.addEventListener("click", function(){
    var cosine;
    if(triMode.textContent === 'Rad') cosine = Math.sin(parseFloat(result.textContent))
    else cosine = Math.cos(parseFloat(result.textContent) * Math.PI / 180)
    if(num === null) num = cosine
    else num = Calculate(num, cosine, op)
    if(showResult) equation.innerHTML = "Cos(" + result.textContent + ")"
    else equation.innerHTML += "Cos(" + result.textContent + ")"
    showResult = true
    result.textContent = ""
    disableBtn(true)
})

// Tan function
tanBtn.addEventListener("click", function(){
    var tan;
    if(triMode.textContent === 'Rad') tan = Math.tan(parseFloat(result.textContent))
    else tan = Math.tan(parseFloat(result.textContent) * Math.PI / 180)
    if(num === null) num = tan
    else num = Calculate(num, tan, op)
    if(showResult) equation.innerHTML = "Tan(" + result.textContent + ")"
    else equation.innerHTML += "Tan(" + result.textContent + ")"
    result.textContent = ""
    showResult = true
    disableBtn(true)
})

// Trignometric mode button
triMode.addEventListener("click", function(){
    if(triMode.textContent === 'Deg') triMode.textContent = 'Rad'
    else triMode.textContent = 'Deg'
})