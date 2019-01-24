var equation = document.querySelectorAll("#result p")[0],
    result = document.querySelectorAll("#result p")[1],
    numbers = Array.from(document.querySelectorAll('.Numbers button')),
    operations = Array.from(document.querySelectorAll(".Operators button")),
    triFuns = Array.from(document.getElementsByClassName("triFun")),
    degreeMode = document.querySelector('.triMode'),
    sqrtBtn = document.getElementsByClassName('sqrt')[0],
    squareBtn = document.querySelector('.square'),
    equalBtn = document.querySelector('button.equal'),
    pointBtn = document.querySelector('.point'),
    eqn = '', point = false, showResult = false, angle;


function disablBtn(bool){
    triFuns.forEach(element => {
        element.disabled = bool
    });
    squareBtn.disabled = bool
    sqrtBtn.disabled = bool
}

function clear(){
    result.innerHTML = "";
    equation.innerHTML = "";
    eqn = '';
    disablBtn(true)
    equalBtn.disabled = true;
    pointBtn.disabled = false;
    point = false;
    showResult = false;
    numbers.forEach(number => number.disabled = false)
}

function analyzeEqn(){
    console.log(eqn)
    if(degreeMode.innerHTML === 'Deg'){
        eqn = eqn.replace('Sin(', 'Math.sin(Math.PI/180*')
                .replace('Cos(', 'Math.cos(Math.PI/180*')
                .replace('Tan(', 'Math.tan(Math.PI/180*')
                .replace('√', 'Math.sqrt')
    }else{
        eqn = eqn.replace('Sin', 'Math.sin')
                .replace('Cos', 'Math.cos')
                .replace('Tan', 'Math.tan')
                .replace('√', 'Math.sqrt')
    }
    while(eqn.indexOf('<s') !== -1){
        var index = eqn.indexOf('<s')
        for (var i = index-1; i >= 0; i--){
            if(i <= 0){
                y = eqn.slice(i, eqn.indexOf('</sup>')+6)
                z = 'Math.pow(' + eqn.slice(i, index) + ', 2)'
                eqn = eqn.replace(y, z)
                break;
            }
            if(isNaN(eqn[i] && eqn[i] !== ')')){
                y = eqn.slice(i+1, eqn.indexOf('</sup>')+6)
                z = 'Math.pow(' + eqn.slice(i+1, index) + ', 2)'
                eqn = eqn.replace(y, z)
                break;
            }
        }
    }
    console.log(eqn)
}

disablBtn(true)
equalBtn.disabled = true

// Numbers buttons
numbers.forEach(number => {
    number.addEventListener('click', function(){
        equalBtn.disabled = false
        if(showResult) clear()
        disablBtn(false);
        result.innerHTML += number.innerHTML
        // To avoid two points in number
        if(number.innerHTML === '.' && point === false){
            point = true;
            number.disabled = true
        }
    })
});

// AC button
document.querySelector(".clear").addEventListener("click", clear)

// Operations buttons
operations.forEach(operation => {
    operation.addEventListener('click', function(){
        if(result.innerHTML === ''){
            if(equation.innerHTML.slice(-1) === '+'
            || equation.innerHTML.slice(-1) === '-'
            || equation.innerHTML.slice(-1) === '*'
            || equation.innerHTML.slice(-1) === '/'
            || equation.innerHTML.slice(-1) === 'Mod'){
                equation.innerHTML = equation.innerHTML.slice(0, -1) + this.innerHTML
            }
        }
        else if(result.innerHTML !== 'Infinity'){
            if(showResult){
                equation.innerHTML = ''
                eqn = ''
                showResult = false
            }
            equation.innerHTML += result.innerHTML + this.innerHTML
            if(operation.innerHTML === 'Mod') eqn += result.innerHTML + '%'
            else eqn += result.innerHTML + operation.innerHTML
            result.innerHTML = ""
            disablBtn(true)
            equalBtn.disabled = true
            pointBtn.disabled = false
            point = false
            numbers.forEach(number => number.disabled = false)
        }
    })
});

// Trignometric functions buttons
triFuns.forEach(element => {
    element.addEventListener('click', function(){
        if(result.innerHTML !== 'Infinity'){
            if(showResult) eqn = ''
            point = false
            pointBtn.disabled = false
            result.innerHTML = element.innerHTML + '(' + result.innerHTML + ')'
            numbers.forEach(number => number.disabled = true)
            equalBtn.disabled = false
            showResult = false
        }
    })
});

// Square root button
sqrtBtn.addEventListener('click', function(){
    if(result.innerHTML !== 'Infinity'){
        point = false
        pointBtn.disabled = false
        result.innerHTML = '&radic;(' + result.innerHTML + ')'
        numbers.forEach(number => number.disabled = true)
        equalBtn.disabled = false
    }
})

// Square button
squareBtn.addEventListener('click', function(){
    if(result.innerHTML !== 'Infinity'){
        point = false
        pointBtn.disabled = false
        result.innerHTML = result.innerHTML + '<sup>2</sup>'
        numbers.forEach(number => number.disabled = true)
        equalBtn.disabled = false
    }
})

// Equal button
equalBtn.addEventListener('click', function(){
    equation.innerHTML += result.innerHTML
    eqn += result.innerHTML + ' '
    analyzeEqn()
    result.innerHTML = Number(Math.round(eval(eqn)*100000)/100000)
    if(result.innerHTML.length > 10) result.innerHTML = 'Infinity'
    showResult = true;
    numbers.forEach(number => number.disabled = false)
})

// Degree / Radian button
degreeMode.addEventListener('click', function(){
    if(this.innerHTML === 'Deg') this.innerHTML = 'Rad'
    else this.innerHTML = 'Deg'
})